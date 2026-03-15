from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
import json
from typing import List, Dict

app = FastAPI(title="Crab-Infinity Nexus API", version="2.0.0_evo")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 경로 설정: Docker 내부와 로컬 개발 환경 대응
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SERVICES_DIR = "/app/services" if os.path.exists("/app/services") else os.path.join(BASE_DIR, "../../services")
STATE_FILE = "/app/config/state/state.json" if os.path.exists("/app/config/state") else os.path.join(BASE_DIR, "../../config/state/state.json")
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "mode": "evolution"}

@app.get("/api/services")
async def get_services():
    services = []
    if not os.path.exists(SERVICES_DIR):
        return {"error": f"Services directory not found: {SERVICES_DIR}"}
    
    for service_name in os.listdir(SERVICES_DIR):
        service_path = os.path.join(SERVICES_DIR, service_name)
        if os.path.isdir(service_path):
            has_backend = os.path.exists(os.path.join(service_path, "backend"))
            has_frontend = os.path.exists(os.path.join(service_path, "frontend"))
            
            services.append({
                "name": service_name,
                "has_backend": has_backend,
                "has_frontend": has_frontend,
                "status": "active"
            })
    return {"services": services}

@app.get("/api/state")
async def get_current_state():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"error": f"State file not found at {STATE_FILE}"}

@app.get("/api/evolution/analysis")
async def get_evolution_analysis():
    return {
        "analysis": "현재 모든 시스템은 v2.0 '진화' 상태입니다. Crab-Infinity가 전체 생태계를 모니터링 중입니다.",
        "recommendations": [
            "각 서비스의 Docker 상태를 점검하여 리소스 사용량을 최적화하세요.",
            "Gemini AI를 통해 서비스 간 데이터 시너지를 분석할 준비가 되었습니다."
        ]
    }

# 정적 파일 서빙 (프론트엔드)
if os.path.exists(FRONTEND_DIR):
    app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")

@app.get("/")
async def serve_index():
    index_path = os.path.join(FRONTEND_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "Crab-Infinity Nexus Dashboard (Frontend files not found)"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
