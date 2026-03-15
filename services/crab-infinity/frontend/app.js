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
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <div class="status-indicator"></div>
                    <h4 style="margin: 0;">${s.name}</h4>
                </div>
                <p style="font-size: 0.75rem; color: #ccc; margin-bottom: 10px; min-height: 2.5em;">${s.description}</p>
                <div style="display: flex; gap: 5px;">
                    ${s.has_backend ? '<span class="badge" style="background:#0366d6; font-size: 0.6rem; padding: 2px 5px;">BE</span>' : ''}
                    ${s.has_frontend ? '<span class="badge" style="background:#28a745; font-size: 0.6rem; padding: 2px 5px;">FE</span>' : ''}
                </div>
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

async function runScan() {
    const resultsContainer = document.getElementById("scan-results");
    resultsContainer.innerHTML = "<p>Scanning all services for vulnerabilities and infrastructure risks...</p>";
    
    try {
        const res = await fetch(`${API_URL}/guardian/scan`);
        const data = await res.json();
        
        let html = `<h3>Overall Ecosystem Health: ${data.total_score.toFixed(1)}/100</h3><div class="grid" style="grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;">`;
        
        data.scan_results.forEach(r => {
            html += `
                <div style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 4px; border-left: 3px solid ${r.status === 'Safe' ? '#238636' : '#d29922'}">
                    <strong>${r.name}</strong> - ${r.status} (${r.score}%)
                    <ul style="font-size: 0.65rem; color: #aaa; padding-left: 15px; margin-top: 5px;">
                        ${r.issues.length > 0 ? r.issues.map(i => `<li>${i}</li>`).join('') : '<li>No issues found</li>'}
                    </ul>
                </div>
            `;
        });
        html += "</div>";
        resultsContainer.innerHTML = html;
        
        // Also log this as an evolution event
        fetch(`${API_URL}/evolution/log`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: `Full ecosystem scan completed. Health Score: ${data.total_score.toFixed(1)}` })
        });

    } catch (err) {
        console.error("Scan failed", err);
        resultsContainer.innerHTML = "<p>Guardian system error during scan.</p>";
    }
}

document.getElementById("scan-btn").addEventListener("click", runScan);
document.getElementById("evolve-btn").addEventListener("click", evolve);

// Initial and Periodic Update
updateNexus();
setInterval(updateNexus, 5000);
