import React from 'react';
import { Settings, Languages, Moon, Sun, RotateCcw, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { LanguageMode, ThemeMode } from '../types';

interface SettingsPageProps {
  language: LanguageMode;
  onLanguageChange: (lang: LanguageMode) => void;
  theme: ThemeMode;
  onThemeToggle: () => void;
  isBackendConnected: boolean;
  onResetProgress: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  language,
  onLanguageChange,
  theme,
  onThemeToggle,
  isBackendConnected,
  onResetProgress
}) => {
  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
          <Settings className="w-3.5 h-3.5" />
          Application Preferences
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">
          Settings & Learning Modes
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Customize your study language mode, color theme, and verify mathematical engine connectivity.
        </p>
      </div>

      <div className="space-y-4">
        
        {/* Language Selection */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-200">Teaching Language Mode</h3>
          </div>
          <p className="text-xs text-slate-400">
            Choose how mathematical explanations, derivations, and hints are narrated.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              onClick={() => onLanguageChange('en')}
              className={`p-3.5 rounded-xl border text-xs text-left transition ${
                language === 'en'
                  ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="block font-bold text-sm mb-1">English</span>
              <span>Clean, beginner-friendly academic English terminology.</span>
            </button>

            <button
              onClick={() => onLanguageChange('hinglish')}
              className={`p-3.5 rounded-xl border text-xs text-left transition ${
                language === 'hinglish'
                  ? 'bg-amber-600/20 border-amber-500 text-white font-semibold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="block font-bold text-sm mb-1 text-amber-300">Hinglish</span>
              <span>Natural Roman-script Hindi mixed with mathematical terms.</span>
            </button>

            <button
              onClick={() => onLanguageChange('both')}
              className={`p-3.5 rounded-xl border text-xs text-left transition ${
                language === 'both'
                  ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="block font-bold text-sm mb-1 text-indigo-300">Both Side-by-Side</span>
              <span>Read English definitions with paired Hinglish intuitions.</span>
            </button>
          </div>
        </div>

        {/* Engine Connectivity */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-slate-200">Mathematical Calculation Engine</h3>
          <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="font-semibold text-slate-200 block">FastAPI + SymPy Symbolic Server</span>
              <span className="text-slate-400">
                {isBackendConnected 
                  ? 'Connected at http://127.0.0.1:8000 (Active verification)' 
                  : 'Disconnected (Running on fast client rational engine)'}
              </span>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
              isBackendConnected 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
            }`}>
              {isBackendConnected ? 'Online (SymPy)' : 'Client Rational'}
            </span>
          </div>
        </div>

        {/* Reset Learning Data */}
        <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-3">
          <div className="flex items-center gap-2 text-rose-400">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="text-sm font-bold">Reset Student Progress</h3>
          </div>
          <p className="text-xs text-rose-200/80">
            Clears your completed modules, question attempts, and saved quiz scores so you can start a fresh preparation cycle.
          </p>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset your learning progress and quiz scores?")) {
                onResetProgress();
              }
            }}
            className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset My Progress
          </button>
        </div>

      </div>

    </div>
  );
};

export default SettingsPage;
