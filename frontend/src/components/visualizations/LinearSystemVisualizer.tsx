import React, { useState, useEffect, useRef } from 'react';
import { Sliders, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

interface LinearSystemProps {
  lang?: 'en' | 'hinglish' | 'both';
}

export const LinearSystemVisualizer: React.FC<LinearSystemProps> = ({ lang = 'both' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Line 1: a1*x + b1*y = c1
  const [a1, setA1] = useState<number>(2);
  const [b1, setB1] = useState<number>(1);
  const [c1, setC1] = useState<number>(4);

  // Line 2: a2*x + b2*y = c2
  const [a2, setA2] = useState<number>(1);
  const [b2, setB2] = useState<number>(-1);
  const [c2, setC2] = useState<number>(1);

  // Determinant: a1*b2 - a2*b1
  const det = a1 * b2 - a2 * b1;
  const isParallel = Math.abs(det) < 1e-5;

  // Check if coincident or strictly parallel
  // Coincident if a1/a2 = b1/b2 = c1/c2
  const isCoincident = isParallel && Math.abs(a1 * c2 - a2 * c1) < 1e-5 && Math.abs(b1 * c2 - b2 * c1) < 1e-5;

  let solX = 0;
  let solY = 0;
  if (!isParallel) {
    solX = (c1 * b2 - c2 * b1) / det;
    solY = (a1 * c2 - a2 * c1) / det;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height / 2;
    const scale = 28; // pixels per mathematical unit

    // Background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;

    for (let x = originX % scale; x < width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = originY % scale; y < height; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Axis numbers
    ctx.fillStyle = '#64748b';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('0', originX + 4, originY - 4);
    ctx.fillText('X', width - 15, originY - 6);
    ctx.fillText('Y', originX + 6, 15);

    // Draw Line helper
    const drawLine = (a: number, b: number, c: number, color: string, widthLine: number) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = widthLine;
      ctx.beginPath();

      const points: [number, number][] = [];
      const xRange = width / (2 * scale);

      if (Math.abs(b) > 1e-5) {
        // y = (c - a*x) / b
        for (let xMath = -xRange; xMath <= xRange; xMath += 0.5) {
          const yMath = (c - a * xMath) / b;
          const px = originX + xMath * scale;
          const py = originY - yMath * scale;
          points.push([px, py]);
        }
      } else if (Math.abs(a) > 1e-5) {
        // Vertical line: x = c / a
        const xMath = c / a;
        const px = originX + xMath * scale;
        points.push([px, 0]);
        points.push([px, height]);
      }

      if (points.length > 0) {
        ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i][0], points[i][1]);
        }
        ctx.stroke();
      }
    };

    // Draw Line 1 (Indigo)
    drawLine(a1, b1, c1, '#818cf8', 2.5);

    // Draw Line 2 (Emerald or Amber)
    drawLine(a2, b2, c2, '#34d399', 2.5);

    // Intersection point
    if (!isParallel) {
      const px = originX + solX * scale;
      const py = originY - solY * scale;

      // Glow circle
      ctx.fillStyle = 'rgba(236, 72, 153, 0.3)';
      ctx.beginPath();
      ctx.arc(px, py, 12, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, 2 * Math.PI);
      ctx.fill();

      // Label coordinate
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(`(${solX.toFixed(2)}, ${solY.toFixed(2)})`, px + 8, py - 8);
    }
  }, [a1, b1, c1, a2, b2, c2, solX, solY, isParallel]);

  const loadPreset = (type: 'unique' | 'inconsistent' | 'infinite') => {
    if (type === 'unique') {
      setA1(2); setB1(1); setC1(4);
      setA2(1); setB2(-1); setC2(1);
    } else if (type === 'inconsistent') {
      // 2x + y = 4 and 2x + y = -2 (parallel)
      setA1(2); setB1(1); setC1(4);
      setA2(2); setB2(1); setC2(-2);
    } else if (type === 'infinite') {
      // 2x + y = 4 and 4x + 2y = 8 (coincident)
      setA1(2); setB1(1); setC1(4);
      setA2(4); setB2(2); setC2(8);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-4">
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          2D Linear Systems & Rouché-Capelli Visualizer
        </h3>

        <div className="flex items-center gap-2">
          {!isParallel ? (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Unique Solution: ({solX.toFixed(2)}, {solY.toFixed(2)})
            </span>
          ) : isCoincident ? (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Infinitely Many Solutions (Coincident Lines)
            </span>
          ) : (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Inconsistent (Parallel Lines - No Solution)
            </span>
          )}
        </div>
      </div>

      {/* Canvas */}
      <div className="flex justify-center mt-3">
        <canvas
          ref={canvasRef}
          width={640}
          height={340}
          className="rounded-xl border border-slate-800 max-w-full shadow-inner"
        />
      </div>

      {/* Equations & Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Line 1 */}
        <div className="p-3 bg-slate-950/70 border border-indigo-500/30 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-indigo-300">
            <span>Equation 1: ({a1})x + ({b1})y = {c1}</span>
            <span className="w-3 h-3 rounded-full bg-indigo-400 inline-block" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <label className="text-slate-400 block text-[10px]">a₁: {a1}</label>
              <input type="range" min="-5" max="5" step="0.5" value={a1} onChange={e => setA1(parseFloat(e.target.value))} className="w-full accent-indigo-500" />
            </div>
            <div>
              <label className="text-slate-400 block text-[10px]">b₁: {b1}</label>
              <input type="range" min="-5" max="5" step="0.5" value={b1} onChange={e => setB1(parseFloat(e.target.value))} className="w-full accent-indigo-500" />
            </div>
            <div>
              <label className="text-slate-400 block text-[10px]">c₁: {c1}</label>
              <input type="range" min="-10" max="10" step="1" value={c1} onChange={e => setC1(parseFloat(e.target.value))} className="w-full accent-indigo-500" />
            </div>
          </div>
        </div>

        {/* Line 2 */}
        <div className="p-3 bg-slate-950/70 border border-emerald-500/30 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-emerald-300">
            <span>Equation 2: ({a2})x + ({b2})y = {c2}</span>
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <label className="text-slate-400 block text-[10px]">a₂: {a2}</label>
              <input type="range" min="-5" max="5" step="0.5" value={a2} onChange={e => setA2(parseFloat(e.target.value))} className="w-full accent-emerald-500" />
            </div>
            <div>
              <label className="text-slate-400 block text-[10px]">b₂: {b2}</label>
              <input type="range" min="-5" max="5" step="0.5" value={b2} onChange={e => setB2(parseFloat(e.target.value))} className="w-full accent-emerald-500" />
            </div>
            <div>
              <label className="text-slate-400 block text-[10px]">c₂: {c2}</label>
              <input type="range" min="-10" max="10" step="1" value={c2} onChange={e => setC2(parseFloat(e.target.value))} className="w-full accent-emerald-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Presets */}
      <div className="mt-3 flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Presets:</span>
          <button
            onClick={() => loadPreset('unique')}
            className="px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            Intersecting (Unique)
          </button>
          <button
            onClick={() => loadPreset('inconsistent')}
            className="px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            Parallel (No Solution)
          </button>
          <button
            onClick={() => loadPreset('infinite')}
            className="px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            Same Line (Infinite)
          </button>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          det(A) = a₁b₂ - a₂b₁ = <span className="text-indigo-300 font-bold">{det.toFixed(2)}</span>
        </div>
      </div>

      {/* Explanations */}
      <div className="mt-3 p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs space-y-1">
        {(lang === 'en' || lang === 'both') && (
          <p className="text-slate-300">
            <strong className="text-indigo-400">Geometric Insight: </strong>
            {!isParallel 
              ? "The lines cross at exactly one point (det(A) ≠ 0). Rank(A) = Rank([A|B]) = 2, giving a single unique solution."
              : isCoincident
              ? "Both equations describe the identical line! Rank(A) = Rank([A|B]) = 1 < 2, yielding infinitely many solutions."
              : "The lines are parallel and never meet! Rank(A) = 1 while Rank([A|B]) = 2. Rouché-Capelli confirms no solution."}
          </p>
        )}
        {(lang === 'hinglish' || lang === 'both') && (
          <p className="text-amber-300/90">
            <strong className="text-amber-400">Hinglish: </strong>
            {!isParallel 
              ? "Dono lines ek doosre ko ek point par kaat rahi hain (det ≠ 0). Rank barabar hai, isliye sirf ek Unique Solution milta hai."
              : isCoincident
              ? "Dono equations asal mein ek hi line hain! Rank(A) = 1 jo variables (2) se kam hai, isliye anant (infinite) solutions milte hain."
              : "Dono lines parallel hain aur kabhi nahi milengi! Rank(A) augmented rank se kam hai, isliye koi solution nahi hai (Inconsistent)."}
          </p>
        )}
      </div>
    </div>
  );
};

export default LinearSystemVisualizer;
