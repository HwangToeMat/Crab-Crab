from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
import random
from typing import List, Dict

app = FastAPI(title="Crab-Soul-Care API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 감정 지표 및 테라피 추천 엔진 (Gemini API 시뮬레이션)
EMOTION_MAP = {
    "Joy": {"score": 0.95, "sound": "Sunny Garden Beach", "tip": "지금의 긍정적인 에너지를 꽃게와 함께 나누어 보세요."},
    "Stress": {"score": 0.4, "sound": "Deep Sea Whale Song", "tip": "심호흡을 세 번 해보세요. 바다 깊은 곳의 평온함이 당신을 감싸줄 거예요."},
    "Sadness": {"score": 0.3, "sound": "Soft Rain on Crab-Shell", "tip": "괜찮아요. 비가 오면 조개 껍데기 아래에서 잠시 쉬어가는 것도 방법입니다."},
    "Peace": {"score": 0.9, "sound": "Moonlight Tide", "tip": "완벽한 평온함입니다. 이 순간을 꽃게처럼 단단하게 간직하세요."},
    "Anxiety": {"score": 0.35, "sound": "Gentle Reef Bubbles", "tip": "밀려오는 파도가 불안을 씻어낼 거예요. 규칙적인 호흡에 집중하세요."},
    "Loneliness": {"score": 0.45, "sound": "Starry Night Shore", "tip": "당신은 혼자가 아니에요. 밤하늘의 별들이 바다 위에서 당신을 비추고 있습니다."},
    "Confidence": {"score": 0.98, "sound": "Crab-Claw Triumph", "tip": "당신 안의 힘을 믿으세요. 단단한 껍데기처럼 어떤 파도도 이겨낼 수 있습니다."},
    "Excitement": {"score": 0.92, "sound": "Coral Reef Dance", "tip": "심장이 뛰는 이 리듬을 즐기세요. 새로운 모험이 당신을 기다리고 있습니다!"}
}

@app.get("/api/health")
async def health():
    return {"status": "healthy"}

@app.post("/api/analyze")
async def analyze_emotion(data: dict = Body(...)):
    """감정 분석 및 테라피 추천"""
    text = data.get("text", "")
    if not text:
        raise HTTPException(status_code=400, detail="Text is required.")
    
    # 텍스트 분석 시뮬레이션 (Gemini API 연동 지점)
    detected_emotion = random.choice(list(EMOTION_MAP.keys()))
    confidence = random.uniform(0.7, 0.98)
    
    return {
        "emotion": detected_emotion,
        "confidence": confidence,
        "recommendation": EMOTION_MAP[detected_emotion],
        "ai_coach_msg": f"AI 코치가 분석한 당신의 마음 상태는 '{detected_emotion}'입니다. 당신의 소중한 감정을 보호하겠습니다."
    }

# 프론트엔드 서빙
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(os.path.dirname(BASE_DIR), "frontend")

if os.path.exists(FRONTEND_DIR):
    app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")

@app.get("/")
async def serve_index():
    index_path = os.path.join(FRONTEND_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "Crab-Soul-Care Frontend files not found."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
