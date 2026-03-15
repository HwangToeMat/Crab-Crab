const API_URL = "http://localhost:8000/api";

const stageNames = ["CORE", "HATCHLING", "WARRIOR", "KING"];
const evoThresholds = [100, 300, 600, 1000];

async function updateStatus() {
    try {
        const res = await fetch(`${API_URL}/evolution/status`);
        const data = await res.json();
        
        document.getElementById("current-xp").innerText = data.xp;
        document.getElementById("stage-name").innerText = stageNames[data.stage];
        
        const nextXp = evoThresholds[data.stage] || 1000;
        document.getElementById("next-evo-xp").innerText = nextXp;
        
        const progress = Math.min((data.xp / nextXp) * 100, 100);
        document.getElementById("xp-bar").style.width = `${progress}%`;
        
        const avatar = document.getElementById("crab-avatar");
        avatar.className = `stage-${data.stage}`;
        
        // Roadmap
        const roadmapList = document.getElementById("roadmap-list");
        roadmapList.innerHTML = "";
        data.roadmap.forEach(item => {
            const li = document.createElement("li");
            li.innerText = `> ${item}`;
            roadmapList.appendChild(li);
        });
    } catch (err) {
        console.error("Failed to fetch status", err);
    }
}

async function evolve() {
    const input = document.getElementById("achievement-input");
    const content = input.value.trim();
    if (!content) return;
    
    document.getElementById("ai-msg").innerText = "Analyzing evolution path...";
    
    try {
        const res = await fetch(`${API_URL}/evolution/log`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content })
        });
        const data = await res.json();
        
        document.getElementById("ai-msg").innerText = data.ai_feedback;
        input.value = "";
        
        if (data.evolved) {
            triggerEvolutionEffect();
        }
        
        updateStatus();
    } catch (err) {
        console.error("Evolution failed", err);
        document.getElementById("ai-msg").innerText = "Error in evolution loop.";
    }
}

function triggerEvolutionEffect() {
    const avatar = document.getElementById("crab-avatar");
    avatar.style.transform = "scale(2)";
    setTimeout(() => {
        avatar.style.transform = "scale(1)";
    }, 500);
}

document.getElementById("evolve-btn").addEventListener("click", evolve);

// Initial Load
updateStatus();
setInterval(updateStatus, 5000);
