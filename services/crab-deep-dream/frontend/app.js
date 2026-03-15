const API_URL = "http://localhost:8002/api";

async function logSleep() {
    const duration = document.getElementById("sleep-duration").value;
    const quality = document.getElementById("sleep-quality").value;
    const note = document.getElementById("sleep-note").value;

    if (!duration) {
        alert("수면 시간을 입력해주세요.");
        return;
    }

    const payload = {
        duration: parseFloat(duration),
        quality: parseInt(quality),
        note: note
    };

    try {
        const res = await fetch(`${API_URL}/sleep/log`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await res.json();

        // Update Coach Card
        document.getElementById("ai-coach-card").classList.remove("hidden");
        document.getElementById("analysis-text").innerText = `AI 분석: ${data.ai_analysis}`;
        document.getElementById("sound-tip").innerText = `🎧 추천 사운드: ${data.sound_tip}`;

        updateHistory();
    } catch (err) {
        console.error("Logging failed", err);
    }
}

async function updateHistory() {
    try {
        const res = await fetch(`${API_URL}/sleep/history`);
        const data = await res.json();
        const list = document.getElementById("history-list");
        list.innerHTML = "";

        data.history.reverse().forEach(item => {
            const li = document.createElement("li");
            li.className = "history-item";
            li.innerHTML = `
                <div>
                    <strong>${item.duration}시간</strong> (${item.quality}/10)
                    <p style="font-size: 0.7rem; color: #ccc;">${item.note || "기록 없음"}</p>
                </div>
                <span>${item.recommendation.split(' ')[0]} 추천됨</span>
            `;
            list.appendChild(li);
        });
    } catch (err) {
        console.error("History fetch failed", err);
    }
}

document.getElementById("log-btn").addEventListener("click", logSleep);

// Initial load
updateHistory();
