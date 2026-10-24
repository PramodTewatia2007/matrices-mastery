"""
SQLite Database and Session Management for Student Progress & Bookmarks
"""
import json
from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, Text, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "sqlite:///./matrices_mastery.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class ProgressRecord(Base):
    __tablename__ = "student_progress"

    user_id = Column(String, primary_key=True, index=True, default="guest_student")
    completed_topics_json = Column(Text, default="[]")
    completed_lessons_json = Column(Text, default="[]")
    viewed_examples_json = Column(Text, default="[]")
    question_attempts_json = Column(Text, default="{}")
    bookmarked_items_json = Column(Text, default="[]")
    quiz_scores_json = Column(Text, default="[]")
    settings_json = Column(Text, default='{"language": "both", "theme": "dark", "difficulty": "all"}')
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_or_create_progress(db, user_id: str = "guest_student") -> ProgressRecord:
    rec = db.query(ProgressRecord).filter(ProgressRecord.user_id == user_id).first()
    if not rec:
        rec = ProgressRecord(user_id=user_id)
        db.add(rec)
        db.commit()
        db.refresh(rec)
    return rec
