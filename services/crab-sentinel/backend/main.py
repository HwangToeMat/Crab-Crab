from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from typing import List, Dict
import os
import json
import re
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI(title="Crab-Sentinel AI Auditor", version="2.0.0_evo_sentinel")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_ROOT = os.path.dirname(os.path.dirname(BASE_DIR))
SERVICES_DIR = os.path.join(PROJECT_ROOT, "services")
STATE_FILE = os.path.join(PROJECT_ROOT, "config", "state", "state.json")

class AuditResult(BaseModel):
    service_name: str
    security_score: int
    vulnerabilities: List[str]
    status: str  # "Secure", "Warning", "Critical"

def scan_vulnerabilities(service_path: str) -> List[str]:
    vulnerabilities = []
    # 단순 패턴 매칭 기반 시뮬레이션 (실제로는 AI 모델 활용 예정)
    patterns = {
        "SECRET_KEY": r"(?i)(api[_-]?key|secret|password|token)\s*[:=]\s*['\"][\w\-]{5,}['\"]",
        "DEBUG_MODE": r"DEBUG\s*=\s*True",
        "INSECURE_PORT": r"port\s*=\s*80(?!00)"
    }
    
    for root, _, files in os.walk(service_path):
        for file in files:
            if file.endswith((".py", ".js", ".env", ".html")):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                        for name, pattern in patterns.items():
                            if re.search(pattern, content):
                                vulnerabilities.append(f"Potential {name} found in {file}")
                except:
                    pass
    return vulnerabilities

@app.get("/api/audit/all")
async def audit_all_services():
    results = []
    if not os.path.exists(SERVICES_DIR):
        return {"error": "Services directory not found"}
    
    for service_name in os.listdir(SERVICES_DIR):
        service_path = os.path.join(SERVICES_DIR, service_name)
        if os.path.isdir(service_path):
            vulnerabilities = scan_vulnerabilities(service_path)
            score = 100 - (len(vulnerabilities) * 10)
            status = "Secure" if score > 80 else ("Warning" if score > 50 else "Critical")
            results.append({
                "service_name": service_name,
                "security_score": max(score, 0),
                "vulnerabilities": vulnerabilities,
                "status": status
            })
    return {"audit_results": results}

@app.get("/api/health")
async def health():
    return {"status": "Sentinel Active", "mode": "Stealth"}

# Serve Frontend
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")
if os.path.exists(FRONTEND_DIR):
    app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")

@app.get("/")
async def serve_index():
    index_path = os.path.join(FRONTEND_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "Sentinel UI not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
