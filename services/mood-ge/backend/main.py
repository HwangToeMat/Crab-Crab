from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
import random

app = FastAPI(title="Mood-Ge v2.0 'Infinite Evolution'")

# --- Evolution v2.0: Data Structures ---
class UserMood(BaseModel):
    mood: str
    note: str

class EvolutionState:
    def __init__(self):
        self.points = 1000  # Initial "Crab Tokens"
        self.burnout_score = 45
        self.streak = 5
        self.cheers = 120
        self.active_challenges = [
            {"id": 1, "title": "따뜻한 차 한 잔 마시기", "completed": False, "reward": 50},
            {"id": 2, "title": "5분간 눈 감고 호흡하기", "completed": False, "reward": 80},
            {"id": 3, "title": "오늘 나에게 고생했다 말하기", "completed": False, "reward": 100}
        ]
        self.ambassadors = [
            {"id": "zen-crab", "name": "명상하는 게", "motto": "파도처럼 마음을 다스려요.", "track": "Mindfulness"},
            {"id": "fit-crab", "name": "운동하는 게", "motto": "움직임이 기쁨을 만듭니다.", "track": "Vitality"}
        ]

state = EvolutionState()

# --- Evolution v2.0: AI Engine (Gemini Mock) ---
def analyze_emotion_ai(note: str):
    # This simulates a Gemini API call for sentiment analysis & recommendation
    keywords = ["힘들다", "지친다", "번아웃", "슬프다", "피곤"]
    detected = [k for k in keywords if k in note]
    
    if detected:
        advice = f"당신의 기록에서 '{detected[0]}' 같은 감정이 느껴집니다. 무한진화 중인 무드게 AI는 지금 당신에게 '깊은 호흡 3회'와 '좋아하는 음악 듣기'를 강력 추천합니다. 당신의 번아웃 회복을 위해 50포인트를 선물로 드릴게요!"
        return advice, "Supportive"
    return "오늘 하루도 잘 보내셨네요! 당신의 갓생 진화를 응원합니다.", "Positive"

# --- API Endpoints ---

@app.get("/api/v1/evolution/status")
def get_status():
    return {
        "points": state.points,
        "burnout_score": state.burnout_score,
        "streak": state.streak,
        "cheers": state.cheers,
        "ambassadors": state.ambassadors
    }

@app.post("/api/v1/ai/analyze")
def post_analyze(payload: UserMood):
    advice, mood_type = analyze_emotion_ai(payload.note)
    if mood_type == "Supportive":
        state.points += 50 # AI reward for emotional expression
    return {"advice": advice, "type": mood_type}

@app.get("/api/v1/challenges")
def get_challenges():
    return state.active_challenges

@app.patch("/api/v1/challenges/{cid}/complete")
def complete_challenge(cid: int):
    for c in state.active_challenges:
        if c["id"] == cid and not c["completed"]:
            c["completed"] = True
            state.points += c["reward"]
            state.burnout_score += 5
            return {"status": "success", "reward": c["reward"], "new_points": state.points}
    raise HTTPException(status_code=400, detail="Already completed or not found")

@app.post("/api/v1/community/cheer")
def send_cheer():
    state.cheers += 1
    state.points += 10 # Reward for community engagement
    return {"total_cheers": state.cheers}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
