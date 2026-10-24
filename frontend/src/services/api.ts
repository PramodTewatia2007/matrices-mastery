/**
 * API client for interacting with the FastAPI backend and persistent database.
 * Gracefully uses local mathematical computations if backend is disconnected.
 */
import {
  localAddSubtract,
  localMultiply,
  localDeterminant,
  localRowReduction
} from './mathLocal';

const API_BASE = '/api';

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

// 1. Matrix Operations
export async function apiAddSubtract(matrixA: any[][], matrixB: any[][], op: string = '+') {
  try {
    const res = await fetch(`${API_BASE}/math/add-subtract`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matrix_a: matrixA, matrix_b: matrixB, operation: op })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Backend unavailable, using local calculation fallback:", err);
  }
  return localAddSubtract(matrixA, matrixB, op as any);
}

export async function apiMultiply(matrixA: any[][], matrixB: any[][]) {
  try {
    const res = await fetch(`${API_BASE}/math/multiply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matrix_a: matrixA, matrix_b: matrixB })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Backend unavailable, using local calculation fallback:", err);
  }
  return localMultiply(matrixA, matrixB);
}

export async function apiDeterminant(matrix: any[][]) {
  try {
    const res = await fetch(`${API_BASE}/math/determinant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matrix })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Backend unavailable, using local calculation fallback:", err);
  }
  return localDeterminant(matrix);
}

export async function apiInverse(matrix: any[][]) {
  const res = await fetch(`${API_BASE}/math/inverse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ matrix })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Inverse calculation failed");
  }
  return await res.json();
}

export async function apiRowReduction(matrix: any[][]) {
  try {
    const res = await fetch(`${API_BASE}/math/row-reduction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matrix })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Backend unavailable, using local calculation fallback:", err);
  }
  return localRowReduction(matrix);
}

export async function apiSolveSystem(matrixA: any[][], vectorB: any[]) {
  const res = await fetch(`${API_BASE}/math/solve-system`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ matrix_a: matrixA, vector_b: vectorB })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "System solve failed");
  }
  return await res.json();
}

export async function apiLinearIndependence(vectors: any[][]) {
  const res = await fetch(`${API_BASE}/math/linear-independence`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vectors })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Linear independence test failed");
  }
  return await res.json();
}

export async function apiEigen(matrix: any[][]) {
  const res = await fetch(`${API_BASE}/math/eigen`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ matrix })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Eigenvalue calculation failed");
  }
  return await res.json();
}

export async function apiDiagonalize(matrix: any[][]) {
  const res = await fetch(`${API_BASE}/math/diagonalize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ matrix })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Diagonalization failed");
  }
  return await res.json();
}

export async function apiCayleyHamilton(matrix: any[][]) {
  const res = await fetch(`${API_BASE}/math/cayley-hamilton`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ matrix })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Cayley-Hamilton verification failed");
  }
  return await res.json();
}

export async function apiOrthogonality(matrix: any[][]) {
  const res = await fetch(`${API_BASE}/math/orthogonality`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ matrix })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Orthogonality check failed");
  }
  return await res.json();
}

// 2. Student Progress Persistence
export async function fetchUserProgress(userId: string = "guest_student") {
  try {
    const res = await fetch(`${API_BASE}/progress/${userId}`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Could not load backend progress, loading local storage:", e);
  }
  // LocalStorage Fallback
  const local = localStorage.getItem(`progress_${userId}`);
  if (local) return JSON.parse(local);
  return {
    user_id: userId,
    completed_topics: [],
    completed_lessons: [],
    viewed_examples: [],
    question_attempts: {},
    bookmarked_items: [],
    quiz_scores: [],
    settings: { language: 'both', theme: 'dark', difficulty: 'all' }
  };
}

export async function saveTopicCompletion(topicId: string, userId: string = "guest_student") {
  try {
    const res = await fetch(`${API_BASE}/progress/topic-complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, topic_id: topicId })
    });
    if (res.ok) return await res.json();
  } catch {}
}

export async function saveQuestionAttempt(questionId: string, isCorrect: boolean, hintsUsed: number, userId: string = "guest_student") {
  try {
    const res = await fetch(`${API_BASE}/progress/question-attempt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, question_id: questionId, is_correct: isCorrect, hints_used: hintsUsed })
    });
    if (res.ok) return await res.json();
  } catch {}
}

export async function saveQuizScore(quizId: string, topicId: string, score: number, total: number, userId: string = "guest_student") {
  try {
    const res = await fetch(`${API_BASE}/progress/quiz-score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, quiz_id: quizId, topic_id: topicId, score, total })
    });
    if (res.ok) return await res.json();
  } catch {}
}

export async function toggleBookmark(item: any, isBookmarked: boolean, userId: string = "guest_student") {
  try {
    if (isBookmarked) {
      await fetch(`${API_BASE}/progress/bookmark/${item.id}?user_id=${userId}`, { method: 'DELETE' });
    } else {
      await fetch(`${API_BASE}/progress/bookmark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, item })
      });
    }
  } catch {}
}
