from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    start_time = Column(String)  # HH:MM
    end_time = Column(String)    # HH:MM
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    tasks = relationship("Task", back_populates="user")
    diaries = relationship("Diary", back_populates="user")

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    description = Column(String)
    priority = Column(String)  # High, Mid, Low
    estimated_time = Column(Integer)  # in minutes
    actual_time = Column(Integer, default=0)
    status = Column(String, default="Todo")  # Todo, InProgress, Done
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="tasks")

class Diary(Base):
    __tablename__ = "diaries"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    content = Column(String)
    emotion_score = Column(Float)  # -1 to 1
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="diaries")

class Achievement(Base):
    __tablename__ = "achievements"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    icon = Column(String) # Emoji or SVG path
    unlocked_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="achievements")

class ActivityLog(Base):
    __tablename__ = "activity_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    activity_type = Column(String) # TaskComplete, BreakStart, DiaryWrite
    details = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="activity_logs")

# Update User model relationship
User.achievements = relationship("Achievement", back_populates="user")
User.activity_logs = relationship("ActivityLog", back_populates="user")


