from sqlalchemy import create_all_engines, Column, Integer, String, ForeignKey, DateTime, JSON, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

class GraphNode(Base):
    __tablename__ = "graph_nodes"
    id = Column(Integer, primary_key=True, index=True)
    label = Column(String)
    type = Column(String) # 'document', 'database', 'messenger', etc.
    metadata_json = Column(JSON) # Additional properties
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class GraphEdge(Base):
    __tablename__ = "graph_edges"
    id = Column(Integer, primary_key=True, index=True)
    source_id = Column(Integer, ForeignKey("graph_nodes.id"))
    target_id = Column(Integer, ForeignKey("graph_nodes.id"))
    relation_type = Column(String)
    weight = Column(Integer, default=1)

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    status = Column(String, default="pending") # pending, running, completed, failed
    agent_id = Column(String) # Assigned agent ID
    parent_id = Column(Integer, ForeignKey("tasks.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    subtasks = relationship("Task", backref="parent", remote_side=[id])

class SimulationResult(Base):
    __tablename__ = "simulation_results"
    id = Column(Integer, primary_key=True, index=True)
    scenario_name = Column(String)
    input_data = Column(JSON)
    prediction_score = Column(Integer)
    impact_analysis = Column(JSON)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class LearningLoop(Base):
    __tablename__ = "learning_loops"
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer)
    performance_metrics = Column(JSON)
    optimization_recommendations = Column(JSON)
    applied_at = Column(DateTime, default=datetime.datetime.utcnow)
