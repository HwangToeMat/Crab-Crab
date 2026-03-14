from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
import sqlite3

app = FastAPI(title="Mood-Ge API")

# Simple In-memory/SQLite Mock for Prototype
# In a real scenario, SQLAlchemy would be used.

class MoodLog(BaseModel):
    id: Optional[int] = None
    mood: str
    score: int
    note: Optional[str] = None
    created_at: datetime = datetime.now()

class Challenge(BaseModel):
    id: int
    title: str
    completed: bool = False

# Mock Data
mood_history = []
all_challenges = [
    {"id": 1, "title": "물 한 잔 마시기 (신체)", "completed": False, "category": "Body"},
    {"id": 2, "title": "1분간 하늘 보기 (마음)", "completed": False, "category": "Mind"},
    {"id": 3, "title": "감사한 일 1개 적기 (마음)", "completed": False, "category": "Mind"},
    {"id": 4, "title": "가벼운 스트레칭 5분 (신체)", "completed": False, "category": "Body"},
    {"id": 5, "title": "친구에게 안부 문자 보내기 (관계)", "completed": False, "category": "Social"},
    {"id": 6, "title": "오늘의 명언 읽기 (마음)", "completed": False, "category": "Mind"},
]
daily_challenges = all_challenges[:3]
cheers_count = 0  # 커뮤니티 응원 총합 (Mock)

@app.get("/api/v1/challenges")
def get_challenges(mood: Optional[str] = "neutral"):
    # AI Recommendation Logic (Simple Heuristic)
    if mood == "tired":
        return [c for c in all_challenges if c["category"] == "Body"][:3]
    elif mood == "sad":
        return [c for c in all_challenges if c["category"] == "Mind"][:3]
    return all_challenges[:3]

@app.post("/api/v1/cheers")
def send_cheer():
    global cheers_count
    cheers_count += 1
    return {"cheers_count": cheers_count}

@app.get("/api/v1/cheers")
def get_cheers():
    return {"cheers_count": cheers_count}

@app.patch("/api/v1/challenges/{challenge_id}/complete")
def complete_challenge(challenge_id: int):
    for c in daily_challenges:
        if c["id"] == challenge_id:
            c["completed"] = True
            return c
    raise HTTPException(status_code=404, detail="Challenge not found")

@app.get("/api/v1/stats")
def get_stats():
    # Simple logic for burnout recovery score
    completion_rate = sum(1 for c in daily_challenges if c["completed"]) / len(daily_challenges)
    recovery_score = int(completion_rate * 100)
    return {
        "recovery_score": recovery_score,
        "mood_average": "Good" if recovery_score > 50 else "Stable",
        "streak": 3
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
