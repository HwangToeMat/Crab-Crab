from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, database, ai_engine
from .database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="crab-crab-link API 2.0")

# ... (CORS middleware stays the same)

# [Evolution 2.0] AI Recommendation API
@app.get("/api/v2/ai/recommendations", response_model=list[schemas.AIRecommendation])
async def get_ai_recommendations(user_id: int = 1):
    """
    사용자의 활동 패턴에 기반하여 Gemini AI가 맞춤형 나눔 아이템과 정보를 추천합니다.
    """
    context = {
        "location": "서울특별시 마포구",
        "weather": "흐림",
        "recent_searches": ["차 세트", "캠핑", "자전거"]
    }
    return await ai_engine.ai_processor.get_recommendations(user_id, context)

@app.post("/api/v2/ai/chat")
async def ai_chat_assistant(message: str, user_id: int = 1):
    """
    1:1 대화형 꽃게 AI 어시스턴트 서비스입니다.
    """
    return {"reply": await ai_engine.ai_processor.chat_with_assistant(message, [])}

# [Evolution 2.0] Warranty (꽃게 보증) API
@app.post("/api/v2/warranties", response_model=schemas.Warranty)
def create_warranty(warranty: schemas.WarrantyCreate, db: Session = Depends(get_db)):
    """
    물품 대여나 고가 나눔에 대한 보증 및 보험을 생성합니다.
    """
    db_warranty = models.Warranty(**warranty.dict())
    db.add(db_warranty)
    db.commit()
    db.refresh(db_warranty)
    return db_warranty

@app.get("/api/v2/warranties/{post_id}", response_model=list[schemas.Warranty])
def get_warranties_by_post(post_id: int, db: Session = Depends(get_db)):
    """
    특정 게시글에 적용된 보증 정보를 조회합니다.
    """
    return db.query(models.Warranty).filter(models.Warranty.post_id == post_id).all()

# [Evolution 2.0] Ambassador (꽃게 앰배서더) API
@app.get("/api/v2/ambassadors/{user_id}", response_model=schemas.Ambassador)
def get_ambassador_profile(user_id: int, db: Session = Depends(get_db)):
    """
    특정 사용자의 앰배서더 자격 및 활동 정보를 조회합니다.
    """
    ambassador = db.query(models.Ambassador).filter(models.Ambassador.user_id == user_id).first()
    if not ambassador:
        raise HTTPException(status_code=404, detail="Ambassador profile not found")
    return ambassador

@app.post("/api/v2/ambassadors", response_model=schemas.Ambassador)
def apply_ambassador(ambassador: schemas.AmbassadorCreate, db: Session = Depends(get_db)):
    """
    지역 커뮤니티의 앰배서더로 신규 등록합니다.
    """
    db_ambassador = models.Ambassador(**ambassador.dict())
    db.add(db_ambassador)
    db.commit()
    db.refresh(db_ambassador)
    return db_ambassador

@app.get("/")
def read_root():
    return {"message": "Welcome to crab-crab-link API"}

import asyncio

@app.get("/posts", response_model=list[schemas.Post])
async def read_posts(
    skip: int = 0, 
    limit: int = 100, 
    search: str = None, 
    sort_by: str = "latest", 
    db: Session = Depends(get_db)
):
    query = db.query(models.Post)
    
    if search:
        query = query.filter(
            (models.Post.title.contains(search)) | (models.Post.content.contains(search))
        )
    
    if sort_by == "latest":
        query = query.order_by(models.Post.created_at.desc())
    elif sort_by == "temperature":
        query = query.join(models.User).order_by(models.User.temperature.desc())
    
    posts = query.offset(skip).limit(limit).all()
    for post in posts:
        if post.owner:
            post.user_name = post.owner.username
            post.user_temperature = post.owner.temperature
        else:
            post.user_name = "익명게"
            post.user_temperature = 36.5
    return posts

@app.post("/posts/{post_id}/like", response_model=schemas.Post)
def toggle_like(post_id: int, db: Session = Depends(get_db)):
    db_post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    db_post.likes += 1 # 심플하게 증가로 구현
    db.commit()
    db.refresh(db_post)
    return db_post

@app.post("/posts", response_model=schemas.Post)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    db_post = models.Post(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post
