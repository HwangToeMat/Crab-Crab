document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyze-btn');
    const resetBtn = document.getElementById('reset-btn');
    const moodInput = document.getElementById('mood-text');
    const moodInputSection = document.getElementById('mood-input-section');
    const resultSection = document.getElementById('result-section');
    
    const moodEmoji = document.getElementById('mood-emoji');
    const moodTitle = document.getElementById('mood-category-title');
    const crabMessage = document.getElementById('crab-message');
    const moodHistory = document.getElementById('mood-history');
    const activityList = document.getElementById('activity-list');
    const sentimentMeter = document.getElementById('sentiment-meter-fill');
    const sameMoodInfo = document.getElementById('same-mood-info');
    const cheerSection = document.getElementById('cheer-section');
    const cheerText = document.getElementById('cheer-text');
    const activeCount = document.getElementById('active-count');

    // API 연동 설정 (로컬 환경 기준)
    const API_BASE_URL = 'http://localhost:8000/api';

    // 초기 통계 데이터 가져오기
    async function fetchStats() {
        try {
            const response = await fetch(`${API_BASE_URL}/stats`);
            const data = await response.json();
            activeCount.textContent = data.active_users;
        } catch (error) {
            activeCount.textContent = '여러';
        }
    }
    fetchStats();

    analyzeBtn.addEventListener('click', async () => {
        const text = moodInput.value.trim();
        if (!text) {
            alert('기분을 입력해주세요!');
            return;
        }

        // 로딩 상태 시작
        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = '<span class="spinner"></span>분석 중...';

        try {
            // 1. 감정 분석 요청
            const response = await fetch(`${API_BASE_URL}/mood/analyze`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: 'test_user', mood_text: text })
            });
            const moodData = await response.json();

            // 2. 추천 액티비티 요청
            const recResponse = await fetch(`${API_BASE_URL}/activities/recommend?mood=${moodData.mood_category}`);
            const activities = await recResponse.json();

            // 3. 응원 메시지 요청
            const cheerRes = await fetch(`${API_BASE_URL}/cheer?mood=${moodData.mood_category}`);
            const cheers = await cheerRes.json();
            const randomCheer = cheers[Math.floor(Math.random() * cheers.length)];

            // 4. 결과 업데이트
            updateUI(moodData, activities, randomCheer);
        } catch (error) {
            console.error('Error:', error);
            alert('서버와 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인하세요.');
        } finally {
            // 로딩 상태 해제
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = '분석 및 위로받기';
        }
    });

    resetBtn.addEventListener('click', () => {
        moodInputSection.classList.remove('hidden');
        resultSection.classList.add('hidden');
        moodInput.value = '';
    });

    function updateUI(moodData, activities, cheer) {
        // 이모지 매칭
        const emojis = {
            'Happy': '😊',
            'Sad': '😢',
            'Angry': '😡',
            'Anxious': '😰',
            'Neutral': '😐'
        };

        moodEmoji.textContent = emojis[moodData.mood_category] || '🤔';
        moodTitle.textContent = `당신은 지금 [${moodData.mood_category}] 상태군요!`;
        crabMessage.textContent = moodData.message;
        
        // 센티먼트 미터 업데이트
        const percentage = ((moodData.sentiment_score + 1) / 2) * 100;
        sentimentMeter.style.width = `${percentage}%`;

        // 동일 무드 정보 업데이트
        sameMoodInfo.textContent = `현재 당신과 같은 [${moodData.mood_category}] 기분을 느끼는 메이트가 ${moodData.same_mood_count}명 더 있어요!`;

        // 응원 메시지 표시
        if (cheer) {
            cheerText.textContent = `"${cheer}"`;
            cheerSection.classList.remove('hidden');
        }

        // 히스토리 렌더링
        moodHistory.innerHTML = '';
        if (moodData.history && moodData.history.length > 0) {
            moodData.history.forEach(item => {
                const date = new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const historyDiv = document.createElement('div');
                historyDiv.className = 'history-item';
                historyDiv.innerHTML = `<span>${date}</span> <strong>${emojis[item.mood] || '❓'}</strong>`;
                moodHistory.appendChild(historyDiv);
            });
        }

        // 액티비티 목록 렌더링
        activityList.innerHTML = '';
        activities.forEach(act => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            item.innerHTML = `
                <h4>${act.title}</h4>
                <p>${act.description}</p>
            `;
            activityList.appendChild(item);
        });

        // 섹션 전환
        moodInputSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
    }
});
