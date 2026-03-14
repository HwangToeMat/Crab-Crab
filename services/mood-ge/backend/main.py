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
daily_challenges = [
    {"id": 1, "title": "물 한 잔 마시기 (Drink water)", "completed": False},
    {"id": 2, "title": "1분간 하늘 보기 (Look at the sky)", "completed": False},
    {"id": 3, "title": "감사한 일 1개 적기 (One thing I'm grateful for)", "completed": False},
]

@app.get("/")
def read_root():
    return {"message": "Welcome to Mood-Ge API!"}

@app.get("/api/v1/moods", response_model=List[MoodLog])
def get_moods():
    return mood_history

@app.post("/api/v1/moods")
def create_mood(log: MoodLog):
    log.id = len(mood_history) + 1
    mood_history.append(log)
    return log

@app.get("/api/v1/challenges", response_model=List[Challenge])
def get_challenges():
    return daily_challenges

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
