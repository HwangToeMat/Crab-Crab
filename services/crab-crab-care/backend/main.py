from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import random

app = FastAPI(title="Crab-Crab Care API v3", description="Predictive & Empathetic AI Agent for Silver Care")

# Models
class ChatRequest(BaseModel):
    message: str
    user_id: str

class ChatResponse(BaseModel):
    response: str
    mood_detected: str
    timestamp: datetime

class HealthStatus(BaseModel):
    user_id: str
    heart_rate: int
    steps: int
    sleep_hours: float
    status: str # Normal, Alert, Critical
    caregiver_notified: bool = False
    gait_alert: bool = False # v3: Predictive fall prevention

class DailyStat(BaseModel):
    date: str
    steps: int
    avg_heart_rate: int
    walking_speed: float # v3: km/h

class HealthTrend(BaseModel):
    user_id: str
    trends: List[DailyStat]

class MedicationUpdate(BaseModel):
    user_id: str
    pill_name: str
    taken: bool

# Mock Data
MOCK_RESPONSES = [
    "할아버지, 오늘 날씨가 참 좋네요! 같이 산책 나가는 건 어떠세요?",
    "식사는 잘 챙겨 드셨나요? 건강을 위해 제때 드시는 게 중요해요.",
    "잠깐 눈을 붙이시는 건 어떨까요? 어제 잠을 조금 설치신 것 같아요.",
    "정말 대단하세요! 오늘 목표 걸음 수를 벌써 다 채우셨네요.",
    "할머니, 옛날 이야기 좀 더 해주세요. 정말 흥미로워요!"
]

@app.get("/")
async def root():
    return {"message": "Welcome to Crab-Crab Care API v3 - Predictive Care Active"}

@app.post("/chat", response_model=ChatResponse)
async def chat_with_agent(request: ChatRequest):
    response = random.choice(MOCK_RESPONSES)
    return ChatResponse(response=response, mood_detected="Happy", timestamp=datetime.now())

@app.get("/health-status/{user_id}", response_model=HealthStatus)
async def get_health_status(user_id: str):
    heart_rate = random.randint(65, 110)
    steps = random.randint(1000, 8000)
    sleep_hours = round(random.uniform(5.0, 8.5), 1)
    
    # v3: Simulated Radar Fall Sensor Logic
    is_fall_detected = random.random() < 0.05 # 5% chance for testing
    status = "Critical" if is_fall_detected or heart_rate > 105 else "Normal"
    
    # v3: Simulated Gait Alert
    gait_alert = random.random() < 0.1 # 10% chance
    if gait_alert and status == "Normal":
        status = "Alert"

    return HealthStatus(
        user_id=user_id,
        heart_rate=heart_rate,
        steps=steps,
        sleep_hours=sleep_hours,
        status=status,
        caregiver_notified=(status == "Critical"),
        gait_alert=gait_alert
    )

@app.get("/health-trends/{user_id}", response_model=HealthTrend)
async def get_health_trends(user_id: str):
    trends = []
    today = datetime.now()
    for i in range(7, 0, -1):
        date_str = (today - timedelta(days=i)).strftime("%m-%d")
        trends.append(DailyStat(
            date=date_str,
            steps=random.randint(2000, 7000),
            avg_heart_rate=random.randint(70, 85),
            walking_speed=round(random.uniform(3.0, 4.5), 2)
        ))
    return HealthTrend(user_id=user_id, trends=trends)

@app.get("/alerts")
async def get_active_alerts():
    # v3: Dynamic Medication Alert
    return {
        "alerts": [
            {"type": "Medicine", "message": "💊 혈압약 드실 시간입니다. 할아버지의 소중한 건강을 지켜주세요!", "time": "현재", "urgent": True},
            {"type": "Health", "message": "최근 보행 속도가 조금 느려졌습니다. 무리하지 마세요.", "time": "분석 결과", "urgent": False}
        ]
    }

@app.post("/medication/confirm")
async def confirm_medication(update: MedicationUpdate):
    print(f"MEDICATION CONFIRMED: {update.user_id} took {update.pill_name}")
    return {"status": "success", "message": "가족들에게도 안심하라고 전해드릴게요!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
