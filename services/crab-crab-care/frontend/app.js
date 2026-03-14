document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatWindow = document.getElementById('chat-window');
    const heartRate = document.getElementById('heart-rate');
    const steps = document.getElementById('steps');
    const sleep = document.getElementById('sleep');
    const alertList = document.getElementById('alert-list');
    const statusIndicator = document.getElementById('status-indicator');

    const API_URL = 'http://localhost:8000';

    // Fetch Health Data
    async function fetchHealth() {
        try {
            const res = await fetch(`${API_URL}/health-status/user123`);
            const data = await res.json();
            heartRate.innerText = data.heart_rate;
            steps.innerText = data.steps;
            sleep.innerText = data.sleep_hours;
            
            statusIndicator.innerText = `상태: ${data.status}`;
            statusIndicator.className = data.status === 'Normal' ? 'status-normal' : 'status-alert';
        } catch (err) {
            console.error('API Error:', err);
        }
    }

    // Fetch Alerts
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
            console.error('API Error:', err);
        }
    }

    // Chat Functionality
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
            appendMessage('system', '오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    }

    function appendMessage(type, text) {
        const div = document.createElement('div');
        div.className = `message ${type}`;
        div.innerText = text;
        chatWindow.appendChild(div);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Initial Load
    fetchHealth();
    fetchAlerts();
    setInterval(fetchHealth, 10000); // Update every 10 seconds
});
