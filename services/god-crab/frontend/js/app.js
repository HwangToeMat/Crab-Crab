const API_URL = 'http://localhost:3001/api';

/**
 * 전역 데이터 로드 및 UI 초기화
 */
async function fetchData() {
    const taskContainer = document.getElementById('tasks');
    try {
        const tasksRes = await fetch(`${API_URL}/tasks`);
        const tasks = await tasksRes.json();
        
        const statusRes = await fetch(`${API_URL}/crab/status`);
        const status = await statusRes.json();
        
        renderTasks(tasks);
        renderHUD(status);
    } catch (e) {
        console.error("Master Data Fetch Error:", e);
    }
}

/**
 * 마스터 HUD (Heads-Up Display) 렌더링
 */
function renderHUD(status) {
    document.getElementById('crab-name').textContent = status.name;
    document.getElementById('crab-level').textContent = status.level;
    document.getElementById('crab-exp').style.width = `${status.exp}%`;
    document.getElementById('user-points').textContent = `💰 ${status.user_points.toLocaleString()} P`;
}

/**
 * 진화 목표(Tasks) 렌더링
 */
function renderTasks(tasks) {
    const container = document.getElementById('tasks');
    container.innerHTML = '';
    
    tasks.forEach(task => {
        const item = document.createElement('div');
        item.className = `task-item ${task.is_completed ? 'completed' : ''}`;
        
        item.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px;">
                <input type="checkbox" ${task.is_completed ? 'checked' : ''} 
                       style="width:20px; height:20px; cursor:pointer;"
                       onchange="toggleTask(${task.id})">
                <span style="font-weight:700; ${task.is_completed ? 'text-decoration:line-through; opacity:0.5;' : ''}">${task.title}</span>
            </div>
            ${!task.is_completed ? `<button onclick="stakeWarranty(${task.id})" style="background:rgba(250, 204, 21, 0.1); border:1px solid var(--color-neon-gold); color:var(--color-neon-gold); padding:4px 10px; border-radius:8px; font-size:0.75rem; font-weight:800; cursor:pointer;">STAKE</button>` : ''}
        `;
        container.appendChild(item);
    });
}

/**
 * 습관 상태 전환 및 레벨업 체크
 */
async function toggleTask(id) {
    try {
        const res = await fetch(`${API_URL}/tasks/${id}`, { method: 'PATCH' });
        const data = await res.json();
        renderHUD({ ...data.status, user_points: data.points });
        fetchData();
        
        if (data.task.is_completed) {
            showEvolutionToast("진화 포인트 획득! +100P ✨");
        }
    } catch (e) {
        console.error("Toggle Task Error:", e);
    }
}

/**
 * AI 마스터 조언 받기 (Gemini Integration)
 */
document.getElementById('ask-ai-btn').onclick = async () => {
    const adviceEl = document.getElementById('ai-advice');
    const originalText = adviceEl.textContent;
    adviceEl.textContent = "AI 마스터가 당신의 영혼을 읽는 중... 🔮";
    adviceEl.style.opacity = "0.6";

    try {
        const tasksRes = await fetch(`${API_URL}/tasks`);
        const tasks = await tasksRes.json();
        const activeTasks = tasks.filter(t => !t.is_completed).map(t => t.title);
        
        const statusRes = await fetch(`${API_URL}/crab/status`);
        const status = await statusRes.json();

        const res = await fetch(`${API_URL}/ai/coach`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ current_tasks: activeTasks, status: status })
        });
        const data = await res.json();
        
        adviceEl.style.opacity = "1";
        adviceEl.textContent = `"${data.advice}"`;
        showEvolutionToast("마스터의 계시를 받았습니다. ⚡");
    } catch (e) {
        adviceEl.textContent = "통신 장애가 발생했으나, 당신의 의지는 장애가 없어야 합니다.";
        adviceEl.style.opacity = "1";
    }
};

/**
 * 리그 랭킹 시스템 (Master League)
 */
async function fetchRankings() {
    const list = document.getElementById('rankings-list');
    list.innerHTML = '<div style="text-align:center; padding:20px; opacity:0.5;">리그 랭킹 산출 중...</div>';

    try {
        const res = await fetch(`${API_URL}/league/rankings`);
        const rankings = await res.json();
        
        list.innerHTML = '';
        rankings.forEach((r, idx) => {
            const item = document.createElement('div');
            const isTop = idx < 3;
            item.className = `rank-item ${isTop ? 'top-rank' : ''}`;
            
            item.innerHTML = `
                <div class="rank-number">${idx + 1}</div>
                <div class="rank-name">
                    ${r.name} 
                    ${isTop ? '<span style="font-size:0.7rem; margin-left:5px;">🏆</span>' : ''}
                </div>
                <div class="rank-score">${r.score.toLocaleString()}</div>
            `;
            list.appendChild(item);
        });
    } catch (e) {
        console.error("Ranking Fetch Error:", e);
    }
}

/**
 * 탭 전환 시스템
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
 * 앰배서더 (마스터) 리스트
 */
async function fetchAmbassadors() {
    const list = document.getElementById('ambassadors-list');
    list.innerHTML = '';
    
    try {
        const res = await fetch(`${API_URL}/community/ambassadors`);
        const data = await res.json();
        
        data.forEach(a => {
            const item = document.createElement('div');
            item.className = 'task-item';
            item.style.flexDirection = 'column';
            item.style.alignItems = 'flex-start';
            item.innerHTML = `
                <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
                    <span style="font-weight:800; color:var(--color-neon-cyan);">${a.name}</span>
                    <button class="btn-primary" style="padding:4px 12px; font-size:0.75rem; border-radius:20px;">FOLLOW</button>
                </div>
                <div style="font-size:0.85rem; color:#94A3B8; margin-top:5px;">${a.track}</div>
                <div style="font-size:0.75rem; color:var(--color-electric-purple); font-weight:700; margin-top:5px;">👤 ${a.followers.toLocaleString()} 팔로워</div>
            `;
            list.appendChild(item);
        });
    } catch (e) {
        console.error("Ambassador Fetch Error:", e);
    }
}

/**
 * 갓생 보증금 스테이킹
 */
async function stakeWarranty(taskId) {
    if (confirm("500P를 걸고 이 습관을 반드시 완수하시겠습니까? 실패 시 포인트는 기부됩니다.")) {
        try {
            const res = await fetch(`${API_URL}/trust/warranty`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task_id: taskId, stake: 500 })
            });
            const data = await res.json();
            if (res.ok) {
                showEvolutionToast("보증금이 걸렸습니다. 실패는 없습니다! 🛡️");
                fetchData();
            } else {
                alert(data.error);
            }
        } catch (e) {
            console.error("Stake Error:", e);
        }
    }
}

/**
 * 유틸리티: 토스트 메시지
 */
function showEvolutionToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
        background: var(--ai-gradient); color: white; padding: 12px 25px;
        border-radius: 30px; font-weight: 800; font-size: 0.9rem;
        box-shadow: 0 10px 20px rgba(0,0,0,0.3); z-index: 9999;
        animation: slideUp 0.3s ease-out;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// 템플릿 버튼 이벤트
document.querySelectorAll('.tmpl-btn').forEach(btn => {
    btn.onclick = async () => {
        const title = btn.getAttribute('data-title');
        await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
        fetchData();
        showEvolutionToast("새로운 진화 목표 추가! 🎯");
    };
});

// 할 일 수동 추가
document.getElementById('new-task-title').onkeypress = async (e) => {
    if (e.key === 'Enter') {
        const title = e.target.value;
        if (!title) return;
        await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
        e.target.value = '';
        fetchData();
        showEvolutionToast("커스텀 목표가 설정되었습니다. 🚀");
    }
};

// 초기화
fetchData();
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { transform: translate(-50%, 20px); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
`;
document.head.appendChild(style);
