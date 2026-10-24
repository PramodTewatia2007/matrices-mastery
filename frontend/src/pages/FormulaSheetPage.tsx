import React, { useState } from 'react';
import { Sparkles, Search, BookOpen, ExternalLink } from 'lucide-react';
import { SYLLABUS_MODULES } from '../data/syllabus';
import { KaTeX } from '../components/KaTeX';
import { LanguageMode } from '../types';

interface FormulaSheetProps {
  language: LanguageMode;
}

export const FormulaSheetPage: React.FC<FormulaSheetProps> = ({ language }) => {
  const [search, setSearch] = useState<string>('');

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Quick Revision Cheat Sheet
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">
          Formulas, Theorems & Identities Reference
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Complete mathematical reference sheet containing conditions, formulas, theorems, and definitions across all 14 syllabus modules.
        </p>

        <div className="mt-4 relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search formulas (e.g. Cayley, Rouché, Spectral, Adjoint)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Modules Formula Grid */}
      <div className="space-y-6">
        {SYLLABUS_MODULES.map((m) => {
          const formulas = m.subtopics.flatMap(s => s.formulas);
          const filteredFormulas = formulas.filter(f => 
            f.name.toLowerCase().includes(search.toLowerCase()) ||
            f.description.toLowerCase().includes(search.toLowerCase()) ||
            f.latex.toLowerCase().includes(search.toLowerCase())
          );

          if (search && filteredFormulas.length === 0 && !m.title.toLowerCase().includes(search.toLowerCase())) {
            return null;
          }

          return (
            <div key={m.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    Module {m.number}
                  </span>
                  <h3 className="font-bold text-slate-100 text-sm">{m.title}</h3>
                </div>
              </div>

              {/* Formulas list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredFormulas.map((f, fIdx) => (
                  <div key={fIdx} className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
                    <span className="text-xs font-bold text-indigo-300 block">{f.name}</span>
                    <div className="py-2 overflow-x-auto">
                      <KaTeX math={f.latex} block className="text-indigo-200" />
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{f.description}</p>
                    {(language === 'hinglish' || language === 'both') && (
                      <p className="text-[11px] text-amber-300/80">
                        <strong>Hinglish: </strong> {f.hinglishDescription}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Theorems */}
              {m.summary.theorems && m.summary.theorems.length > 0 && (
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-xs font-bold text-slate-300 block mb-2">Key Theorems:</span>
                  <div className="space-y-2">
                    {m.summary.theorems.map((th, thIdx) => (
                      <div key={thIdx} className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-lg text-xs space-y-1">
                        <strong className="text-indigo-400 block">{th.name}</strong>
                        <p className="text-slate-200">{th.statement}</p>
                        <p className="text-[11px] text-indigo-300/80">
                          <strong>Condition: </strong> {th.condition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default FormulaSheetPage;
