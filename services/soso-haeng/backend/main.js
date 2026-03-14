const express = require('express');
const { createClient } = require('redis');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));

async function startServer() {
  await client.connect();

  // 1. Post Creation (24h expiration)
  app.post('/api/posts', async (req, res) => {
    const { content, authorId } = req.body;
    const postId = uuidv4();
    const postData = {
      id: postId,
      content,
      authorId,
      createdAt: new Date().toISOString(),
      likes: 0,
      reports: 0
    };

    await client.setEx(`post:${postId}`, 86400, JSON.stringify(postData));
    res.status(201).json(postData);
  });

  // 1.1 Like a Post
  app.post('/api/posts/:id/like', async (req, res) => {
    const { id } = req.params;
    const key = `post:${id}`;
    const data = await client.get(key);
    if (data) {
      const post = JSON.parse(data);
      post.likes = (post.likes || 0) + 1;
      const ttl = await client.ttl(key);
      await client.setEx(key, ttl > 0 ? ttl : 86400, JSON.stringify(post));
      res.json(post);
    } else {
      res.status(404).send('Post not found');
    }
  });

  // 1.2 Report a Post
  app.post('/api/posts/:id/report', async (req, res) => {
    const { id } = req.params;
    const key = `post:${id}`;
    const data = await client.get(key);
    if (data) {
      const post = JSON.parse(data);
      post.reports = (post.reports || 0) + 1;
      if (post.reports >= 5) {
        await client.del(key);
        return res.json({ removed: true });
      }
      const ttl = await client.ttl(key);
      await client.setEx(key, ttl > 0 ? ttl : 86400, JSON.stringify(post));
      res.json(post);
    } else {
      res.status(404).send('Post not found');
    }
  });

  // 2. Home Feed (Fetch active posts)
  app.get('/api/posts', async (req, res) => {
    const keys = await client.keys('post:*');
    const posts = [];
    for (const key of keys) {
      const data = await client.get(key);
      if (data) {
        posts.push(JSON.parse(data));
      }
    }
    // Sort by createdAt descending
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(posts);
  });

  // 3. Chat Matching
  // For MVP, if two people request a match for the same post, they get a sessionId.
  app.post('/api/chat/match', async (req, res) => {
    const { postId, userId } = req.body;
    const queueKey = `match_queue:${postId}`;
    
    const waitingUser = await client.get(queueKey);
    
    if (waitingUser && waitingUser !== userId) {
      // Match found!
      const sessionId = uuidv4();
      await client.del(queueKey);
      res.json({ sessionId, matched: true, partnerId: waitingUser });
    } else {
      // No match yet, wait in queue for 60 seconds
      await client.setEx(queueKey, 60, userId);
      res.json({ matched: false, message: "Waiting for a partner..." });
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    socket.on('join_chat', (sessionId) => {
      socket.join(sessionId);
    });
    socket.on('send_message', ({ sessionId, message, senderId }) => {
      io.to(sessionId).emit('receive_message', { message, senderId });
    });
  });

  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}

startServer();
