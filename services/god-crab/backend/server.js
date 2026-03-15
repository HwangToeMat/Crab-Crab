const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generativeai");
require('dotenv').config();

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

// Gemini AI 설정
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "MOCK_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(bodyParser.json());

const initialData = {
  tasks: [
    { id: 1, title: 'Drink Water (500ml)', is_completed: false, category: 'Health' },
    { id: 2, title: 'Miracle Morning Check', is_completed: true, category: 'Routine' }
  ],
  crab_status: {
    level: 1,
    exp: 40,
    name: '진화의꽃게',
    streak: 7,
    score: 450
  },
  user_points: 5000,
  rankings: [
    { name: 'PowerCrab', level: 15, streak: 42, score: 1500 },
    { name: 'GodsaengMaster', level: 12, streak: 28, score: 1250 },
    { name: 'DailyCrab', level: 8, streak: 15, score: 850 }
  ],
  warranties: [],
  ambassadors: [
    { id: 'dev-crab', name: 'Software Dev Crab', track: 'Deep Work & Coding', followers: 1200 },
    { id: 'health-crab', name: 'Fitness Pro Crab', track: '3대 500 루틴', followers: 2500 }
  ]
};

const loadData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  const raw = fs.readFileSync(DATA_FILE);
  return JSON.parse(raw);
};

const saveData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
let state = loadData();

// [Evolution 2.0] Tasks with Leveling Engine
app.get('/api/tasks', (req, res) => res.json(state.tasks));

app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = state.tasks.find(t => t.id == id);
  if (task) {
    task.is_completed = !task.is_completed;
    if (task.is_completed) {
      state.crab_status.exp += 30;
      state.user_points += 100;
      if (state.crab_status.exp >= 100) {
        state.crab_status.level += 1;
        state.crab_status.exp -= 100;
        state.user_points += 1000;
      }
    }
    saveData(state);
    res.json({ task, status: state.crab_status, points: state.user_points });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// [Evolution 2.0] AI Habit Coach (Gemini Real Integration)
app.post('/api/ai/coach', async (req, res) => {
  const { current_tasks, status } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "MOCK_KEY") {
    return res.json({ 
      advice: "현재 마스터 꽃게가 깊은 명상 중입니다. '작은 습관이 위대한 진화를 만든다'는 꽃게의 가르침을 잊지 마세요!", 
      mood: 'Inspirational' 
    });
  }

  try {
    const prompt = `당신은 'God-Crab(갓게)', 모든 습관 형성자들의 신이자 마스터 가이드입니다. 
    사용자의 현재 목표: ${JSON.stringify(current_tasks)}
    사용자 상태: 레벨 ${status.level}, 연속 달성 ${status.streak}일.
    이 사용자를 위해 짧고 강력한 '갓생 한마디'를 한국어로 해주세요. 엄격하면서도 따뜻한 스승의 페르소나를 유지하세요.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ advice: response.text(), mood: 'Master' });
  } catch (error) {
    console.error("AI Coach Error:", error);
    res.status(500).json({ advice: "꽃게 통신망에 혼선이 발생했습니다. 하지만 당신의 의지는 꺾이지 않아야 합니다.", mood: 'Stoic' });
  }
});

// [Evolution 2.0] Global League & Trust System
app.get('/api/league/rankings', (req, res) => {
  const myScore = (state.crab_status.level * 1000) + (state.crab_status.streak * 500) + state.crab_status.exp;
  const allRankings = [...state.rankings, { name: '당신', ...state.crab_status, score: myScore }].sort((a, b) => b.score - a.score);
  res.json(allRankings);
});

app.post('/api/trust/warranty', (req, res) => {
  const { task_id, stake } = req.body;
  if (state.user_points >= stake) {
    state.user_points -= stake;
    const newWarranty = { id: Date.now(), task_id, staked_points: stake, status: 'Active', timestamp: new Date().toISOString() };
    state.warranties.push(newWarranty);
    saveData(state);
    res.json({ success: true, points: state.user_points, warranty: newWarranty });
  } else {
    res.status(400).json({ error: '보증금이 부족합니다. 더 많은 갓생 활동으로 포인트를 모으세요!' });
  }
});

app.listen(PORT, () => console.log(`🚀 God-Crab Master Evolution running on http://localhost:${PORT}`));
