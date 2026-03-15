from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import random

app = FastAPI(title="Crab-Finance Engine v2.0-evo")

class ExpenseItem(BaseModel):
    title: str
    amount: int
    category: str = "미분류"

@app.get("/")
async def root():
    return {"status": "Crab-Finance Evolution Active", "version": "v2.0-evo"}

@app.post("/analyze-finance")
async def analyze_finance(items: List[ExpenseItem]):
    total_amount = sum(item.amount for item in items)
    
    # AI 맞춤형 조언 생성 (Phase 5 진화 로직)
    expense_data = {item.category: item.amount for item in items}
    
    # 소비 유형 분류
    if expense_data.get("식비", 0) > total_amount * 0.4:
        spending_type = "미식가형"
        advice = "전체 지출 중 식비 비중이 매우 높습니다. 배달 앱 삭제를 권장합니다."
    elif expense_data.get("취미", 0) > total_amount * 0.2:
        spending_type = "욜로(YOLO)형"
        advice = "취미 생활도 좋지만 미래를 위한 저축 비중을 10% 더 높여보세요."
    else:
        spending_type = "알뜰형"
        advice = "매우 건전한 소비 습관을 가지고 계십니다! 현재 패턴을 유지하세요."

    return {
        "spending_persona": spending_type,
        "total_expense": total_amount,
        "ai_financial_advice": advice,
        "optimization_plan": f"현재 {spending_type} 성향에 맞춰 자산의 20%를 안전 자산으로 재배분할 것을 추천합니다."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
