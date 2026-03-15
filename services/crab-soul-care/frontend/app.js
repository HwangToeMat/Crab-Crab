const EMOTION_EMOJIS = {
    "Joy": "🦀✨", "Stress": "🦀💦", "Sadness": "🦀💧", "Peace": "🦀🌙",
    "Anxiety": "🦀🌀", "Loneliness": "🦀🐚", "Confidence": "🦀🔥", "Excitement": "🦀🚀"
};

document.getElementById('analyze-btn').addEventListener('click', async () => {
    const text = document.getElementById('emotion-input').value;
    if (!text) return alert("당신의 마음을 한 줄이라도 들려주세요.");

    const btn = document.getElementById('analyze-btn');
    btn.innerText = "꽃게가 분석 중입니다...";
    btn.disabled = true;

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        const data = await response.json();

        // UI 업데이트
        document.body.className = `theme-${data.emotion.toLowerCase()}`;
        document.getElementById('crab-mascot').innerText = EMOTION_EMOJIS[data.emotion] || "🦀";
        // UI 업데이트
        document.getElementById('result-section').classList.remove('hidden');
        document.getElementById('emotion-badge').innerText = data.emotion;
        document.getElementById('ai-msg').innerText = data.ai_coach_msg;
        document.getElementById('sound-name').innerText = data.recommendation.sound;
        document.getElementById('therapy-tip').innerText = data.recommendation.tip;

        // 마스코트 및 테마 업데이트
        const emoji = data.recommendation.emoji || "🦀";
        document.getElementById('ai-coach-title').innerText = `Wellness Coach ${emoji}`;

        const colors = {
            "Joy": "#FFD700", "Stress": "#FF4500", "Sadness": "#1E90FF", 
            "Peace": "#98FB98", "Anxiety": "#FFA500", "Loneliness": "#6A5ACD",
            "Confidence": "#FF6347", "Excitement": "#FF69B4"
        };
        document.documentElement.style.setProperty('--accent-color', colors[data.emotion] || "#58a6ff");

    } catch (error) {
        console.error("Error:", error);
        btn.innerText = "분석 실패 (재시도)";
        btn.disabled = false;
    }
});
