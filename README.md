# MatrixMastery AI — AI-Powered Linear Algebra & Matrices Tutor
![image alt](https://github.com/PramodTewatia2007/matrices-mastery/blob/46dc79050d10f42afb25d4816a380636528b091e/matrix.PNG)
A complete, full-stack interactive educational web application dedicated to the **Matrices unit of Linear Algebra**. It functions as a personal mathematics tutor teaching concepts from beginner foundations to advanced university examination level in **English and Hinglish (Hindi + English)**.

---

## 🚀 Key Features

### 1. Complete 14-Module Syllabus Coverage
1. **Linear Systems of Equations**: $AX = B$, Augmented matrix, Elementary row operations, REF & RREF, Gaussian and Gauss-Jordan elimination.
2. **Linear Independence and Dependence**: Vector combinations, trivial vs non-trivial solutions, matrix rank test, 2D/3D geometric span and pivots.
3. **Determinants**: Laplace cofactor expansion, multilinear properties, row operation rules, area & volume scaling factor, Cramer's rule.
4. **Inverse of a Matrix**: Singular vs non-singular, Adjoint method $A^{-1} = \frac{1}{\det(A)}\text{adj}(A)$, Gauss-Jordan $[A \mid I] \to [I \mid A^{-1}]$, verification $A A^{-1} = I$.
5. **Rank of a Matrix**: Row rank and column rank equality, pivot positions, submatrix minors, full-rank vs rank-deficient classification.
6. **Rank-Nullity Theorem**: Null space (Kernel), Column space (Image), free variables, rigorous verification of $\text{rank}(A) + \text{nullity}(A) = n$.
7. **System of Linear Equations Using Rank**: Rouché-Capelli Theorem, consistency conditions, parameter-dependent systems ($k, \lambda, \mu$), unique/infinite/no solution.
8. **Symmetric Matrices**: $A^T = A$, Spectral theorem, guaranteed real eigenvalues, mutual orthogonality of eigenvectors of distinct eigenvalues, quadratic forms.
9. **Skew-Symmetric Matrices**: $A^T = -A$, zero main diagonal, canonical decomposition $A = \frac{A + A^T}{2} + \frac{A - A^T}{2}$, odd-order determinant theorem $\det(A) = 0$.
10. **Orthogonal Matrices**: $A^T A = I$, $A^{-1} = A^T$, orthonormal basis preservation, isometries, lengths and angle preservation, 2D/3D rotations and reflections ($\det = \pm 1$).
11. **Eigenvalues and Eigenvectors**: Characteristic polynomial $\det(A - \lambda I) = 0$, algebraic & geometric multiplicity, eigenspace bases, trace and determinant relations ($\sum \lambda_i = \text{tr}(A)$, $\prod \lambda_i = \det(A)$).
12. **Diagonalization of Matrices**: Similarity transformations, modal matrix $P$, diagonal matrix $D$, condition $\text{GM} = \text{AM}$, computation of high powers $A^k = P D^k P^{-1}$, defective matrices.
13. **Cayley-Hamilton Theorem**: Statement $p(A) = O$, evaluation of high powers $A^m$, matrix inverse calculation $A^{-1} = -\frac{1}{c_0}(A^{n-1} + \dots)$.
14. **Orthogonal Transformations**: Inner product preservation $\langle T(u), T(v) \rangle = \langle u, v \rangle$, distance preservation, coordinate-free geometric mapping vs matrix representation.

---

### 2. English & Hinglish Bilingual Learning Modes
- **English Mode**: Simple, intuitive, academic explanations with precise definitions.
- **Hinglish Mode**: Natural Roman-script Hindi mixed with familiar English mathematical terminology.
- **Both Mode**: Side-by-side presentation showing both English and Hinglish explanations for every concept, step, and hint.

---

### 3. Interactive 2D & 3D Mathematical Visualizations
- **3D Vector Scene (Three.js)**: Orbit, pan, zoom, inspect independent vs coplanar vectors, translucent span planes, and volume collapse.
- **2D Linear Systems (HTML5 Canvas)**: Sliders for equations $a_1 x + b_1 y = c_1$ and $a_2 x + b_2 y = c_2$, live intersection point, parallel and coincident detection.
- **Determinant Visualizer**: Unit square deformation under 2x2 matrix transformation, signed area tracking ($\det = ad - bc$), orientation reversal indicator.
- **Eigenvector Visualizer**: Real-time rotating test vector $v$ with transformed vector $Av$; detects invariant directions when $Av = \lambda v$ and draws invariant eigenspace lines.

---

### 4. Step-by-Step Matrix Calculator Engine
Powered by **SymPy** for exact rational arithmetic (no inaccurate floating-point decimals):
- Determinant via Laplace expansion with minors
- Inverse via Adjoint method & Gauss-Jordan elimination
- Row-Echelon Form (REF) and Reduced Row-Echelon Form (RREF) with intermediate row transformation steps ($R_i \leftrightarrow R_j$, $R_i \to k R_i$, $R_i \to R_i + c R_j$)
- Linear Systems solver ($AX = B$) with Rouché-Capelli analysis
- Linear Independence tester with rank verification
- Eigenvalues, Eigenvectors, algebraic & geometric multiplicity
- Matrix Diagonalization ($P, D, P^{-1}$)
- Cayley-Hamilton theorem verification ($p(A) = O$)
- Orthogonality tester ($A^T A = I$, length & angle preservation)

---

### 5. Structured Practice & Assessment
- **Solved Examples Library**: Categorized by difficulty (Beginner, Intermediate, Advanced University Level) with step-by-step row operations and verification.
- **Practice Question Bank**: Progressive 3-level hint tier:
  - *Hint 1*: Concept & starting point
  - *Hint 2*: Formula / method
  - *Hint 3*: Next critical algebraic step
  - *Show Full Solution*: Complete worked steps and bilingual explanations.
- **Quizzes & Mock Examinations**: Multiple choice tests with detailed answer rationales and score tracking.
- **Student Performance Dashboard**: Persistent tracking of completed topics, question accuracy, hint usage, quiz history, and revision bookmarks.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons
- **Mathematical Rendering**: KaTeX (high-performance LaTeX typesetting)
- **3D & 2D Graphics**: Three.js, HTML5 Canvas
- **Backend**: FastAPI (Python), Uvicorn
- **Symbolic Math Engine**: SymPy, NumPy
- **Persistence**: SQLite with SQLAlchemy ORM + localStorage sync

---

## 🏃 Running the Application

### ⚡ 1-Click Direct Access (Executable)
Simply double-click either:
- **`MatrixMastery.bat`** (or `Launch_MatrixMastery.bat`) in the project root folder.
- Or launch the standalone binary:
  `dist\MatrixMastery\MatrixMastery.exe`

This will automatically start the server and open the web application directly in your default browser at `http://127.0.0.1:8000/`.

---

### Manual Developer Startup (Optional)

- Python 3.10+ (or `uv`)
- Node.js v18+ and npm

### 2. Backend Startup
```bash
cd backend
# Using uv or virtual environment
..\.venv\Scripts\uvicorn main:app --host 127.0.0.1 --port 8000
```
API Documentation is available at: `http://127.0.0.1:8000/docs`

### 3. Frontend Startup
```bash
cd frontend
npm run dev -- --host 127.0.0.1 --port 5173
```
Open your browser at: `http://127.0.0.1:5173/`
