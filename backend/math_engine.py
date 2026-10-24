"""
Complete Mathematical Engine for Linear Algebra & Matrices
Supports exact rational arithmetic using SymPy and numerical calculations with NumPy.
Provides step-by-step row operations, intermediate states, verifications, and explanations.
"""

from typing import List, Dict, Any, Tuple, Optional, Union
import sympy as sp
import numpy as np

def parse_matrix(matrix_data: List[List[Union[float, int, str]]]) -> sp.Matrix:
    """Converts a 2D list of numbers or rational strings to a SymPy Matrix."""
    rows = []
    for r in matrix_data:
        row = []
        for val in r:
            if isinstance(val, str):
                row.append(sp.Rational(val.strip()))
            else:
                row.append(sp.nsimplify(val))
        rows.append(row)
    return sp.Matrix(rows)

def format_val(val: Any) -> str:
    """Formats a SymPy value to clean string or LaTeX."""
    if isinstance(val, (sp.Rational, sp.Integer)):
        if val.q == 1:
            return str(val.p)
        return f"{val.p}/{val.q}"
    return str(val)

def matrix_to_list(mat: sp.Matrix) -> List[List[str]]:
    """Converts a SymPy Matrix to a 2D list of formatted string values."""
    rows = []
    for i in range(mat.rows):
        rows.append([format_val(mat[i, j]) for j in range(mat.cols)])
    return rows

def matrix_to_latex(mat: sp.Matrix) -> str:
    """Returns LaTeX representation of a matrix with brackets."""
    return sp.latex(mat)

# --- 1. Basic Operations ---
def matrix_addition(A_data: List[List[Any]], B_data: List[List[Any]], op: str = "+") -> Dict[str, Any]:
    A = parse_matrix(A_data)
    B = parse_matrix(B_data)
    if A.shape != B.shape:
        raise ValueError(f"Matrix dimensions must match for addition/subtraction. Matrix A is {A.shape[0]}x{A.shape[1]} while Matrix B is {B.shape[0]}x{B.shape[1]}.")
    
    steps = []
    steps.append({
        "desc": f"Check dimensions: Both matrices are of size {A.rows} x {A.cols}.",
        "hinglish": f"Dono matrices ka size {A.rows} x {A.cols} hai, isliye inka operation possible hai."
    })
    
    result = A + B if op == "+" else A - B
    elem_steps = []
    for i in range(A.rows):
        row_steps = []
        for j in range(A.cols):
            val_a = format_val(A[i, j])
            val_b = format_val(B[i, j])
            res_val = format_val(result[i, j])
            sign = "+" if op == "+" else "-"
            row_steps.append(f"({val_a}) {sign} ({val_b}) = {res_val}")
        elem_steps.append(row_steps)
        
    return {
        "operation": "addition" if op == "+" else "subtraction",
        "A": matrix_to_list(A),
        "B": matrix_to_list(B),
        "result": matrix_to_list(result),
        "result_latex": matrix_to_latex(result),
        "element_steps": elem_steps,
        "steps": steps
    }

def matrix_multiplication(A_data: List[List[Any]], B_data: List[List[Any]]) -> Dict[str, Any]:
    A = parse_matrix(A_data)
    B = parse_matrix(B_data)
    if A.cols != B.rows:
        raise ValueError(f"Cannot multiply: Number of columns of A ({A.cols}) must equal number of rows of B ({B.rows}).")
    
    result = A * B
    steps = []
    steps.append({
        "desc": f"Multiplication is valid: A is {A.rows}x{A.cols} and B is {B.rows}x{B.cols}. Product AB has dimensions {A.rows}x{B.cols}.",
        "hinglish": f"Pehle matrix ke columns ({A.cols}) dusre matrix ke rows ({B.rows}) ke barabar hain. Product matrix ka dimension {A.rows}x{B.cols} hoga."
    })
    
    mult_steps = []
    for i in range(A.rows):
        row_calculations = []
        for j in range(B.cols):
            parts = [f"({format_val(A[i, k])} * {format_val(B[k, j])})" for k in range(A.cols)]
            expr = " + ".join(parts) + f" = {format_val(result[i, j])}"
            row_calculations.append(f"C_{{{i+1}{j+1}}} = {expr}")
        mult_steps.append(row_calculations)
        
    return {
        "operation": "multiplication",
        "A": matrix_to_list(A),
        "B": matrix_to_list(B),
        "result": matrix_to_list(result),
        "result_latex": matrix_to_latex(result),
        "mult_steps": mult_steps,
        "steps": steps
    }

def matrix_transpose(A_data: List[List[Any]]) -> Dict[str, Any]:
    A = parse_matrix(A_data)
    result = A.T
    return {
        "operation": "transpose",
        "A": matrix_to_list(A),
        "result": matrix_to_list(result),
        "result_latex": matrix_to_latex(result),
        "is_symmetric": A == result,
        "is_skew_symmetric": A == -result,
        "explanation": f"Rows and columns are swapped. Original dimension was {A.rows}x{A.cols}, transpose dimension is {result.rows}x{result.cols}."
    }

# --- 2. Determinants ---
def calculate_determinant(A_data: List[List[Any]]) -> Dict[str, Any]:
    A = parse_matrix(A_data)
    if A.rows != A.cols:
        raise ValueError(f"Determinant is only defined for square matrices. Given matrix is {A.rows}x{A.cols}.")
    
    n = A.rows
    steps = []
    
    if n == 1:
        det_val = A[0, 0]
        steps.append({
            "title": "1x1 Matrix Determinant",
            "desc": f"The determinant of a 1x1 matrix [a] is simply its single entry: {format_val(det_val)}.",
            "hinglish": f"1x1 matrix ka determinant wahi single element hota hai: {format_val(det_val)}."
        })
    elif n == 2:
        a, b = A[0, 0], A[0, 1]
        c, d = A[1, 0], A[1, 1]
        det_val = a * d - b * c
        steps.append({
            "title": "2x2 Formula: ad - bc",
            "desc": f"det(A) = ({format_val(a)}) * ({format_val(d)}) - ({format_val(b)}) * ({format_val(c)}) = {format_val(a*d)} - ({format_val(b*c)}) = {format_val(det_val)}.",
            "hinglish": f"Formula: ad - bc. Main diagonal ke elements ko multiply karke off-diagonal elements ka product subtract karte hain: {format_val(det_val)}."
        })
    elif n == 3:
        det_val = A.det()
        # Laplace cofactor expansion along Row 1
        a, b, c = A[0, 0], A[0, 1], A[0, 2]
        m1 = A.minor_submatrix(0, 0).det()
        m2 = A.minor_submatrix(0, 1).det()
        m3 = A.minor_submatrix(0, 2).det()
        
        term1 = a * m1
        term2 = -b * m2
        term3 = c * m3
        
        steps.append({
            "title": "Laplace Cofactor Expansion along Row 1",
            "desc": f"det(A) = a11 * M11 - a12 * M12 + a13 * M13",
            "hinglish": "Row 1 ke anusaar Laplace expansion use kar rahe hain: alternating signs (+, -, +) ke sath."
        })
        steps.append({
            "title": "Minors and Cofactors",
            "desc": f"a11 * M11 = ({format_val(a)}) * ({format_val(m1)}) = {format_val(term1)}\n"
                    f"-a12 * M12 = -({format_val(b)}) * ({format_val(m2)}) = {format_val(term2)}\n"
                    f"a13 * M13 = ({format_val(c)}) * ({format_val(m3)}) = {format_val(term3)}",
            "hinglish": f"Teen terms ka sum: ({format_val(term1)}) + ({format_val(term2)}) + ({format_val(term3)}) = {format_val(det_val)}"
        })
    else:
        det_val = A.det()
        steps.append({
            "title": f"{n}x{n} Determinant via LU / Row Reduction",
            "desc": f"Using elementary row operations to reduce to upper triangular form and multiplying diagonal pivots. Determinant = {format_val(det_val)}.",
            "hinglish": f"Row reduction se matrix ko upper-triangular form mein badal kar diagonal entries ko multiply karte hain. Determinant = {format_val(det_val)}."
        })
        
    return {
        "A": matrix_to_list(A),
        "n": n,
        "determinant": format_val(det_val),
        "is_invertible": det_val != 0,
        "geometric_meaning": f"Area/Volume scaling factor is |{format_val(det_val)}| = {format_val(abs(det_val))}. " + ("Orientation is reversed." if det_val < 0 else "Orientation is preserved."),
        "steps": steps
    }

# --- 3. Matrix Inverse ---
def calculate_inverse(A_data: List[List[Any]]) -> Dict[str, Any]:
    A = parse_matrix(A_data)
    if A.rows != A.cols:
        raise ValueError(f"Only square matrices can have an inverse. Matrix is {A.rows}x{A.cols}.")
    
    det = A.det()
    if det == 0:
        return {
            "is_invertible": False,
            "determinant": "0",
            "reason": "Matrix is singular (determinant = 0). The rows/columns are linearly dependent, so no inverse exists.",
            "hinglish": "Is matrix ka determinant 0 hai (singular matrix). Linear transformation space ko squash kar deta hai, isliye inverse possible nahi hai."
        }
        
    n = A.rows
    steps = []
    
    # Adjoint Method
    adj = A.adjugate()
    inv = A.inv()
    
    steps.append({
        "method": "Adjoint Method",
        "formula": r"A^{-1} = \frac{1}{\det(A)} \text{adj}(A)",
        "det": format_val(det),
        "adjugate": matrix_to_list(adj),
        "inverse": matrix_to_list(inv),
        "desc": f"Determinant is non-zero (det = {format_val(det)}). Inverse exists.",
        "hinglish": f"Determinant {format_val(det)} (non-zero) hai. Adjugate matrix ko determinant se divide karke inverse milta hai."
    })
    
    # Verification: A * A^(-1) = I
    prod = A * inv
    
    return {
        "is_invertible": True,
        "determinant": format_val(det),
        "A": matrix_to_list(A),
        "adjugate": matrix_to_list(adj),
        "inverse": matrix_to_list(inv),
        "inverse_latex": matrix_to_latex(inv),
        "verification": {
            "product_is_identity": prod == sp.eye(n),
            "A_times_inv": matrix_to_list(prod)
        },
        "steps": steps
    }

# --- 4. Gauss-Jordan Row Reduction & Rank ---
def row_reduction(A_data: List[List[Any]], augmented_cols: int = 0) -> Dict[str, Any]:
    """
    Performs step-by-step Gaussian and Gauss-Jordan elimination on matrix A.
    augmented_cols specifies how many right-most columns belong to the augmented part.
    """
    M = parse_matrix(A_data)
    rows, cols = M.rows, M.cols
    steps = []
    
    # Work on a copy of M
    curr = M.copy()
    
    steps.append({
        "operation": "Initial Matrix",
        "latex_op": r"\text{Initial } A",
        "matrix": matrix_to_list(curr),
        "desc": "Starting matrix before row operations.",
        "hinglish": "Row operations shuru karne se pehle ka initial matrix."
    })
    
    pivot_row = 0
    pivots = []
    
    # Forward Elimination (Row Echelon Form)
    for col in range(cols - augmented_cols):
        if pivot_row >= rows:
            break
            
        # Find pivot
        best_row = -1
        for r in range(pivot_row, rows):
            if curr[r, col] != 0:
                best_row = r
                break
                
        if best_row == -1:
            continue
            
        # Swap rows if necessary
        if best_row != pivot_row:
            curr.row_swap(pivot_row, best_row)
            steps.append({
                "operation": f"R_{pivot_row+1} <-> R_{best_row+1}",
                "latex_op": f"R_{{{pivot_row+1}}} \\leftrightarrow R_{{{best_row+1}}}",
                "matrix": matrix_to_list(curr),
                "desc": f"Swap Row {pivot_row+1} with Row {best_row+1} to get a non-zero pivot at position ({pivot_row+1}, {col+1}).",
                "hinglish": f"Row {pivot_row+1} aur Row {best_row+1} ko aapas mein swap kiya taaki non-zero pivot mil sake."
            })
            
        piv_val = curr[pivot_row, col]
        pivots.append((pivot_row, col))
        
        # Eliminate entries below pivot
        for r in range(pivot_row + 1, rows):
            if curr[r, col] != 0:
                factor = curr[r, col] / piv_val
                curr.row_op(r, lambda v, j: v - factor * curr[pivot_row, j])
                steps.append({
                    "operation": f"R_{r+1} -> R_{r+1} - ({format_val(factor)})*R_{pivot_row+1}",
                    "latex_op": f"R_{{{r+1}}} \\to R_{{{r+1}}} - \\left({format_val(factor)}\\right) R_{{{pivot_row+1}}}",
                    "matrix": matrix_to_list(curr),
                    "desc": f"Eliminate element at ({r+1}, {col+1}) using Row {pivot_row+1}.",
                    "hinglish": f"Row {pivot_row+1} ki madad se Row {r+1} ke column {col+1} ko zero banaya."
                })
                
        pivot_row += 1
        
    ref_matrix = curr.copy()
    
    # Backward Elimination to RREF
    for p_idx in range(len(pivots) - 1, -1, -1):
        p_row, p_col = pivots[p_idx]
        piv_val = curr[p_row, p_col]
        
        # Scale pivot row to make pivot 1
        if piv_val != 1:
            scale = 1 / piv_val
            curr.row_op(p_row, lambda v, j: v * scale)
            steps.append({
                "operation": f"R_{p_row+1} -> ({format_val(scale)}) * R_{p_row+1}",
                "latex_op": f"R_{{{p_row+1}}} \\to \\left({format_val(scale)}\\right) R_{{{p_row+1}}}",
                "matrix": matrix_to_list(curr),
                "desc": f"Scale Row {p_row+1} by {format_val(scale)} to make pivot entry 1.",
                "hinglish": f"Pivot ko 1 banane ke liye Row {p_row+1} ko {format_val(scale)} se multiply kiya."
            })
            
        # Eliminate entries above pivot
        for r in range(0, p_row):
            if curr[r, p_col] != 0:
                factor = curr[r, p_col]
                curr.row_op(r, lambda v, j: v - factor * curr[p_row, j])
                steps.append({
                    "operation": f"R_{r+1} -> R_{r+1} - ({format_val(factor)})*R_{p_row+1}",
                    "latex_op": f"R_{{{r+1}}} \\to R_{{{r+1}}} - \\left({format_val(factor)}\\right) R_{{{p_row+1}}}",
                    "matrix": matrix_to_list(curr),
                    "desc": f"Eliminate entry above pivot at ({r+1}, {p_col+1}).",
                    "hinglish": f"Pivot ke upar wale entry ({r+1}, {p_col+1}) ko zero banaya."
                })
                
    rref_matrix = curr.copy()
    rank = len(pivots)
    nullity = (cols - augmented_cols) - rank
    
    return {
        "original": matrix_to_list(M),
        "ref": matrix_to_list(ref_matrix),
        "rref": matrix_to_list(rref_matrix),
        "rank": rank,
        "nullity": nullity,
        "pivots": pivots,
        "pivot_columns": [c + 1 for _, c in pivots],
        "free_variables_count": nullity,
        "steps": steps
    }

# --- 5. Solving Systems of Linear Equations (AX = B) ---
def solve_linear_system(A_data: List[List[Any]], B_data: List[Any]) -> Dict[str, Any]:
    A = parse_matrix(A_data)
    # B could be 1D or 2D column
    if isinstance(B_data[0], list):
        B = parse_matrix(B_data)
    else:
        B = sp.Matrix([[sp.nsimplify(x)] for x in B_data])
        
    if A.rows != B.rows:
        raise ValueError(f"Coefficient matrix A rows ({A.rows}) must equal constant vector B entries ({B.rows}).")
        
    aug = A.row_join(B)
    n = A.cols # Number of unknowns
    
    # Run elimination on augmented matrix
    elim_res = row_reduction(aug.tolist(), augmented_cols=1)
    
    rank_A = elim_res["rank"]
    
    # Calculate rank of augmented matrix
    aug_rref = sp.Matrix([[sp.Rational(v) for v in row] for row in elim_res["rref"]])
    rank_aug = 0
    for r in range(aug_rref.rows):
        if any(aug_rref[r, c] != 0 for c in range(aug_rref.cols)):
            rank_aug += 1
            
    # Rouché-Capelli Analysis
    status = ""
    system_type = ""
    solution_desc = ""
    hinglish_desc = ""
    solution_vector = None
    
    if rank_A < rank_aug:
        status = "inconsistent"
        system_type = "No Solution"
        solution_desc = f"Rank(A) = {rank_A} < Rank([A|B]) = {rank_aug}. By Rouché-Capelli Theorem, the system is inconsistent."
        hinglish_desc = f"Coefficient matrix ka rank ({rank_A}) augmented matrix ke rank ({rank_aug}) se kam hai. Last row 0 = k (where k != 0) show karti hai, isliye koi solution nahi hai (Inconsistent system)."
    elif rank_A == rank_aug:
        if rank_A == n:
            status = "unique"
            system_type = "Unique Solution"
            sol = A.LUsolve(B)
            solution_vector = [format_val(x) for x in sol]
            solution_desc = f"Rank(A) = Rank([A|B]) = {rank_A} = number of variables ({n}). Unique solution exists."
            hinglish_desc = f"Rank(A) aur Rank([A|B]) dono barabar hain aur variables ki sankhya ({n}) ke equal hain. Ek unique solution milega."
        else:
            status = "infinite"
            system_type = "Infinitely Many Solutions"
            k = n - rank_A
            solution_desc = f"Rank(A) = Rank([A|B]) = {rank_A} < number of variables ({n}). System has infinitely many solutions with {k} free parameter(s)."
            hinglish_desc = f"Rank(A) barabar hai Rank([A|B]) ke, lekin variables ({n}) se kam hai. System ke anant (infinite) solutions hain, {k} free variable(s) ke sath."
            
    return {
        "A": matrix_to_list(A),
        "B": matrix_to_list(B),
        "augmented": matrix_to_list(aug),
        "rank_A": rank_A,
        "rank_augmented": rank_aug,
        "num_unknowns": n,
        "status": status,
        "system_type": system_type,
        "solution_desc": solution_desc,
        "hinglish_desc": hinglish_desc,
        "solution_vector": solution_vector,
        "row_steps": elim_res["steps"]
    }

# --- 6. Linear Independence Testing ---
def test_linear_independence(vectors_data: List[List[Any]]) -> Dict[str, Any]:
    """Vectors given as list of vectors [v1, v2, ..., vk]"""
    # Form matrix with vectors as columns
    cols = []
    for v in vectors_data:
        cols.append([sp.nsimplify(x) for x in v])
    # Transpose so each v is a column
    A = sp.Matrix(cols).T
    k = len(vectors_data)
    dim = len(vectors_data[0])
    
    elim = row_reduction(A.tolist())
    rank = elim["rank"]
    is_independent = (rank == k)
    
    steps = [
        {
            "step": 1,
            "desc": f"Form matrix with the given {k} vectors as columns (size {dim}x{k}).",
            "hinglish": f"Diye gaye {k} vectors ko columns bana kar {dim}x{k} size ka matrix banate hain."
        },
        {
            "step": 2,
            "desc": f"Row reduce to find pivot columns. Computed Rank = {rank}.",
            "hinglish": f"Row reduction karke pivots dekhte hain. Rank = {rank} nikla."
        },
        {
            "step": 3,
            "desc": "If Rank = k (number of vectors), then vectors are Linearly Independent. If Rank < k, vectors are Linearly Dependent.",
            "hinglish": f"Yadi Rank vectors ki sankhya k ({k}) ke barabar ho toh vectors Linearly Independent hote hain. Yahan rank {rank} hai."
        }
    ]
    
    return {
        "vectors": vectors_data,
        "matrix": matrix_to_list(A),
        "rank": rank,
        "num_vectors": k,
        "is_independent": is_independent,
        "result_text": "Linearly Independent" if is_independent else "Linearly Dependent",
        "explanation": f"Vectors are {'Linearly Independent (only trivial linear combination equals zero)' if is_independent else 'Linearly Dependent (at least one non-trivial linear combination equals zero)'}.",
        "hinglish_explanation": f"Vectors {'Linearly Independent hain (koi bhi vector dusre ka combination nahi hai)' if is_independent else 'Linearly Dependent hain (ek vector ko baakiyon ke combination ke roop mein likha ja sakta hai)'}.",
        "steps": steps
    }

# --- 7. Eigenvalues, Eigenvectors & Multiplicities ---
def calculate_eigen(A_data: List[List[Any]]) -> Dict[str, Any]:
    A = parse_matrix(A_data)
    if A.rows != A.cols:
        raise ValueError("Eigenvalues are only defined for square matrices.")
        
    n = A.rows
    lam = sp.Symbol('lambda')
    char_matrix = A - lam * sp.eye(n)
    char_poly = char_matrix.det()
    
    # Eigenvalues and eigenvectors
    # returns list of (eigenvalue, algebraic_multiplicity, [eigenvectors])
    eigen_data = A.eigenvects()
    
    results = []
    total_geometric_mult = 0
    all_eigenvectors = []
    
    for val, am, vects in eigen_data:
        gm = len(vects)
        total_geometric_mult += gm
        clean_vects = []
        for v in vects:
            all_eigenvectors.append(v)
            clean_vects.append([format_val(x) for x in v])
            
        results.append({
            "eigenvalue": format_val(val),
            "algebraic_multiplicity": am,
            "geometric_multiplicity": gm,
            "eigenvectors": clean_vects
        })
        
    is_diagonalizable = (total_geometric_mult == n)
    
    steps = [
        {
            "step": "Characteristic Equation",
            "formula": r"\det(A - \lambda I) = 0",
            "polynomial": f"{sp.latex(char_poly)} = 0",
            "desc": "Set determinant of (A - lambda * I) to zero and solve for lambda.",
            "hinglish": "Characteristic equation det(A - lambda*I) = 0 banakar lambda ki values nikaalte hain."
        },
        {
            "step": "Trace & Determinant Check",
            "desc": f"Trace(A) = {format_val(A.trace())}, Det(A) = {format_val(A.det())}. Sum of eigenvalues equals Trace, and product of eigenvalues equals Determinant.",
            "hinglish": f"Verification: Eigenvalues ka jod Trace ({format_val(A.trace())}) ke barabar aur unka product Determinant ({format_val(A.det())}) ke barabar hona chahiye."
        }
    ]
    
    return {
        "A": matrix_to_list(A),
        "characteristic_polynomial": sp.latex(char_poly),
        "eigenvalues": results,
        "is_diagonalizable": is_diagonalizable,
        "trace": format_val(A.trace()),
        "determinant": format_val(A.det()),
        "steps": steps
    }

# --- 8. Matrix Diagonalization ---
def diagonalize_matrix(A_data: List[List[Any]]) -> Dict[str, Any]:
    A = parse_matrix(A_data)
    if A.rows != A.cols:
        raise ValueError("Only square matrices can be diagonalized.")
        
    n = A.rows
    try:
        P, D = A.diagonalize()
        P_inv = P.inv()
        return {
            "is_diagonalizable": True,
            "A": matrix_to_list(A),
            "P": matrix_to_list(P),
            "D": matrix_to_list(D),
            "P_inv": matrix_to_list(P_inv),
            "formula": r"A = P D P^{-1} \iff P^{-1} A P = D",
            "explanation": f"Matrix has {n} linearly independent eigenvectors. The modal matrix P is formed by eigenvectors as columns, and D is the diagonal matrix of corresponding eigenvalues.",
            "hinglish": f"Matrix ke paas {n} linearly independent eigenvectors hain. Eigenvectors ko columns bana kar P matrix aur eigenvalues se D matrix banta hai."
        }
    except Exception as e:
        return {
            "is_diagonalizable": False,
            "A": matrix_to_list(A),
            "reason": "Matrix does not possess a full set of linearly independent eigenvectors (Geometric Multiplicity < Algebraic Multiplicity for at least one eigenvalue).",
            "hinglish": "Matrix ke paas n linearly independent eigenvectors nahi hain (defective matrix). Isliye ise diagonalize nahi kiya ja sakta."
        }

# --- 9. Cayley-Hamilton Theorem Verification ---
def verify_cayley_hamilton(A_data: List[List[Any]]) -> Dict[str, Any]:
    A = parse_matrix(A_data)
    if A.rows != A.cols:
        raise ValueError("Cayley-Hamilton theorem applies to square matrices.")
        
    n = A.rows
    lam = sp.Symbol('lambda')
    poly = A.charpoly(lam)
    coeffs = poly.all_coeffs() # from highest degree down to 0
    
    # Substitute A into polynomial: p(A) = c_n A^n + ... + c_0 I
    deg = len(coeffs) - 1
    terms = []
    matrix_sum = sp.zeros(n, n)
    
    for idx, c in enumerate(coeffs):
        power = deg - idx
        if power == 0:
            term_mat = c * sp.eye(n)
            power_str = "I"
        elif power == 1:
            term_mat = c * A
            power_str = "A"
        else:
            term_mat = c * (A**power)
            power_str = f"A^{power}"
            
        matrix_sum += term_mat
        terms.append({
            "term": f"({format_val(c)}) * {power_str}",
            "result_matrix": matrix_to_list(term_mat)
        })
        
    is_zero = matrix_sum == sp.zeros(n, n)
    
    return {
        "A": matrix_to_list(A),
        "characteristic_polynomial": sp.latex(poly.as_expr()),
        "terms": terms,
        "evaluated_sum": matrix_to_list(matrix_sum),
        "is_verified": is_zero,
        "statement": "Every square matrix satisfies its own characteristic equation: p(A) = O.",
        "hinglish_statement": "Har square matrix apni characteristic equation ko satisfy karta hai: p(A) = Zero Matrix."
    }

# --- 10. Orthogonality Testing ---
def test_orthogonality(A_data: List[List[Any]]) -> Dict[str, Any]:
    A = parse_matrix(A_data)
    if A.rows != A.cols:
        return {
            "is_orthogonal": False,
            "reason": "Only square matrices can be orthogonal."
        }
    n = A.rows
    prod = A.T * A
    is_ortho = prod == sp.eye(n)
    det = A.det()
    
    return {
        "A": matrix_to_list(A),
        "transpose": matrix_to_list(A.T),
        "A_transpose_times_A": matrix_to_list(prod),
        "is_orthogonal": is_ortho,
        "determinant": format_val(det),
        "is_proper_rotation": is_ortho and det == 1,
        "is_reflection": is_ortho and det == -1,
        "properties": [
            "Columns form an orthonormal set (unit length and mutually perpendicular)",
            "Rows form an orthonormal set",
            "Preserves vector lengths (||Ax|| = ||x||) and angles between vectors",
            f"Determinant is {format_val(det)} (must be +1 for rotation or -1 for reflection/improper rotation)"
        ],
        "hinglish_properties": [
            "Columns aur rows aapas mein perpendicular aur unit length ki hoti hain",
            "Vectors ki length aur angle ko preserve karta hai (rigid transformation)",
            f"Determinant {format_val(det)} hai (+1 hone par pure rotation, -1 hone par reflection)"
        ]
    }
