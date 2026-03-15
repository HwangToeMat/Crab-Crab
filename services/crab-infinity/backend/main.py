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

@app.get("/api/guardian/scan")
async def guardian_scan():
    """모든 서비스 대상 보안 및 무결성 스캔 시뮬레이션"""
    results = []
    if os.path.exists(SERVICES_DIR):
        for s in os.listdir(SERVICES_DIR):
            if os.path.isdir(os.path.join(SERVICES_DIR, s)):
                # Simulate scan logic
                score = random.randint(85, 100)
                issues = []
                if score < 90:
                    issues.append("Minor dependency vulnerability detected.")
                if not os.path.exists(os.path.join(SERVICES_DIR, s, "Dockerfile")):
                    issues.append("Dockerfile missing (Infrastructure risk).")
                
                results.append({
                    "name": s,
                    "score": score,
                    "status": "Safe" if score >= 90 else "Caution",
                    "issues": issues
                })
    return {"scan_results": results, "total_score": sum(r["score"] for r in results) / len(results) if results else 0}

@app.get("/api/evolution/analysis")
async def get_evolution_analysis():
    """Gemini AI 기반 통합 생태계 분석 (고도화된 시뮬레이션)"""
    state = load_evo_state()
    services_count = len(os.listdir(SERVICES_DIR)) if os.path.exists(SERVICES_DIR) else 0
    
    if state.stage < 3:
        analysis = f"현재 생태계는 {services_count}개의 행성(서비스)으로 구성되어 있습니다. 넥서스 엔진이 동기화 중이며, 현재 단계는 '{stageNames[state.stage]}'입니다."
        recommendations = [
            "가디언 스캔을 통해 시스템의 보안 무결성을 95% 이상으로 유지하십시오.",
            "서비스 간의 데이터 연결 고리를 강화하여 진화 에너지를 확보하십시오."
        ]
    else:
        analysis = "승천 완료! Crab-Infinity가 꽃게팀 생태계의 완전한 조율자(Nexus King)로 등극했습니다. 모든 서비스가 초지능형 AI망으로 통합되었습니다."
        recommendations = [
            "글로벌 앰배서더 시스템을 가동하여 생태계를 외부로 확장하십시오.",
            "무한 진화 루프가 안정화되었습니다. 이제 자율 운영 모드로 전환 가능합니다."
        ]
    
    return {
        "analysis": analysis,
        "recommendations": recommendations,
        "system_status": "OPTIMIZED" if state.stage >= 2 else "EVOLVING"
    }

@app.post("/api/nexus/delegate")
async def delegate_task(task: dict = Body(...)):
    """Cooperative Agent Protocol (CAP) - 서비스 간 자율 과업 하달"""
    target_service = task.get("target")
    instruction = task.get("instruction")
    
    # 서비스 존재 여부 확인
    service_path = os.path.join(SERVICES_DIR, target_service) if target_service else None
    if not service_path or not os.path.exists(service_path):
        raise HTTPException(status_code=404, detail=f"Service '{target_service}' not found.")
    
    # AI Reasoning for Delegation (Simulation)
    delegation_id = f"CAP-{random.randint(1000, 9999)}"
    ai_analysis = f"Nexus AI가 '{target_service}'에 대한 '{instruction}' 과업의 최적 경로를 계산했습니다. 리소스 15% 할당 및 우선순위 'High'로 설정."
    
    # Log delegation event
    state = load_evo_state()
    state.history.append({
        "event": f"Delegated: {instruction} -> {target_service}",
        "id": delegation_id,
        "timestamp": "2026-03-15T13:00:00Z"
    })
    state.xp += 50 # High-value evolution action
    save_evo_state(state)
    
    return {
        "delegation_id": delegation_id,
        "status": "In Progress",
        "ai_analysis": ai_analysis,
        "target_service_state": "Synchronized"
    }

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
