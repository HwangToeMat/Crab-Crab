from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import random

app = FastAPI(title="Crab-Shield AI Engine")

class AnalysisRequest(BaseModel):
    text: str
    sender: str = "Unknown"

@app.get("/")
async def root():
    return {"status": "Crab-Shield Active", "version": "v2.0-evo"}

@app.post("/analyze")
async def analyze_message(request: AnalysisRequest):
    # 실제 운영 시 Phase 5에서 Gemini API로 고도화 예정
    # 현재는 기본 규칙 기반 시뮬레이션
    risk_score = random.randint(10, 95)
    
    # 한국어 작업 의도: 스미싱 키워드 매칭 로직 (v1.0 기초 단계)
    danger_keywords = ["대출", "지원금", "당첨", "결제완료", "확인바람"]
    if any(kw in request.text for kw in danger_keywords):
        risk_score = random.randint(70, 99)
        
    return {
        "score": risk_score,
        "is_safe": risk_score < 60,
        "message": "AI 분석 결과 스미싱 위험이 감지되었습니다." if risk_score >= 60 else "안전한 메시지로 판단됩니다.",
        "ai_insight": "메시지에 포함된 키워드와 발신자 패턴을 분석한 결과입니다."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
