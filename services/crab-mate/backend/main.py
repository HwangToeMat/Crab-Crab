from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import random

# FastAPI 인스턴스 생성
app = FastAPI(title="Crab-Mate API", description="감성 기반 소셜 큐레이션 서비스")

# 데이터 모델 정의
class MoodRequest(BaseModel):
    user_id: str
    mood_text: str

class MoodResponse(BaseModel):
    sentiment_score: float
    mood_category: str
    message: str

class Activity(BaseModel):
    id: int
    title: str
    description: str
    category: str

# 임시 데이터베이스 (액티비티 목록)
ACTIVITIES = [
    Activity(id=1, title="한강 공원 산책", description="맑은 공기를 마시며 기분을 리프레시하세요.", category="Happy"),
    Activity(id=2, title="따뜻한 차 한잔과 독서", description="조용한 공간에서 마음의 평온을 찾으세요.", category="Neutral"),
    Activity(id=3, title="슬픈 영화 정주행", description="감정을 솔직하게 표현하고 털어내는 시간.", category="Sad"),
    Activity(id=4, title="액티브한 조깅", description="땀을 흘리며 스트레스를 날려버리세요.", category="Angry"),
    Activity(id=5, title="로컬 북카페 탐방", description="새로운 영감을 얻고 느슨한 연대를 경험하세요.", category="Happy"),
]

@app.get("/api/health")
async def health_check():
    """서버 상태 확인용 헬스 체크 엔드포인트"""
    return {"status": "ok", "timestamp": datetime.now()}

@app.post("/api/mood/analyze", response_model=MoodResponse)
async def analyze_mood(request: MoodRequest):
    """
    사용자의 텍스트를 분석하여 감정 점수와 카테고리를 반환하는 엔드포인트.
    MVP 단계에서는 간단한 키워드 매칭 및 랜덤 스코어링을 활용함.
    """
    # 간단한 키워드 기반 감정 분석 로직 (Mocking)
    text = request.mood_text.lower()
    score = random.uniform(-1.0, 1.0) # 실제 구현 시 NLP 모델 연동 필요
    
    if "기뻐" in text or "좋아" in text or "행복" in text:
        category = "Happy"
        message = "오늘 정말 기분이 좋으시군요! 꽃게도 함께 기뻐요."
    elif "슬퍼" in text or "우울" in text or "힘들어" in text:
        category = "Sad"
        message = "마음이 힘든 날이군요. 꽃게가 당신을 꼭 안아줄게요."
    elif "화나" in text or "짜증" in text:
        category = "Angry"
        message = "잠시 숨을 고르며 마음을 가라앉혀 보세요. 꽃게가 도와줄게요."
    else:
        category = "Neutral"
        message = "평온한 하루군요. 지금 이 순간을 온전히 느껴보세요."
        
    return MoodResponse(
        sentiment_score=round(score, 2),
        mood_category=category,
        message=message
    )

@app.get("/api/activities/recommend", response_model=List[Activity])
async def recommend_activities(mood: str):
    """
    분석된 무드에 따라 적절한 액티비티를 추천함.
    """
    # 무드 카테고리에 맞는 활동 필터링
    recommended = [a for a in ACTIVITIES if a.category == mood]
    
    # 만약 해당 무드에 대한 추천이 부족하면 전체에서 랜덤으로 추가
    if not recommended:
        recommended = random.sample(ACTIVITIES, 2)
        
    return recommended

if __name__ == "__main__":
    import uvicorn
    # 로컬 서버 실행 설정
    uvicorn.run(app, host="0.0.0.0", port=8000)
