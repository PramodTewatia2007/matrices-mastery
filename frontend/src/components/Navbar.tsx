import React from 'react';
import { 
  Sparkles, 
  Languages, 
  Search, 
  Activity, 
  CheckCircle2, 
  Moon, 
  Sun,
  BookOpen
} from 'lucide-react';
import { LanguageMode, ThemeMode } from '../types';

interface NavbarProps {
  language: LanguageMode;
  onLanguageChange: (lang: LanguageMode) => void;
  theme: ThemeMode;
  onThemeToggle: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isBackendConnected: boolean;
  completedTopicsCount: number;
  totalTopicsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  theme,
  onThemeToggle,
  searchQuery,
  onSearchChange,
  isBackendConnected,
  completedTopicsCount,
  totalTopicsCount
}) => {
  const progressPercent = Math.round((completedTopicsCount / totalTopicsCount) * 100) || 0;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 transition">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-black text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 to-cyan-300 text-sm">
                [A]
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-slate-100 tracking-tight text-base font-sans">
                MatrixMastery<span className="text-indigo-400 font-mono text-xs ml-1 px-1.5 py-0.5 bg-indigo-500/10 rounded-md border border-indigo-500/30">AI</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Linear Algebra & Matrix University Tutor</p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search topics, formulas (e.g. Cayley-Hamilton, Rank, det)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 transition"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          
          {/* Backend Status Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px]">
            <span className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
            <span className="text-slate-300 font-medium">
              {isBackendConnected ? 'FastAPI + SymPy Live' : 'Client Rational Engine'}
            </span>
          </div>

          {/* Progress Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300 font-semibold">{completedTopicsCount}/{totalTopicsCount}</span>
            <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-300" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>

          {/* Language Mode Selector */}
          <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-0.5 text-xs">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded-lg transition font-medium ${
                language === 'en' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="English only"
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('hinglish')}
              className={`px-2 py-1 rounded-lg transition font-medium ${
                language === 'hinglish' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Hinglish (Hindi in Roman script)"
            >
              Hinglish
            </button>
            <button
              onClick={() => onLanguageChange('both')}
              className={`px-2 py-1 rounded-lg transition font-medium ${
                language === 'both' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Both English and Hinglish side-by-side"
            >
              Both
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;
