document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatWindow = document.getElementById('chat-window');
    const heartRate = document.getElementById('heart-rate');
    const steps = document.getElementById('steps');
    const speedDisplay = document.getElementById('speed');
    const alertList = document.getElementById('alert-list');
    const trendsContainer = document.getElementById('trends-container');
    const statusIndicator = document.getElementById('status-indicator');
    const gaitBadge = document.getElementById('gait-badge');
    
    // v3: Modal Elements
    const medModal = document.getElementById('med-modal');
    const pillConfirmBtn = document.getElementById('pill-confirm-btn');

    const API_URL = 'http://localhost:8000';

    async function fetchHealth() {
        try {
            const res = await fetch(`${API_URL}/health-status/user123`);
            const data = await res.json();
            heartRate.innerText = data.heart_rate;
            steps.innerText = data.steps;
            
            statusIndicator.innerText = `상태: ${data.status}`;
            statusIndicator.className = `status-${data.status.toLowerCase()}`;

            // v3: Gait Alert
            if (data.gait_alert) {
                gaitBadge.className = 'gait-badge';
            } else {
                gaitBadge.className = 'badge-hidden';
            }

            if (data.status === 'Critical') {
                console.warn('FALL DETECTED OR CRITICAL HEART RATE. Family and Emergency Services notified.');
            }
        } catch (err) { console.error('Health Fetch Error:', err); }
    }

    async function fetchTrends() {
        try {
            const res = await fetch(`${API_URL}/health-trends/user123`);
            const data = await res.json();
            trendsContainer.innerHTML = '';
            data.trends.forEach(day => {
                const item = document.createElement('div');
                item.className = 'trend-item';
                const stepHeight = (day.steps / 8000) * 100;
                const speedPos = (day.walking_speed / 6) * 100;
                item.innerHTML = `
                    <div class="speed-dot" style="margin-bottom: ${speedPos}px"></div>
                    <div class="trend-bar" style="height: ${Math.max(stepHeight, 10)}px"></div>
                    <div>${day.date}</div>
                `;
                trendsContainer.appendChild(item);
            });
            // Update current speed display with last day
            speedDisplay.innerText = data.trends[data.trends.length-1].walking_speed;
        } catch (err) { console.error('Trend Fetch Error:', err); }
    }

    async function fetchAlerts() {
        try {
            const res = await fetch(`${API_URL}/alerts`);
            const data = await res.json();
            alertList.innerHTML = '';
            data.alerts.forEach(alert => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>[${alert.type}]</strong> ${alert.message}`;
                if (alert.urgent) {
                    li.style.color = '#e74c3c';
                    li.style.fontWeight = 'bold';
                    // v3: Trigger Modal for urgent medication
                    if (alert.type === 'Medicine') medModal.classList.remove('hidden');
                }
                alertList.appendChild(li);
            });
        } catch (err) { console.error('Alert Fetch Error:', err); }
    }

    // v3: Medication Confirmation
    pillConfirmBtn.onclick = async () => {
        try {
            await fetch(`${API_URL}/medication/confirm`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: 'user123', pill_name: '혈압약', taken: True })
            });
            medModal.classList.add('hidden');
            appendMessage('bot', '약을 잘 챙겨드셨군요! 정말 훌륭해요 할아버지.');
            speak('약을 잘 챙겨드셨군요! 정말 훌륭해요 할아버지.');
        } catch (err) { medModal.classList.add('hidden'); }
    };

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
        } catch (err) { appendMessage('system', '오류가 발생했습니다.'); }
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

    // Initial Load
    fetchHealth(); fetchAlerts(); fetchTrends();
    setInterval(fetchHealth, 10000);
});
