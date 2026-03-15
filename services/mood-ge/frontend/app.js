const API_BASE = 'http://localhost:8000/api/v1';

async function fetchStatus() {
    const res = await fetch(`${API_BASE}/evolution/status`);
    const data = await res.json();
    
    document.getElementById('token-count').textContent = data.points;
    document.getElementById('burnout-fill').style.width = `${data.burnout_score}%`;
    document.getElementById('streak-count').textContent = data.streak;
    document.getElementById('cheer-count').textContent = data.cheers;
    
    renderAmbassadors(data.ambassadors);
}

function renderAmbassadors(ambassadors) {
    const grid = document.getElementById('ambassador-grid');
    grid.innerHTML = '';
    ambassadors.forEach(a => {
        const card = document.createElement('div');
        card.className = 'ambassador-card';
        card.innerHTML = `
            <strong>${a.name}</strong><br>
            <span style="color:#aaa; font-size:0.7rem;">${a.track}</span>
            <p style="margin:5px 0; font-style:italic;">"${a.motto}"</p>
        `;
        grid.appendChild(card);
    });
}

async function fetchChallenges() {
    const res = await fetch(`${API_BASE}/challenges`);
    const data = await res.json();
    const list = document.getElementById('challenge-list');
    list.innerHTML = '';
    data.forEach(c => {
        const item = document.createElement('div');
        item.className = 'challenge-item';
        item.innerHTML = `
            <span style="${c.completed ? 'text-decoration:line-through; color:#666;' : ''}">${c.title}</span>
            ${c.completed ? '<span style="color:var(--primary);">✅ +'+c.reward+'</span>' : `<button onclick="completeChallenge(${c.id})" style="width:auto; padding:5px 10px; font-size:0.7rem;">완료</button>`}
        `;
        list.appendChild(item);
    });
}

async function completeChallenge(cid) {
    const res = await fetch(`${API_BASE}/challenges/${cid}/complete`, { method: 'PATCH' });
    if (res.ok) {
        alert('퀘스트 성공! 보상이 지급되었습니다. 💎');
        fetchStatus();
        fetchChallenges();
    }
}

document.getElementById('analyze-btn').onclick = async () => {
    const note = document.getElementById('mood-note').value;
    if (!note) return alert('기록을 입력해주세요!');
    
    document.getElementById('analyze-btn').textContent = 'AI 분석 중... 🤖';
    
    const res = await fetch(`${API_BASE}/ai/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: 'neutral', note: note })
    });
    const data = await res.json();
    
    document.getElementById('ai-result').style.display = 'block';
    document.getElementById('ai-advice').textContent = data.advice;
    document.getElementById('analyze-btn').textContent = 'AI 감정 분석 시작';
    
    fetchStatus();
};

document.getElementById('cheer-btn').onclick = async () => {
    const res = await fetch(`${API_BASE}/community/cheer`, { method: 'POST' });
    const data = await res.json();
    document.getElementById('cheer-count').textContent = data.total_cheers;
    fetchStatus();
    alert('무한한 응원을 보냈습니다! 👏 (보너스 지급)');
};

// 초기화
fetchStatus();
fetchChallenges();
