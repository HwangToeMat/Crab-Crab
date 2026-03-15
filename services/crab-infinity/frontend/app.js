const API_URL = "/api"; // Same host in Docker

const stageNames = ["EGG (초기화)", "HATCHLING (부화)", "WARRIOR (성장)", "NEXUS KING (진화)"];

async function updateNexus() {
    try {
        // 1. Status Update
        const statusRes = await fetch(`${API_URL}/evolution/status`);
        const status = await statusRes.json();
        
        const stateCard = document.getElementById("state-card");
        stateCard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h3>${status.project.toUpperCase()}</h3>
                    <p>Stage: <strong>${stageNames[status.stage] || status.stage}</strong></p>
                </div>
                <div style="text-align: right;">
                    <div class="metric-value">${status.xp}</div>
                    <div style="font-size: 0.7rem; color: var(--secondary);">TOTAL XP</div>
                </div>
            </div>
            <div class="xp-bar-container">
                <div class="xp-bar" style="width: ${Math.min((status.xp % 300) / 3, 100)}%;"></div>
            </div>
        `;

        // 2. Services Grid
        const servicesRes = await fetch(`${API_URL}/services`);
        const servicesData = await servicesRes.json();
        const servicesList = document.getElementById("services-list");
        servicesList.innerHTML = "";
        
        servicesData.services.forEach(s => {
            const card = document.createElement("div");
            card.className = "service-card";
            card.innerHTML = `
                <div class="status-indicator"></div>
                <h4>${s.name}</h4>
                <p style="font-size: 0.7rem; color: #888;">Evolution Active</p>
            `;
            servicesList.appendChild(card);
        });

        // 3. Metrics
        const metricsContainer = document.getElementById("metrics-container");
        metricsContainer.innerHTML = `
            <div class="metric-card">
                <h4>System Level</h4>
                <div class="metric-value">${status.stage}</div>
            </div>
            <div class="metric-card">
                <h4>Active Services</h4>
                <div class="metric-value">${servicesData.services.length}</div>
            </div>
            <div class="metric-card">
                <h4>Evolution Rate</h4>
                <div class="metric-value">${Math.floor(status.xp / 10)}%</div>
            </div>
        `;

        // 4. Analysis
        const analysisContent = document.getElementById("analysis-content");
        const latestHistory = status.history.length > 0 ? status.history[status.history.length - 1].event : "Waiting for first wave...";
        analysisContent.innerHTML = `
            <p><strong>Latest Insight:</strong> ${latestHistory}</p>
            <p style="margin-top: 10px; color: var(--secondary);">AI Engine is scanning for next evolution paths...</p>
        `;

    } catch (err) {
        console.error("Nexus update failed", err);
    }
}

async function evolve() {
    const input = document.getElementById("achievement-input");
    const content = input.value.trim();
    if (!content) return;
    
    document.getElementById("ai-msg").innerText = "Analyzing nexus resonance...";
    
    try {
        const res = await fetch(`${API_URL}/evolution/log`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content })
        });
        const data = await res.json();
        
        document.getElementById("ai-msg").innerText = data.ai_feedback;
        input.value = "";
        
        updateNexus();
    } catch (err) {
        console.error("Evolution failed", err);
        document.getElementById("ai-msg").innerText = "Resonance failure.";
    }
}

document.getElementById("evolve-btn").addEventListener("click", evolve);

// Initial and Periodic Update
updateNexus();
setInterval(updateNexus, 5000);
