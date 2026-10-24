"""
FastAPI Application for Matrices Mastery
Provides endpoints for mathematical computations, step-by-step solutions,
content metadata, and persistent student progress.
"""
import os
import sys
import json
from typing import List, Dict, Any, Optional

# Ensure the backend directory is in sys.path
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import get_db, get_or_create_progress, ProgressRecord
from math_engine import (
    matrix_addition,
    matrix_multiplication,
    matrix_transpose,
    calculate_determinant,
    calculate_inverse,
    row_reduction,
    solve_linear_system,
    test_linear_independence,
    calculate_eigen,
    diagonalize_matrix,
    verify_cayley_hamilton,
    test_orthogonality
)

app = FastAPI(
    title="MatrixMastery AI Backend",
    description="Mathematical computation engine and progress API for Linear Algebra Matrices tutor.",
    version="1.0.0"
)

# Enable CORS for local Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Request Models
class MatrixUnaryReq(BaseModel):
    matrix: List[List[Any]]

class MatrixBinaryReq(BaseModel):
    matrix_a: List[List[Any]]
    matrix_b: List[List[Any]]
    operation: Optional[str] = "+"

class LinearSystemReq(BaseModel):
    matrix_a: List[List[Any]]
    vector_b: List[Any]

class VectorsReq(BaseModel):
    vectors: List[List[Any]]

class TopicCompleteReq(BaseModel):
    user_id: Optional[str] = "guest_student"
    topic_id: str

class QuestionAttemptReq(BaseModel):
    user_id: Optional[str] = "guest_student"
    question_id: str
    is_correct: bool
    hints_used: int

class QuizScoreReq(BaseModel):
    user_id: Optional[str] = "guest_student"
    quiz_id: str
    topic_id: str
    score: int
    total: int

class BookmarkReq(BaseModel):
    user_id: Optional[str] = "guest_student"
    item: Dict[str, Any]

class SettingsReq(BaseModel):
    user_id: Optional[str] = "guest_student"
    settings: Dict[str, Any]

# --- Calculator Endpoints ---
@app.post("/api/math/add-subtract")
def api_add_subtract(req: MatrixBinaryReq):
    try:
        return matrix_addition(req.matrix_a, req.matrix_b, req.operation or "+")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/math/multiply")
def api_multiply(req: MatrixBinaryReq):
    try:
        return matrix_multiplication(req.matrix_a, req.matrix_b)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/math/transpose")
def api_transpose(req: MatrixUnaryReq):
    try:
        return matrix_transpose(req.matrix)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/math/determinant")
def api_determinant(req: MatrixUnaryReq):
    try:
        return calculate_determinant(req.matrix)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/math/inverse")
def api_inverse(req: MatrixUnaryReq):
    try:
        return calculate_inverse(req.matrix)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/math/row-reduction")
def api_row_reduction(req: MatrixUnaryReq):
    try:
        return row_reduction(req.matrix)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/math/solve-system")
def api_solve_system(req: LinearSystemReq):
    try:
        return solve_linear_system(req.matrix_a, req.vector_b)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/math/linear-independence")
def api_linear_independence(req: VectorsReq):
    try:
        return test_linear_independence(req.vectors)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/math/eigen")
def api_eigen(req: MatrixUnaryReq):
    try:
        return calculate_eigen(req.matrix)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/math/diagonalize")
def api_diagonalize(req: MatrixUnaryReq):
    try:
        return diagonalize_matrix(req.matrix)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/math/cayley-hamilton")
def api_cayley_hamilton(req: MatrixUnaryReq):
    try:
        return verify_cayley_hamilton(req.matrix)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/math/orthogonality")
def api_orthogonality(req: MatrixUnaryReq):
    try:
        return test_orthogonality(req.matrix)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# --- Progress Tracking Endpoints ---
@app.get("/api/progress/{user_id}")
def get_user_progress(user_id: str, db: Session = Depends(get_db)):
    rec = get_or_create_progress(db, user_id)
    return {
        "user_id": rec.user_id,
        "completed_topics": json.loads(rec.completed_topics_json),
        "completed_lessons": json.loads(rec.completed_lessons_json),
        "viewed_examples": json.loads(rec.viewed_examples_json),
        "question_attempts": json.loads(rec.question_attempts_json),
        "bookmarked_items": json.loads(rec.bookmarked_items_json),
        "quiz_scores": json.loads(rec.quiz_scores_json),
        "settings": json.loads(rec.settings_json)
    }

@app.post("/api/progress/topic-complete")
def complete_topic(req: TopicCompleteReq, db: Session = Depends(get_db)):
    rec = get_or_create_progress(db, req.user_id)
    topics = json.loads(rec.completed_topics_json)
    if req.topic_id not in topics:
        topics.append(req.topic_id)
        rec.completed_topics_json = json.dumps(topics)
        db.commit()
    return {"status": "success", "completed_topics": topics}

@app.post("/api/progress/question-attempt")
def log_question_attempt(req: QuestionAttemptReq, db: Session = Depends(get_db)):
    rec = get_or_create_progress(db, req.user_id)
    attempts = json.loads(rec.question_attempts_json)
    
    prev = attempts.get(req.question_id, {"attempts": 0, "hints_used": 0})
    attempts[req.question_id] = {
        "is_correct": req.is_correct,
        "hints_used": max(prev.get("hints_used", 0), req.hints_used),
        "attempts": prev.get("attempts", 0) + 1
    }
    rec.question_attempts_json = json.dumps(attempts)
    db.commit()
    return {"status": "success", "attempts": attempts}

@app.post("/api/progress/quiz-score")
def log_quiz_score(req: QuizScoreReq, db: Session = Depends(get_db)):
    rec = get_or_create_progress(db, req.user_id)
    scores = json.loads(rec.quiz_scores_json)
    entry = {
        "quiz_id": req.quiz_id,
        "topic_id": req.topic_id,
        "score": req.score,
        "total": req.total,
        "percentage": round((req.score / req.total) * 100, 1) if req.total > 0 else 0
    }
    scores.append(entry)
    rec.quiz_scores_json = json.dumps(scores)
    db.commit()
    return {"status": "success", "quiz_scores": scores}

@app.post("/api/progress/bookmark")
def add_bookmark(req: BookmarkReq, db: Session = Depends(get_db)):
    rec = get_or_create_progress(db, req.user_id)
    bookmarks = json.loads(rec.bookmarked_items_json)
    # Check if already present
    exists = any(b.get("id") == req.item.get("id") for b in bookmarks)
    if not exists:
        bookmarks.append(req.item)
        rec.bookmarked_items_json = json.dumps(bookmarks)
        db.commit()
    return {"status": "success", "bookmarked_items": bookmarks}

@app.delete("/api/progress/bookmark/{item_id}")
def remove_bookmark(item_id: str, user_id: str = "guest_student", db: Session = Depends(get_db)):
    rec = get_or_create_progress(db, user_id)
    bookmarks = json.loads(rec.bookmarked_items_json)
    bookmarks = [b for b in bookmarks if b.get("id") != item_id]
    rec.bookmarked_items_json = json.dumps(bookmarks)
    db.commit()
    return {"status": "success", "bookmarked_items": bookmarks}

@app.post("/api/progress/settings")
def update_settings(req: SettingsReq, db: Session = Depends(get_db)):
    rec = get_or_create_progress(db, req.user_id)
    rec.settings_json = json.dumps(req.settings)
    db.commit()
    return {"status": "success", "settings": req.settings}

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "MatrixMastery AI Backend"}

# --- Static Frontend Serving (SPA fallback) ---
import os
import sys
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

DIST_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "frontend", "dist")
if not os.path.exists(DIST_DIR) and hasattr(sys, '_MEIPASS'):
    DIST_DIR = os.path.join(sys._MEIPASS, "dist")

if os.path.exists(DIST_DIR):
    assets_dir = os.path.join(DIST_DIR, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}")
    def serve_spa(full_path: str):
        if full_path.startswith("api"):
            raise HTTPException(status_code=404, detail="API route not found")
        file_path = os.path.join(DIST_DIR, full_path)
        if full_path and os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(DIST_DIR, "index.html"))

