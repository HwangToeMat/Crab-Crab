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
  const bannedWords = ["바보", "멍청이", "나쁜말"];

  // AI Emotion Engine Constants
  const emotionScore = {
    happy: { color: '#FACC15', shape: 'circle', energy: 0.8, message: "찬란한 햇살 같은 기쁨이네요!" },
    grateful: { color: '#4ADE80', shape: 'heart', energy: 0.6, message: "따뜻한 감사가 마음을 채우고 있어요." },
    calm: { color: '#60A5FA', shape: 'wave', energy: 0.4, message: "고요한 바다 같은 평온함이 느껴져요." },
    excited: { color: '#F472B6', shape: 'star', energy: 0.9, message: "밤하늘의 불꽃 같은 설렘이에요!" }
  };

  // 1. Post Creation with AI Analysis
  app.post('/api/posts', async (req, res) => {
    const { content, authorId, nickname, mood } = req.body;

    const hasBannedWord = bannedWords.some(word => content.includes(word));
    if (hasBannedWord) {
      return res.status(400).json({ message: '부적절한 표현이 포함되어 있습니다.' });
    }

    const postId = uuidv4();
    const analysis = emotionScore[mood] || emotionScore['happy'];
    
    const postData = {
      id: postId,
      content,
      authorId,
      nickname: nickname || "익명",
      mood: mood || "happy",
      analysis,
      createdAt: new Date().toISOString(),
      likes: 0,
      reports: 0
    };

    await client.setEx(`post:${postId}`, 86400, JSON.stringify(postData));
    res.status(201).json(postData);
  });

  // 2. Feed & Post Interactions
  app.get('/api/posts', async (req, res) => {
    const keys = await client.keys('post:*');
    const posts = [];
    for (const key of keys) {
      const data = await client.get(key);
      if (data) {
        const post = JSON.parse(data);
        const queueKey = `match_queue:${post.id}`;
        const waitingUser = await client.get(queueKey);
        post.isWaiting = !!waitingUser;
        posts.push(post);
      }
    }
    posts.sort((a, b) => {
      if (a.isWaiting && !b.isWaiting) return -1;
      if (!a.isWaiting && b.isWaiting) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.json(posts);
  });

  app.post('/api/posts/:id/like', async (req, res) => {
    const { id } = req.params;
    const key = `post:${id}`;
    const data = await client.get(key);
    if (data) {
      const post = JSON.parse(data);
      post.likes = (post.likes || 0) + 1;
      await client.hIncrBy(`user_stats:${post.authorId}`, 'totalLikes', 1);
      await client.hIncrBy(`user_stats:${post.authorId}`, 'happinessLevel', 10);
      const ttl = await client.ttl(key);
      await client.setEx(key, ttl > 0 ? ttl : 86400, JSON.stringify(post));
      res.json(post);
    } else {
      res.status(404).send('Post not found');
    }
  });

  app.delete('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.query;
    const key = `post:${id}`;
    const data = await client.get(key);
    if (data && JSON.parse(data).authorId === userId) {
      await client.del(key);
      res.json({ message: 'Deleted' });
    } else {
      res.status(403).send('Unauthorized');
    }
  });

  // 3. User Management
  app.get('/api/users/:id/profile', async (req, res) => {
    const { id } = req.params;
    const stats = await client.hGetAll(`user_stats:${id}`);
    let nickname = await client.get(`user_nickname:${id}`);
    if (!nickname) {
      nickname = nicknames[Math.floor(Math.random() * nicknames.length)];
      await client.set(`user_nickname:${id}`, nickname);
    }
    res.json({
      id, nickname,
      stats: {
        totalLikes: parseInt(stats.totalLikes || 0),
        totalChats: parseInt(stats.totalChats || 0),
        happinessLevel: parseInt(stats.happinessLevel || 0)
      }
    });
  });

  app.post('/api/users/:id/nickname/refresh', async (req, res) => {
    const { id } = req.params;
    const nickname = nicknames[Math.floor(Math.random() * nicknames.length)];
    await client.set(`user_nickname:${id}`, nickname);
    res.json({ nickname });
  });

  // 4. Chat & Real-time
  app.post('/api/chat/match', async (req, res) => {
    const { postId, userId } = req.body;
    const queueKey = `match_queue:${postId}`;
    const waitingUser = await client.get(queueKey);
    if (waitingUser && waitingUser !== userId) {
      const sessionId = uuidv4();
      await client.del(queueKey);
      await client.hIncrBy(`user_stats:${userId}`, 'totalChats', 1);
      await client.hIncrBy(`user_stats:${waitingUser}`, 'totalChats', 1);
      res.json({ sessionId, matched: true, partnerId: waitingUser });
    } else {
      await client.setEx(queueKey, 60, userId);
      res.json({ matched: false });
    }
  });

  io.on('connection', (socket) => {
    io.emit('online_count', io.engine.clientsCount);
    socket.on('join_chat', async (sessionId) => {
      socket.join(sessionId);
      const history = await client.lRange(`chat_history:${sessionId}`, 0, -1);
      socket.emit('chat_history', history.map(h => JSON.parse(h)));
    });
    socket.on('send_message', async ({ sessionId, message, senderId }) => {
      const msgData = { message, senderId, timestamp: Date.now() };
      await client.rPush(`chat_history:${sessionId}`, JSON.stringify(msgData));
      await client.expire(`chat_history:${sessionId}`, 3600);
      io.to(sessionId).emit('receive_message', msgData);
    });
    socket.on('disconnect', () => io.emit('online_count', io.engine.clientsCount));
  });

  server.listen(4000, () => console.log(`Emotional AI Backend running on port 4000`));
}

startServer();
