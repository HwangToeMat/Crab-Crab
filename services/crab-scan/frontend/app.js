const API_BASE = 'http://localhost:8000/api/v1';

async function fetchStatus() {
    try {
        const res = await fetch(`${API_BASE}/scan/status`);
        const data = await res.json();
        
        document.getElementById('saving-score').textContent = data.saving_score;
        document.getElementById('score-fill').style.width = `${data.saving_score}%`;
        document.getElementById('streak-days').textContent = data.streak;
        document.getElementById('total-spent').textContent = `💰 ${data.total_spent.toLocaleString()}`;
        
        renderQuests(data.quests);
        renderRankings(data.rankings);
    } catch (e) {
        console.error("Fetch status error", e);
    }
}

function renderRankings(rankings) {
    const list = document.getElementById('ranking-list');
    list.innerHTML = '';
    rankings.forEach((r, idx) => {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.padding = '8px 0';
        div.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        div.innerHTML = `
            <span>#${idx+1} <b>${r.name}</b></span>
            <span style="color:var(--primary); font-weight:bold;">${r.score}점</span>
        `;
        list.appendChild(div);
    });
}

async function fetchExpenses() {
    try {
        const res = await fetch(`${API_BASE}/scan/expenses`);
        const data = await res.json();
        const list = document.getElementById('expense-list');
        list.innerHTML = '';
        data.reverse().forEach(exp => {
            const li = document.createElement('li');
            li.className = 'expense-item';
            li.innerHTML = `
                <span>${exp.item_name} <small style="color:#666;">(${exp.category})</small></span>
                <span style="font-weight:bold;">${exp.price.toLocaleString()} 원</span>
            `;
            list.appendChild(li);
        });
    } catch (e) {
        console.error("Fetch expenses error", e);
    }
}

function renderQuests(quests) {
    const list = document.getElementById('quest-list');
    list.innerHTML = '';
    quests.forEach(q => {
        const div = document.createElement('div');
        div.className = `quest-item ${q.completed ? 'completed' : ''}`;
        div.innerHTML = `
            <span>${q.title} <small style="color:var(--primary);">+${q.reward}🐚</small></span>
            ${q.completed ? '✅' : `<button onclick="completeQuest(${q.id})" style="width:auto; padding:5px 10px; font-size:0.7rem;">완료</button>`}
        `;
        list.appendChild(div);
    });
}

async function completeQuest(qid) {
    await fetch(`${API_BASE}/scan/quests/${qid}/complete`, { method: 'PATCH' });
    fetchStatus();
}

document.getElementById('scan-btn').onclick = async () => {
    const name = document.getElementById('expense-name').value;
    const price = document.getElementById('expense-price').value;
    const isEssential = document.getElementById('is-essential').checked;
    
    if (!name || !price) return alert('항목과 금액을 입력해주세요!');
    
    document.getElementById('scan-btn').textContent = 'AI 크랩이 분석 중... 🦀';
    
    try {
        const res = await fetch(`${API_BASE}/scan/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item_name: name, price: parseInt(price), category: 'General', is_essential: isEssential })
        });
        const data = await res.json();
        
        const insight = document.getElementById('ai-insight');
        insight.style.display = 'block';
        document.getElementById('ai-advice-text').textContent = data.advice;
        document.getElementById('scan-btn').textContent = 'AI 크랩에게 조언 받기';
        
        // Reset inputs
        document.getElementById('expense-name').value = '';
        document.getElementById('expense-price').value = '';
        
        fetchStatus();
        fetchExpenses();
    } catch (e) {
        console.error("Analyze error", e);
        document.getElementById('scan-btn').textContent = 'AI 크랩에게 조언 받기';
    }
};

// Initial Load
fetchStatus();
fetchExpenses();
