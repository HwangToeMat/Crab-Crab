const API_URL = "http://localhost:8000/api/v1";

async function fetchChallenges() {
    // For prototype, if backend not running, use mock
    try {
        const response = await fetch(`${API_URL}/challenges`);
        const data = await response.json();
        renderChallenges(data);
    } catch (e) {
        console.log("Using local mock data for challenges");
        renderChallenges([
            {id: 1, title: "물 한 잔 마시기", completed: false},
            {id: 2, title: "1분간 하늘 보기", completed: false},
            {id: 3, title: "감사한 일 1개 적기", completed: false}
        ]);
    }
}

function renderChallenges(challenges) {
    const list = document.getElementById('challenge-list');
    list.innerHTML = '';
    challenges.forEach(c => {
        const li = document.createElement('li');
        li.className = `challenge-item ${c.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${c.completed ? 'checked' : ''} onchange="toggleChallenge(${c.id})">
            <span>${c.title}</span>
        `;
        list.appendChild(li);
    });
}

function logMood(mood, score) {
    const crab = document.getElementById('mood-crab');
    const message = document.getElementById('crab-message');
    
    crab.className = `crab ${mood}`;
    
    const messages = {
        happy: "정말 멋진 하루군요! 꽃게도 기뻐요!",
        neutral: "평온한 하루네요. 무난함이 행복의 시작이죠.",
        tired: "오늘은 많이 지치셨군요. 꽃게가 토닥토닥해드릴게요.",
        sad: "슬퍼도 괜찮아요. 내일은 조금 더 나을 거예요."
    };
    
    message.innerText = messages[mood];
    
    // Update score (simple visual effect)
    document.getElementById('recovery-score').innerText = score;
}

async function toggleChallenge(id) {
    console.log(`Challenge ${id} toggled`);
    // API call simulation
    document.getElementById('recovery-score').innerText = parseInt(document.getElementById('recovery-score').innerText) + 10;
}

// Initial Load
fetchChallenges();
