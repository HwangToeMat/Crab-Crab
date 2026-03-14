document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyze-btn');
    const resetBtn = document.getElementById('reset-btn');
    const moodInput = document.getElementById('mood-text');
    const moodInputSection = document.getElementById('mood-input-section');
    const resultSection = document.getElementById('result-section');
    
    const moodEmoji = document.getElementById('mood-emoji');
    const moodTitle = document.getElementById('mood-category-title');
    const crabMessage = document.getElementById('crab-message');
    const activityList = document.getElementById('activity-list');
    const sentimentMeter = document.getElementById('sentiment-meter-fill');
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

            // 3. 결과 업데이트
            updateUI(moodData, activities);
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

    function updateUI(moodData, activities) {
        // 이모지 매칭
        const emojis = {
            'Happy': '😊',
            'Sad': '😢',
            'Angry': '😡',
            'Neutral': '😐'
        };

        moodEmoji.textContent = emojis[moodData.mood_category] || '🤔';
        moodTitle.textContent = `당신은 지금 [${moodData.mood_category}] 상태군요!`;
        crabMessage.textContent = moodData.message;
        
        // 센티먼트 미터 업데이트 (-1.0 ~ 1.0 범위를 0% ~ 100%로 변환)
        const percentage = ((moodData.sentiment_score + 1) / 2) * 100;
        sentimentMeter.style.width = `${percentage}%`;

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
