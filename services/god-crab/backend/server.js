const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(bodyParser.json());

/**
 * 초기 데이터 구조
 */
const initialData = {
  tasks: [
    { id: 1, title: 'Drink Water (500ml)', is_completed: false, category: 'Health' },
    { id: 2, title: 'Miracle Morning Check', is_completed: true, category: 'Routine' }
  ],
  crab_status: {
    level: 1,
    exp: 40,
    name: '크래비',
    streak: 7,
    score: 450
  },
  user_points: 5000,
  rankings: [
    { name: 'PowerCrab', level: 15, streak: 42, score: 1500 },
    { name: 'GodsaengMaster', level: 12, streak: 28, score: 1250 },
    { name: 'DailyCrab', level: 8, streak: 15, score: 850 },
    { name: 'BabyCrab', level: 3, streak: 5, score: 300 }
  ],
  warranties: [
    { task_id: 1, staked_points: 500, status: 'Active' }
  ],
  ambassadors: [
    { id: 'dev-crab', name: 'Software Dev Crab', track: 'Deep Work & Coding', followers: 1200 },
    { id: 'health-crab', name: 'Fitness Pro Crab', track: '3대 500 루틴', followers: 2500 }
  ]
};

/**
 * 데이터 로드 및 저장 유틸리티
 */
const loadData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  const raw = fs.readFileSync(DATA_FILE);
  return JSON.parse(raw);
};

const saveData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// State 관리
let state = loadData();

// API: Tasks
app.get('/api/tasks', (req, res) => {
  res.json(state.tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = { id: Date.now(), ...req.body, is_completed: false };
  state.tasks.push(newTask);
  saveData(state);
  res.status(201).json(newTask);
});

app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = state.tasks.find(t => t.id == id);
  if (task) {
    task.is_completed = !task.is_completed;
    if (task.is_completed) {
      state.crab_status.exp += 20;
      state.user_points += 50;
      
      if (state.crab_status.exp >= 100) {
        state.crab_status.level += 1;
        state.crab_status.exp -= 100;
        state.user_points += 500;
      }
    }
    saveData(state);
    res.json({ task, crab_status: state.crab_status, user_points: state.user_points });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// API: Crab Status
app.get('/api/crab/status', (req, res) => {
  res.json({ ...state.crab_status, user_points: state.user_points });
});

// API: League Rankings
app.get('/api/league/rankings', (req, res) => {
  state.crab_status.score = (state.crab_status.level * 100) + (state.crab_status.streak * 50) + state.crab_status.exp;
  const allRankings = [...state.rankings, { ...state.crab_status }].sort((a, b) => b.score - a.score);
  res.json(allRankings);
});

// API: Trust & Warranty
app.get('/api/trust/status', (req, res) => {
  res.json({ user_points: state.user_points, active_warranties: state.warranties });
});

app.post('/api/trust/warranty', (req, res) => {
  const { task_id, stake } = req.body;
  if (state.user_points >= stake) {
    state.user_points -= stake;
    const newWarranty = { task_id, staked_points: stake, status: 'Active' };
    state.warranties.push(newWarranty);
    saveData(state);
    res.status(201).json(newWarranty);
  } else {
    res.status(400).json({ error: 'Insufficient points.' });
  }
});

// API: Community
app.get('/api/community/ambassadors', (req, res) => {
  res.json(state.ambassadors);
});

// API: AI Coach
app.post('/api/ai/coach', (req, res) => {
  const { current_tasks } = req.body;
  const advice = current_tasks.length > 0 
    ? `현재 '${current_tasks[0]}'을 포함해 ${current_tasks.length}개의 목표가 있군요! 작은 걸음이 무한한 진화를 만듭니다. 화이팅!`
    : `오늘의 목표를 추가하고 갓생의 첫 발을 내디뎌보세요!`;
  res.json({ advice, mood: 'Inspirational' });
});

app.listen(PORT, () => {
  console.log(`God-Crab v2.0 Backend running on http://localhost:${PORT}`);
});
