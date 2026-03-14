from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import random

app = FastAPI(title="Crab-Crab Care API v2", description="Improved AI Agent for Silver Care")

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

class DailyStat(BaseModel):
    date: str
    steps: int
    avg_heart_rate: int

class HealthTrend(BaseModel):
    user_id: str
    trends: List[DailyStat]

# Mock Data
MOCK_RESPONSES = [
    "할아버지, 오늘 날씨가 참 좋네요! 같이 산책 나가는 건 어떠세요?",
    "식사는 잘 챙겨 드셨나요? 건강을 위해 제때 드시는 게 중요해요.",
    "잠깐 눈을 붙이시는 건 어떨까요? 어제 잠을 조금 설치신 것 같아요.",
    "정말 대단하세요! 오늘 목표 걸음 수를 벌써 다 채우셨네요.",
    "할머니, 옛날 이야기 좀 더 해주세요. 정말 흥미로워요!"
]

MOODS = ["Happy", "Neutral", "Lonely", "Energetic"]

@app.get("/")
async def root():
    return {"message": "Welcome to Crab-Crab Care API v2"}

@app.post("/chat", response_model=ChatResponse)
async def chat_with_agent(request: ChatRequest):
    response = random.choice(MOCK_RESPONSES)
    mood = random.choice(MOODS)
    return ChatResponse(response=response, mood_detected=mood, timestamp=datetime.now())

@app.get("/health-status/{user_id}", response_model=HealthStatus)
async def get_health_status(user_id: str):
    heart_rate = random.randint(65, 110) # Increased range for testing alerts
    steps = random.randint(1000, 8000)
    sleep_hours = round(random.uniform(5.0, 8.5), 1)
    
    status = "Normal"
    caregiver_notified = False
    
    if heart_rate > 100:
        status = "Critical"
        caregiver_notified = True
    elif heart_rate > 90 or sleep_hours < 6.0:
        status = "Alert"
    
    return HealthStatus(
        user_id=user_id,
        heart_rate=heart_rate,
        steps=steps,
        sleep_hours=sleep_hours,
        status=status,
        caregiver_notified=caregiver_notified
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
            avg_heart_rate=random.randint(70, 85)
        ))
    return HealthTrend(user_id=user_id, trends=trends)

@app.get("/alerts")
async def get_active_alerts():
    return {
        "alerts": [
            {"type": "Medicine", "message": "점심 약 복용 시간입니다.", "time": "13:00"},
            {"type": "Health", "message": "어제보다 활동량이 적습니다. 가벼운 스트레칭은 어떨까요?", "time": "14:30"}
        ]
    }

@app.post("/caregiver/notification")
async def notify_caregiver(user_id: str, message: str):
    # Mocking a push notification
    print(f"NOTIFICATION SENT TO CAREGIVER of {user_id}: {message}")
    return {"status": "success", "message": f"Notification sent: {message}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
