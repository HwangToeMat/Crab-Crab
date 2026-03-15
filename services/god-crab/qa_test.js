const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

async function runTest() {
  console.log('🚀 Starting God-Crab v2.0 QA Stress Test...');

  try {
    // 1. Check Task List
    console.log('[1/5] Fetching tasks...');
    const tasks = await axios.get(`${BASE_URL}/tasks`);
    console.log(`✅ Found ${tasks.data.length} tasks.`);

    // 2. Add New Task
    console.log('[2/5] Adding new task...');
    const newTask = await axios.post(`${BASE_URL}/tasks`, { title: 'QA Stress Test Task' });
    console.log(`✅ Task added with ID: ${newTask.data.id}`);

    // 3. Toggle Task & Check Level Up
    console.log('[3/5] Completing tasks for Level Up...');
    for (let i = 0; i < 5; i++) {
        const task = await axios.post(`${BASE_URL}/tasks`, { title: `Level Up Task ${i}` });
        await axios.patch(`${BASE_URL}/tasks/${task.data.id}`);
    }
    const status = await axios.get(`${BASE_URL}/crab/status`);
    console.log(`✅ Current Level: ${status.data.level}, Exp: ${status.data.exp}`);

    // 4. Check Rankings
    console.log('[4/5] Checking Rankings...');
    const rankings = await axios.get(`${BASE_URL}/league/rankings`);
    console.log(`✅ Top Ranker: ${rankings.data[0].name} (Score: ${rankings.data[0].score})`);

    // 5. Check AI Coach
    console.log('[5/5] Requesting AI Advice...');
    const ai = await axios.post(`${BASE_URL}/ai/coach`, { current_tasks: ['Refactoring', 'Testing'] });
    console.log(`✅ AI Advice: "${ai.data.advice}"`);

    console.log('\n✨ All QA Tests Passed Successfully!');
  } catch (error) {
    console.error('❌ QA Test Failed:', error.message);
  }
}

runTest();
