import React from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';

interface MatrixInputProps {
  label?: string;
  matrix: (string | number)[][];
  onChange: (newMatrix: (string | number)[][]) => void;
  maxDim?: number;
  minDim?: number;
  allowDimensionChange?: boolean;
}

export const MatrixInput: React.FC<MatrixInputProps> = ({
  label = "Matrix Input",
  matrix,
  onChange,
  maxDim = 4,
  minDim = 1,
  allowDimensionChange = true
}) => {
  const rows = matrix.length;
  const cols = matrix[0]?.length || 0;

  const handleCellChange = (r: number, c: number, value: string) => {
    const updated = matrix.map((row, rIdx) =>
      row.map((val, cIdx) => (rIdx === r && cIdx === c ? value : val))
    );
    onChange(updated);
  };

  const setDimensions = (newRows: number, newCols: number) => {
    const updated: (string | number)[][] = [];
    for (let i = 0; i < newRows; i++) {
      const row: (string | number)[] = [];
      for (let j = 0; j < newCols; j++) {
        if (i < rows && j < cols) {
          row.push(matrix[i][j]);
        } else {
          row.push(i === j ? '1' : '0');
        }
      }
      updated.push(row);
    }
    onChange(updated);
  };

  const applyPreset = (type: 'identity' | 'symmetric' | 'orthogonal' | 'singular' | 'zeros') => {
    const n = rows;
    let res: (string | number)[][] = [];

    if (type === 'identity') {
      res = Array.from({ length: n }, (_, i) =>
        Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
      );
    } else if (type === 'zeros') {
      res = Array.from({ length: n }, () =>
        Array.from({ length: cols }, () => 0)
      );
    } else if (type === 'symmetric') {
      if (n === 2) {
        res = [[3, 1], [1, 3]];
      } else if (n === 3) {
        res = [[2, -1, 0], [-1, 2, -1], [0, -1, 2]];
      } else {
        res = [[2, 1], [1, 2]];
      }
    } else if (type === 'orthogonal') {
      if (n === 2) {
        res = [[0, -1], [1, 0]]; // 90 deg rotation
      } else if (n === 3) {
        res = [[0, 1, 0], [1, 0, 0], [0, 0, 1]];
      } else {
        res = [[0, -1], [1, 0]];
      }
    } else if (type === 'singular') {
      if (n === 2) {
        res = [[1, 2], [2, 4]];
      } else {
        res = [[1, 2, 3], [2, 4, 6], [1, 1, 1]];
      }
    }
    onChange(res);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <label className="text-sm font-bold text-slate-200">{label}</label>

        {allowDimensionChange && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Size:</span>
            <select
              value={rows}
              onChange={(e) => {
                const size = parseInt(e.target.value);
                setDimensions(size, size);
              }}
              className="bg-slate-800 text-slate-200 border border-slate-700 rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500"
            >
              {[2, 3, 4].map((size) => (
                <option key={size} value={size}>
                  {size} × {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Grid of inputs formatted as a mathematical matrix with left and right brackets */}
      <div className="flex items-center justify-center my-3">
        {/* Left Bracket */}
        <div className="border-l-2 border-t-2 border-b-2 border-indigo-400/80 w-3 self-stretch rounded-l-md" />

        <div
          className="grid gap-2 px-3 py-1"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`
          }}
        >
          {matrix.map((row, r) =>
            row.map((val, c) => (
              <input
                key={`${r}-${c}`}
                type="text"
                value={val}
                onChange={(e) => handleCellChange(r, c, e.target.value)}
                placeholder="0"
                className="w-14 h-11 text-center bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg text-slate-100 font-mono text-sm transition"
              />
            ))
          )}
        </div>

        {/* Right Bracket */}
        <div className="border-r-2 border-t-2 border-b-2 border-indigo-400/80 w-3 self-stretch rounded-r-md" />
      </div>

      {/* Presets Button Row */}
      <div className="flex items-center justify-between flex-wrap gap-1 mt-3 pt-2 border-t border-slate-800 text-xs">
        <span className="text-slate-500 text-[11px] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-400" /> Presets:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => applyPreset('identity')}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
          >
            Identity
          </button>
          <button
            type="button"
            onClick={() => applyPreset('symmetric')}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
          >
            Symmetric
          </button>
          <button
            type="button"
            onClick={() => applyPreset('orthogonal')}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
          >
            Orthogonal
          </button>
          <button
            type="button"
            onClick={() => applyPreset('singular')}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
          >
            Singular
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatrixInput;
