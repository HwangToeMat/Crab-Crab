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

function renderCrab(crab) {
    document.getElementById('crab-name').textContent = crab.name;
    document.getElementById('crab-level').textContent = crab.level;
    document.getElementById('crab-exp').style.width = `${crab.exp}%`;
}

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
