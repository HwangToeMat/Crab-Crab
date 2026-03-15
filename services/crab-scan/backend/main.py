from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uvicorn

app = FastAPI(title="Crab-Scan AI API")

# --- Evolution v2.0: Data Structures ---
class ExpenseItem(BaseModel):
    id: Optional[int] = None
    item_name: str
    price: int
    category: str
    is_essential: bool = True
    created_at: datetime = datetime.now()

class UserStatus:
    def __init__(self):
        self.saving_score = 85
        self.total_spent = 450000
        self.streak = 12
        self.rankings = [
            {"name": "왕게절약왕", "score": 98},
            {"name": "집게핀짠순이", "score": 92},
            {"name": "나 (크래비)", "score": 85},
            {"name": "쇼핑왕대게", "score": 45}
        ]
        self.expenses = [
            {"id": 1, "item_name": "교통비", "price": 1500, "category": "Transport", "is_essential": True},
            {"id": 2, "item_name": "커피", "price": 4500, "category": "Dining", "is_essential": False},
        ]
        self.quests = [
            {"id": 1, "title": "무지출 챌린지", "completed": False, "reward": 100},
            {"id": 2, "title": "배달 음식 안 먹기", "completed": True, "reward": 50}
        ]

user_state = UserStatus()

# --- Evolution v2.0: AI Receipt Analyzer (Gemini Mock) ---
def analyze_spending_ai(item_name: str, price: int):
    # Simulated Gemini API for Spending Insight
    if price > 30000 and "음식" in item_name:
        return f"우와, {price}원짜리 {item_name}이라니요! 꽃게가 보기엔 조금 무거운 한 끼네요. 다음엔 껍질을 조금 더 단단히 조여보는 건 어떨까요?", "Caution"
    if price < 5000:
        if "커피" in item_name or "카페" in item_name:
            return f"오, {item_name}! 커피 한 잔의 여유는 좋지만, 일주일이면 치킨 한 마리 값이에요! 🍗 절약 팁: 텀블러를 써보세요.", "Frugal"
        return f"{price}원의 소소한 행복! {item_name} 정도는 갓생을 위한 연료라고 생각해요. 하지만 티끌 모아 태산이라는 점 잊지 마세요!", "Safe"
    return f"{item_name} 지출을 분석했습니다. 당신의 갓생 절약 점수는 현재 85점입니다!", "Neutral"

# --- API Endpoints ---

@app.get("/api/v1/scan/status")
def get_status():
    return {
        "saving_score": user_state.saving_score,
        "total_spent": user_state.total_spent,
        "streak": user_state.streak,
        "quests": user_state.quests,
        "rankings": user_state.rankings
    }

@app.get("/api/v1/scan/expenses")
def get_expenses():
    return user_state.expenses

@app.post("/api/v1/scan/analyze")
def post_analyze(item: ExpenseItem):
    advice, status = analyze_spending_ai(item.item_name, item.price)
    # Add to list
    new_expense = item.dict()
    new_expense["id"] = len(user_state.expenses) + 1
    user_state.expenses.append(new_expense)
    user_state.total_spent += item.price
    
    # Update score based on luxury spending
    if not item.is_essential:
        user_state.saving_score -= 2
    
    return {"advice": advice, "status": status, "updated_score": user_state.saving_score}

@app.patch("/api/v1/scan/quests/{qid}/complete")
def complete_quest(qid: int):
    for q in user_state.quests:
        if q["id"] == qid:
            q["completed"] = True
            return q
    raise HTTPException(status_code=404, detail="Quest not found")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
