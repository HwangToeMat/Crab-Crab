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
    Activity(id=6, title="명상과 호흡", description="심호흡을 통해 내면의 평화를 유지하세요.", category="Neutral"),
    Activity(id=7, title="매운 음식 먹기", description="스트레스를 확 날려버리는 화끈한 맛!", category="Angry"),
    Activity(id=8, title="일기 쓰기", description="오늘의 감정을 글로 정리하며 마음을 정리해요.", category="Sad"),
]

@app.get("/api/stats")
async def get_stats():
    """현재 활동 중인 메이트 수 (Mock)"""
    return {"active_users": random.randint(100, 500)}

@app.get("/api/health")
async def health_check():
    """서버 상태 확인용 헬스 체크 엔드포인트"""
    return {"status": "ok", "timestamp": datetime.now()}

# 데이터 모델 정의 확장
class MoodRequest(BaseModel):
    user_id: str
    mood_text: str

class MoodHistoryItem(BaseModel):
    date: datetime
    mood: str
    score: float

class MoodResponse(BaseModel):
    sentiment_score: float
    mood_category: str
    message: str
    history: List[MoodHistoryItem] = [] # 사용자 히스토리 추가
    same_mood_count: int = 0 # 신규: 동일 무드 사용자 수 추가

# 임시 사용자 히스토리 저장소 (DB 대체)
USER_HISTORIES = {}

# 신규: 익명 응원 메시지 저장소
CHEER_MESSAGES = {
    "Happy": ["당신의 기쁨이 모두에게 전달되길!", "그 행복 꼭 붙잡으세요 🦀"],
    "Sad": ["울어도 괜찮아요. 내일은 조금 더 나을 거예요.", "꽃게가 옆에 있어요."],
    "Angry": ["심호흡 한 번! 시원한 물 한 잔 어때요?", "다 지나갈 일이에요."],
    "Anxious": ["걱정 마세요, 생각보다 잘 하고 있어요.", "숨을 크게 들이마셔 봐요."],
    "Neutral": ["평화로운 오늘을 즐기세요.", "안정적인 마음이 가장 큰 자산입니다."]
}

# 캐시 저장소
ANALYSIS_CACHE = {}

@app.post("/api/mood/analyze", response_model=MoodResponse)
async def analyze_mood(request: MoodRequest):
    """
    캐싱 및 복합 감정 분석 지원.
    """
    # 캐시 체크
    cache_key = f"{request.user_id}:{request.mood_text}"
    if cache_key in ANALYSIS_CACHE:
        return ANALYSIS_CACHE[cache_key]

    text = request.mood_text.lower()
...
    # 복합 감정 체크 (예: 슬픈데 화남)
    if "슬퍼" in text and "화나" in text:
        category = "Complex"
        message = "여러 감정이 섞여 혼란스러우시죠? 천천히 하나씩 풀어가 봐요."
        score = -0.5

    # 결과 생성
    result = MoodResponse(
        sentiment_score=round(score, 2),
        mood_category=category,
        message=messages.get(category, message),
        history=USER_HISTORIES[request.user_id][-5:],
        same_mood_count=random.randint(1, 50)
    )
    
    # 캐시 저장
    ANALYSIS_CACHE[cache_key] = result
    return result

@app.get("/api/cheer", response_model=List[str])
async def get_cheer(mood: str):
    """무드에 맞는 응원 메시지 반환"""
    return CHEER_MESSAGES.get(mood, ["힘내세요!"])

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
