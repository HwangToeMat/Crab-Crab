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

const nicknames = ["행복한 고래", "따뜻한 햇살", "미소 짓는 구름", "작은 산들바람", "빛나는 별빛", "다정한 숲속", "포근한 달빛", "신나는 파도"];

  // 1. Post Creation (24h expiration)
  app.post('/api/posts', async (req, res) => {
    const { content, authorId, nickname } = req.body;
    const postId = uuidv4();
    const postData = {
      id: postId,
      content,
      authorId,
      nickname: nickname || "익명",
      createdAt: new Date().toISOString(),
      likes: 0,
      reports: 0
    };

    await client.setEx(`post:${postId}`, 86400, JSON.stringify(postData));
    res.status(201).json(postData);
  });

  // 1.1 Like a Post (and track user stats)
  app.post('/api/posts/:id/like', async (req, res) => {
    const { id } = req.params;
    const key = `post:${id}`;
    const data = await client.get(key);
    if (data) {
      const post = JSON.parse(data);
      post.likes = (post.likes || 0) + 1;
      
      // Increment author's total likes
      await client.hIncrBy(`user_stats:${post.authorId}`, 'totalLikes', 1);

      const ttl = await client.ttl(key);
      await client.setEx(key, ttl > 0 ? ttl : 86400, JSON.stringify(post));
      res.json(post);
    } else {
      res.status(404).send('Post not found');
    }
  });

  // 4. User Stats & Profile
  app.get('/api/users/:id/profile', async (req, res) => {
    const { id } = req.params;
    const stats = await client.hGetAll(`user_stats:${id}`);
    const nicknameKey = `user_nickname:${id}`;
    let nickname = await client.get(nicknameKey);
    
    if (!nickname) {
      nickname = nicknames[Math.floor(Math.random() * nicknames.length)];
      await client.set(nicknameKey, nickname);
    }

    res.json({
      id,
      nickname,
      stats: {
        totalLikes: parseInt(stats.totalLikes || 0),
        totalChats: parseInt(stats.totalChats || 0)
      }
    });
  });

  // Update matching to increment chat count
  app.post('/api/chat/match', async (req, res) => {
    const { postId, userId } = req.body;
    const queueKey = `match_queue:${postId}`;
    
    const waitingUser = await client.get(queueKey);
    
    if (waitingUser && waitingUser !== userId) {
      const sessionId = uuidv4();
      await client.del(queueKey);
      
      // Increment chat counts for both
      await client.hIncrBy(`user_stats:${userId}`, 'totalChats', 1);
      await client.hIncrBy(`user_stats:${waitingUser}`, 'totalChats', 1);

      res.json({ sessionId, matched: true, partnerId: waitingUser });
    } else {
      await client.setEx(queueKey, 60, userId);
      res.json({ matched: false, message: "Waiting for a partner..." });
    }
  });

  // 2. Home Feed (Fetch active posts)
  app.get('/api/posts', async (req, res) => {
    const keys = await client.keys('post:*');
    const posts = [];
    for (const key of keys) {
      const data = await client.get(key);
      if (data) {
        const post = JSON.parse(data);
        // Check if anyone is waiting in queue
        const queueKey = `match_queue:${post.id}`;
        const waitingUser = await client.get(queueKey);
        post.isWaiting = !!waitingUser;
        posts.push(post);
      }
    }
    // Sort: Waiting posts first, then by createdAt descending
    posts.sort((a, b) => {
      if (a.isWaiting && !b.isWaiting) return -1;
      if (!a.isWaiting && b.isWaiting) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
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
