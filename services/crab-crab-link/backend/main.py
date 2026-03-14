from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, database
from .database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="crab-crab-link API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
