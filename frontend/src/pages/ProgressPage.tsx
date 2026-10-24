import React from 'react';
import { BarChart3, CheckCircle2, Award, HelpCircle, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { SYLLABUS_MODULES } from '../data/syllabus';
import { ActiveTab } from '../components/Sidebar';

interface ProgressPageProps {
  completedTopics: string[];
  questionAttempts: Record<string, { isCorrect: boolean; hintsUsed: number; attempts: number }>;
  quizScores: { quizId: string; topicId: string; score: number; total: number; percentage: number; date: string }[];
  onNavigate: (tab: ActiveTab, moduleId?: string) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  completedTopics,
  questionAttempts,
  quizScores,
  onNavigate
}) => {
  const totalModules = SYLLABUS_MODULES.length;
  const completedCount = completedTopics.length;
  const syllabusPercent = Math.round((completedCount / totalModules) * 100);

  const totalQuestionsAttempted = Object.keys(questionAttempts).length;
  const correctCount = Object.values(questionAttempts).filter(q => q.isCorrect).length;
  const questionAccuracy = totalQuestionsAttempted > 0 ? Math.round((correctCount / totalQuestionsAttempted) * 100) : 0;

  const avgQuiz = quizScores.length > 0 
    ? Math.round(quizScores.reduce((acc, q) => acc + q.percentage, 0) / quizScores.length)
    : 0;

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
          <BarChart3 className="w-3.5 h-3.5" />
          Student Performance & Learning Analytics
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">
          Your Linear Algebra Learning Journey
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Detailed metrics tracking your syllabus completion, practice problem accuracy, hint dependencies, and quiz mastery.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Syllabus Covered</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-100">{completedCount}/{totalModules}</span>
            <span className="text-xs font-bold text-indigo-400">{syllabusPercent}%</span>
          </div>
          <div className="mt-3 w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${syllabusPercent}%` }} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Practice Questions</span>
            <HelpCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-100">{totalQuestionsAttempted}</span>
            <span className="text-xs text-slate-400">attempted</span>
          </div>
          <div className="mt-3 text-xs text-emerald-400 font-semibold">
            {questionAccuracy}% accuracy rate
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Average Quiz Score</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-100">{avgQuiz}%</span>
            <span className="text-xs text-amber-400 font-semibold">{quizScores.length} tests taken</span>
          </div>
          <div className="mt-3 text-xs text-slate-400">
            Based on university evaluation tests
          </div>
        </div>
      </div>

      {/* Topic-Wise Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-4">
        <h2 className="text-base font-bold text-slate-100">Module Completion Checklist</h2>
        
        <div className="space-y-2">
          {SYLLABUS_MODULES.map((m) => {
            const isDone = completedTopics.includes(m.id);
            return (
              <div 
                key={m.id}
                onClick={() => onNavigate('topic', m.id)}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex items-center justify-between cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                    isDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {m.number}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-200 block">{m.title}</span>
                    <span className="text-[11px] text-slate-400">{m.subtitle}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isDone ? (
                    <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4" /> Completed
                    </span>
                  ) : (
                    <span className="text-xs text-indigo-400 font-semibold hover:underline">
                      Start Lesson →
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default ProgressPage;
