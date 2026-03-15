const API_URL = 'http://localhost:3001/api';

async function fetchData() {
    const list = document.getElementById('tasks');
    if (list) list.innerHTML = '<div style="text-align:center; padding:20px;">무한한 가능성을 로딩 중... 🦀</div>';

    try {
        const tasksRes = await fetch(`${API_URL}/tasks`);
        const tasks = await tasksRes.json();
        const crabRes = await fetch(`${API_URL}/crab/status`);
        const crab = await crabRes.json();
        const trustRes = await fetch(`${API_URL}/trust/status`);
        const trust = await trustRes.json();
        
        renderTasks(tasks, trust.active_warranties);
        renderCrab(crab);
        renderTrust(trust);
    } catch (e) {
        console.error("Fetch error", e);
    }
}

function renderTasks(tasks, warranties) {
    const list = document.getElementById('tasks');
    if (!list) return;
    list.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.is_completed ? 'completed' : ''}`;
        
        const isWarranted = warranties.some(w => w.task_id === task.id);
        
        li.innerHTML = `
            <input type="checkbox" ${task.is_completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <span>${task.title}</span>
            ${isWarranted ? '<span class="warranty-badge">🛡️ Warranty</span>' : `<button onclick="applyWarranty(${task.id})" style="font-size:0.7rem; padding:4px 8px; border-radius:8px; background:#7F00FF; color:white; border:none; cursor:pointer;">Stake 💰</button>`}
        `;
        list.appendChild(li);
    });
}

function renderCrab(crab) {
    document.getElementById('crab-name').textContent = crab.name;
    document.getElementById('crab-level').textContent = crab.level;
    document.getElementById('crab-exp').style.width = `${crab.exp}%`;
}

function renderTrust(trust) {
    const pointsEl = document.getElementById('user-points');
    if (pointsEl) pointsEl.textContent = `💰 ${trust.user_points}`;
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
        if (tabId === 'ambassador-view') fetchAmbassadors();
    };
});

async function fetchAmbassadors() {
    try {
        const res = await fetch(`${API_URL}/community/ambassadors`);
        const data = await res.json();
        const list = document.getElementById('ambassador-list');
        if (!list) return;
        list.innerHTML = '';
        data.forEach(a => {
            const div = document.createElement('div');
            div.style.padding = '15px';
            div.style.background = 'white';
            div.style.borderRadius = '12px';
            div.style.marginBottom = '12px';
            div.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
            div.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <b style="color:var(--secondary); font-size:1.1rem;">${a.name}</b>
                        <p style="margin:5px 0; color:#666; font-size:0.85rem;">${a.track}</p>
                        <span style="font-size:0.8rem; color:var(--primary);">👥 ${a.followers.toLocaleString()} followers</span>
                    </div>
                    <button onclick="this.textContent='Following'; this.style.background='#eee'; this.style.color='#999';" style="padding: 8px 15px; border-radius: 20px; border:none; background: var(--secondary); color: white; cursor: pointer; font-weight:bold;">Follow</button>
                </div>
            `;
            list.appendChild(div);
        });
    } catch (e) {
        console.error("Ambassador fetch error", e);
    }
}
        if (tabId === 'ambassador-view') fetchAmbassadors();
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
            li.style.cssText = 'display:flex; justify-content:space-between; align-items:center; padding:15px; margin-bottom:10px; background:#fff; border-radius:16px; box-shadow:0 4px 10px rgba(0,0,0,0.02);';
            
            li.innerHTML = `
                <div style="display:flex; align-items:center; gap:12px;">
                    <span style="font-weight:bold; color:var(--secondary); font-size:1.1rem;">#${idx+1}</span>
                    <div>
                        <div style="font-weight:bold;">${r.name}</div>
                        <div style="font-size:0.8rem; color:#666;">LV.${r.level} • 🔥 ${r.streak} streaks</div>
                    </div>
                </div>
                <button onclick="alert('${r.name}님을 응원했습니다! 🦀💪')" style="padding: 6px 15px; border-radius: 20px; border: 1px solid var(--secondary); background: white; color: var(--secondary); cursor: pointer; font-size: 0.8rem; font-weight:bold;">👏 응원</button>
            `;
            list.appendChild(li);
        });
    } catch (e) {
        console.error("Ranking fetch error", e);
    }
}

async function fetchAmbassadors() {
    try {
        const res = await fetch(`${API_URL}/community/ambassadors`);
        const data = await res.json();
        const list = document.getElementById('ambassadors-list');
        list.innerHTML = '';
        data.forEach(a => {
            const div = document.createElement('div');
            div.className = 'ambassador-card';
            div.innerHTML = `
                <h4>${a.name}</h4>
                <p><strong>Track:</strong> ${a.track}</p>
                <p style="font-size:0.75rem; color:#999; margin-top:5px;">👤 ${a.followers} Followers</p>
                <button onclick="alert('${a.name}님의 트랙을 팔로우하기 시작했습니다!')" style="margin-top:10px; width:100%; padding:8px; border-radius:10px; background:var(--primary); color:white; border:none; cursor:pointer; font-weight:bold;">Follow Track</button>
            `;
            list.appendChild(div);
        });
    } catch (e) {
        console.error("Ambassador fetch error", e);
    }
}

async function applyWarranty(taskId) {
    const stake = 500;
    try {
        const res = await fetch(`${API_URL}/trust/warranty`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task_id: taskId, stake: stake })
        });
        if (res.ok) {
            alert(`보증 시스템 가동! ${stake} 포인트를 스테이킹했습니다. 🛡️`);
            fetchData();
        } else {
            const err = await res.json();
            alert(err.error);
        }
    } catch (e) {
        console.error("Warranty error", e);
    }
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

document.getElementById('ask-ai-btn').onclick = async () => {
    const adviceEl = document.getElementById('ai-advice');
    adviceEl.textContent = 'Infinite AI가 당신의 갓생 패턴을 분석 중입니다... 🦀';
    
    try {
        const tasksRes = await fetch(`${API_URL}/tasks`);
        const tasks = await tasksRes.json();
        const activeTasks = tasks.filter(t => !t.is_completed).map(t => t.title);
        
        const res = await fetch(`${API_URL}/ai/coach`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ current_tasks: activeTasks })
        });
        const data = await res.json();
        adviceEl.textContent = data.advice;
    } catch (e) {
        adviceEl.textContent = 'AI 엔진에 잠시 과부하가 걸렸습니다. 무한한 인내로 잠시 후 다시 시도해주세요!';
    }
};

document.getElementById('theme-toggle').onclick = () => {
    document.body.classList.toggle('dark-mode');
};

fetchData();
