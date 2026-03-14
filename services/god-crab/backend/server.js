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
  name: 'Crabby'
};

// Evolution v2: League Data
let rankings = [
  { name: 'PowerCrab', level: 15, streak: 42, score: 1500 },
  { name: 'GodsaengMaster', level: 12, streak: 28, score: 1250 },
  { name: 'DailyCrab', level: 8, streak: 15, score: 850 },
  { name: 'BabyCrab', level: 3, streak: 5, score: 300 }
];

// API Endpoints
app.get('/api/league/rankings', (req, res) => {
  res.json(rankings);
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
    if (task.is_completed) crab_status.exp += 10;
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.get('/api/crab/status', (req, res) => {
  res.json(crab_status);
});

app.listen(PORT, () => {
  console.log(`God-Crab Backend running on http://localhost:${PORT}`);
});
