from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from typing import List, Optional, Dict
import json
import os
import random
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI(title="Crab-Infinity Nexus API", version="2.0.0_evo")

# Enable CORS for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base Path Logic
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATE_PATH = "/app/config/state/state.json" if os.path.exists("/app/config/state") else os.path.join(BASE_DIR, "../../config/state/state.json")
SERVICES_DIR = "/app/services" if os.path.exists("/app/services") else os.path.join(BASE_DIR, "../../services")
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

class EvolutionState(BaseModel):
    project: str = "crab-infinity"
    stage: int = 0
    xp: int = 0
    history: List[dict] = []
    roadmap: List[str] = ["Initialize Nexus Hub", "Scan existing services", "AI-driven evolution loop"]

def load_evo_state() -> EvolutionState:
    if os.path.exists(STATE_PATH):
        try:
            with open(STATE_PATH, "r", encoding="utf-8") as f:
                data = json.load(f)
                # Handle both old/new state formats
                return EvolutionState(**data) if "project" in data else EvolutionState()
        except:
            return EvolutionState()
    return EvolutionState()

def save_evo_state(state: EvolutionState):
    os.makedirs(os.path.dirname(STATE_PATH), exist_ok=True)
    with open(STATE_PATH, "w", encoding="utf-8") as f:
        json.dump(state.dict(), f, indent=4)

@app.get("/api/evolution/status")
async def get_status():
    state = load_evo_state()
    return state

@app.post("/api/evolution/log")
async def post_log(log: dict = Body(...)):
    state = load_evo_state()
    content = log.get("content", "")
    
    xp_gain = random.randint(15, 35)
    state.xp += xp_gain
    
    # Stages: 0: Egg, 1: Hatchling, 2: Warrior, 3: Nexus King
    old_stage = state.stage
    if state.xp >= 100 and state.stage == 0: state.stage = 1
    if state.xp >= 300 and state.stage == 1: state.stage = 2
    if state.xp >= 600 and state.stage == 2: state.stage = 3
    
    evolved = state.stage > old_stage
    # AI Feedback Simulation (Simulating complex reasoning)
    ai_insights = [
        f"분석 결과, '{content}'은(는) 귀하의 시스템 아키텍처 이해도를 15% 향상시켰습니다. 다음 단계로는 디자인 패턴 적용을 추천합니다.",
        f"무한 진화의 파동이 감지되었습니다. '{content}' 수행을 통해 핵심 모듈의 안정성이 확보되었습니다. +{xp_gain} XP.",
        f"Gemini Nexus가 귀하의 진화 경로를 재계산했습니다. '{content}'은(는) 지능형 에이전트 구축의 토대가 됩니다."
    ]
    ai_msg = random.choice(ai_insights)
    if evolved:
        ai_msg = f"CRITICAL EVOLUTION! You reached Stage {state.stage}! " + ai_msg
    
    state.history.append({"event": content, "xp": xp_gain, "timestamp": "2026-03-15T12:00:00Z"})
    save_evo_state(state)
    return {"status": "success", "ai_feedback": ai_msg, "evolved": evolved, "current_xp": state.xp}

@app.get("/api/services")
async def get_services():
    services = []
    if os.path.exists(SERVICES_DIR):
        for s in os.listdir(SERVICES_DIR):
            service_path = os.path.join(SERVICES_DIR, s)
            if os.path.isdir(service_path):
                desc = "No description available."
                # Try to find description in docs/prd.md or README.md
                for doc_file in [os.path.join(service_path, "docs/prd.md"), os.path.join(service_path, "README.md")]:
                    if os.path.exists(doc_file):
                        try:
                            with open(doc_file, "r", encoding="utf-8") as f:
                                content = f.read()
                                # Simple heuristic for "한줄 설명" or first heading
                                lines = content.split('\n')
                                for line in lines:
                                    if "한줄 설명:" in line:
                                        desc = line.split("한줄 설명:")[1].strip()
                                        break
                                    elif line.startswith("- Purpose:") or line.startswith("- 목적:"):
                                        desc = line.split(":")[1].strip()
                                        break
                                if desc == "No description available." and len(lines) > 2:
                                    desc = lines[2].strip()[:60] + "..."
                        except: pass
                        break
                
                services.append({
                    "name": s, 
                    "status": "active",
                    "description": desc,
                    "has_backend": os.path.exists(os.path.join(service_path, "backend")),
                    "has_frontend": os.path.exists(os.path.join(service_path, "frontend"))
                })
    return {"services": services}

# Serve Static Files
if os.path.exists(FRONTEND_DIR):
    app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")

@app.get("/")
async def serve_index():
    index_path = os.path.join(FRONTEND_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "Nexus Frontend not found at " + FRONTEND_DIR}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
