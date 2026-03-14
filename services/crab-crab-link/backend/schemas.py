from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PostBase(BaseModel):
    title: str
    content: str
    post_type: str
    category: Optional[str] = "기타"
    image_url: Optional[str] = None
    tags: Optional[str] = None
    likes: Optional[int] = 0

class PostCreate(PostBase):
    user_id: int

class Post(PostBase):
    id: int
    user_id: int
    created_at: datetime
    user_name: Optional[str] = "익명게"
    user_temperature: Optional[float] = 36.5
    likes: int = 0

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    profile_image: Optional[str] = None
    bio: Optional[str] = None
    interests: Optional[str] = None
    temperature: float = 36.5
    created_at: datetime

    class Config:
        from_attributes = True
