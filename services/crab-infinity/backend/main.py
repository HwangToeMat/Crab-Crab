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
    services_data = await get_services()
    services = services_data.get("services", [])
    
    total_services = len(services)
    backend_count = sum(1 for s in services if s["has_backend"])
    frontend_count = sum(1 for s in services if s["has_frontend"])
    
    analysis_text = f"현재 {total_services}개의 서비스가 감지되었습니다. (백엔드: {backend_count}, 프론트엔드: {frontend_count}). "
    
    recommendations = []
    if backend_count < total_services:
        recommendations.append("일부 서비스에 백엔드 구성이 누락되어 있습니다. API 연동을 검토하십시오.")
    if frontend_count < total_services:
        recommendations.append("프론트엔드가 없는 서비스의 사용자 인터페이스 제공 여부를 확인하십시오.")
    
    if total_services > 5:
        analysis_text += "생태계 규모가 확장됨에 따라 서비스 간의 데이터 정규화와 통합 모니터링이 필수적입니다."
        recommendations.append("중앙 집중식 로깅 시스템(ELK 또는 Prometheus) 도입을 고려하십시오.")
    else:
        analysis_text += "초기 생태계 구축 단계입니다. 각 서비스의 독립성을 유지하며 확장성을 고려하십시오."
        recommendations.append("기본 인프라 보안(TLS/SSL) 및 API 인증 체계를 강화하십시오.")

    return {
        "analysis": analysis_text,
        "recommendations": recommendations,
        "metrics": {
            "total_services": total_services,
            "backend_ratio": backend_count / total_services if total_services > 0 else 0,
            "frontend_ratio": frontend_count / total_services if total_services > 0 else 0
        }
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
