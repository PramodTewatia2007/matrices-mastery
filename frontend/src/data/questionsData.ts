import { PracticeQuestion } from '../types';

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // --- MODULE 1: LINEAR SYSTEMS ---
  {
    id: 'q-m1-1',
    moduleId: 'module-1',
    difficulty: 'beginner',
    question: 'Solve the system of equations using Gaussian elimination: x + 2y = 5 and 3x - y = 1.',
    questionLatex: '\\begin{cases} x + 2y = 5 \\\\ 3x - y = 1 \\end{cases}',
    hints: {
      hint1: 'Write the system as an augmented matrix [A|B] with coefficients in the first two columns and constants in the third column.',
      hint2: 'Use the pivot entry 1 in row 1 to eliminate the 3 in row 2 using the elementary row operation R2 -> R2 - 3*R1.',
      hint3: 'After R2 -> R2 - 3*R1, row 2 becomes [0  -7 | -14]. Solve directly for y, then back-substitute into row 1.'
    },
    finalAnswer: 'x = 1, y = 2',
    finalAnswerLatex: 'x = 1, \\quad y = 2',
    fullSolution: {
      steps: [
        'Form augmented matrix: [[1, 2 | 5], [3, -1 | 1]].',
        'Apply R2 -> R2 - 3*R1: [[1, 2 | 5], [0, -7 | -14]].',
        'From row 2: -7y = -14 => y = 2.',
        'From row 1: x + 2(2) = 5 => x = 1.'
      ],
      englishExplanation: 'Gaussian elimination reduces the system to upper-triangular form, allowing direct back substitution.',
      hinglishExplanation: 'Row 2 ko R2 - 3*R1 karke zero banaya, jisse -7y = -14 se y = 2 mila aur fir x = 1 mil gaya.'
    }
  },
  {
    id: 'q-m1-2',
    moduleId: 'module-1',
    difficulty: 'beginner',
    question: 'Determine whether the system is consistent or inconsistent: 2x - 4y = 6 and -x + 2y = 3.',
    questionLatex: '\\begin{cases} 2x - 4y = 6 \\\\ -x + 2y = 3 \\end{cases}',
    hints: {
      hint1: 'Observe the ratio of coefficients between the two equations.',
      hint2: 'Multiply the second equation by -2 or perform row reduction on the augmented matrix.',
      hint3: 'Adding row 1 to 2 times row 2 yields [0 0 | 12]. What does 0x + 0y = 12 indicate?'
    },
    finalAnswer: 'Inconsistent (No solution)',
    finalAnswerLatex: '\\text{Inconsistent (No Solution)}',
    fullSolution: {
      steps: [
        'Set up augmented matrix: [[2, -4 | 6], [-1, 2 | 3]].',
        'Apply R2 -> R2 + (1/2)*R1: [[2, -4 | 6], [0, 0 | 6]].',
        'The second row translates to 0x + 0y = 6, which is an impossible contradiction (0 = 6).'
      ],
      englishExplanation: 'Since rank(A) = 1 while rank([A|B]) = 2, Rouché-Capelli confirms the system has no solution.',
      hinglishExplanation: 'Left side proportional hai lekin right side match nahi karti. 0 = 6 contradiction aane se system inconsistent hai.'
    }
  },
  {
    id: 'q-m1-3',
    moduleId: 'module-1',
    difficulty: 'intermediate',
    question: 'Find the general solution to the homogeneous system: x1 + 2x2 - x3 = 0 and 2x1 + 4x2 - 2x3 = 0.',
    questionLatex: '\\begin{cases} x_1 + 2x_2 - x_3 = 0 \\\\ 2x_1 + 4x_2 - 2x_3 = 0 \\end{cases}',
    hints: {
      hint1: 'Both equations are identical up to a scalar multiple of 2.',
      hint2: 'Row reduction yields a single non-zero row: x1 + 2x2 - x3 = 0. Identify the free variables.',
      hint3: 'x1 is the pivot variable; x2 and x3 are free parameters (s and t). Express x1 in terms of s and t.'
    },
    finalAnswer: 'x1 = -2s + t, x2 = s, x3 = t for any real parameters s, t',
    finalAnswerLatex: '\\mathbf{x} = s \\begin{bmatrix} -2 \\\\ 1 \\\\ 0 \\end{bmatrix} + t \\begin{bmatrix} 1 \\\\ 0 \\\\ 1 \\end{bmatrix}',
    fullSolution: {
      steps: [
        'Augmented matrix: [[1, 2, -1 | 0], [2, 4, -2 | 0]].',
        'R2 -> R2 - 2*R1 gives [[1, 2, -1 | 0], [0, 0, 0 | 0]].',
        'Rank = 1, unknowns = 3. Number of free parameters = 3 - 1 = 2.',
        'Let x2 = s, x3 = t. Then x1 = -2s + t.'
      ],
      englishExplanation: 'With 2 free variables, the solution space is a 2D plane passing through the origin in R^3.',
      hinglishExplanation: 'Rank 1 hai aur 3 variables hain, isliye 2 free variables s aur t hain jo ek plane banate hain.'
    }
  },

  // --- MODULE 2: LINEAR INDEPENDENCE ---
  {
    id: 'q-m2-1',
    moduleId: 'module-2',
    difficulty: 'beginner',
    question: 'Test whether vectors v1 = [1, 2] and v2 = [3, 6] are linearly independent.',
    questionLatex: '\\mathbf{v}_1 = \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}, \\quad \\mathbf{v}_2 = \\begin{bmatrix} 3 \\\\ 6 \\end{bmatrix}',
    hints: {
      hint1: 'Two vectors in 2D are dependent if and only if one is a scalar multiple of the other.',
      hint2: 'Check if there exists a scalar k such that v2 = k * v1.',
      hint3: 'Notice that 3 * [1, 2] = [3, 6]. Does a non-trivial relation exist?'
    },
    finalAnswer: 'Linearly Dependent',
    finalAnswerLatex: '\\text{Linearly Dependent} \\; (3\\mathbf{v}_1 - \\mathbf{v}_2 = \\mathbf{0})',
    fullSolution: {
      steps: [
        'Form the vector equation c1*v1 + c2*v2 = 0: c1[1, 2]^T + c2[3, 6]^T = [0, 0]^T.',
        'Notice v2 = 3 * v1, which gives 3*v1 - 1*v2 = 0.',
        'Since non-zero scalars c1 = 3, c2 = -1 satisfy the equation, the vectors are linearly dependent.'
      ],
      englishExplanation: 'The vectors are collinear, pointing in the same direction, so they span only a 1D line rather than all of R^2.',
      hinglishExplanation: 'v2 vector seedha v1 ka 3 guna hai. Ek doosre ke upar lie karne ke karan ye Linearly Dependent hain.'
    }
  },
  {
    id: 'q-m2-2',
    moduleId: 'module-2',
    difficulty: 'intermediate',
    question: 'Check linear independence of v1 = [1, 0, 1], v2 = [1, 1, 0], and v3 = [0, 1, 1].',
    questionLatex: '\\mathbf{v}_1 = \\begin{bmatrix} 1 \\\\ 0 \\\\ 1 \\end{bmatrix}, \\; \\mathbf{v}_2 = \\begin{bmatrix} 1 \\\\ 1 \\\\ 0 \\end{bmatrix}, \\; \\mathbf{v}_3 = \\begin{bmatrix} 0 \\\\ 1 \\\\ 1 \\end{bmatrix}',
    hints: {
      hint1: 'Form a 3x3 matrix with these vectors as columns.',
      hint2: 'Compute the determinant of the matrix. If det ≠ 0, the vectors are independent.',
      hint3: 'det([[1, 1, 0], [0, 1, 1], [1, 0, 1]]) = 1(1 - 0) - 1(0 - 1) + 0 = 1 + 1 = 2.'
    },
    finalAnswer: 'Linearly Independent (det = 2 ≠ 0)',
    finalAnswerLatex: '\\text{Linearly Independent} \\quad (\\det = 2 \\neq 0)',
    fullSolution: {
      steps: [
        'Construct matrix A = [v1  v2  v3] = [[1, 1, 0], [0, 1, 1], [1, 0, 1]].',
        'Expand along Row 1: det(A) = 1(1*1 - 0*1) - 1(0*1 - 1*1) + 0 = 1 - (-1) = 2.',
        'Since det(A) = 2 ≠ 0, matrix A has full rank 3 and only the trivial solution c1=c2=c3=0 exists.'
      ],
      englishExplanation: 'A non-zero determinant proves the vectors form a basis for R^3 and are linearly independent.',
      hinglishExplanation: 'Determinant 2 (non-zero) aaya hai, iska matlab rank 3 hai aur teeno vectors Linearly Independent hain.'
    }
  },

  // --- MODULE 3: DETERMINANTS ---
  {
    id: 'q-m3-1',
    moduleId: 'module-3',
    difficulty: 'beginner',
    question: 'Calculate the determinant of matrix A = [[5, 2], [3, 4]].',
    questionLatex: 'A = \\begin{bmatrix} 5 & 2 \\\\ 3 & 4 \\end{bmatrix}',
    hints: {
      hint1: 'Use the 2x2 determinant formula.',
      hint2: 'Formula: det(A) = ad - bc.',
      hint3: 'a = 5, b = 2, c = 3, d = 4. Multiply 5*4 and subtract 2*3.'
    },
    finalAnswer: '14',
    finalAnswerLatex: '\\det(A) = (5)(4) - (2)(3) = 20 - 6 = 14',
    fullSolution: {
      steps: [
        'det(A) = ad - bc',
        '= (5)(4) - (2)(3)',
        '= 20 - 6 = 14.'
      ],
      englishExplanation: 'The determinant scales 2D areas by a factor of 14.',
      hinglishExplanation: 'Formula ad - bc se 20 - 6 = 14 answer aata hai.'
    }
  },
  {
    id: 'q-m3-2',
    moduleId: 'module-3',
    difficulty: 'advanced',
    question: 'If A is a 3x3 matrix with det(A) = -4, evaluate det(2 * A^(-1) * A^T).',
    questionLatex: '\\text{Given } A_{3 \\times 3}, \\; \\det(A) = -4, \\quad \\text{find } \\det(2 A^{-1} A^T)',
    hints: {
      hint1: 'Use determinant multiplicative properties: det(cM) = c^n det(M) and det(MN) = det(M)det(N).',
      hint2: 'Here n = 3, so pulling out scalar 2 gives 2^3 = 8.',
      hint3: 'det(A^(-1)) = 1/det(A) and det(A^T) = det(A). What is their product?'
    },
    finalAnswer: '8',
    finalAnswerLatex: '\\det(2 A^{-1} A^T) = 2^3 \\cdot \\frac{1}{\\det(A)} \\cdot \\det(A) = 8',
    fullSolution: {
      steps: [
        'Apply scalar rule for 3x3 matrix: det(2 M) = 2^3 * det(M) = 8 * det(M).',
        'Apply product rule: det(A^(-1) * A^T) = det(A^(-1)) * det(A^T).',
        'Substitute identities: det(A^(-1)) = 1/det(A) and det(A^T) = det(A).',
        'Their product is (1/det(A)) * det(A) = 1.',
        'Final result: 8 * 1 = 8.'
      ],
      englishExplanation: 'Notice that det(A^(-1) * A^T) = 1 regardless of the numerical value of det(A)! Only the scalar 2^3 remains.',
      hinglishExplanation: 'A^(-1) aur A^T ke determinants ek dusre ko cancel kar dete hain (1/-4 * -4 = 1). Sirf 2^3 = 8 bachta hai.'
    }
  },

  // --- MODULE 5: RANK OF A MATRIX ---
  {
    id: 'q-m5-1',
    moduleId: 'module-5',
    difficulty: 'intermediate',
    question: 'Find the rank of matrix A = [[1, 2, 3], [2, 4, 6], [1, 1, 1]].',
    questionLatex: 'A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 1 & 1 & 1 \\end{bmatrix}',
    hints: {
      hint1: 'Compare row 1 and row 2. Is row 2 a scalar multiple of row 1?',
      hint2: 'Apply row operations: R2 -> R2 - 2*R1 and R3 -> R3 - R1.',
      hint3: 'Count the non-zero rows in the resulting row-echelon form.'
    },
    finalAnswer: 'Rank = 2',
    finalAnswerLatex: '\\text{rank}(A) = 2',
    fullSolution: {
      steps: [
        'Apply R2 -> R2 - 2*R1: row 2 becomes [0, 0, 0].',
        'Apply R3 -> R3 - R1: row 3 becomes [0, -1, -2].',
        'Swap R2 and R3 to obtain REF: [[1, 2, 3], [0, -1, -2], [0, 0, 0]].',
        'There are exactly 2 non-zero rows, hence rank(A) = 2.'
      ],
      englishExplanation: 'Because row 2 was a redundant duplicate of row 1, the 3D rows span only a 2D plane.',
      hinglishExplanation: 'Row 2 row 1 ka double thi isliye zero ban gayi. Do non-zero rows bachi hain, isliye Rank = 2.'
    }
  },

  // --- MODULE 11: EIGENVALUES & EIGENVECTORS ---
  {
    id: 'q-m11-1',
    moduleId: 'module-11',
    difficulty: 'beginner',
    question: 'Find the eigenvalues of matrix A = [[3, 0], [0, -2]].',
    questionLatex: 'A = \\begin{bmatrix} 3 & 0 \\\\ 0 & -2 \\end{bmatrix}',
    hints: {
      hint1: 'What special type of matrix is this?',
      hint2: 'A is a diagonal matrix.',
      hint3: 'The eigenvalues of any diagonal or triangular matrix are simply its main diagonal entries.'
    },
    finalAnswer: 'λ1 = 3, λ2 = -2',
    finalAnswerLatex: '\\lambda_1 = 3, \\quad \\lambda_2 = -2',
    fullSolution: {
      steps: [
        'Form det(A - λI) = (3 - λ)(-2 - λ) - 0 = 0.',
        'Roots are immediately λ1 = 3 and λ2 = -2.'
      ],
      englishExplanation: 'Along the standard x and y axes, A acts simply as scaling by 3 and -2 without rotation.',
      hinglishExplanation: 'Diagonal matrix ke eigenvalues hamesha uske diagonal numbers hi hote hain.'
    }
  },

  // --- MODULE 13: CAYLEY-HAMILTON ---
  {
    id: 'q-m13-1',
    moduleId: 'module-13',
    difficulty: 'intermediate',
    question: 'If a 2x2 matrix A has trace 4 and determinant 3, write the matrix equation satisfied by A according to Cayley-Hamilton.',
    questionLatex: '\\text{tr}(A) = 4, \\quad \\det(A) = 3',
    hints: {
      hint1: 'Write the characteristic polynomial formula for any 2x2 matrix in terms of trace and determinant.',
      hint2: 'Formula: λ^2 - tr(A)λ + det(A) = 0.',
      hint3: 'Replace λ with A and the scalar constant with constant * I.'
    },
    finalAnswer: 'A^2 - 4A + 3I = O',
    finalAnswerLatex: 'A^2 - 4A + 3I = O',
    fullSolution: {
      steps: [
        'The characteristic polynomial for any 2x2 matrix is p(λ) = λ^2 - tr(A)λ + det(A) = 0.',
        'Substitute values: λ^2 - 4λ + 3 = 0.',
        'By the Cayley-Hamilton theorem, substituting matrix A gives A^2 - 4A + 3I = O.'
      ],
      englishExplanation: 'Every square matrix satisfies its own characteristic equation.',
      hinglishExplanation: 'Cayley-Hamilton kehta hai ki lambda ki jagah A rakh do aur constant ke sath I laga do: A^2 - 4A + 3I = O.'
    }
  }
];
