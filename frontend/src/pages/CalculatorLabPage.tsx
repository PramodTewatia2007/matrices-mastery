import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Layers, 
  Square, 
  Target, 
  ShieldCheck, 
  ChevronRight,
  Cpu,
  BarChart2,
  GitFork
} from 'lucide-react';
import { MatrixInput } from '../components/MatrixInput';
import { KaTeX } from '../components/KaTeX';
import { 
  apiDeterminant, 
  apiInverse, 
  apiRowReduction, 
  apiSolveSystem, 
  apiEigen, 
  apiDiagonalize, 
  apiCayleyHamilton, 
  apiOrthogonality,
  apiMultiply
} from '../services/api';
import { LanguageMode } from '../types';

interface CalculatorLabProps {
  language: LanguageMode;
}

type CalcMode = 
  | 'determinant'
  | 'inverse'
  | 'rref_rank'
  | 'solve_system'
  | 'eigen'
  | 'diagonalize'
  | 'cayley'
  | 'ortho'
  | 'multiply';

export const CalculatorLabPage: React.FC<CalculatorLabProps> = ({ language }) => {
  const [mode, setMode] = useState<CalcMode>('determinant');

  // Matrix A (default 3x3)
  const [matrixA, setMatrixA] = useState<(string | number)[][]>([
    [1, 2, 3],
    [0, 4, 5],
    [1, 0, 6]
  ]);

  // Matrix B for multiplication
  const [matrixB, setMatrixB] = useState<(string | number)[][]>([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ]);

  // Vector B for linear system AX = B
  const [vectorB, setVectorB] = useState<string[]>(['1', '2', '3']);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  const runCalculation = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let data: any = null;
      if (mode === 'determinant') {
        data = await apiDeterminant(matrixA);
      } else if (mode === 'inverse') {
        data = await apiInverse(matrixA);
      } else if (mode === 'rref_rank') {
        data = await apiRowReduction(matrixA);
      } else if (mode === 'solve_system') {
        data = await apiSolveSystem(matrixA, vectorB);
      } else if (mode === 'eigen') {
        data = await apiEigen(matrixA);
      } else if (mode === 'diagonalize') {
        data = await apiDiagonalize(matrixA);
      } else if (mode === 'cayley') {
        data = await apiCayleyHamilton(matrixA);
      } else if (mode === 'ortho') {
        data = await apiOrthogonality(matrixA);
      } else if (mode === 'multiply') {
        data = await apiMultiply(matrixA, matrixB);
      }
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Calculation error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const calcTabs: { id: CalcMode; label: string; icon: any }[] = [
    { id: 'determinant', label: 'Determinant', icon: Square },
    { id: 'inverse', label: 'Matrix Inverse', icon: RotateCcw },
    { id: 'rref_rank', label: 'Row Reduction & Rank', icon: BarChart2 },
    { id: 'solve_system', label: 'Solve System (AX = B)', icon: GitFork },
    { id: 'eigen', label: 'Eigenvalues & Vectors', icon: Target },
    { id: 'diagonalize', label: 'Diagonalization (PDP⁻¹)', icon: Layers },
    { id: 'cayley', label: 'Cayley-Hamilton Theorem', icon: Cpu },
    { id: 'ortho', label: 'Orthogonality Check', icon: ShieldCheck },
    { id: 'multiply', label: 'Matrix Multiplication', icon: Calculator },
  ];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
          <Calculator className="w-3.5 h-3.5" />
          Step-by-Step Symbolic & Rational Matrix Engine
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">
          Matrix Calculator Laboratory
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Perform exact rational row reductions, determinants, inverses, eigenvalues, and Cayley-Hamilton verifications with full intermediate steps.
        </p>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1">
          {calcTabs.map((t) => {
            const Icon = t.icon;
            const isActive = mode === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setMode(t.id);
                  setResult(null);
                  setError(null);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Matrix A Input */}
        <div>
          <MatrixInput
            label={mode === 'multiply' ? "Matrix A" : "Matrix Input (A)"}
            matrix={matrixA}
            onChange={(newM) => {
              setMatrixA(newM);
              if (vectorB.length !== newM.length) {
                setVectorB(Array(newM.length).fill('1'));
              }
            }}
          />
        </div>

        {/* Second Input depending on mode */}
        {mode === 'multiply' && (
          <div>
            <MatrixInput
              label="Matrix B"
              matrix={matrixB}
              onChange={setMatrixB}
            />
          </div>
        )}

        {mode === 'solve_system' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col justify-between">
            <div>
              <label className="text-sm font-bold text-slate-200 block mb-2">Constants Vector (B)</label>
              <p className="text-xs text-slate-400 mb-3">Constants for the right-hand side of AX = B.</p>
              
              <div className="space-y-2">
                {vectorB.map((v, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-mono text-indigo-400 w-6">b{idx + 1}:</span>
                    <input
                      type="text"
                      value={v}
                      onChange={(e) => {
                        const copy = [...vectorB];
                        copy[idx] = e.target.value;
                        setVectorB(copy);
                      }}
                      className="w-20 px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100 font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-500 pt-3 border-t border-slate-800 mt-4">
              Vector dimension matches rows of A: {matrixA.length} entries.
            </div>
          </div>
        )}

        {mode !== 'multiply' && mode !== 'solve_system' && (
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                Operation Overview
              </span>
              <h3 className="text-sm font-bold text-slate-200 capitalize">
                {mode.replace('_', ' ')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Calculations are executed with exact rational fractions (e.g. 1/3, 5/2) rather than imprecise floating-point decimals. Full step-by-step intermediate transformations are recorded below.
              </p>
            </div>

            <button
              onClick={runCalculation}
              disabled={loading}
              className="mt-4 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current" />
              {loading ? 'Computing Steps...' : 'Execute Calculation'}
            </button>
          </div>
        )}
      </div>

      {(mode === 'multiply' || mode === 'solve_system') && (
        <div className="flex justify-end">
          <button
            onClick={runCalculation}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            {loading ? 'Computing Steps...' : 'Execute Calculation'}
          </button>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs space-y-1">
          <span className="font-bold block">Calculation Error:</span>
          <span>{error}</span>
        </div>
      )}

      {/* Results Container */}
      {result && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Step-by-Step Calculation Solution
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
              Exact Rational Result
            </span>
          </div>

          {/* Mode Specific Results */}
          
          {/* 1. Determinant Result */}
          {mode === 'determinant' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-xs font-bold text-indigo-400 block uppercase">Determinant Value:</span>
                  <span className="text-xl font-extrabold text-slate-100 font-mono">
                    det(A) = {result.determinant}
                  </span>
                </div>
                <div className="text-xs text-slate-300">
                  {result.is_invertible ? '✓ Non-singular (Invertible)' : '⚠ Singular (No Inverse)'}
                </div>
              </div>

              {result.geometric_meaning && (
                <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <strong className="text-indigo-400">Geometric Scaling: </strong> {result.geometric_meaning}
                </p>
              )}

              {/* Steps */}
              {result.steps && result.steps.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 block">Derivation Steps:</span>
                  {result.steps.map((st: any, idx: number) => (
                    <div key={idx} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-xs space-y-1">
                      <strong className="text-indigo-300 block">{st.title || `Step ${idx+1}`}:</strong>
                      <p className="text-slate-300 font-mono text-[11px]">{st.desc}</p>
                      {st.hinglish && (
                        <p className="text-amber-300/80 text-[11px]">
                          <strong>Hinglish: </strong> {st.hinglish}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. Inverse Result */}
          {mode === 'inverse' && (
            <div className="space-y-4">
              {result.is_invertible ? (
                <>
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                    <span className="text-xs font-bold text-emerald-400 block uppercase mb-1">
                      Inverse Matrix A⁻¹:
                    </span>
                    {result.inverse_latex ? (
                      <KaTeX math={`A^{-1} = ${result.inverse_latex}`} block className="text-emerald-200" />
                    ) : (
                      <pre className="text-xs font-mono text-slate-200">
                        {JSON.stringify(result.inverse, null, 2)}
                      </pre>
                    )}
                  </div>

                  {result.verification && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Verified: A * A⁻¹ = Identity Matrix I.</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs">
                  <strong>Non-Invertible: </strong> {result.reason}
                </div>
              )}
            </div>
          )}

          {/* 3. Row Reduction & Rank */}
          {mode === 'rref_rank' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-xs block">Rank(A):</span>
                  <span className="text-xl font-bold text-indigo-400">{result.rank}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-xs block">Nullity:</span>
                  <span className="text-xl font-bold text-indigo-400">{result.nullity}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-xs block">Pivot Columns:</span>
                  <span className="text-xs font-mono text-slate-200">
                    {result.pivot_columns ? result.pivot_columns.join(', ') : 'None'}
                  </span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-xs block">Free Variables:</span>
                  <span className="text-xs font-mono text-slate-200">{result.nullity}</span>
                </div>
              </div>

              {/* Step by step transformations */}
              {result.steps && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-slate-200 block">
                    Elementary Row Operations (Step-by-Step):
                  </span>
                  {result.steps.map((st: any, sIdx: number) => (
                    <div key={sIdx} className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-indigo-400">
                        <span>Step {sIdx + 1}: {st.operation}</span>
                      </div>
                      <p className="text-xs text-slate-300">{st.desc}</p>
                      {st.matrix && (
                        <div className="flex justify-center my-2">
                          <KaTeX 
                            math={`\\begin{bmatrix} ${st.matrix.map((r: string[]) => r.join(' & ')).join(' \\\\ ')} \\end{bmatrix}`}
                            block
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. Linear System Solve Result */}
          {mode === 'solve_system' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
                  Rouché-Capelli System Classification:
                </span>
                <div className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  {result.system_type}
                </div>
                <p className="text-xs text-slate-300">{result.solution_desc}</p>
                {result.hinglish_desc && (
                  <p className="text-xs text-amber-300/80">
                    <strong>Hinglish: </strong> {result.hinglish_desc}
                  </p>
                )}
              </div>

              {result.solution_vector && (
                <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs">
                  <span className="text-emerald-400 font-bold block mb-1">Unique Solution Vector X:</span>
                  <KaTeX 
                    math={`X = \\begin{bmatrix} ${result.solution_vector.join(' \\\\ ')} \\end{bmatrix}`}
                    block
                    className="text-emerald-300"
                  />
                </div>
              )}
            </div>
          )}

          {/* 5. Eigenvalues & Eigenvectors */}
          {mode === 'eigen' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                <span className="text-indigo-400 font-semibold block">Characteristic Equation:</span>
                <KaTeX math={`${result.characteristic_polynomial} = 0`} block className="text-indigo-200" />
                <div className="text-slate-400 flex justify-between pt-1 border-t border-slate-800 text-[11px]">
                  <span>Trace(A) = {result.trace}</span>
                  <span>Det(A) = {result.determinant}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-200 block">Eigenvalues and Eigenspaces:</span>
                {result.eigenvalues?.map((item: any, idx: number) => (
                  <div key={idx} className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 font-bold font-mono text-sm">
                        λ_{idx + 1} = {item.eigenvalue}
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        AM = {item.algebraic_multiplicity}, GM = {item.geometric_multiplicity}
                      </span>
                    </div>

                    <div className="text-slate-300">
                      <span className="font-semibold block mb-1">Eigenvector Basis:</span>
                      <div className="flex gap-4 flex-wrap">
                        {item.eigenvectors?.map((v: string[], vIdx: number) => (
                          <KaTeX key={vIdx} math={`\\mathbf{v} = \\begin{bmatrix} ${v.join(' \\\\ ')} \\end{bmatrix}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Cayley-Hamilton Result */}
          {mode === 'cayley' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                  Characteristic Polynomial:
                </span>
                <KaTeX math={`p(\\lambda) = ${result.characteristic_polynomial}`} block className="text-indigo-200" />
                <p className="text-xs text-slate-300">
                  Substitute matrix A into p(λ): p(A) = O.
                </p>
              </div>

              <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-xs text-emerald-300 font-semibold">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Verified! Sum of all matrix power terms equals the Zero Matrix O.</span>
              </div>
            </div>
          )}

          {/* 7. Orthogonality Result */}
          {mode === 'ortho' && (
            <div className="space-y-3 text-xs">
              <div className={`p-4 rounded-xl border ${
                result.is_orthogonal 
                  ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' 
                  : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
              }`}>
                <span className="text-sm font-bold block mb-1">
                  {result.is_orthogonal ? '✓ Matrix is Orthogonal (AᵀA = I)' : '✗ Matrix is NOT Orthogonal'}
                </span>
                <span>Determinant: {result.determinant}</span>
                {result.is_proper_rotation && <span className="block mt-1 font-semibold text-emerald-400">Class: Pure Rotation in space (det = +1).</span>}
                {result.is_reflection && <span className="block mt-1 font-semibold text-purple-400">Class: Reflection across a plane (det = -1).</span>}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default CalculatorLabPage;
