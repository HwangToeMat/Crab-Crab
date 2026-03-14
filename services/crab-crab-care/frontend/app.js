document.addEventListener('DOMContentLoaded', () => {
    const webcam = document.getElementById('webcam');
    const cameraBtn = document.getElementById('camera-btn');
    const visionLabel = document.getElementById('vision-label');
    const visionStatus = document.getElementById('vision-status');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatWindow = document.getElementById('chat-window');
    
    const API_URL = 'http://localhost:8000';

    // v3.1: Camera Access Logic
    cameraBtn.onclick = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            webcam.srcObject = stream;
            cameraBtn.innerText = "지킴이 작동 중";
            cameraBtn.style.background = "#2ecc71";
            visionStatus.innerText = "🛡️ 실시간 AI 보호 중";
            startVisionAnalysis();
        } catch (err) {
            alert("카메라 권한이 필요합니다.");
        }
    };

    // v3.1: Simulated Vision Analysis
    function startVisionAnalysis() {
        setInterval(async () => {
            const events = ["Normal", "Normal", "Normal", "Normal", "NoMovement"];
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            
            visionLabel.innerText = `분석 결과: ${randomEvent === 'Normal' ? '안전' : '활동 감지 안됨'}`;
            
            // Send event to backend
            try {
                await fetch(`${API_URL}/vision-event`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_id: 'user123', event_type: randomEvent, confidence: 0.95 })
                });
            } catch (e) {}
        }, 5000);
    }

    // Adaptive Chat Logic
    async function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;
        appendMessage('user', text);
        userInput.value = '';

        try {
            const res = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, user_id: 'user123' })
            });
            const data = await res.json();
            appendMessage('bot', data.response);
            speak(data.response);
        } catch (err) {
            appendMessage('system', '서버 연결에 문제가 있습니다.');
        }
    }

    function appendMessage(type, text) {
        const div = document.createElement('div');
        div.className = `message ${type}`;
        div.innerText = text;
        chatWindow.appendChild(div);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function speak(text) {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        window.speechSynthesis.speak(utterance);
    }

    sendBtn.onclick = sendMessage;
    userInput.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };

    // Standard Health Update
    async function fetchHealth() {
        try {
            const res = await fetch(`${API_URL}/health-status/user123`);
            const data = await res.json();
            document.getElementById('heart-rate').innerText = data.heart_rate;
            document.getElementById('steps').innerText = data.steps;
        } catch (e) {}
    }

    fetchHealth();
    setInterval(fetchHealth, 10000);
});
