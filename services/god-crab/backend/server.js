const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Mock Data
let tasks = [
  { id: 1, title: 'Drink Water (500ml)', is_completed: false, category: 'Health' },
  { id: 2, title: 'Miracle Morning Check', is_completed: true, category: 'Routine' }
];

let crab_status = {
  level: 1,
  exp: 40,
  name: '크래비',
  streak: 7,
  score: 450
};

// Evolution v2: League Data
let rankings = [
  { name: 'PowerCrab', level: 15, streak: 42, score: 1500 },
  { name: 'GodsaengMaster', level: 12, streak: 28, score: 1250 },
  { name: 'DailyCrab', level: 8, streak: 15, score: 850 },
  { name: 'BabyCrab', level: 3, streak: 5, score: 300 }
];

// Evolution v2: Warranty & Trust Data
let user_points = 5000;
let warranties = [
  { task_id: 1, staked_points: 500, status: 'Active' }
];

// Evolution v2: Ambassadors
let ambassadors = [
  { id: 'dev-crab', name: 'Software Dev Crab', track: 'Deep Work & Coding', followers: 1200 },
  { id: 'health-crab', name: 'Fitness Pro Crab', track: '3대 500 루틴', followers: 2500 }
];

// API Endpoints
app.get('/api/league/rankings', (req, res) => {
  // Simple score formula for the user
  crab_status.score = (crab_status.level * 100) + (crab_status.streak * 50) + (crab_status.exp);
  const allRankings = [...rankings, { ...crab_status }].sort((a, b) => b.score - a.score);
  res.json(allRankings);
});

// AI Engine: Infinite Crab AI Coach
app.post('/api/ai/coach', (req, res) => {
  const { current_tasks } = req.body;
  // Gemini AI Mock Response (Phase 5)
  const advice = `안녕하세요! 현재 ${current_tasks.length}개의 습관을 실천 중이시네요. '물 마시기'는 뇌 기능 향상에 매우 중요합니다. 오늘 오후 2시에 리마인더를 드릴까요? 무한한 성장을 응원합니다!`;
  res.json({ advice, mood: 'Inspirational' });
});

// Trust Architecture: Crab Warranty
app.get('/api/trust/status', (req, res) => {
  res.json({ user_points, active_warranties: warranties });
});

app.post('/api/trust/warranty', (req, res) => {
  const { task_id, stake } = req.body;
  if (user_points >= stake) {
    user_points -= stake;
    const newWarranty = { task_id, staked_points: stake, status: 'Active' };
    warranties.push(newWarranty);
    res.status(201).json(newWarranty);
  } else {
    res.status(400).json({ error: 'Insufficient points for warranty.' });
  }
});

// Community: Ambassadors
app.get('/api/community/ambassadors', (req, res) => {
  res.json(ambassadors);
});

// API Endpoints
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = { id: tasks.length + 1, ...req.body, is_completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id == id);
  if (task) {
    task.is_completed = !task.is_completed;
    if (task.is_completed) {
      crab_status.exp += 20; // 20 EXP per task
      user_points += 50; // Reward for task
      
      // Level Up Logic
      if (crab_status.exp >= 100) {
        crab_status.level += 1;
        crab_status.exp -= 100;
        user_points += 500; // Level up bonus
        console.log(`Level Up! Current Level: ${crab_status.level}`);
      }
    }
    res.json({ task, crab_status, user_points });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.get('/api/crab/status', (req, res) => {
  res.json({ ...crab_status, user_points });
});

app.listen(PORT, () => {
  console.log(`God-Crab Backend running on http://localhost:${PORT}`);
});
