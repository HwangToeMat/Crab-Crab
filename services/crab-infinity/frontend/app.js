const API_URL = "/api"; // Same host in Docker

const stageNames = ["EGG (초기화)", "HATCHLING (부화)", "WARRIOR (성장)", "NEXUS KING (진화)"];

async function updateNexus() {
    try {
        // ... Existing logic ...
        const statusRes = await fetch(`${API_URL}/evolution/status`);
        const status = await statusRes.json();
        
        // ... Existing state card logic ...
        
        // 2. Services Grid & Populating Select
        const servicesRes = await fetch(`${API_URL}/services`);
        const servicesData = await servicesRes.json();
        const servicesList = document.getElementById("services-list");
        const targetSelect = document.getElementById("target-service");
        
        // Populate select only if it's empty
        if (targetSelect && targetSelect.options.length <= 1) {
            servicesData.services.forEach(s => {
                const opt = document.createElement("option");
                opt.value = s.name;
                opt.innerText = s.name;
                targetSelect.appendChild(opt);
            });
        }

        servicesList.innerHTML = "";
        // ... Existing grid logic ...
        
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
        const analysisRes = await fetch(`${API_URL}/evolution/analysis`);
        const analysisData = await analysisRes.json();
        const analysisContent = document.getElementById("analysis-content");
        
        analysisContent.innerHTML = `
            <div style="border-left: 4px solid ${analysisData.system_status === 'OPTIMIZED' ? '#3fb950' : '#58a6ff'}; padding-left: 15px;">
                <p><strong>System Status:</strong> <span style="color: ${analysisData.system_status === 'OPTIMIZED' ? '#3fb950' : '#58a6ff'};">${analysisData.system_status}</span></p>
                <p style="margin-top: 10px;">${analysisData.analysis}</p>
                <h5 style="margin-top: 15px; margin-bottom: 5px;">Recommendations:</h5>
                <ul style="font-size: 0.8rem; color: #aaa;">
                    ${analysisData.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
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
                    <p style="font-size: 0.65rem; color: #58a6ff; margin: 4px 0;">Shield Intel: ${r.shield_intel}</p>
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

async function delegateTask() {
    const target = document.getElementById("target-service").value;
    const instruction = document.getElementById("delegation-input").value.trim();
    const resultDiv = document.getElementById("delegation-result");
    
    if (!target || !instruction) {
        resultDiv.innerText = "Target planet and command are required for Nexus delegation.";
        return;
    }
    
    resultDiv.innerText = "Transmitting Nexus command through CAP...";
    
    try {
        const res = await fetch(`${API_URL}/nexus/delegate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ target, instruction })
        });
        const data = await res.json();
        
        resultDiv.innerHTML = `
            <p style="color: var(--accent-color);">[${data.delegation_id}] Status: ${data.status}</p>
            <p>${data.ai_analysis}</p>
        `;

        const historyContainer = document.getElementById("delegation-history");
        if (historyContainer.querySelector("p") && historyContainer.querySelector("p").innerText === "No recent commands.") {
            historyContainer.innerHTML = "";
        }
        
        const historyItem = document.createElement("div");
        historyItem.style.padding = "5px 0";
        historyItem.style.borderBottom = "1px solid rgba(255,255,255,0.05)";
        historyItem.innerHTML = `
            <span style="color: #888;">[${new Date().toLocaleTimeString()}]</span> 
            <strong style="color: var(--accent-color);">${target}:</strong> 
            <span style="color: #ccc;">${instruction}</span>
        `;
        historyContainer.prepend(historyItem);

        document.getElementById("delegation-input").value = "";
        updateNexus();
    } catch (err) {
        console.error("Delegation failed", err);
        resultDiv.innerText = "Transmission failed. Galactic interference detected.";
    }
}

document.getElementById("delegate-btn").addEventListener("click", delegateTask);
document.getElementById("scan-btn").addEventListener("click", runScan);
document.getElementById("evolve-btn").addEventListener("click", evolve);

// Initial and Periodic Update
updateNexus();
setInterval(updateNexus, 5000);
