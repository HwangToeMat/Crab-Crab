document.addEventListener('DOMContentLoaded', () => {
    fetchState();
    fetchServices();
    fetchAIInsight();
});

const API_BASE = "http://localhost:8000/api";

async function fetchState() {
    try {
        const response = await fetch(`${API_BASE}/state`);
        const data = await response.json();
        const stateCard = document.getElementById('state-card');
        
        stateCard.innerHTML = `
            <h3>Project: ${data.project}</h3>
            <p><strong>Status:</strong> ${data.status}</p>
            <p><strong>Current Phase:</strong> Phase ${data.current_phase}</p>
            <p><strong>Last Event:</strong> ${data.history[data.history.length-1].event}</p>
        `;
    } catch (error) {
        console.error('Error fetching state:', error);
    }
}

async function fetchServices() {
    try {
        const response = await fetch(`${API_BASE}/services`);
        const data = await response.json();
        const servicesList = document.getElementById('services-list');
        
        servicesList.innerHTML = data.services.map(service => `
            <div class="service-card">
                <div class="status-indicator"></div>
                <strong>${service.name}</strong>
                <p>Features: ${service.has_backend ? 'Backend ' : ''}${service.has_frontend ? 'Frontend' : ''}</p>
                <div class="tags">
                    ${service.has_backend ? '<span class="badge" style="background:#58a6ff">BE</span>' : ''}
                    ${service.has_frontend ? '<span class="badge" style="background:#3fb950">FE</span>' : ''}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching services:', error);
    }
}

async function fetchAIInsight() {
    try {
        const response = await fetch(`${API_BASE}/evolution/analysis`);
        const data = await response.json();
        const analysisContent = document.getElementById('analysis-content');
        
        analysisContent.innerHTML = `
            <p>${data.analysis}</p>
            <ul>
                ${data.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        `;
    } catch (error) {
        console.error('Error fetching AI insight:', error);
    }
}
