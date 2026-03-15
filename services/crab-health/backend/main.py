from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import random

app = FastAPI(title="Crab-Health Coach Engine")

class HealthInput(BaseModel):
    user_goal: str  # 예: "체중 감량", "근력 향상"
    daily_activity: int  # 걸음수 등

class MealInput(BaseModel):
    meal_text: str

@app.get("/")
async def root():
    return {"status": "Crab-Health Active", "version": "v2.0-evo"}

@app.post("/recommend-routine")
async def recommend_routine(input: HealthInput):
    # 한국어 작업 의도: AI 기반 맞춤 운동 루틴 추천 시뮬레이션
    routines = {
        "체중 감량": ["런닝머신 30분", "버피 테스트 15회 x 3세트", "플랭크 1분"],
        "근력 향상": ["데드리프트 10회 x 3세트", "벤치 프레스 12회 x 3세트", "스쿼트 20회 x 4세트"],
        "체력 증진": ["등산 1시간", "수영 40분", "스트레칭 15분"]
    }
    
    selected_routine = routines.get(input.user_goal, routines["체력 증진"])
    return {
        "goal": input.user_goal,
        "recommended_routine": selected_routine,
        "crab_advice": "꽃게처럼 집게 힘으로 바벨을 꽉 잡으세요! 오늘 하루도 화이팅입니다. 🦀💪"
    }

@app.post("/analyze-meal")
async def analyze_meal(input: MealInput):
    # 한국어 작업 의도: AI 식단 분석 시뮬레이션
    score = random.randint(60, 98)
    feedback = "단백질 섭취가 부족합니다. 닭가슴살이나 달걀을 추가해보세요." if score < 80 else "매우 훌륭한 식단입니다! 영양 균형이 완벽해요."
    
    return {
        "meal": input.meal_text,
        "health_score": score,
        "feedback": feedback
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
