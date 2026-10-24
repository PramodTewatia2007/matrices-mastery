import React from 'react';
import { 
  Home, 
  Map, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Eye, 
  Calculator, 
  Award, 
  Bookmark, 
  Settings, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { SYLLABUS_MODULES } from '../data/syllabus';

export type ActiveTab = 
  | 'dashboard' 
  | 'roadmap' 
  | 'topic' 
  | 'examples' 
  | 'questions' 
  | 'visualizer' 
  | 'calculator' 
  | 'quiz' 
  | 'formulas' 
  | 'progress' 
  | 'bookmarks' 
  | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  selectedModuleId: string;
  onSelectModule: (moduleId: string) => void;
  completedTopics: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  selectedModuleId,
  onSelectModule,
  completedTopics
}) => {
  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'roadmap', label: 'Syllabus Roadmap', icon: Map },
    { id: 'topic', label: 'Topic Lessons', icon: BookOpen },
    { id: 'examples', label: 'Solved Examples Library', icon: FileText },
    { id: 'questions', label: 'Practice Question Bank', icon: HelpCircle },
    { id: 'visualizer', label: '2D / 3D Visualizer Lab', icon: Eye },
    { id: 'calculator', label: 'Step-by-Step Calculator', icon: Calculator },
    { id: 'quiz', label: 'Quizzes & Mock Exams', icon: Award },
    { id: 'formulas', label: 'Formula & Theorem Sheet', icon: Sparkles },
    { id: 'progress', label: 'Student Analytics', icon: BarChart3 },
    { id: 'bookmarks', label: 'Revision & Bookmarks', icon: Bookmark },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 bg-slate-950 border-r border-slate-800/80 flex flex-col h-[calc(100vh-53px)] sticky top-[53px] overflow-y-auto">
      
      {/* Primary Navigation */}
      <div className="p-3 space-y-1">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 block mb-1">
          Navigation
        </span>
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id as ActiveTab)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* 14 Syllabus Modules Quick List */}
      <div className="p-3 border-t border-slate-800/80 flex-1">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Syllabus (14 Modules)
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            {completedTopics.length}/14
          </span>
        </div>

        <div className="space-y-1">
          {SYLLABUS_MODULES.map((mod) => {
            const isSelected = selectedModuleId === mod.id && activeTab === 'topic';
            const isCompleted = completedTopics.includes(mod.id);

            return (
              <button
                key={mod.id}
                onClick={() => {
                  onSelectModule(mod.id);
                  onTabChange('topic');
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={`font-mono text-[11px] font-bold shrink-0 ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                    {mod.number < 10 ? `0${mod.number}` : mod.number}
                  </span>
                  <span className="truncate">{mod.title}</span>
                </div>

                {isCompleted ? (
                  <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-400'}`} />
                ) : (
                  <ChevronRight className={`w-3 h-3 shrink-0 opacity-40 ${isSelected ? 'text-white opacity-100' : ''}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
