const API_URL = 'http://localhost:3001/api';

async function fetchData() {
    const list = document.getElementById('tasks');
    if (list) list.innerHTML = '<li style="border:none; justify-content:center;">Loading tasks... 🦀</li>';

    try {
        const tasksRes = await fetch(`${API_URL}/tasks`);
        const tasks = await tasksRes.json();
        const crabRes = await fetch(`${API_URL}/crab/status`);
        const crab = await crabRes.json();
        
        renderTasks(tasks);
        renderCrab(crab);
    } catch (e) {
        console.error("Fetch error", e);
    }
}

function renderTasks(tasks) {
    const list = document.getElementById('tasks');
    if (!list) return;
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

// Evolution v2: Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
        const tabId = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
        document.getElementById(tabId).style.display = 'block';
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (tabId === 'league-view') fetchRankings();
    };
});

async function fetchRankings() {
    try {
        const res = await fetch(`${API_URL}/league/rankings`);
        const data = await res.json();
        const list = document.getElementById('rankings-list');
        list.innerHTML = '';
        data.forEach((r, idx) => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.padding = '10px';
            li.style.borderBottom = '1px solid #eee';
            li.innerHTML = `<span>#${idx+1} <b>${r.name}</b> (LV.${r.level})</span> <span>🔥 ${r.streak}</span>`;
            list.appendChild(li);
        });
    } catch (e) {
        console.error("Ranking fetch error", e);
    }
}

document.getElementById('theme-toggle').onclick = () => {
    document.body.classList.toggle('dark-mode');
};

document.getElementById('share-btn').onclick = () => {
    const name = document.getElementById('crab-name').textContent;
    const level = document.getElementById('crab-level').textContent;
    const text = `🦀 [갓게+] ${name}와(과) 함께하는 진화된 갓생! 현재 LV.${level}\n#갓생 #갓게 #CrabEvolution`;
    navigator.clipboard.writeText(text).then(() => alert('진화된 공유 텍스트가 복사되었습니다!'));
};

document.querySelectorAll('.tmpl-btn').forEach(btn => {
    btn.onclick = async () => {
        const title = btn.getAttribute('data-title');
        await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
        fetchData();
    };
});

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

fetchData();
