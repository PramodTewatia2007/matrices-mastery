"""
Test script for verifying all mathematical engine computations.
"""
import sys
import io
import os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Ensure backend directory is in sys.path so tests can be run from anywhere
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from math_engine import (
    calculate_determinant,
    calculate_inverse,
    row_reduction,
    solve_linear_system,
    test_linear_independence,
    calculate_eigen,
    diagonalize_matrix,
    verify_cayley_hamilton,
    test_orthogonality
)

def run_tests():
    print("Testing Determinant...")
    det_res = calculate_determinant([[1, 2, 3], [0, 4, 5], [1, 0, 6]])
    assert det_res["determinant"] == "22", f"Expected 22, got {det_res['determinant']}"
    print("✓ Determinant test passed!")

    print("Testing Inverse & Verification...")
    inv_res = calculate_inverse([[4, 7], [2, 6]])
    assert inv_res["is_invertible"] == True
    assert inv_res["verification"]["product_is_identity"] == True
    print("✓ Inverse test passed!")

    print("Testing Row Reduction & Rank...")
    # Matrix of rank 2
    rref_res = row_reduction([[1, 2, 3], [2, 4, 6], [1, 1, 1]])
    assert rref_res["rank"] == 2
    assert rref_res["nullity"] == 1
    print("✓ Row reduction & Rank test passed!")

    print("Testing System of Linear Equations (AX = B)...")
    # 2x + y = 5, x + 3y = 5 -> x = 2, y = 1
    sys_res = solve_linear_system([[2, 1], [1, 3]], [5, 5])
    assert sys_res["status"] == "unique"
    assert sys_res["solution_vector"] == ["2", "1"]
    print("✓ Linear system solver test passed!")

    print("Testing Linear Independence...")
    # Independent vectors [1, 0], [0, 1]
    indep_res = test_linear_independence([[1, 0], [0, 1]])
    assert indep_res["is_independent"] == True
    # Dependent vectors [1, 2], [2, 4]
    dep_res = test_linear_independence([[1, 2], [2, 4]])
    assert dep_res["is_independent"] == False
    print("✓ Linear independence test passed!")

    print("Testing Eigenvalues & Eigenvectors...")
    # Matrix [[2, 1], [1, 2]] -> eigenvalues 3 and 1
    eigen_res = calculate_eigen([[2, 1], [1, 2]])
    vals = [item["eigenvalue"] for item in eigen_res["eigenvalues"]]
    assert "1" in vals and "3" in vals
    print("✓ Eigenvalues & eigenvectors test passed!")

    print("Testing Diagonalization...")
    diag_res = diagonalize_matrix([[2, 1], [1, 2]])
    assert diag_res["is_diagonalizable"] == True
    print("✓ Diagonalization test passed!")

    print("Testing Cayley-Hamilton...")
    ch_res = verify_cayley_hamilton([[1, 2], [3, 4]])
    assert ch_res["is_verified"] == True
    print("✓ Cayley-Hamilton verification test passed!")

    print("Testing Orthogonality...")
    # 90 deg rotation [[0, -1], [1, 0]]
    ortho_res = test_orthogonality([[0, -1], [1, 0]])
    assert ortho_res["is_orthogonal"] == True
    assert ortho_res["is_proper_rotation"] == True
    print("✓ Orthogonality test passed!")

    print("\n🎉 ALL MATHEMATICAL ENGINE TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    run_tests()
