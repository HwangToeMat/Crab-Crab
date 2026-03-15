const API_URL = 'http://localhost:3001/api';

/**
 * 전역 데이터 로드 및 UI 초기화
 */
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
    } catch (e) {
        console.error("Fetch error", e);
    }
}

/**
 * 할 일 목록 렌더링 (보증 시스템 포함)
 */
function renderTasks(tasks, warranties) {
    const list = document.getElementById('tasks');
    if (!list) return;
    list.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.is_completed ? 'completed' : ''}`;
        li.style.cssText = 'display:flex; justify-content:space-between; align-items:center; padding:12px; border-bottom:1px solid #eee;';
        
        const isWarranted = warranties.some(w => w.task_id === task.id);
        
        li.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <input type="checkbox" ${task.is_completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                <span style="${task.is_completed ? 'text-decoration:line-through; color:#999;' : ''}">${task.title}</span>
                ${isWarranted ? '<span style="font-size:0.7rem; background:#7F00FF; color:white; padding:2px 6px; border-radius:4px;">🛡️ 보증됨</span>' : ''}
            </div>
            ${!isWarranted && !task.is_completed ? `<button onclick="applyWarranty(${task.id})" style="font-size:0.7rem; padding:4px 8px; border-radius:8px; background:#eee; border:none; cursor:pointer;">Stake 💰</button>` : ''}
        `;
        list.appendChild(li);
    });
}

/**
 * 꽃게 상태 및 방 렌더링
 */
function renderCrab(crab) {
    document.getElementById('crab-name').textContent = crab.name;
    document.getElementById('crab-level').textContent = crab.level;
    document.getElementById('crab-exp').style.width = `${crab.exp}%`;
    
    const streakEl = document.querySelector('[title="Streak"]');
    if (streakEl) streakEl.textContent = `🔥 ${crab.streak}`;
    
    const pointsEl = document.getElementById('user-points');
    if (pointsEl) pointsEl.textContent = `💰 ${crab.user_points.toLocaleString()}`;
    
    // 레벨에 따른 꽃게의 방(Crab Room) 진화
    const roomEl = document.querySelector('#crab-room div');
    if (roomEl) {
        let items = '🦀';
        if (crab.level >= 2) items = '🐚 ' + items + ' 🏖️';
        if (crab.level >= 5) items = '💎 ' + items + ' 🏰';
        if (crab.level >= 10) items = '👑 ' + items + ' ✨';
        roomEl.textContent = items;
    }
}

/**
 * 탭 전환 로직
 */
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

/**
 * 리그 랭킹 데이터 페칭 및 렌더링
 */
async function fetchRankings() {
    try {
        const res = await fetch(`${API_URL}/league/rankings`);
        const data = await res.json();
        const list = document.getElementById('rankings-list');
        if (!list) return;
        list.innerHTML = '';
        data.forEach((r, idx) => {
            const li = document.createElement('li');
            li.style.cssText = 'display:flex; justify-content:space-between; align-items:center; padding:15px; margin-bottom:10px; background:#f9f9f9; border-radius:12px;';
            
            li.innerHTML = `
                <div style="display:flex; align-items:center; gap:12px;">
                    <span style="font-weight:bold; color:var(--primary); font-size:1.1rem;">#${idx+1}</span>
                    <div>
                        <div style="font-weight:bold;">${r.name} ${r.name === '크래비' ? '(나)' : ''}</div>
                        <div style="font-size:0.8rem; color:#666;">LV.${r.level} • 🔥 ${r.streak} streaks</div>
                    </div>
                </div>
                <div>
                    ${r.name !== '크래비' ? `<button onclick="alert('${r.name}님을 응원했습니다! 🦀💪')" style="padding: 5px 12px; border-radius: 20px; border: 1px solid var(--primary); background: white; color: var(--primary); cursor: pointer; font-size: 0.8rem;">👏 응원</button>` : ''}
                </div>
            `;
            list.appendChild(li);
        });
    } catch (e) {
        console.error("Ranking fetch error", e);
    }
}

/**
 * 앰배서더 목록 페칭 및 렌더링
 */
async function fetchAmbassadors() {
    try {
        const res = await fetch(`${API_URL}/community/ambassadors`);
        const data = await res.json();
        const list = document.getElementById('ambassador-list');
        if (!list) return;
        list.innerHTML = '';
        data.forEach(a => {
            const div = document.createElement('div');
            div.style.cssText = 'padding:15px; background:white; border-radius:12px; margin-bottom:12px; box-shadow:0 2px 8px rgba(0,0,0,0.05);';
            div.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <b style="color:var(--secondary); font-size:1.1rem;">${a.name}</b>
                        <p style="margin:5px 0; color:#666; font-size:0.85rem;">${a.track}</p>
                        <span style="font-size:0.8rem; color:var(--primary);">👥 ${a.followers.toLocaleString()} 팔로워</span>
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

/**
 * 보증(Warranty) 적용
 */
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

/**
 * 할 일 상태 토글
 */
async function toggleTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'PATCH' });
    fetchData();
}

/**
 * 할 일 추가
 */
document.getElementById('add-task-btn').onclick = async () => {
    const titleEl = document.getElementById('new-task-title');
    const title = titleEl.value;
    if (!title) return;
    await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });
    titleEl.value = '';
    fetchData();
};

/**
 * AI 코치 상담
 */
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
        adviceEl.textContent = 'AI 엔진이 잠시 쉬고 있습니다. 나중에 다시 시도해주세요!';
    }
};

/**
 * 테마 토글 및 공유 기능
 */
document.getElementById('theme-toggle').onclick = () => {
    document.body.classList.toggle('dark-mode');
};

document.getElementById('share-btn').onclick = () => {
    const name = document.getElementById('crab-name').textContent;
    const level = document.getElementById('crab-level').textContent;
    const text = `🦀 [갓게+] ${name}와(과) 함께하는 진화된 갓생! 현재 LV.${level}\n#갓생 #갓게 #CrabEvolution`;
    navigator.clipboard.writeText(text).then(() => alert('공유 텍스트가 복사되었습니다!'));
};

// 템플릿 버튼 이벤트 바인딩
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

// 초기 데이터 로드
fetchData();
