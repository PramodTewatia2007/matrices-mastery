import React from 'react';
import { Map, ArrowRight, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';
import { SYLLABUS_MODULES } from '../data/syllabus';
import { ActiveTab } from '../components/Sidebar';

interface RoadmapPageProps {
  completedTopics: string[];
  onSelectModule: (moduleId: string) => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({
  completedTopics,
  onSelectModule,
  onNavigate
}) => {
  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
          <Map className="w-3.5 h-3.5" />
          University Linear Algebra Learning Path
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">
          Syllabus Roadmap & Conceptual Hierarchy
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Follow the recommended university curriculum order. Each module builds logically upon the foundations established in preceding units.
        </p>
      </div>

      {/* Vertical Timeline Roadmap */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-2 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-indigo-500/30">
        {SYLLABUS_MODULES.map((m, idx) => {
          const isDone = completedTopics.includes(m.id);

          return (
            <div key={m.id} className="relative group">
              {/* Timeline Node Dot */}
              <div className={`absolute -left-6 sm:-left-10 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                isDone 
                  ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/30' 
                  : 'bg-slate-950 border-indigo-500/50 text-indigo-400'
              }`}>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                )}
              </div>

              {/* Module Card */}
              <div 
                onClick={() => {
                  onSelectModule(m.id);
                  onNavigate('topic');
                }}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition cursor-pointer shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      Module {m.number}
                    </span>
                    {isDone && (
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Mastered
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition">
                    {m.title}
                  </h3>

                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                    {m.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate-500 hidden md:block">~{m.estimatedMinutes} mins</span>
                  <div className="px-3 py-1.5 rounded-xl bg-slate-800 group-hover:bg-indigo-600 text-slate-200 group-hover:text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm">
                    <span>{isDone ? 'Review Lesson' : 'Start Module'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default RoadmapPage;
