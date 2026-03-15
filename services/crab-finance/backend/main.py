from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import random

app = FastAPI(title="Crab-Finance Engine")

class ExpenseItem(BaseModel):
    title: str
    amount: int
    category: str = "미분류"

@app.get("/")
async def root():
    return {"status": "Crab-Finance Active", "version": "v2.0-evo"}

@app.post("/classify")
async def classify_expense(text: str):
    # 한국어 작업 의도: AI 텍스트 기반 카테고리 분류 시뮬레이션
    categories = {
        "점심": "식비", "커피": "식비", "마트": "식비",
        "버스": "교통", "택시": "교통", "주유": "교통",
        "넷플릭스": "취미", "구독": "취미", "영화": "취미",
        "월세": "주거", "전기": "주거"
    }
    
    found_category = "기타"
    for keyword, cat in categories.items():
        if keyword in text:
            found_category = cat
            break
            
    return {"category": found_category, "raw_text": text}

@app.get("/mock-stats")
async def get_stats():
    return [
        {"category": "식비", "amount": 450000},
        {"category": "교통", "amount": 120000},
        {"category": "취미", "amount": 85000},
        {"category": "주거", "amount": 600000},
        {"category": "기타", "amount": 50000}
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
