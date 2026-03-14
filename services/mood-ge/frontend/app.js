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
    const memo = document.getElementById('mood-memo').value;
    
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
    
    // Add to History
    addHistory(mood, memo);
    document.getElementById('mood-memo').value = ''; // Clear memo
}

function addHistory(mood, memo) {
    const list = document.getElementById('history-list');
    const li = document.createElement('li');
    li.className = 'history-item';
    const emojis = {happy: '😊', neutral: '😐', tired: '😫', sad: '😢'};
    li.innerHTML = `
        <span class="history-mood">${emojis[mood]}</span>
        <div class="history-content">
            <span class="history-date">${new Date().toLocaleTimeString()}</span>
            <p class="history-memo">${memo || '내용 없음'}</p>
        </div>
    `;
    list.prepend(li);
}

async function toggleChallenge(id) {
    console.log(`Challenge ${id} toggled`);
    const scoreEl = document.getElementById('recovery-score');
    let currentScore = parseInt(scoreEl.innerText);
    scoreEl.innerText = currentScore + 10;
    
    // Check if all done
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(c => c.checked);
    if (allChecked) {
        alert("🎉 모든 꽃게 퀘스트를 완료했습니다! 번아웃 회복 속도가 빨라지고 있어요.");
    }
}

function shareProgress() {
    const score = document.getElementById('recovery-score').innerText;
    const text = `오늘 나의 무드게 번아웃 회복 지수는 ${score}%! 🦀✨ #무드게 #MoodGe #번아웃탈출`;
    
    if (navigator.share) {
        navigator.share({
            title: '무드게 기록 공유',
            text: text,
            url: window.location.href,
        }).catch(console.error);
    } else {
        alert("클립보드에 복사되었습니다: " + text);
    }
}

// Initial Load
fetchChallenges();
