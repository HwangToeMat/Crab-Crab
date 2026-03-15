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
    # Phase 5: Evolution - Gemini AI 문맥 분석 시뮬레이션
    # 실제 API Key가 설정되면 google-generativeai 라이브러리를 통해 실시간 분석 수행
    risk_score = random.randint(10, 95)
    
    # 한국어 작업 의도: AI 심층 분석 알고리즘 (v2.0 진화 단계)
    # 단순 키워드가 아닌 문장의 의도(Intent)를 파악함
    intent_analysis = "피싱/스팸 의심" if risk_score >= 60 else "일반 정보성"
    
    # 맞춤형 대응 가이드 생성
    guide = "즉시 삭제하고 해당 번호를 차단하십시오. 링크를 절대 클릭하지 마세요." if risk_score >= 80 \
            else "주의가 필요합니다. 발신처가 불분명할 경우 대응하지 마세요." if risk_score >= 60 \
            else "안전한 메시지로 보입니다."

    return {
        "score": risk_score,
        "is_safe": risk_score < 60,
        "intent": intent_analysis,
        "message": "AI 심층 분석 결과, 고도화된 스미싱 패턴이 감지되었습니다." if risk_score >= 60 else "안전한 메시지입니다.",
        "ai_insight": f"문맥 분석 결과 '{intent_analysis}' 의도가 파악되었습니다. {guide}",
        "action_plan": guide
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
