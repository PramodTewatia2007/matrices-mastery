import React, { useState, useEffect, useRef } from 'react';
import { Target, Sparkles } from 'lucide-react';

interface EigenVisualizerProps {
  lang?: 'en' | 'hinglish' | 'both';
}

export const EigenVisualizer: React.FC<EigenVisualizerProps> = ({ lang = 'both' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matrix A: [ [a, b], [c, d] ]
  // Example: symmetric matrix [ [3, 1], [1, 3] ] -> eigenvalues 4 (along y=x) and 2 (along y=-x)
  const [a, setA] = useState<number>(3);
  const [b, setB] = useState<number>(1);
  const [c, setC] = useState<number>(1);
  const [d, setD] = useState<number>(3);

  // Input vector angle in degrees (0 to 360)
  const [angleDeg, setAngleDeg] = useState<number>(45);

  const angleRad = (angleDeg * Math.PI) / 180;
  const vx = Math.cos(angleRad);
  const vy = Math.sin(angleRad);

  // Transformed vector: Av
  const wx = a * vx + b * vy;
  const wy = c * vx + d * vy;

  // Cross product (2D): vx*wy - vy*wx = 0 when collinear (eigenvector!)
  const cross = vx * wy - vy * wx;
  const isEigenvector = Math.abs(cross) < 0.08;

  // Approximate eigenvalue lambda: dot(w, v) / dot(v, v)
  const lambda = vx * wx + vy * wy;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height / 2;
    const scale = 40;

    // Background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Grid
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

    // Unit circle (slate dashed)
    ctx.strokeStyle = '#334155';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(originX, originY, scale, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([]);

    // Helper: draw arrow
    const drawArrow = (tx: number, ty: number, color: string, widthLine: number, label: string) => {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = widthLine;

      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX + tx * scale, originY - ty * scale);
      ctx.stroke();

      const headlen = 9;
      const angle = Math.atan2(-ty, tx);
      const endX = originX + tx * scale;
      const endY = originY - ty * scale;

      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX - headlen * Math.cos(angle - Math.PI / 6), endY - headlen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(endX - headlen * Math.cos(angle + Math.PI / 6), endY - headlen * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();

      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(label, endX + 8, endY - 6);
    };

    // If eigenvector, draw extended invariant line through origin
    if (isEigenvector) {
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.4)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(originX - vx * 300, originY + vy * 300);
      ctx.lineTo(originX + vx * 300, originY - vy * 300);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Vector v (Cyan)
    drawArrow(vx, vy, '#38bdf8', 2.5, 'v');

    // Draw Transformed Vector Av (Amber/Gold or Rose)
    const wColor = isEigenvector ? '#eab308' : '#ec4899';
    drawArrow(wx, wy, wColor, 3, isEigenvector ? `Av = ${lambda.toFixed(2)}v` : 'Av');

  }, [a, b, c, d, vx, vy, wx, wy, isEigenvector, lambda]);

  const loadPreset = (preset: 'symmetric' | 'reflection' | 'shear' | 'diagonal') => {
    if (preset === 'symmetric') {
      setA(3); setB(1); setC(1); setD(3);
      setAngleDeg(45);
    } else if (preset === 'reflection') {
      setA(0); setB(1); setC(1); setD(0);
      setAngleDeg(45);
    } else if (preset === 'shear') {
      setA(1); setB(1); setC(0); setD(1);
      setAngleDeg(0);
    } else if (preset === 'diagonal') {
      setA(3); setB(0); setC(0); setD(1);
      setAngleDeg(0);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-4">
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-400" />
          Eigenvector & Invariant Direction Visualizer
        </h3>

        <div className="flex items-center gap-2">
          {isEigenvector ? (
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-4 h-4 text-amber-400" />
              EIGENVECTOR DETECTED! (λ ≈ {lambda.toFixed(2)})
            </span>
          ) : (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Rotated: Av is NOT parallel to v
            </span>
          )}
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

      {/* Angle Slider */}
      <div className="mt-4 p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
        <div className="flex justify-between items-center text-xs text-slate-300 font-semibold">
          <span>Rotate vector v (Angle: {angleDeg}°)</span>
          <span className="text-cyan-400 font-mono">v = [{vx.toFixed(2)}, {vy.toFixed(2)}]</span>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          step="1"
          value={angleDeg}
          onChange={e => setAngleDeg(parseFloat(e.target.value))}
          className="w-full accent-indigo-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>0°</span>
          <span>45°</span>
          <span>90°</span>
          <span>135°</span>
          <span>180°</span>
          <span>225°</span>
          <span>270°</span>
          <span>315°</span>
          <span>360°</span>
        </div>
      </div>

      {/* Presets */}
      <div className="mt-3 flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400">Presets:</span>
          <button onClick={() => loadPreset('symmetric')} className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200">Symmetric Matrix (Real Eigenvalues)</button>
          <button onClick={() => loadPreset('reflection')} className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200">Reflection across y=x (λ = ±1)</button>
          <button onClick={() => loadPreset('diagonal')} className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200">Diagonal Matrix</button>
          <button onClick={() => loadPreset('shear')} className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200">Shear (Defective)</button>
        </div>
      </div>

      {/* Explanations */}
      <div className="mt-3 p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs space-y-1">
        {(lang === 'en' || lang === 'both') && (
          <p className="text-slate-300">
            <strong className="text-indigo-400">Definition: </strong>
            Most vectors change direction when multiplied by matrix A. An <span className="text-amber-400 font-semibold">eigenvector</span> is special: 
            it stays on its original line and is merely scaled by a factor <span className="text-amber-400 font-semibold">λ (the eigenvalue)</span>: Av = λv.
          </p>
        )}
        {(lang === 'hinglish' || lang === 'both') && (
          <p className="text-amber-300/90">
            <strong className="text-amber-400">Hinglish: </strong>
            Aamtaur par matrix kisi bhi vector ko ghuma (rotate) deta hai. Lekin <span className="text-amber-400 font-semibold">Eigenvector</span> wahi 
            khas vector hota hai jo apni line se bilkul nahi bhatakta, bas lamba ya chhota ho jata hai factor <span className="text-amber-400 font-semibold">λ (eigenvalue)</span> se!
          </p>
        )}
      </div>
    </div>
  );
};

export default EigenVisualizer;
