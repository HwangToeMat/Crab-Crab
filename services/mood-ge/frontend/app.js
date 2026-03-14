const API_URL = "http://localhost:8000/api/v1";

async function fetchChallenges(mood = "neutral") {
    try {
        const response = await fetch(`${API_URL}/challenges?mood=${mood}`);
        const data = await response.json();
        renderChallenges(data);
    } catch (e) {
        console.log("Using local mock data for challenges");
        // Simple client-side recommendation mock
        let mockData = [
            {id: 1, title: "물 한 잔 마시기", completed: false},
            {id: 2, title: "1분간 하늘 보기", completed: false},
            {id: 3, title: "감사한 일 1개 적기", completed: false}
        ];
        if (mood === "tired") mockData[0].title = "가벼운 스트레칭 5분 (AI 추천)";
        renderChallenges(mockData);
    }
}

async function sendCheer() {
    const totalEl = document.getElementById('cheer-total');
    let count = parseInt(totalEl.innerText);
    totalEl.innerText = count + 1;
    alert("❤️ 다른 사용자에게 응원을 보냈습니다!");
}

function logMood(mood, score) {
    const crab = document.getElementById('mood-crab');
    const message = document.getElementById('crab-message');
    const memo = document.getElementById('mood-memo').value;
    
    crab.className = `crab ${mood} animated`;
    
    // Refresh challenges based on mood (Evolution Cycle 1)
    fetchChallenges(mood);
    
    const messages = {
        happy: "정말 멋진 하루군요! 꽃게도 기뻐요!",
        neutral: "평온한 하루네요. 무난함이 행복의 시작이죠.",
        tired: "오늘은 많이 지치셨군요. 맞춤형 챌린지를 준비했어요!",
        sad: "슬퍼도 괜찮아요. 마음을 돌보는 챌린지를 해볼까요?"
    };
    
    message.innerText = messages[mood];
    
    document.getElementById('recovery-score').innerText = score;
    addHistory(mood, memo);
    document.getElementById('mood-memo').value = '';
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

let crabPoints = 0;
let crabLevel = 1;

async function toggleChallenge(id) {
    const scoreEl = document.getElementById('recovery-score');
    let currentScore = parseInt(scoreEl.innerText);
    scoreEl.innerText = currentScore + 10;
    
    // Evolution: Point & Level System
    crabPoints += 20;
    if (crabPoints >= 100) {
        crabLevel++;
        crabPoints = 0;
        alert(`🎊 축하합니다! 꽃게가 레벨 ${crabLevel}로 진화했습니다!`);
        updateLevelUI();
    }
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(c => c.checked);
    if (allChecked) {
        alert("🎉 오늘 모든 퀘스트 완료! 꽃게가 아주 건강해졌어요.");
    }
}

function updateLevelUI() {
    const titleEl = document.querySelector('header h1');
    if (!document.querySelector('.level-badge')) {
        const badge = document.createElement('span');
        badge.className = 'level-badge';
        badge.innerText = `Lv.${crabLevel}`;
        titleEl.appendChild(badge);
    } else {
        document.querySelector('.level-badge').innerText = `Lv.${crabLevel}`;
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
