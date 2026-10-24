import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  FileText, 
  AlertTriangle, 
  Compass, 
  Lightbulb, 
  Bookmark, 
  ChevronRight,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { SyllabusModule, LanguageMode } from '../types';
import { KaTeX } from '../components/KaTeX';
import { Vector3DVisualizer } from '../components/visualizations/Vector3DVisualizer';
import { LinearSystemVisualizer } from '../components/visualizations/LinearSystemVisualizer';
import { DeterminantVisualizer } from '../components/visualizations/DeterminantVisualizer';
import { EigenVisualizer } from '../components/visualizations/EigenVisualizer';
import { ActiveTab } from '../components/Sidebar';

interface TopicDetailProps {
  module: SyllabusModule;
  language: LanguageMode;
  isCompleted: boolean;
  onToggleComplete: (moduleId: string) => void;
  onNavigate: (tab: ActiveTab, moduleId?: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (item: any) => void;
}

export const TopicDetailPage: React.FC<TopicDetailProps> = ({
  module,
  language,
  isCompleted,
  onToggleComplete,
  onNavigate,
  isBookmarked,
  onToggleBookmark
}) => {
  const [activeSubtopicIndex, setActiveSubtopicIndex] = useState<number>(0);
  const [revealedCheck, setRevealedCheck] = useState<Record<string, boolean>>({});

  const currentSubtopic = module.subtopics[activeSubtopicIndex] || module.subtopics[0];

  const toggleCheck = (id: string) => {
    setRevealedCheck(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Topic Header Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              Module {module.number < 10 ? `0${module.number}` : module.number}
            </span>
            <span className="text-xs text-slate-400">Linear Algebra Mastery Unit</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">{module.title}</h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">{module.subtitle}</p>

          {/* Hinglish Subtitle if active */}
          {(language === 'hinglish' || language === 'both') && (
            <p className="text-xs text-amber-300/90 font-medium mt-1">
              {module.hinglishTitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onToggleBookmark({ id: module.id, type: 'topic', title: module.title, moduleId: module.id })}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
              isBookmarked
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>

          <button
            onClick={() => onToggleComplete(module.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md transition ${
              isCompleted
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isCompleted ? 'Completed ✓' : 'Mark as Completed'}
          </button>
        </div>
      </div>

      {/* Quick Navigation to Solved Examples and Question Bank */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate('examples', module.id)}
          className="p-3.5 rounded-2xl bg-indigo-950/30 hover:bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-between text-left transition group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-200 block">15+ Solved Examples Library</span>
              <span className="text-[11px] text-slate-400">Beginner, Intermediate & University Exam derivations</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-indigo-400 transform group-hover:translate-x-1 transition" />
        </button>

        <button
          onClick={() => onNavigate('questions', module.id)}
          className="p-3.5 rounded-2xl bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-between text-left transition group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-200 block">45+ Practice Question Bank</span>
              <span className="text-[11px] text-slate-400">Progressive 3-level hints & full solutions</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-400 transform group-hover:translate-x-1 transition" />
        </button>
      </div>

      {/* Subtopic Tabs */}
      {module.subtopics.length > 1 && (
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          {module.subtopics.map((st, idx) => (
            <button
              key={st.id}
              onClick={() => setActiveSubtopicIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeSubtopicIndex === idx
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {st.title}
            </button>
          ))}
        </div>
      )}

      {/* Conceptual Explanations in English & Hinglish */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          Concept & Mathematical Definition
        </h2>

        {/* Precise Math Definition */}
        <div className="p-3.5 bg-slate-950/80 border-l-2 border-indigo-500 rounded-r-xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
            Formal Definition:
          </span>
          <p className="text-xs text-slate-200 font-serif leading-relaxed">
            {currentSubtopic.concept.mathDefinition}
          </p>
        </div>

        {/* Simple English Explanation */}
        {(language === 'en' || language === 'both') && (
          <div className="p-3.5 bg-slate-950/50 border border-slate-800 rounded-xl space-y-1">
            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-indigo-400" /> In Simple English:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentSubtopic.concept.simpleEnglish}
            </p>
          </div>
        )}

        {/* Natural Hinglish Explanation */}
        {(language === 'hinglish' || language === 'both') && (
          <div className="p-3.5 bg-amber-950/20 border border-amber-500/20 rounded-xl space-y-1">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Hinglish Explanation:
            </span>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              {currentSubtopic.concept.hinglish}
            </p>
          </div>
        )}

        {/* Why it matters & Engineering applications */}
        <div className="p-3.5 bg-indigo-950/20 border border-indigo-500/20 rounded-xl text-xs space-y-1">
          <strong className="text-indigo-400 block">Why it matters & Real-World Engineering Applications:</strong>
          <p className="text-indigo-200/90 leading-relaxed">{currentSubtopic.concept.whyItMatters}</p>
        </div>

        {/* Prerequisites and Pitfalls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
            <span className="font-semibold text-slate-300 block mb-1">Prerequisites:</span>
            <ul className="list-disc list-inside text-slate-400 space-y-0.5">
              {currentSubtopic.concept.prerequisites.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-rose-950/20 border border-rose-500/20 rounded-xl">
            <span className="font-semibold text-rose-400 block mb-1 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Common Student Pitfalls:
            </span>
            <ul className="list-disc list-inside text-rose-200/90 space-y-0.5">
              {currentSubtopic.concept.pitfalls.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Formulas and Theorems with LaTeX */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          Key Formulas & Theorems
        </h2>

        <div className="space-y-4">
          {currentSubtopic.formulas.map((f, fIdx) => (
            <div key={fIdx} className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
              <span className="text-xs font-bold text-indigo-400">{f.name}</span>
              
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                <KaTeX math={f.latex} block className="text-indigo-200" />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{f.description}</p>

              {(language === 'hinglish' || language === 'both') && (
                <p className="text-[11px] text-amber-300/80">
                  <strong className="text-amber-400">Hinglish note: </strong> {f.hinglishDescription}
                </p>
              )}

              {/* Symbol Meanings */}
              {f.symbols && f.symbols.length > 0 && (
                <div className="pt-2 border-t border-slate-800 text-[11px]">
                  <span className="text-slate-400 font-semibold block mb-1">Symbol Meanings:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {f.symbols.map((s, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-slate-300">
                        <span className="font-mono text-indigo-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                          {s.symbol}
                        </span>
                        <span>{s.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Visualization (if applicable to module) */}
      {module.visualizationType && (
        <div className="space-y-2">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            Interactive 2D / 3D Mathematical Exploration
          </h2>

          {module.visualizationType === 'vector_3d' && <Vector3DVisualizer lang={language} />}
          {module.visualizationType === 'linear_system' && <LinearSystemVisualizer lang={language} />}
          {module.visualizationType === 'determinant' && <DeterminantVisualizer lang={language} />}
          {module.visualizationType === 'eigen' && <EigenVisualizer lang={language} />}
          {module.visualizationType === 'orthogonal' && <Vector3DVisualizer title="Orthogonal Rigid Transformation" lang={language} />}
        </div>
      )}

      {/* Module Summary & 5 Quick Checks */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          Module Concept Summary & Exam Cheatsheet
        </h2>

        {/* Quick Revision Bullets */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-300 block">Quick Revision Points:</span>
          <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pl-1">
            {(language === 'hinglish' ? module.summary.hinglishRevision : module.summary.quickRevision).map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        {/* Exam Tips */}
        {module.summary.examTips && module.summary.examTips.length > 0 && (
          <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl text-xs space-y-1">
            <span className="text-amber-400 font-bold block">University Examination Tips & Shortcuts:</span>
            <ul className="list-disc list-inside text-amber-200/90 space-y-0.5">
              {module.summary.examTips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 5 Quick Conceptual Checks */}
        <div className="pt-2">
          <span className="text-xs font-bold text-slate-200 block mb-2">
            5 Quick Conceptual Checks (Click to reveal answer):
          </span>
          <div className="space-y-2">
            {module.summary.quickChecks.map((qc, qcIdx) => {
              const isRevealed = revealedCheck[qc.id];
              return (
                <div key={qc.id} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-xs">
                  <div 
                    onClick={() => toggleCheck(qc.id)}
                    className="flex items-center justify-between cursor-pointer text-slate-200 font-semibold"
                  >
                    <span>Q{qcIdx + 1}: {qc.question}</span>
                    <span className="text-indigo-400 text-[11px] underline ml-2 shrink-0">
                      {isRevealed ? 'Hide' : 'Check Answer'}
                    </span>
                  </div>

                  {isRevealed && (
                    <div className="mt-2 pt-2 border-t border-slate-800/80 text-emerald-300 space-y-1">
                      <p><strong>Answer: </strong> {qc.answer}</p>
                      <p className="text-slate-400 text-[11px]"><strong>Why: </strong> {qc.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

export default TopicDetailPage;
