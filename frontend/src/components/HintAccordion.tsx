import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { KaTeX } from './KaTeX';

interface HintAccordionProps {
  hints: {
    hint1: string;
    hint2: string;
    hint3: string;
  };
  fullSolution: {
    steps: string[];
    englishExplanation: string;
    hinglishExplanation: string;
  };
  finalAnswer: string;
  finalAnswerLatex?: string;
  lang?: 'en' | 'hinglish' | 'both';
  onHintUsed?: (level: number) => void;
}

export const HintAccordion: React.FC<HintAccordionProps> = ({
  hints,
  fullSolution,
  finalAnswer,
  finalAnswerLatex,
  lang = 'both',
  onHintUsed
}) => {
  const [revealedLevel, setRevealedLevel] = useState<number>(0);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const handleRevealNextHint = () => {
    if (revealedLevel < 3) {
      const nextLevel = revealedLevel + 1;
      setRevealedLevel(nextLevel);
      if (onHintUsed) onHintUsed(nextLevel);
    }
  };

  return (
    <div className="mt-3 space-y-2">
      {/* Progressive Hints Section */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Lightbulb className="w-4 h-4" />
            <span>Progressive Hints ({revealedLevel}/3 Unlocked)</span>
          </div>

          {revealedLevel < 3 && (
            <button
              onClick={handleRevealNextHint}
              className="text-xs px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition font-medium"
            >
              Unlock Hint {revealedLevel + 1}
            </button>
          )}
        </div>

        {/* Hint 1 */}
        {revealedLevel >= 1 && (
          <div className="mt-2.5 p-2.5 bg-amber-950/20 border-l-2 border-amber-500 text-xs text-amber-200/90 rounded-r">
            <strong className="text-amber-400">Hint 1 (Concept): </strong>
            {hints.hint1}
          </div>
        )}

        {/* Hint 2 */}
        {revealedLevel >= 2 && (
          <div className="mt-2 p-2.5 bg-amber-950/20 border-l-2 border-amber-400 text-xs text-amber-200/90 rounded-r">
            <strong className="text-amber-400">Hint 2 (Formula/Method): </strong>
            {hints.hint2}
          </div>
        )}

        {/* Hint 3 */}
        {revealedLevel >= 3 && (
          <div className="mt-2 p-2.5 bg-amber-950/20 border-l-2 border-amber-300 text-xs text-amber-200/90 rounded-r">
            <strong className="text-amber-400">Hint 3 (Next Critical Step): </strong>
            {hints.hint3}
          </div>
        )}
      </div>

      {/* Solution Toggle */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60">
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-300 hover:bg-slate-800/60 transition"
        >
          <span className="flex items-center gap-2">
            {showSolution ? <EyeOff className="w-4 h-4 text-indigo-400" /> : <Eye className="w-4 h-4 text-indigo-400" />}
            {showSolution ? 'Hide Worked Solution & Final Answer' : 'Show Full Worked Solution'}
          </span>
          {showSolution ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {showSolution && (
          <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-3 text-xs">
            {/* Steps list */}
            <div>
              <h5 className="font-semibold text-slate-200 mb-2">Step-by-Step Derivation:</h5>
              <div className="space-y-1.5 pl-2 border-l border-slate-800">
                {fullSolution.steps.map((st, sIdx) => (
                  <p key={sIdx} className="text-slate-300 leading-relaxed">
                    <span className="font-mono text-indigo-400 font-semibold mr-1.5">[{sIdx + 1}]</span>
                    {st}
                  </p>
                ))}
              </div>
            </div>

            {/* Final Answer */}
            <div className="p-2.5 bg-emerald-950/30 border border-emerald-500/30 rounded-lg">
              <span className="text-emerald-400 font-bold block mb-1">Final Answer:</span>
              <span className="text-slate-100 font-medium">{finalAnswer}</span>
              {finalAnswerLatex && (
                <KaTeX math={finalAnswerLatex} block className="text-emerald-300" />
              )}
            </div>

            {/* Bilingual Reasoning */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              {(lang === 'en' || lang === 'both') && (
                <div className="text-slate-300">
                  <strong className="text-indigo-400">English Reasoning: </strong>
                  {fullSolution.englishExplanation}
                </div>
              )}
              {(lang === 'hinglish' || lang === 'both') && (
                <div className="text-amber-300/90">
                  <strong className="text-amber-400">Hinglish: </strong>
                  {fullSolution.hinglishExplanation}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HintAccordion;
