import React, { useState } from 'react';
import { Compass, Square, Layers, Target, Eye } from 'lucide-react';
import { Vector3DVisualizer } from '../components/visualizations/Vector3DVisualizer';
import { LinearSystemVisualizer } from '../components/visualizations/LinearSystemVisualizer';
import { DeterminantVisualizer } from '../components/visualizations/DeterminantVisualizer';
import { EigenVisualizer } from '../components/visualizations/EigenVisualizer';
import { LanguageMode } from '../types';

interface VisualizerLabProps {
  language: LanguageMode;
}

export const VisualizerLabPage: React.FC<VisualizerLabProps> = ({ language }) => {
  const [activeVis, setActiveVis] = useState<'3d_vector' | 'linear_system' | 'determinant' | 'eigen'>('3d_vector');

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
          <Eye className="w-3.5 h-3.5" />
          Interactive Mathematical Geometry Laboratory
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">
          2D & 3D Mathematical Visualizer
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Explore geometric intuition behind linear independence, determinants as area scalers, linear systems as intersecting planes, and invariant eigenvectors.
        </p>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveVis('3d_vector')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              activeVis === '3d_vector'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            3D Vector Independence & Span
          </button>

          <button
            onClick={() => setActiveVis('linear_system')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              activeVis === 'linear_system'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            2D Linear Systems & Intersections
          </button>

          <button
            onClick={() => setActiveVis('determinant')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              activeVis === 'determinant'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Square className="w-3.5 h-3.5" />
            Determinant Area & Volume Scaling
          </button>

          <button
            onClick={() => setActiveVis('eigen')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              activeVis === 'eigen'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            Eigenvectors & Invariant Lines
          </button>
        </div>
      </div>

      {/* Main Visualizer Scene */}
      <div className="space-y-4">
        {activeVis === '3d_vector' && <Vector3DVisualizer lang={language} />}
        {activeVis === 'linear_system' && <LinearSystemVisualizer lang={language} />}
        {activeVis === 'determinant' && <DeterminantVisualizer lang={language} />}
        {activeVis === 'eigen' && <EigenVisualizer lang={language} />}
      </div>

    </div>
  );
};

export default VisualizerLabPage;
