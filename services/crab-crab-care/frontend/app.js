document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatWindow = document.getElementById('chat-window');
    const heartRate = document.getElementById('heart-rate');
    const steps = document.getElementById('steps');
    const sleep = document.getElementById('sleep');
    const alertList = document.getElementById('alert-list');
    const trendsContainer = document.getElementById('trends-container');
    const statusIndicator = document.getElementById('status-indicator');

    const API_URL = 'http://localhost:8000';

    // Fetch Health Data & Alerts
    async function fetchHealth() {
        try {
            const res = await fetch(`${API_URL}/health-status/user123`);
            const data = await res.json();
            heartRate.innerText = data.heart_rate;
            steps.innerText = data.steps;
            sleep.innerText = data.sleep_hours;
            
            statusIndicator.innerText = `상태: ${data.status}`;
            statusIndicator.className = `status-${data.status.toLowerCase()}`;

            if (data.status === 'Critical') {
                console.warn('CRITICAL ALERT: Family has been notified.');
            }
        } catch (err) {
            console.error('API Error:', err);
        }
    }

    // Fetch Weekly Trends
    async function fetchTrends() {
        try {
            const res = await fetch(`${API_URL}/health-trends/user123`);
            const data = await res.json();
            trendsContainer.innerHTML = '';
            data.trends.forEach(day => {
                const item = document.createElement('div');
                item.className = 'trend-item';
                const height = (day.steps / 10000) * 100; // Normalize for visualization
                item.innerHTML = `
                    <div class="trend-bar" style="height: ${Math.max(height, 10)}px"></div>
                    <div>${day.date}</div>
                    <div style="font-size: 0.7rem; color: #888;">${day.steps}</div>
                `;
                trendsContainer.appendChild(item);
            });
        } catch (err) {
            console.error('Trend Error:', err);
        }
    }

    async function fetchAlerts() {
        try {
            const res = await fetch(`${API_URL}/alerts`);
            const data = await res.json();
            alertList.innerHTML = '';
            data.alerts.forEach(alert => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>[${alert.type}]</strong> ${alert.message} (${alert.time})`;
                alertList.appendChild(li);
            });
        } catch (err) {
            console.error('Alert Error:', err);
        }
    }

    // Chat with TTS
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
        } catch (err) {
            appendMessage('system', '오류가 발생했습니다.');
        }
    }

    function appendMessage(type, text) {
        const div = document.createElement('div');
        div.className = `message ${type}`;
        div.innerText = text;

        if (type === 'bot') {
            const voiceBtn = document.createElement('button');
            voiceBtn.className = 'voice-btn';
            voiceBtn.innerText = '🔊';
            voiceBtn.onclick = () => speak(text);
            div.appendChild(voiceBtn);
        }

        chatWindow.appendChild(div);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function speak(text) {
        if (!window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        window.speechSynthesis.speak(utterance);
    }

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

    // Initial Load
    fetchHealth();
    fetchAlerts();
    fetchTrends();
    setInterval(fetchHealth, 10000);
});
