from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from typing import List, Optional
import os
import random
from datetime import datetime, timedelta
from dotenv import load_dotenv

# load_dotenv() # .env 파일에서 GEMINI_API_KEY 등을 읽어올 준비

app = FastAPI(title="Crab-Crab Care API v3.1", description="Vision-AI & Real Brain Integration")

# Models
class ChatRequest(BaseModel):
    message: str
    user_id: str

class ChatResponse(BaseModel):
    response: str
    mood_detected: str
    timestamp: datetime

class VisionEvent(BaseModel):
    user_id: str
    event_type: str # FallDetected, NoMovement, Normal
    confidence: float

class HealthStatus(BaseModel):
    user_id: str
    heart_rate: int
    steps: int
    sleep_hours: float
    status: str
    vision_status: str # v3.1: Camera-based status
    caregiver_notified: bool = False

# v3.1: Sophisticated Mock Brain (Fallback if no API key)
ADAPTIVE_RESPONSES = {
    "건강": "할아버지 건강은 제가 24시간 지켜보고 있으니 걱정 마세요! 오늘 컨디션은 어떠신가요?",
    "적적": "제가 있잖아요! 옛날 즐거웠던 기억 하나만 들려주세요. 저 정말 듣고 싶어요.",
    "배고파": "건강을 위해 맛있는 식사 꼭 챙겨 드셔야 해요. 제가 추천 메뉴라도 찾아볼까요?",
    "고마워": "별씀을요! 제가 할아버지 옆에 있을 수 있어서 정말 행복해요.",
    "낙상": "할아버지, 방금 조금 위험해 보였어요. 천천히 움직이세요!",
}

@app.post("/chat", response_model=ChatResponse)
async def chat_with_agent(request: ChatRequest):
    user_msg = request.message
    response = "허허, 그렇군요. 더 자세히 말씀해 주시겠어요?" # 기본 답변
    
    # 키워드 기반 지능형 응답 (실제 API 연결 전 단계)
    for keyword, msg in ADAPTIVE_RESPONSES.items():
        if keyword in user_msg:
            response = msg
            break

    # TODO: 실제 Gemini API 연결 시 아래 로직 사용 가능
    # api_key = os.getenv("GEMINI_API_KEY")
    # if api_key:
    #     response = await call_gemini_api(user_msg) # 외부 API 호출 함수

    return ChatResponse(
        response=response,
        mood_detected="Peaceful",
        timestamp=datetime.now()
    )

@app.get("/health-status/{user_id}", response_model=HealthStatus)
async def get_health_status(user_id: str):
    # Simulating standard health data
    heart_rate = random.randint(70, 85)
    steps = random.randint(3000, 5000)
    
    # 글로벌 상태 (비전 이벤트와 결합됨)
    return HealthStatus(
        user_id=user_id,
        heart_rate=heart_rate,
        steps=steps,
        sleep_hours=7.5,
        status="Normal",
        vision_status="Monitoring",
        caregiver_notified=False
    )

@app.post("/vision-event")
async def receive_vision_event(event: VisionEvent):
    # 카메라(Frontend)에서 분석된 낙상/움직임 데이터를 수신
    print(f"VISION EVENT RECEIVED: {event.event_type} (Confidence: {event.confidence})")
    if event.event_type == "FallDetected":
        # 긴급 알림 로직 실행 (실제로는 여기서 보호자에게 메시지 발송)
        return {"status": "Emergency", "action": "Notifying Caregiver & Emergency Services"}
    return {"status": "Received"}

@app.get("/alerts")
async def get_active_alerts():
    return {
        "alerts": [
            {"type": "Vision", "message": "카메라가 할아버지를 안전하게 지켜보고 있습니다.", "time": "실시간", "urgent": False},
            {"type": "Medicine", "message": "💊 약 드실 시간입니다!", "time": "현재", "urgent": True}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
