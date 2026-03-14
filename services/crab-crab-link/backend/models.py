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
    warranties = relationship("Warranty", back_populates="post")

class Warranty(Base):
    """
    [Evolution 2.0] Warranty (꽃게 보증) 테이블
    고가 물품 거래의 신뢰도를 보장하기 위해 도입된 보증금 및 보험 시스템.
    """
    __tablename__ = "warranties"
    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("posts.id"))
    lender_id = Column(Integer, ForeignKey("users.id"))
    borrower_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    deposit_amount = Column(Float, default=0.0)
    insurance_plan = Column(String, default="NONE")  # 'NONE', 'BASIC', 'PREMIUM'
    status = Column(String, default="PENDING") # PENDING, ESCROWED, RETURNED, DISPUTED
    created_at = Column(DateTime, server_default=func.now())

    post = relationship("Post", back_populates="warranties")

class Ambassador(Base):
    """
    [Evolution 2.0] Ambassador (꽃게 앰배서더) 테이블
    지역 커뮤니티 활성화를 위해 선정된 우수 사용자의 활동을 관리.
    """
    __tablename__ = "ambassadors"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    region = Column(String, nullable=False)
    activity_score = Column(Integer, default=0)
    badges = Column(String)  # JSON string: {"trust": true, "guide": true}
    status = Column(String, default="ACTIVE")
    appointed_at = Column(DateTime, server_default=func.now())

    user = relationship("User")
