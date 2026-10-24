import React, { useState, useMemo } from 'react';
import { HelpCircle, Bookmark, Search, CheckCircle, Lightbulb } from 'lucide-react';
import { SYLLABUS_MODULES } from '../data/syllabus';
import { PRACTICE_QUESTIONS } from '../data/questionsData';
import { HintAccordion } from '../components/HintAccordion';
import { KaTeX } from '../components/KaTeX';
import { LanguageMode } from '../types';

interface QuestionBankProps {
  initialModuleId?: string;
  language: LanguageMode;
  bookmarkedIds: string[];
  onToggleBookmark: (item: any) => void;
  onLogAttempt: (questionId: string, isCorrect: boolean, hintsUsed: number) => void;
}

export const QuestionBankPage: React.FC<QuestionBankProps> = ({
  initialModuleId,
  language,
  bookmarkedIds,
  onToggleBookmark,
  onLogAttempt
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(initialModuleId || 'all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredQuestions = useMemo(() => {
    return PRACTICE_QUESTIONS.filter((q) => {
      const matchModule = selectedModuleId === 'all' || q.moduleId === selectedModuleId;
      const matchDiff = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
      const matchSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase());
      return matchModule && matchDiff && matchSearch;
    });
  }, [selectedModuleId, difficultyFilter, searchQuery]);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          Independent Practice Question Bank
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">
          Linear Algebra Practice Questions
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Every question features a progressive 3-level hint tier (Concept → Formula → Next Step). Solutions and final answers remain hidden until requested.
        </p>

        {/* Filters */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Select Module:</label>
            <select
              value={selectedModuleId}
              onChange={(e) => setSelectedModuleId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All 14 Modules</option>
              {SYLLABUS_MODULES.map((m) => (
                <option key={m.id} value={m.id}>
                  Mod {m.number}: {m.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Difficulty:</label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced / University Exam</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Search Questions:</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search problem statement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-5">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q, idx) => {
            const isBookmarked = bookmarkedIds.includes(q.id);

            return (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      #{idx + 1}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${
                      q.difficulty === 'beginner'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : q.difficulty === 'intermediate'
                        ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleBookmark({ id: q.id, type: 'question', title: q.question, moduleId: q.moduleId })}
                    className={`p-1.5 rounded-lg border text-xs transition ${
                      isBookmarked
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                    title="Bookmark problem"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Problem Statement */}
                <div>
                  <p className="text-sm text-slate-100 font-medium leading-relaxed">{q.question}</p>
                  {q.questionLatex && (
                    <KaTeX math={q.questionLatex} block className="text-indigo-200" />
                  )}
                </div>

                {/* Progressive Hints & Show Full Solution */}
                <HintAccordion
                  hints={q.hints}
                  fullSolution={q.fullSolution}
                  finalAnswer={q.finalAnswer}
                  finalAnswerLatex={q.finalAnswerLatex}
                  lang={language}
                  onHintUsed={(level) => onLogAttempt(q.id, true, level)}
                />
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
            No practice questions found for this filter.
          </div>
        )}
      </div>

    </div>
  );
};

export default QuestionBankPage;
