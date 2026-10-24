import React from 'react';
import { CheckCircle, AlertOctagon, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { SolvedExample } from '../types';
import { KaTeX } from './KaTeX';

interface StepByStepProps {
  example: SolvedExample;
  lang?: 'en' | 'hinglish' | 'both';
}

export const StepByStepSolution: React.FC<StepByStepProps> = ({ example, lang = 'both' }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <span className={`px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded border mr-2 ${
            example.difficulty === 'beginner' 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : example.difficulty === 'intermediate'
              ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
          }`}>
            {example.difficulty}
          </span>
          <span className="text-xs text-slate-400">{example.conceptUsed}</span>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-slate-200 mb-1">{example.title}</h4>
        <p className="text-sm text-slate-100 font-medium leading-relaxed">{example.question}</p>
        {example.questionLatex && (
          <KaTeX math={example.questionLatex} block className="text-indigo-300" />
        )}
      </div>

      {/* Given, Required, Method */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-lg">
          <span className="text-slate-400 font-semibold block mb-1">Given Information:</span>
          <span className="text-slate-200">{example.given}</span>
        </div>
        <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-lg">
          <span className="text-slate-400 font-semibold block mb-1">Required:</span>
          <span className="text-slate-200">{example.required}</span>
        </div>
        <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-lg">
          <span className="text-slate-400 font-semibold block mb-1">Formula / Method:</span>
          <span className="text-indigo-300 font-mono">{example.formulaOrTheorem}</span>
        </div>
      </div>

      {/* Why this method */}
      <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-xl text-xs text-indigo-200">
        <strong className="text-indigo-400">Why this method: </strong>
        {example.whyThisMethod}
      </div>

      {/* Intermediate Steps */}
      <div className="space-y-3 pt-2">
        <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Complete Step-by-Step Derivation:
        </h5>
        {example.steps.map((st) => (
          <div key={st.stepNumber} className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-indigo-400">Step {st.stepNumber}: {st.title}</span>
              {st.rowOperation && (
                <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[11px] border border-amber-500/20">
                  {st.rowOperation}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{st.description}</p>

            {st.latex && (
              <KaTeX math={st.latex} block className="text-indigo-200" />
            )}

            {/* Step Hinglish explanation */}
            {(lang === 'hinglish' || lang === 'both') && (
              <p className="text-[11px] text-amber-300/80 pt-1 border-t border-slate-800/80">
                <strong className="text-amber-400">Hinglish note: </strong> {st.hinglishDescription}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Final Answer Banner */}
      <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-between flex-wrap gap-2">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Final Answer:</span>
          <span className="text-sm font-semibold text-slate-100">{example.finalAnswer}</span>
        </div>
        {example.finalAnswerLatex && (
          <KaTeX math={example.finalAnswerLatex} className="text-emerald-300 font-bold" />
        )}
      </div>

      {/* Verification */}
      {example.verification && (
        <div className="p-3 bg-slate-950/80 border border-emerald-500/20 rounded-xl flex items-start gap-2 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
          <div>
            <strong className="text-emerald-400">Mathematical Verification: </strong>
            <span className="text-slate-300">{example.verification}</span>
          </div>
        </div>
      )}

      {/* Bilingual Concept Takeaway */}
      <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs space-y-2">
        {(lang === 'en' || lang === 'both') && (
          <p className="text-slate-300">
            <strong className="text-indigo-400">Key Takeaway (English): </strong>
            {example.englishExplanation}
          </p>
        )}
        {(lang === 'hinglish' || lang === 'both') && (
          <p className="text-amber-300/90">
            <strong className="text-amber-400">Key Takeaway (Hinglish): </strong>
            {example.hinglishExplanation}
          </p>
        )}
      </div>

      {/* Common Mistakes */}
      {example.commonMistakes && example.commonMistakes.length > 0 && (
        <div className="p-3 bg-rose-950/20 border border-rose-500/20 rounded-xl text-xs space-y-1">
          <span className="text-rose-400 font-semibold flex items-center gap-1.5">
            <AlertOctagon className="w-3.5 h-3.5" /> Common Mistakes to Avoid in Exams:
          </span>
          <ul className="list-disc list-inside space-y-0.5 text-rose-200/90 pl-1">
            {example.commonMistakes.map((m, mIdx) => (
              <li key={mIdx}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StepByStepSolution;
