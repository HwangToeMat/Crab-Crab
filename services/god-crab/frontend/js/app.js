const API_URL = 'http://localhost:3001/api';

async function fetchData() {
    const tasksRes = await fetch(`${API_URL}/tasks`);
    const tasks = await tasksRes.json();
    
    const crabRes = await fetch(`${API_URL}/crab/status`);
    const crab = await crabRes.json();
    
    renderTasks(tasks);
    renderCrab(crab);
}

function renderTasks(tasks) {
    const list = document.getElementById('tasks');
    list.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.title;
        if (task.is_completed) li.classList.add('completed');
        li.onclick = () => toggleTask(task.id);
        list.appendChild(li);
    });
}

const sayings = [
    "오늘도 껍질을 깨고 성장해봐요!",
    "작은 걸음이 큰 게를 만들어요!",
    "옆으로 걸어도 목표는 앞으로!",
    "집게로 오늘의 할 일을 꽉 잡으세요!",
    "당신의 갓생을 응원합니다! 🦀"
];

function renderCrab(crab) {
    document.getElementById('crab-name').textContent = crab.name;
    document.getElementById('crab-level').textContent = crab.level;
    document.getElementById('crab-exp').style.width = `${crab.exp}%`;
    
    // Random saying update
    const sayingElem = document.getElementById('crab-saying');
    if (sayingElem) {
        sayingElem.textContent = `"${sayings[Math.floor(Math.random() * sayings.length)]}"`;
    }
}

document.getElementById('theme-toggle').onclick = () => {
    document.body.classList.toggle('dark-mode');
};

async function toggleTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'PATCH' });
    fetchData();
}

document.getElementById('add-task-btn').onclick = async () => {
    const title = document.getElementById('new-task-title').value;
    if (!title) return;
    
    await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });
    
    document.getElementById('new-task-title').value = '';
    fetchData();
};

// Initial load
fetchData();
