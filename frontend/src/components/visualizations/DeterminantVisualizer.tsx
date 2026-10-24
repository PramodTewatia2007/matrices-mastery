import React, { useState, useEffect, useRef } from 'react';
import { Square, ArrowRight, RotateCw, Maximize2, AlertCircle } from 'lucide-react';

interface DeterminantProps {
  lang?: 'en' | 'hinglish' | 'both';
}

export const DeterminantVisualizer: React.FC<DeterminantProps> = ({ lang = 'both' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matrix entries: [ [a, b], [c, d] ]
  // i_hat -> (a, c)
  // j_hat -> (b, d)
  const [a, setA] = useState<number>(2);
  const [b, setB] = useState<number>(1);
  const [c, setC] = useState<number>(0.5);
  const [d, setD] = useState<number>(1.5);

  const det = a * d - b * c;
  const absArea = Math.abs(det);
  const isSingular = Math.abs(det) < 1e-4;
  const isFlipped = det < -1e-4;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height / 2;
    const scale = 45; // pixels per unit

    // Clear background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Subtle grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = originX % scale; x < width; x += scale) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = originY % scale; y < height; y += scale) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, originY); ctx.lineTo(width, originY);
    ctx.moveTo(originX, 0); ctx.lineTo(originX, height);
    ctx.stroke();

    // 1. Draw Original Unit Square (dashed slate)
    ctx.strokeStyle = '#64748b';
    ctx.setLineDash([4, 4]);
    ctx.fillStyle = 'rgba(100, 116, 139, 0.1)';
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + 1 * scale, originY);
    ctx.lineTo(originX + 1 * scale, originY - 1 * scale);
    ctx.lineTo(originX, originY - 1 * scale);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]); // reset dash

    // 2. Draw Transformed Parallelogram
    // Corners: (0,0), (a, c), (a+b, c+d), (b, d)
    const p0 = { x: originX, y: originY };
    const p1 = { x: originX + a * scale, y: originY - c * scale };
    const p2 = { x: originX + (a + b) * scale, y: originY - (c + d) * scale };
    const p3 = { x: originX + b * scale, y: originY - d * scale };

    ctx.fillStyle = isSingular 
      ? 'rgba(239, 68, 68, 0.2)' 
      : isFlipped 
      ? 'rgba(168, 85, 247, 0.25)' 
      : 'rgba(52, 211, 153, 0.25)';
      
    ctx.strokeStyle = isSingular ? '#ef4444' : isFlipped ? '#c084fc' : '#10b981';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Vector Arrow Helper
    const drawArrow = (fromX: number, fromY: number, toX: number, toY: number, color: string, label: string) => {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();

      // Arrow head
      const headlen = 8;
      const dx = toX - fromX;
      const dy = toY - fromY;
      const angle = Math.atan2(dy, dx);
      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();

      // Label
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(label, toX + 6, toY - 4);
    };

    // Vector 1 (T(i_hat) = (a, c) in Cyan)
    drawArrow(p0.x, p0.y, p1.x, p1.y, '#38bdf8', `T(î) = [${a}, ${c}]`);

    // Vector 2 (T(j_hat) = (b, d) in Rose)
    drawArrow(p0.x, p0.y, p3.x, p3.y, '#f43f5e', `T(ĵ) = [${b}, ${d}]`);

  }, [a, b, c, d, isSingular, isFlipped]);

  const loadPreset = (preset: 'scale' | 'shear' | 'rotate90' | 'reflect' | 'singular') => {
    if (preset === 'scale') {
      setA(2); setB(0); setC(0); setD(2);
    } else if (preset === 'shear') {
      setA(1); setB(1.5); setC(0); setD(1);
    } else if (preset === 'rotate90') {
      setA(0); setB(-1); setC(1); setD(0);
    } else if (preset === 'reflect') {
      setA(0); setB(1); setC(1); setD(0);
    } else if (preset === 'singular') {
      setA(1); setB(2); setC(1); setD(2);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-4">
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Square className="w-5 h-5 text-indigo-400" />
          Determinant as Area Scaling Factor Visualizer
        </h3>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
            isSingular
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              : isFlipped
              ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          }`}>
            {isSingular 
              ? 'Area = 0 (Collapsed / Singular)' 
              : `Area = ${absArea.toFixed(2)} (${isFlipped ? 'Flipped Orientation' : 'Preserved Orientation'})`}
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex justify-center mt-3">
        <canvas
          ref={canvasRef}
          width={640}
          height={320}
          className="rounded-xl border border-slate-800 max-w-full shadow-inner"
        />
      </div>

      {/* Matrix Controls */}
      <div className="mt-4 p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
        <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
          <span>Transformation Matrix A = [ [a, b], [c, d] ]</span>
          <span className="font-mono text-indigo-400 font-bold">
            det(A) = ({a})({d}) - ({b})({c}) = {det.toFixed(2)}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="text-cyan-400 block text-[11px] font-mono">a (T(î) x): {a}</label>
            <input type="range" min="-3" max="3" step="0.25" value={a} onChange={e => setA(parseFloat(e.target.value))} className="w-full accent-cyan-400" />
          </div>
          <div>
            <label className="text-rose-400 block text-[11px] font-mono">b (T(ĵ) x): {b}</label>
            <input type="range" min="-3" max="3" step="0.25" value={b} onChange={e => setB(parseFloat(e.target.value))} className="w-full accent-rose-400" />
          </div>
          <div>
            <label className="text-cyan-400 block text-[11px] font-mono">c (T(î) y): {c}</label>
            <input type="range" min="-3" max="3" step="0.25" value={c} onChange={e => setC(parseFloat(e.target.value))} className="w-full accent-cyan-400" />
          </div>
          <div>
            <label className="text-rose-400 block text-[11px] font-mono">d (T(ĵ) y): {d}</label>
            <input type="range" min="-3" max="3" step="0.25" value={d} onChange={e => setD(parseFloat(e.target.value))} className="w-full accent-rose-400" />
          </div>
        </div>
      </div>

      {/* Presets */}
      <div className="mt-3 flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400">Presets:</span>
          <button onClick={() => loadPreset('scale')} className="px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200">Scale 2x</button>
          <button onClick={() => loadPreset('shear')} className="px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200">Horizontal Shear</button>
          <button onClick={() => loadPreset('rotate90')} className="px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200">90° Rotation</button>
          <button onClick={() => loadPreset('reflect')} className="px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200">Reflection (y=x)</button>
          <button onClick={() => loadPreset('singular')} className="px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200">Singular (det = 0)</button>
        </div>
      </div>

      {/* Explanations */}
      <div className="mt-3 p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs space-y-1">
        {(lang === 'en' || lang === 'both') && (
          <p className="text-slate-300">
            <strong className="text-indigo-400">Geometric Rule: </strong>
            The absolute value |det(A)| = {absArea.toFixed(2)} tells you by what factor the area of any shape is magnified under transformation A.
            {det < 0 && " The negative sign indicates that space is inverted/flipped (orientation reversed)."}
            {isSingular && " Determinant is 0! The 2D area collapses onto a 1D line, losing information — which is why singular matrices have no inverse."}
          </p>
        )}
        {(lang === 'hinglish' || lang === 'both') && (
          <p className="text-amber-300/90">
            <strong className="text-amber-400">Hinglish: </strong>
            Determinant batata hai ki matrix transformation kisi bhi shape ke area ko kitne guna badha ya ghata deta hai.
            {det < 0 && " Negative sign ka matlab space flip ho gaya hai (paper ko palti maarne jaisa)."}
            {isSingular && " Yahan determinant 0 hai! 2D area pichak kar ek 1D line ban gaya hai, isliye iska inverse kabhi nahi nikal sakta."}
          </p>
        )}
      </div>
    </div>
  );
};

export default DeterminantVisualizer;
