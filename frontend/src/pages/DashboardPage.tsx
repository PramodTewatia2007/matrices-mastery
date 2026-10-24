import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle, 
  Award, 
  Calculator,
  Compass,
  PlayCircle
} from 'lucide-react';
import { SYLLABUS_MODULES } from '../data/syllabus';
import { ActiveTab } from '../components/Sidebar';
import { LanguageMode } from '../types';

interface DashboardProps {
  onNavigate: (tab: ActiveTab, moduleId?: string) => void;
  completedTopics: string[];
  questionAttemptsCount: number;
  avgQuizScore: number;
  language: LanguageMode;
}

export const DashboardPage: React.FC<DashboardProps> = ({
  onNavigate,
  completedTopics,
  questionAttemptsCount,
  avgQuizScore,
  language
}) => {
  const nextModule = SYLLABUS_MODULES.find(m => !completedTopics.includes(m.id)) || SYLLABUS_MODULES[0];
  const progressPercent = Math.round((completedTopics.length / SYLLABUS_MODULES.length) * 100);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            University Linear Algebra Tutor
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Master Every Concept in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300">Matrices & Systems</span>
          </h1>

          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            {language === 'hinglish' 
              ? 'Syllabus ke sabhi 14 modules beginner se university exam level tak seekhein: step-by-step derivations, interactive 3D visualizations, hints ke sath numerical problems, aur exact calculations.'
              : 'Interactive 3D geometry, step-by-step Gauss-Jordan elimination, rank theorems, eigenvalues, and Cayley-Hamilton with progressive hints and exact calculations.'}
          </p>

          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <button
              onClick={() => onNavigate('topic', nextModule.id)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition"
            >
              <PlayCircle className="w-4 h-4" />
              Continue Lesson: Module {nextModule.number}
            </button>
            <button
              onClick={() => onNavigate('calculator')}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 font-semibold text-xs flex items-center gap-2 border border-slate-700 transition"
            >
              <Calculator className="w-4 h-4 text-indigo-400" />
              Open Matrix Calculator
            </button>
            <button
              onClick={() => onNavigate('visualizer')}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 font-semibold text-xs flex items-center gap-2 border border-slate-700 transition"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              3D Visualizer Lab
            </button>
          </div>
        </div>
      </div>

      {/* Progress Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Syllabus Covered</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-100">{completedTopics.length}/14</span>
            <span className="text-xs text-indigo-400 font-semibold">{progressPercent}%</span>
          </div>
          <div className="mt-2 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Practice Problems</span>
            <HelpCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-100">{questionAttemptsCount}</span>
            <span className="text-xs text-slate-400">attempted</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">With progressive hints</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Average Quiz Score</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-100">{avgQuizScore}%</span>
            <span className="text-xs text-amber-400 font-semibold">Mastery</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">From topic evaluations</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Next Target</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 truncate font-semibold text-sm text-slate-100">
            Mod {nextModule.number}: {nextModule.title}
          </div>
          <p className="text-[11px] text-indigo-300 mt-1">Ready to explore</p>
        </div>
      </div>

      {/* 14 Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-100">Linear Algebra Modules Syllabus</h2>
          <button
            onClick={() => onNavigate('roadmap')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
          >
            View Interactive Roadmap <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SYLLABUS_MODULES.map((m) => {
            const isCompleted = completedTopics.includes(m.id);

            return (
              <div
                key={m.id}
                onClick={() => onNavigate('topic', m.id)}
                className="group p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 cursor-pointer transition shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      Module {m.number < 10 ? `0${m.number}` : m.number}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500">~{m.estimatedMinutes} mins</span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-100 text-sm group-hover:text-indigo-300 transition">
                    {m.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {language === 'hinglish' ? m.hinglishTitle : m.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-indigo-400">
                  <span>{m.subtopics.length} key lessons</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
