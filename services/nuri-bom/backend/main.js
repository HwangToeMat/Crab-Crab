const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const { nanoid } = require('nanoid');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

let db;

async function initDB() {
  db = await open({
    filename: './nuribom.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      nickname TEXT,
      location TEXT,
      is_verified INTEGER DEFAULT 0,
      manner_temp REAL DEFAULT 36.5,
      preferences TEXT
    );

    CREATE TABLE IF NOT EXISTS missions (
      id TEXT PRIMARY KEY,
      author_id TEXT,
      author_nickname TEXT,
      type TEXT,
      content TEXT,
      distance REAL DEFAULT 0.5,
      status TEXT DEFAULT 'open',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS chat_rooms (
      id TEXT PRIMARY KEY,
      mission_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id TEXT,
      sender_id TEXT,
      text TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Database initialized');
}

// API Routes
app.post('/api/users/init', async (req, res) => {
  const { nickname, location } = req.body;
  const id = 'user-' + nanoid(6);
  await db.run('INSERT INTO users (id, nickname, location) VALUES (?, ?, ?)', [id, nickname, location]);
  res.json({ id, nickname, location, manner_temp: 36.5 });
});

app.get('/api/missions', async (req, res) => {
  const missions = await db.all('SELECT * FROM missions WHERE status = "open" ORDER BY created_at DESC');
  res.json(missions);
});

app.post('/api/missions', async (req, res) => {
  const { authorId, nickname, type, content } = req.body;
  const id = 'miss-' + nanoid(6);
  await db.run(
    'INSERT INTO missions (id, author_id, author_nickname, type, content) VALUES (?, ?, ?, ?, ?)',
    [id, authorId, nickname, type, content]
  );
  res.json({ id, status: 'open' });
});

app.post('/api/missions/:id/join', async (req, res) => {
  const missionId = req.params.id;
  const { userId } = req.body;
  
  const mission = await db.get('SELECT * FROM missions WHERE id = ?', [missionId]);
  
  // AI Matching Reason Simulation
  const reasons = [
    "이웃님의 과거 활동과 관심사가 일치해요.",
    "매너 온도가 높고 신뢰할 수 있는 이웃이에요.",
    "가장 가까운 거리(0.5km 이내)에 계신 분이에요.",
    "비슷한 시간대에 자주 활동하시는 분이라 매칭했어요."
  ];
  const matchingReason = reasons[Math.floor(Math.random() * reasons.length)];

  const roomId = 'room-' + nanoid(6);
  await db.run('INSERT INTO chat_rooms (id, mission_id) VALUES (?, ?)', [roomId, missionId]);
  await db.run('UPDATE missions SET status = "matched" WHERE id = ?', [missionId]);
  
  res.json({ matched: true, roomId, matchingReason });
});

// Socket.io for Real-time Chat
io.on('connection', (socket) => {
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('send_message', async (data) => {
    const { roomId, senderId, text } = data;
    await db.run('INSERT INTO messages (room_id, sender_id, text) VALUES (?, ?, ?)', [roomId, senderId, text]);
    io.to(roomId).emit('receive_message', { senderId, text, timestamp: new Date() });
  });
});

const PORT = 4050;
initDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Nuri-Bom Backend running on port ${PORT}`);
  });
});
