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

    // API 연동 설정 (로컬 환경 기준)
    const API_BASE_URL = 'http://localhost:8000/api';

    analyzeBtn.addEventListener('click', async () => {
        const text = moodInput.value.trim();
        if (!text) {
            alert('기분을 입력해주세요!');
            return;
        }

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
