import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';
import { SYLLABUS_MODULES } from '../data/syllabus';
import { MODULE_QUIZZES } from '../data/quizData';
import { QuizQuestion, LanguageMode } from '../types';

interface QuizPageProps {
  language: LanguageMode;
  onSaveQuizScore: (quizId: string, topicId: string, score: number, total: number) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({ language, onSaveQuizScore }) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('module-1');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const questions: QuizQuestion[] = MODULE_QUIZZES[selectedModuleId] || MODULE_QUIZZES['module-1'] || [];

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    onSaveQuizScore(`quiz_${selectedModuleId}`, selectedModuleId, score, questions.length);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  const score = calculateScore();
  const percentage = Math.round((score / (questions.length || 1)) * 100);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
          <Award className="w-3.5 h-3.5" />
          University Exam Assessment & Evaluation
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">
          Module Quizzes & Mock Exams
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Test your conceptual understanding and calculation mastery. Detailed justifications in English and Hinglish provided for every option.
        </p>

        {/* Module Selector */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
          {SYLLABUS_MODULES.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedModuleId(m.id);
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedModuleId === m.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              Mod {m.number}: {m.title}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Container */}
      <div className="space-y-4">
        {questions.length > 0 ? (
          questions.map((q, idx) => {
            const userChoice = selectedAnswers[idx];
            const isCorrect = userChoice === q.correctOptionIndex;

            return (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pb-2 border-b border-slate-800">
                  <span>Question {idx + 1} of {questions.length}</span>
                  {submitted && (
                    <span className={isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-slate-100 leading-relaxed">
                  {q.question}
                </p>

                {/* Options List */}
                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userChoice === optIdx;
                    let optStyle = 'border-slate-800 bg-slate-950/70 text-slate-300 hover:bg-slate-800/60';

                    if (submitted) {
                      if (optIdx === q.correctOptionIndex) {
                        optStyle = 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300 font-semibold';
                      } else if (isSelected) {
                        optStyle = 'border-rose-500/50 bg-rose-950/30 text-rose-300';
                      }
                    } else if (isSelected) {
                      optStyle = 'border-indigo-500 bg-indigo-600/20 text-indigo-200 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(idx, optIdx)}
                        disabled={submitted}
                        className={`w-full p-3 rounded-xl border text-xs text-left transition flex items-center justify-between ${optStyle}`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center font-mono text-[11px] shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </span>

                        {submitted && optIdx === q.correctOptionIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {submitted && isSelected && optIdx !== q.correctOptionIndex && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation (Shown when submitted) */}
                {submitted && (
                  <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 text-xs space-y-1.5 animate-in fade-in">
                    <p className="text-slate-300">
                      <strong className="text-indigo-400">Explanation: </strong> {q.explanation}
                    </p>
                    {(language === 'hinglish' || language === 'both') && (
                      <p className="text-amber-300/90">
                        <strong className="text-amber-400">Hinglish: </strong> {q.hinglishExplanation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
            Quiz questions for this module are currently loading.
          </div>
        )}
      </div>

      {/* Quiz Action Bar */}
      {questions.length > 0 && (
        <div className="sticky bottom-4 p-4 rounded-2xl bg-slate-950/95 border border-slate-800 shadow-2xl backdrop-blur-md flex items-center justify-between flex-wrap gap-3">
          {submitted ? (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-sm">
                Score: {score}/{questions.length} ({percentage}%)
              </div>
              <span className="text-xs text-slate-300">
                {percentage >= 80 ? '🎉 Excellent! Concept mastered.' : 'Review explanations and retry.'}
              </span>
            </div>
          ) : (
            <span className="text-xs text-slate-400">
              Answered: {Object.keys(selectedAnswers).length} of {questions.length}
            </span>
          )}

          <div className="flex items-center gap-2">
            {submitted ? (
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retry Quiz
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition disabled:opacity-50"
              >
                Submit Answers <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default QuizPage;
