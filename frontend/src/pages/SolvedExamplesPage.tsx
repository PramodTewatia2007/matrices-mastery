import React, { useState, useMemo } from 'react';
import { FileText, Filter, Search, Sparkles } from 'lucide-react';
import { SYLLABUS_MODULES } from '../data/syllabus';
import { SOLVED_EXAMPLES } from '../data/examplesData';
import { StepByStepSolution } from '../components/StepByStepSolution';
import { LanguageMode } from '../types';

interface SolvedExamplesPageProps {
  initialModuleId?: string;
  language: LanguageMode;
}

export const SolvedExamplesPage: React.FC<SolvedExamplesPageProps> = ({
  initialModuleId,
  language
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(initialModuleId || 'all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredExamples = useMemo(() => {
    return SOLVED_EXAMPLES.filter((ex) => {
      const matchModule = selectedModuleId === 'all' || ex.moduleId === selectedModuleId;
      const matchDiff = difficultyFilter === 'all' || ex.difficulty === difficultyFilter;
      const matchSearch = 
        ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.conceptUsed.toLowerCase().includes(searchQuery.toLowerCase());
      return matchModule && matchDiff && matchSearch;
    });
  }, [selectedModuleId, difficultyFilter, searchQuery]);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
          <FileText className="w-3.5 h-3.5" />
          University Exam Solved Examples Library
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">
          Fully Solved Mathematical Examples
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Every example includes given parameters, required objective, formula or theorem justification, all intermediate row operations, verified answers, English reasoning, and Hinglish explanations.
        </p>

        {/* Filters bar */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
          {/* Module Filter */}
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

          {/* Difficulty Filter */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Difficulty Level:</label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Levels (Beginner to University)</option>
              <option value="beginner">Beginner (Foundations)</option>
              <option value="intermediate">Intermediate (Standard Methods)</option>
              <option value="advanced">Advanced (University Examination Level)</option>
            </select>
          </div>

          {/* Search Filter */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Search Examples:</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by keyword, equation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Examples Count Badge */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing <strong className="text-slate-200">{filteredExamples.length}</strong> solved examples</span>
      </div>

      {/* Examples List */}
      <div className="space-y-6">
        {filteredExamples.length > 0 ? (
          filteredExamples.map((ex) => (
            <StepByStepSolution key={ex.id} example={ex} lang={language} />
          ))
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
            No examples match the chosen filter. Try selecting "All 14 Modules" or resetting the search.
          </div>
        )}
      </div>

    </div>
  );
};

export default SolvedExamplesPage;
