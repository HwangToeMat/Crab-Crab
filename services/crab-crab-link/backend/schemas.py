from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PostBase(BaseModel):
    title: str
    content: str
    post_type: str
    tags: Optional[str] = None

class PostCreate(PostBase):
    user_id: int

class Post(PostBase):
    id: int
    user_id: int
    created_at: datetime
    user_name: Optional[str] = "익명게"
    user_temperature: Optional[float] = 36.5

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
