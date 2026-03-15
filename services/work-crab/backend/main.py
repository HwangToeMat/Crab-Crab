from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import create_all, create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, User, Task, Diary
from pydantic import BaseModel
from typing import List, Optional
import datetime

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./work_crab.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Work-Crab API v2.0 (Infinite Evolution)")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str
    estimated_time: int

class TaskCreate(TaskBase):
    user_id: int

class TaskSchema(TaskBase):
    id: int
    user_id: int
    status: str
    actual_time: int
    created_at: datetime.datetime
    class Config:
        from_attributes = True

# Infinite Evolution: AI Coach Model
class AICoachRequest(BaseModel):
    user_id: int
    current_tasks: List[str]

# Infinite Evolution: Trust & Warranty Models
class WarrantyRequest(BaseModel):
    user_id: int
    task_id: int
    stake_amount: int

# Mock Data for Evolution
warranties = []
ambassadors = [
    {"id": "elon-crab", "name": "Elon Crab", "track": "100-Hour Work Week (Hardcore)", "followers": 50000},
    {"id": "zen-crab", "name": "Zen Crab", "track": "Deep Work & Meditation", "followers": 32000}
]
user_points = 10000

@app.get("/")
async def read_root():
    return {"message": "Welcome to Work-Crab API v2.0 (Infinite Evolution)"}

@app.post("/tasks", response_model=TaskSchema)
async def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    db_task = Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.get("/tasks/{user_id}", response_model=List[TaskSchema])
async def get_tasks(user_id: int, db: Session = Depends(get_db)):
    return db.query(Task).filter(Task.user_id == user_id).all()

# --- Infinite Evolution Endpoints ---

@app.post("/api/ai/coach")
async def ai_coach(req: AICoachRequest):
    # Gemini AI Mock Response for Phase 5
    advice = f"Infinite AI 분석 결과: 현재 {len(req.current_tasks)}개의 핵심 업무가 있습니다. 가장 집중력이 높은 오전 시간에 창의적인 작업을 먼저 수행하고, 오후에는 반복 작업을 배치하세요. 당신의 무한한 생산성을 응원합니다!"
    return {"advice": advice, "theme": "Deep Blue Intelligence"}

@app.get("/api/trust/status")
async def trust_status():
    return {"user_points": user_points, "active_warranties": warranties}

@app.post("/api/trust/warranty")
async def create_warranty(req: WarrantyRequest):
    global user_points
    if user_points >= req.stake_amount:
        user_points -= req.stake_amount
        new_warranty = {"task_id": req.task_id, "staked_points": req.stake_amount, "status": "Active"}
        warranties.append(new_warranty)
        return new_warranty
    else:
        raise HTTPException(status_code=400, detail="Insufficient Crab Points for Warranty.")

@app.get("/api/community/ambassadors")
async def get_ambassadors():
    return ambassadors

@app.get("/burnout-status/{user_id}")
async def get_burnout_status(user_id: int, db: Session = Depends(get_db)):
    # Enhanced logic: Consider time of day and task density
    tasks = db.query(Task).filter(Task.user_id == user_id).all()
    now = datetime.datetime.now()
    hour_penalty = 20 if now.hour > 22 or now.hour < 6 else 0
    total_tasks = len(tasks)
    done_tasks = len([t for t in tasks if t.status == "Done"])
    todo_tasks = total_tasks - done_tasks
    
    energy_level = 100 - (todo_tasks * 10) - hour_penalty
    energy_level = max(0, min(100, energy_level))
    
    status = "Infinite Flow"
    if energy_level < 30:
        status = "System Overload. Reboot Required."
    elif energy_level < 60:
        status = "Warning: Approaching Limits"
        
    return {
        "user_id": user_id,
        "energy_level": energy_level,
        "status": status,
        "recommendation": "Activate Zen Mode." if energy_level < 30 else "Maintain Deep Work."
    }
