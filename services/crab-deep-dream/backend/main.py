from fastapi import FastAPI, Body
from pydantic import BaseModel
from typing import List, Dict, Optional
import os
import json
import random
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI(title="Crab-Deep-Dream AI Coach", version="2.0.0_evo")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

class SleepLog(BaseModel):
    user: str = "Dreamer"
    duration: float  # hours
    quality: int     # 1-10
    note: str

# In-memory storage for MVP
sleep_logs = []

@app.post("/api/sleep/log")
async def log_sleep(log: SleepLog):
    # AI Feedback Logic Simulation
    analysis = "수면 시간은 적절하지만 수면의 질이 낮습니다. 자기 전 30분 동안 블루라이트를 차단해보세요."
    if log.duration < 6:
        analysis = "심각한 수면 부족입니다. 낮잠 20분을 추천하며, 카페인 섭취를 줄이십시오."
    elif log.quality > 8:
        analysis = "훌륭한 수면입니다! 현재 루틴을 유지하면 '킹크랩 급 수면' 단계에 도달할 수 있습니다."
    
    # Sound Recommendation
    sounds = ["심해의 파도 소리", "빗소리와 숲의 노래", "부드러운 피아노 선율", "화이트 노이즈"]
    recommended_sound = random.choice(sounds)
    
    log_data = log.dict()
    log_data["analysis"] = analysis
    log_data["recommendation"] = recommended_sound
    sleep_logs.append(log_data)
    
    return {"status": "success", "ai_analysis": analysis, "sound_tip": recommended_sound}

@app.get("/api/sleep/history")
async def get_history():
    return {"history": sleep_logs[-10:]}

@app.get("/api/health")
async def health():
    return {"status": "Deep Dream Engine Active"}

# Serve Frontend
if os.path.exists(FRONTEND_DIR):
    app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")

@app.get("/")
async def serve_index():
    index_path = os.path.join(FRONTEND_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "Dream UI not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
