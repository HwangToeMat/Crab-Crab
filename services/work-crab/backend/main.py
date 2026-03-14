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

app = FastAPI(title="Work-Crab API")

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

class DiaryCreate(BaseModel):
    user_id: int
    content: str

class DiarySchema(DiaryCreate):
    id: int
    emotion_score: float
    created_at: datetime.datetime
    class Config:
        from_attributes = True

# Endpoints
@app.get("/")
async def read_root():
    return {"message": "Welcome to Work-Crab API v2.0 (Evolution)"}

@app.post("/tasks", response_model=TaskSchema)
async def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    db_task = Task(**task.dict())
    db.add(db_task)
    # Log activity
    log = ActivityLog(user_id=task.user_id, activity_type="TaskCreate", details=task.title)
    db.add(log)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.get("/tasks/{user_id}", response_model=List[TaskSchema])
async def get_tasks(user_id: int, db: Session = Depends(get_db)):
    return db.query(Task).filter(Task.user_id == user_id).all()

@app.post("/diary", response_model=DiarySchema)
async def create_diary(diary: DiaryCreate, db: Session = Depends(get_db)):
    # Simple Mock Emotion Analysis
    emotion_score = 0.5 if "happy" in diary.content.lower() else -0.1
    db_diary = Diary(user_id=diary.user_id, content=diary.content, emotion_score=emotion_score)
    db.add(db_diary)
    # Log activity
    log = ActivityLog(user_id=diary.user_id, activity_type="DiaryWrite", details=f"Score: {emotion_score}")
    db.add(log)
    db.commit()
    db.refresh(db_diary)
    return db_diary


@app.get("/burnout-status/{user_id}")
def get_burnout_status(user_id: int, db: Session = Depends(get_db)):
    # Enhanced logic: Consider time of day and task density
    tasks = db.query(Task).filter(Task.user_id == user_id).all()
    diaries = db.query(Diary).filter(Diary.user_id == user_id).all()
    
    now = datetime.datetime.now()
    hour_penalty = 0
    if now.hour > 22 or now.hour < 6:
        hour_penalty = 20  # Late night work penalty
    
    total_tasks = len(tasks)
    done_tasks = len([t for t in tasks if t.status == "Done"])
    todo_tasks = total_tasks - done_tasks
    
    avg_emotion = sum([d.emotion_score for d in diaries]) / len(diaries) if diaries else 0.5
    
    # Base energy 100
    energy_level = 100
    
    # Penalties
    energy_level -= (todo_tasks * 10)  # Each pending task drains 10 energy
    energy_level -= hour_penalty
    energy_level += (avg_emotion * 40) - 20 # Emotion impact (-20 to +20)
    
    energy_level = max(0, min(100, energy_level))
    
    status = "Great"
    if energy_level < 25:
        status = "CRITICAL: Burnout Detected. Stop everything."
    elif energy_level < 50:
        status = "Warning: High Stress Level"
    elif energy_level < 75:
        status = "Moderate: You need a break soon"
        
    return {
        "user_id": user_id,
        "energy_level": round(energy_level, 2),
        "status": status,
        "recommendation": "Emergency Rest Required!" if energy_level < 30 else "Take a 15-min walk." if energy_level < 60 else "You are doing great!"
    }

