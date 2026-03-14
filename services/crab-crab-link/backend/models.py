from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    profile_image = Column(String)
    bio = Column(String)
    interests = Column(String)
    temperature = Column(Float, default=36.5)
    created_at = Column(DateTime, server_default=func.now())

    posts = relationship("Post", back_populates="owner")

class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    post_type = Column(String)  # 'REQUEST', 'OFFER'
    category = Column(String, default="기타") # '식재료', '생필품', '도구/공유', '기타'
    image_url = Column(String)
    tags = Column(String)
    likes = Column(Integer, default=0)
    created_at = Column(DateTime, server_default=func.now())

    owner = relationship("User", back_populates="posts")
