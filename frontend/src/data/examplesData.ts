import { SolvedExample } from '../types';

export const SOLVED_EXAMPLES: SolvedExample[] = [
  // --- MODULE 1: LINEAR SYSTEMS ---
  {
    id: 'ex-m1-1',
    moduleId: 'module-1',
    difficulty: 'beginner',
    title: 'Solving 2x2 System using Gaussian Elimination',
    question: 'Solve the system of linear equations: 2x + 3y = 8 and x - y = -1.',
    questionLatex: '\\begin{cases} 2x + 3y = 8 \\\\ x - y = -1 \\end{cases}',
    conceptUsed: 'Gaussian Elimination on 2x2 System',
    given: 'Two linear equations in two variables: 2x + 3y = 8, x - y = -1',
    required: 'Values of variables x and y',
    formulaOrTheorem: 'Augmented matrix [A|B] reduced via elementary row operations',
    whyThisMethod: 'Gaussian elimination avoids fractional arithmetic by pivoting first and back-substituting systematically.',
    steps: [
      {
        stepNumber: 1,
        title: 'Form Augmented Matrix',
        description: 'Place coefficients and constants into an augmented matrix.',
        hinglishDescription: 'Equations ke coefficients aur constants ko augmented matrix [A|B] mein likhte hain.',
        latex: '\\begin{bmatrix} 2 & 3 & \\bigm| & 8 \\\\ 1 & -1 & \\bigm| & -1 \\end{bmatrix}'
      },
      {
        stepNumber: 2,
        title: 'Row Swap for Convenient Pivot',
        description: 'Swap R1 and R2 to obtain a pivot of 1 in the top-left entry.',
        hinglishDescription: 'R1 aur R2 ko swap karte hain taaki pehla pivot 1 ban jaye.',
        rowOperation: 'R1 <-> R2',
        latex: '\\begin{bmatrix} 1 & -1 & \\bigm| & -1 \\\\ 2 & 3 & \\bigm| & 8 \\end{bmatrix}'
      },
      {
        stepNumber: 3,
        title: 'Eliminate x in Row 2',
        description: 'Perform R2 -> R2 - 2*R1 to eliminate the x term in the second row.',
        hinglishDescription: 'Row 2 ke x coefficient ko zero banane ke liye R2 - 2*R1 karte hain.',
        rowOperation: 'R2 -> R2 - 2*R1',
        latex: '\\begin{bmatrix} 1 & -1 & \\bigm| & -1 \\\\ 0 & 5 & \\bigm| & 10 \\end{bmatrix}'
      },
      {
        stepNumber: 4,
        title: 'Back Substitution for y and x',
        description: 'From Row 2: 5y = 10 => y = 2. Substitute into Row 1: x - (2) = -1 => x = 1.',
        hinglishDescription: 'Row 2 se 5y = 10 mila, isliye y = 2. Row 1 mein rakhne par x = 1 mil gaya.'
      }
    ],
    finalAnswer: 'x = 1, y = 2',
    finalAnswerLatex: 'x = 1, \\quad y = 2',
    verification: 'Substitute into original equations: 2(1) + 3(2) = 2 + 6 = 8 (Matches equation 1), and 1 - 2 = -1 (Matches equation 2).',
    englishExplanation: 'By setting up the augmented matrix and eliminating the entry below the pivot, the system decouples into an easy triangular form.',
    hinglishExplanation: 'Matrix ko upper triangular (echelon) form mein laane se neeche se shuru karke y nikalta hai, fir upar jaakar x mil jata hai.',
    commonMistakes: [
      'Subtracting negative numbers incorrectly: 3 - 2*(-1) = 3 + 2 = 5, not 1!',
      'Forgetting to apply the row operation to the augmented constant column.'
    ]
  },
  {
    id: 'ex-m1-2',
    moduleId: 'module-1',
    difficulty: 'beginner',
    title: 'Solving 3x3 Upper Triangular System',
    question: 'Solve the system: x + 2y + z = 9, 3y - z = 4, and 2z = 4.',
    questionLatex: '\\begin{cases} x + 2y + z = 9 \\\\ 3y - z = 4 \\\\ 2z = 4 \\end{cases}',
    conceptUsed: 'Back Substitution on Upper Triangular Matrix',
    given: 'Upper triangular linear system with 3 unknowns',
    required: 'Values of x, y, and z',
    formulaOrTheorem: 'Back substitution algorithm',
    whyThisMethod: 'The system is already in row-echelon form, allowing immediate bottom-up solving.',
    steps: [
      {
        stepNumber: 1,
        title: 'Solve for z from Row 3',
        description: 'From 2z = 4, divide by 2 to obtain z = 2.',
        hinglishDescription: 'Teesri equation 2z = 4 se z = 2 milta hai.',
        latex: 'z = \\frac{4}{2} = 2'
      },
      {
        stepNumber: 2,
        title: 'Substitute z into Row 2',
        description: '3y - 2 = 4 => 3y = 6 => y = 2.',
        hinglishDescription: 'Dusri equation mein z = 2 daal kar 3y - 2 = 4 se y = 2 milta hai.',
        latex: '3y - 2 = 4 \\implies 3y = 6 \\implies y = 2'
      },
      {
        stepNumber: 3,
        title: 'Substitute y and z into Row 1',
        description: 'x + 2(2) + 2 = 9 => x + 6 = 9 => x = 3.',
        hinglishDescription: 'Pehli equation mein y aur z ki values rakhne par x = 3 mil jata hai.',
        latex: 'x + 4 + 2 = 9 \\implies x = 3'
      }
    ],
    finalAnswer: 'x = 3, y = 2, z = 2',
    finalAnswerLatex: 'x = 3, \\quad y = 2, \\quad z = 2',
    verification: 'Equation 1: 3 + 2(2) + 2 = 3 + 4 + 2 = 9. Equation 2: 3(2) - 2 = 6 - 2 = 4. Equation 3: 2(2) = 4. All satisfied!',
    englishExplanation: 'When a system is in triangular form, back substitution directly computes each variable without any row operations.',
    hinglishExplanation: 'Triangular matrix mein direct neeche se upar ki taraf chalte hue har variable ki value ek-ek karke nikaalte hain.',
    commonMistakes: [
      'Solving from top to bottom instead of bottom to top.'
    ]
  },
  {
    id: 'ex-m1-3',
    moduleId: 'module-1',
    difficulty: 'intermediate',
    title: 'Gaussian Elimination on Full 3x3 System',
    question: 'Solve using Gaussian elimination: x + y + z = 6, 2x - y + z = 3, x + 2y - z = 2.',
    questionLatex: '\\begin{cases} x + y + z = 6 \\\\ 2x - y + z = 3 \\\\ x + 2y - z = 2 \\end{cases}',
    conceptUsed: 'Forward Elimination to Row Echelon Form',
    given: '3 equations in 3 unknowns with full coefficient matrix',
    required: 'Solution vector [x, y, z]^T',
    formulaOrTheorem: 'Gaussian Elimination [A|B] ~ REF',
    whyThisMethod: 'Reduces the 3x3 system systematically to upper triangular form.',
    steps: [
      {
        stepNumber: 1,
        title: 'Initial Augmented Matrix',
        description: 'Write coefficients in augmented matrix form.',
        hinglishDescription: 'Augmented matrix taiyar karte hain.',
        latex: '\\begin{bmatrix} 1 & 1 & 1 & \\bigm| & 6 \\\\ 2 & -1 & 1 & \\bigm| & 3 \\\\ 1 & 2 & -1 & \\bigm| & 2 \\end{bmatrix}'
      },
      {
        stepNumber: 2,
        title: 'Eliminate x in Row 2 and Row 3',
        description: 'Perform R2 -> R2 - 2*R1 and R3 -> R3 - R1.',
        hinglishDescription: 'R2 aur R3 ke pehle column ko zero banate hain.',
        rowOperation: 'R2 -> R2 - 2*R1, R3 -> R3 - R1',
        latex: '\\begin{bmatrix} 1 & 1 & 1 & \\bigm| & 6 \\\\ 0 & -3 & -1 & \\bigm| & -9 \\\\ 0 & 1 & -2 & \\bigm| & -4 \\end{bmatrix}'
      },
      {
        stepNumber: 3,
        title: 'Eliminate y in Row 3',
        description: 'Perform R3 -> 3*R3 + R2 to clear the entry below pivot -3.',
        hinglishDescription: 'R3 ko 3 se multiply karke R2 jod dete hain taaki y term cancel ho jaye.',
        rowOperation: '3*R3 + R2',
        latex: '\\begin{bmatrix} 1 & 1 & 1 & \\bigm| & 6 \\\\ 0 & -3 & -1 & \\bigm| & -9 \\\\ 0 & 0 & -7 & \\bigm| & -21 \\end{bmatrix}'
      },
      {
        stepNumber: 4,
        title: 'Back Substitution',
        description: 'Row 3 gives -7z = -21 => z = 3. Row 2 gives -3y - (3) = -9 => -3y = -6 => y = 2. Row 1 gives x + 2 + 3 = 6 => x = 1.',
        hinglishDescription: '-7z = -21 se z = 3 mila. Fir y = 2 aur x = 1 mila.'
      }
    ],
    finalAnswer: 'x = 1, y = 2, z = 3',
    finalAnswerLatex: 'x = 1, \\quad y = 2, \\quad z = 3',
    verification: '2(1) - (2) + 3 = 3 (Eq 2 verified), 1 + 2(2) - 3 = 1 + 4 - 3 = 2 (Eq 3 verified).',
    englishExplanation: 'By eliminating entries in column 1 then column 2, the system becomes upper triangular with 3 pivots.',
    hinglishExplanation: 'Pehle column 1 ke neeche wale elements zero kiye, fir column 2 ke neeche wala, jisse matrix echelon form mein aa gaya.',
    commonMistakes: [
      'Mixing up row indices during multiple simultaneous row operations.'
    ]
  },
  {
    id: 'ex-m1-4',
    moduleId: 'module-1',
    difficulty: 'intermediate',
    title: 'Recognizing Inconsistent System (No Solution)',
    question: 'Examine the consistency of: x + 2y - z = 3, 2x + 4y - 2z = 7.',
    questionLatex: '\\begin{cases} x + 2y - z = 3 \\\\ 2x + 4y - 2z = 7 \\end{cases}',
    conceptUsed: 'Inconsistency Detection via Row Reduction',
    given: 'Two equations in three variables',
    required: 'Check consistency and solve if possible',
    formulaOrTheorem: 'Rouché-Capelli rank condition',
    whyThisMethod: 'Row reduction quickly exposes parallel hyperplanes that never intersect.',
    steps: [
      {
        stepNumber: 1,
        title: 'Augmented Matrix Form',
        description: 'Set up the augmented matrix.',
        hinglishDescription: 'Augmented matrix likhte hain.',
        latex: '\\begin{bmatrix} 1 & 2 & -1 & \\bigm| & 3 \\\\ 2 & 4 & -2 & \\bigm| & 7 \\end{bmatrix}'
      },
      {
        stepNumber: 2,
        title: 'Eliminate Row 2',
        description: 'Apply R2 -> R2 - 2*R1.',
        hinglishDescription: 'R2 - 2*R1 row operation lagate hain.',
        rowOperation: 'R2 -> R2 - 2*R1',
        latex: '\\begin{bmatrix} 1 & 2 & -1 & \\bigm| & 3 \\\\ 0 & 0 & 0 & \\bigm| & 1 \\end{bmatrix}'
      },
      {
        stepNumber: 3,
        title: 'Analyze Resulting Equation',
        description: 'The second row represents 0x + 0y + 0z = 1, which simplifies to 0 = 1 (a mathematical impossibility).',
        hinglishDescription: 'Dusri row 0 = 1 ban gayi hai jo ki namumkin hai. Iska matlab Rank(A) = 1 aur Rank([A|B]) = 2 hai.'
      }
    ],
    finalAnswer: 'Inconsistent System (No Solution)',
    finalAnswerLatex: '\\text{No Solution (Inconsistent)}',
    verification: 'Multiplying Eq 1 by 2 yields 2x + 4y - 2z = 6, which directly contradicts Eq 2 claiming the same quantity equals 7.',
    englishExplanation: 'Since rank(A) = 1 < rank([A|B]) = 2, the equations represent parallel planes that never intersect.',
    hinglishExplanation: 'Left side dono equations ka proportional hai lekin right side alag hai, yaani do parallel planes kabhi nahi milenge.',
    commonMistakes: [
      'Assuming that 0 = 1 means infinitely many solutions (0 = 1 means NO solution; 0 = 0 means infinite solutions).'
    ]
  },
  {
    id: 'ex-m1-5',
    moduleId: 'module-1',
    difficulty: 'advanced',
    title: 'University Exam: Parameter-Dependent System',
    question: 'Find the values of k for which the system has: (i) unique solution, (ii) infinitely many solutions, (iii) no solution: x + y + z = 1, x + 2y + 4z = k, x + 4y + 10z = k^2.',
    questionLatex: '\\begin{cases} x + y + z = 1 \\\\ x + 2y + 4z = k \\\\ x + 4y + 10z = k^2 \\end{cases}',
    conceptUsed: 'Parametric Echelon Form Analysis',
    given: 'Linear system containing parameter k in constants column',
    required: 'Values of k for unique, infinite, and no solution',
    formulaOrTheorem: 'Rouché-Capelli rank conditions',
    whyThisMethod: 'Row reduction isolates the parameter k into the final row for immediate consistency analysis.',
    steps: [
      {
        stepNumber: 1,
        title: 'Initial Augmented Matrix',
        description: 'Set up [A|B] with parameter k.',
        hinglishDescription: 'Parameter k ke sath augmented matrix likhte hain.',
        latex: '\\begin{bmatrix} 1 & 1 & 1 & \\bigm| & 1 \\\\ 1 & 2 & 4 & \\bigm| & k \\\\ 1 & 4 & 10 & \\bigm| & k^2 \\end{bmatrix}'
      },
      {
        stepNumber: 2,
        title: 'Row Operations on Column 1',
        description: 'Perform R2 -> R2 - R1 and R3 -> R3 - R1.',
        hinglishDescription: 'R2 - R1 aur R3 - R1 karte hain.',
        rowOperation: 'R2 -> R2 - R1, R3 -> R3 - R1',
        latex: '\\begin{bmatrix} 1 & 1 & 1 & \\bigm| & 1 \\\\ 0 & 1 & 3 & \\bigm| & k - 1 \\\\ 0 & 3 & 9 & \\bigm| & k^2 - 1 \\end{bmatrix}'
      },
      {
        stepNumber: 3,
        title: 'Eliminate Entry in Row 3',
        description: 'Perform R3 -> R3 - 3*R2.',
        hinglishDescription: 'R3 - 3*R2 lagate hain.',
        rowOperation: 'R3 -> R3 - 3*R2',
        latex: '\\begin{bmatrix} 1 & 1 & 1 & \\bigm| & 1 \\\\ 0 & 1 & 3 & \\bigm| & k - 1 \\\\ 0 & 0 & 0 & \\bigm| & k^2 - 3k + 2 \\end{bmatrix}'
      },
      {
        stepNumber: 4,
        title: 'Factor the Constant Expression',
        description: 'k^2 - 3k + 2 = (k - 1)(k - 2).',
        hinglishDescription: 'Last term ko factorize kiya: (k - 1)(k - 2).'
      }
    ],
    finalAnswer: '(i) Unique solution: None (rank(A) ≤ 2 < 3). (ii) Infinitely many solutions: k = 1 or k = 2. (iii) No solution: k ≠ 1 and k ≠ 2.',
    finalAnswerLatex: '\\begin{cases} \\text{Unique:} & \\text{None} \\\\ \\text{Infinite:} & k = 1 \\text{ or } k = 2 \\\\ \\text{No Solution:} & k \\neq 1, 2 \\end{cases}',
    verification: 'For k = 1: last row is [0 0 0 | 0], so rank(A) = rank([A|B]) = 2 < 3, giving infinite solutions. For k = 3: last row is [0 0 0 | 2], giving 0 = 2 (inconsistent).',
    englishExplanation: 'Since the third row of the coefficient matrix becomes all zeros, rank(A) is at most 2. Hence a unique solution is impossible for any value of k.',
    hinglishExplanation: 'Coefficient matrix ki teesri row poori 0 ban gayi, isliye rank(A) hamesha 2 hi rahega. Isliye Unique solution kabhi nahi ho sakta.',
    commonMistakes: [
      'Claiming unique solution exists when k^2 - 3k + 2 ≠ 0 (if k^2 - 3k + 2 ≠ 0, there is NO solution because the row says 0 = non-zero!).'
    ]
  },

  // --- MODULE 3: DETERMINANTS ---
  {
    id: 'ex-m3-1',
    moduleId: 'module-3',
    difficulty: 'beginner',
    title: 'Evaluating 3x3 Determinant via Laplace Expansion',
    question: 'Evaluate the determinant of matrix A = [[3, 1, 4], [0, 2, 5], [0, 0, 6]].',
    questionLatex: 'A = \\begin{bmatrix} 3 & 1 & 4 \\\\ 0 & 2 & 5 \\\\ 0 & 0 & 6 \\end{bmatrix}',
    conceptUsed: 'Determinant of Upper Triangular Matrix',
    given: '3x3 upper triangular matrix',
    required: 'Value of det(A)',
    formulaOrTheorem: 'For any triangular matrix, det(A) = product of main diagonal entries',
    whyThisMethod: 'Upper triangular matrices have zeros below the main diagonal, making all cofactor terms zero except the diagonal product.',
    steps: [
      {
        stepNumber: 1,
        title: 'Identify Matrix Structure',
        description: 'Notice that all entries below the main diagonal are zero: a21 = 0, a31 = 0, a32 = 0.',
        hinglishDescription: 'Matrix upper triangular hai kyunki diagonal ke neeche ke sabhi numbers zero hain.'
      },
      {
        stepNumber: 2,
        title: 'Apply Diagonal Product Rule',
        description: 'det(A) = a11 * a22 * a33 = 3 * 2 * 6.',
        hinglishDescription: 'Diagonal ke elements ko multiply karte hain: 3 * 2 * 6.',
        latex: '\\det(A) = 3 \\times 2 \\times 6 = 36'
      }
    ],
    finalAnswer: 'det(A) = 36',
    finalAnswerLatex: '\\det(A) = 36',
    verification: 'Laplace expansion along column 1: 3 * det([[2, 5], [0, 6]]) = 3 * (12 - 0) = 36.',
    englishExplanation: 'For upper triangular, lower triangular, and diagonal matrices, the determinant always equals the product of diagonal elements.',
    hinglishExplanation: 'Triangular matrix ka determinant seedha diagonal elements ka guna hota hai.',
    commonMistakes: [
      'Wasting time doing full cofactor expansion when the shortcut theorem applies directly.'
    ]
  },
  {
    id: 'ex-m3-2',
    moduleId: 'module-3',
    difficulty: 'intermediate',
    title: 'Determinant using Row Operations',
    question: 'Evaluate det(A) where A = [[1, 2, 3], [2, 5, 8], [3, 8, 14]].',
    questionLatex: 'A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 5 & 8 \\\\ 3 & 8 & 14 \\end{bmatrix}',
    conceptUsed: 'Simplification of Determinants via Row Operations',
    given: '3x3 matrix with full entries',
    required: 'det(A)',
    formulaOrTheorem: 'Adding a multiple of one row to another preserves the determinant: det(E * A) = det(A)',
    whyThisMethod: 'Row operations create zeros in column 1, vastly reducing arithmetic complexity.',
    steps: [
      {
        stepNumber: 1,
        title: 'Row Operations to Create Zeros in Column 1',
        description: 'Apply R2 -> R2 - 2*R1 and R3 -> R3 - 3*R1 (det is unchanged).',
        hinglishDescription: 'R2 - 2*R1 aur R3 - 3*R1 karne se determinant ki value change nahi hoti.',
        rowOperation: 'R2 -> R2 - 2*R1, R3 -> R3 - 3*R1',
        latex: '\\det\\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 2 \\\\ 0 & 2 & 5 \\end{bmatrix}'
      },
      {
        stepNumber: 2,
        title: 'Create Zero in Column 2',
        description: 'Apply R3 -> R3 - 2*R2.',
        hinglishDescription: 'R3 - 2*R2 karke matrix ko upper triangular banate hain.',
        rowOperation: 'R3 -> R3 - 2*R2',
        latex: '\\det\\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 2 \\\\ 0 & 0 & 1 \\end{bmatrix}'
      },
      {
        stepNumber: 3,
        title: 'Compute Product of Diagonal Elements',
        description: 'det(A) = 1 * 1 * 1 = 1.',
        hinglishDescription: 'Diagonal entries ka product = 1 * 1 * 1 = 1.',
        latex: '\\det(A) = 1 \\times 1 \\times 1 = 1'
      }
    ],
    finalAnswer: 'det(A) = 1',
    finalAnswerLatex: '\\det(A) = 1',
    verification: 'Sarrus formula: 1(5*14 - 8*8) - 2(2*14 - 3*8) + 3(2*8 - 3*5) = 1(70-64) - 2(28-24) + 3(16-15) = 6 - 8 + 3 = 1.',
    englishExplanation: 'Row operations R_i -> R_i + k*R_j preserve the determinant exactly while simplifying the matrix to triangular form.',
    hinglishExplanation: 'Row operations se matrix ko triangular bana liya, jisse bina kisi lambe calculation ke determinant = 1 mil gaya.',
    commonMistakes: [
      'Confusing R_i -> R_i + k*R_j (preserves det) with R_i <-> R_j (flips sign of det).'
    ]
  },

  // --- MODULE 4: INVERSE OF A MATRIX ---
  {
    id: 'ex-m4-1',
    moduleId: 'module-4',
    difficulty: 'beginner',
    title: 'Inverse of a 2x2 Matrix',
    question: 'Find the inverse of matrix A = [[4, 7], [2, 6]].',
    questionLatex: 'A = \\begin{bmatrix} 4 & 7 \\\\ 2 & 6 \\end{bmatrix}',
    conceptUsed: 'Adjoint Formula for 2x2 Matrix',
    given: '2x2 matrix A',
    required: 'A^(-1)',
    formulaOrTheorem: 'A^(-1) = (1/det(A)) * [[d, -b], [-c, a]]',
    whyThisMethod: 'Fastest and exact method for any 2x2 matrix.',
    steps: [
      {
        stepNumber: 1,
        title: 'Compute Determinant',
        description: 'det(A) = ad - bc = (4)(6) - (7)(2) = 24 - 14 = 10.',
        hinglishDescription: 'det(A) = 24 - 14 = 10 (non-zero hai, isliye inverse exist karta hai).',
        latex: '\\det(A) = (4)(6) - (7)(2) = 10 \\neq 0'
      },
      {
        stepNumber: 2,
        title: 'Swap and Negate Entries for Adjoint',
        description: 'Swap diagonal entries 4 and 6; negate off-diagonal entries 7 and 2.',
        hinglishDescription: 'Diagonal wale 4 aur 6 ko swap kiya, aur 7 aur 2 ke aage minus lagaya.',
        latex: '\\text{adj}(A) = \\begin{bmatrix} 6 & -7 \\\\ -2 & 4 \\end{bmatrix}'
      },
      {
        stepNumber: 3,
        title: 'Divide Adjoint by Determinant',
        description: 'A^(-1) = (1/10) * [[6, -7], [-2, 4]].',
        hinglishDescription: 'Determinant 10 se divide kiya.',
        latex: 'A^{-1} = \\frac{1}{10} \\begin{bmatrix} 6 & -7 \\\\ -2 & 4 \\end{bmatrix} = \\begin{bmatrix} 3/5 & -7/10 \\\\ -1/5 & 2/5 \\end{bmatrix}'
      }
    ],
    finalAnswer: 'A^(-1) = [[3/5, -7/10], [-1/5, 2/5]]',
    finalAnswerLatex: 'A^{-1} = \\begin{bmatrix} 3/5 & -7/10 \\\\ -1/5 & 2/5 \\end{bmatrix}',
    verification: 'Multiply A * A^(-1): (4)(3/5) + (7)(-1/5) = 12/5 - 7/5 = 5/5 = 1. (4)(-7/10) + (7)(2/5) = -28/10 + 28/10 = 0. Produces [[1, 0], [0, 1]] = I.',
    englishExplanation: 'The 2x2 inverse rule directly yields exact rational entries and is verified by producing the identity matrix.',
    hinglishExplanation: 'Main diagonal elements ko swap karke aur baaki dono ko negative karke 10 se divide karne par inverse mil gaya.',
    commonMistakes: [
      'Dividing by det = 0 if matrix is singular.',
      'Forgetting to negate the off-diagonal entries.'
    ]
  },

  // --- MODULE 11: EIGENVALUES & EIGENVECTORS ---
  {
    id: 'ex-m11-1',
    moduleId: 'module-11',
    difficulty: 'intermediate',
    title: 'Finding Eigenvalues and Eigenvectors of a 2x2 Matrix',
    question: 'Find the eigenvalues and corresponding eigenvectors of matrix A = [[5, 4], [1, 2]].',
    questionLatex: 'A = \\begin{bmatrix} 5 & 4 \\\\ 1 & 2 \\end{bmatrix}',
    conceptUsed: 'Characteristic Equation & Eigenspaces',
    given: '2x2 real matrix A',
    required: 'Eigenvalues λ1, λ2 and eigenvectors v1, v2',
    formulaOrTheorem: 'det(A - λI) = 0 and (A - λI)v = 0',
    whyThisMethod: 'Standard algebraic technique to find invariant directions and scaling factors.',
    steps: [
      {
        stepNumber: 1,
        title: 'Form Characteristic Equation',
        description: 'det(A - λI) = (5 - λ)(2 - λ) - (4)(1) = λ^2 - 7λ + 10 - 4 = λ^2 - 7λ + 6 = 0.',
        hinglishDescription: 'det(A - λI) = 0 karke quadratic equation λ^2 - 7λ + 6 = 0 banayi.',
        latex: '\\det\\begin{bmatrix} 5 - \\lambda & 4 \\\\ 1 & 2 - \\lambda \\end{bmatrix} = \\lambda^2 - 7\\lambda + 6 = 0'
      },
      {
        stepNumber: 2,
        title: 'Solve for Eigenvalues',
        description: '(λ - 6)(λ - 1) = 0 => λ1 = 6, λ2 = 1.',
        hinglishDescription: 'Roots nikaale: λ = 6 aur λ = 1.',
        latex: '\\lambda_1 = 6, \\quad \\lambda_2 = 1'
      },
      {
        stepNumber: 3,
        title: 'Find Eigenvector for λ1 = 6',
        description: '(A - 6I)v = [[-1, 4], [1, -4]][x, y]^T = [0, 0]^T => -x + 4y = 0 => x = 4y. Set y = 1 => v1 = [4, 1]^T.',
        hinglishDescription: 'λ = 6 rakhne par -x + 4y = 0 mila, isliye v1 = [4, 1]^T.',
        latex: '\\mathbf{v}_1 = \\begin{bmatrix} 4 \\\\ 1 \\end{bmatrix}'
      },
      {
        stepNumber: 4,
        title: 'Find Eigenvector for λ2 = 1',
        description: '(A - 1I)v = [[4, 4], [1, 1]][x, y]^T = [0, 0]^T => x + y = 0 => x = -y. Set y = 1 => v2 = [-1, 1]^T.',
        hinglishDescription: 'λ = 1 rakhne par x + y = 0 mila, isliye v2 = [-1, 1]^T.',
        latex: '\\mathbf{v}_2 = \\begin{bmatrix} -1 \\\\ 1 \\end{bmatrix}'
      }
    ],
    finalAnswer: 'Eigenvalues: λ = 6 (with eigenvector [4, 1]^T) and λ = 1 (with eigenvector [-1, 1]^T).',
    finalAnswerLatex: '\\lambda_1 = 6, \\; \\mathbf{v}_1 = \\begin{bmatrix} 4 \\\\ 1 \\end{bmatrix}; \\quad \\lambda_2 = 1, \\; \\mathbf{v}_2 = \\begin{bmatrix} -1 \\\\ 1 \\end{bmatrix}',
    verification: 'Check Av1: [[5, 4], [1, 2]][4, 1]^T = [24, 6]^T = 6 * [4, 1]^T (Verified!). Check Av2: [[5, 4], [1, 2]][-1, 1]^T = [-1, 1]^T = 1 * [-1, 1]^T (Verified!). Also Trace = 5+2 = 7 = 6+1, Det = 10-4 = 6 = 6*1.',
    englishExplanation: 'Along direction [4, 1]^T, matrix A stretches vectors by a factor of 6. Along [-1, 1]^T, vectors remain completely unchanged (scale factor 1).',
    hinglishExplanation: 'Direction [4, 1]^T mein vector 6 guna lamba ho jata hai, jabki [-1, 1]^T par koi change nahi hota (λ = 1).',
    commonMistakes: [
      'Thinking eigenvectors are unique (any non-zero scalar multiple is also an eigenvector).',
      'Sign errors in characteristic equation: Trace = 7, so middle term is -7λ.'
    ]
  },

  // --- MODULE 13: CAYLEY-HAMILTON THEOREM ---
  {
    id: 'ex-m13-1',
    moduleId: 'module-13',
    difficulty: 'advanced',
    title: 'Cayley-Hamilton Verification & Computing A⁻¹ and A⁴',
    question: 'Verify Cayley-Hamilton theorem for A = [[1, 2], [3, 4]] and hence find A^(-1) and A^4.',
    questionLatex: 'A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}',
    conceptUsed: 'Cayley-Hamilton Theorem: p(A) = O',
    given: '2x2 non-singular matrix A',
    required: 'Verification that A^2 - 5A - 2I = O, and expressions for A^(-1) and A^4',
    formulaOrTheorem: 'p(λ) = λ^2 - tr(A)λ + det(A) = 0 => p(A) = O',
    whyThisMethod: 'Computes matrix powers and inverses purely through polynomial algebra without standard division or Gauss-Jordan.',
    steps: [
      {
        stepNumber: 1,
        title: 'Find Characteristic Polynomial',
        description: 'tr(A) = 1 + 4 = 5. det(A) = (1)(4) - (2)(3) = 4 - 6 = -2. So p(λ) = λ^2 - 5λ - 2 = 0.',
        hinglishDescription: 'Trace = 5 aur Det = -2 se characteristic equation: λ^2 - 5λ - 2 = 0.',
        latex: '\\lambda^2 - 5\\lambda - 2 = 0'
      },
      {
        stepNumber: 2,
        title: 'Compute A^2 and Substitute into p(A)',
        description: 'A^2 = [[1, 2], [3, 4]] * [[1, 2], [3, 4]] = [[7, 10], [15, 22]].',
        hinglishDescription: 'A^2 nikaala: [[7, 10], [15, 22]].',
        latex: 'A^2 = \\begin{bmatrix} 7 & 10 \\\\ 15 & 22 \\end{bmatrix}'
      },
      {
        stepNumber: 3,
        title: 'Verify A^2 - 5A - 2I = O',
        description: '[[7, 10], [15, 22]] - [[5, 10], [15, 20]] - [[2, 0], [0, 2]] = [[0, 0], [0, 0]] = O. Theorem Verified!',
        hinglishDescription: 'Values rakhne par Zero Matrix [[0, 0], [0, 0]] milta hai. Theorem verify ho gayi!',
        latex: 'A^2 - 5A - 2I = \\begin{bmatrix} 7-5-2 & 10-10-0 \\\\ 15-15-0 & 22-20-2 \\end{bmatrix} = \\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix} = O'
      },
      {
        stepNumber: 4,
        title: 'Calculate Inverse A^(-1)',
        description: 'Multiply by A^(-1): A - 5I - 2 A^(-1) = O => 2 A^(-1) = A - 5I => A^(-1) = (1/2)(A - 5I).',
        hinglishDescription: 'A^(-1) se multiply karke A^(-1) = (A - 5I)/2 nikaala.',
        latex: 'A^{-1} = \\frac{1}{2}(A - 5I) = \\frac{1}{2}\\left(\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} - \\begin{bmatrix} 5 & 0 \\\\ 0 & 5 \\end{bmatrix}\\right) = \\begin{bmatrix} -2 & 1 \\\\ 3/2 & -1/2 \\end{bmatrix}'
      },
      {
        stepNumber: 5,
        title: 'Calculate A^4 via Polynomial Reduction',
        description: 'A^2 = 5A + 2I. Squaring both sides: A^4 = (5A + 2I)^2 = 25 A^2 + 20 A + 4I = 25(5A + 2I) + 20A + 4I = 125A + 50I + 20A + 4I = 145A + 54I.',
        hinglishDescription: 'A^4 ko lower degree 145A + 54I mein reduce kiya.',
        latex: 'A^4 = 145A + 54I = 145\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} + \\begin{bmatrix} 54 & 0 \\\\ 0 & 54 \\end{bmatrix} = \\begin{bmatrix} 199 & 290 \\\\ 435 & 634 \\end{bmatrix}'
      }
    ],
    finalAnswer: 'A^(-1) = [[-2, 1], [3/2, -1/2]] and A^4 = [[199, 290], [435, 634]].',
    finalAnswerLatex: 'A^{-1} = \\begin{bmatrix} -2 & 1 \\\\ 3/2 & -1/2 \\end{bmatrix}, \\quad A^4 = \\begin{bmatrix} 199 & 290 \\\\ 435 & 634 \\end{bmatrix}',
    verification: 'Multiply A * A^(-1) = [[1, 2], [3, 4]][[-2, 1], [3/2, -1/2]] = [[-2+3, 1-1], [-6+6, 3-2]] = [[1, 0], [0, 1]] = I. Correct!',
    englishExplanation: 'Cayley-Hamilton converts high matrix powers and matrix inversion into simple polynomial operations.',
    hinglishExplanation: 'Cayley-Hamilton se badi power A^4 nikaalne ke liye bar-bar matrix multiply nahi karna pada, bas polynomial substitution kiya.',
    commonMistakes: [
      'Writing 2 instead of 2I in the matrix equation.',
      'Sign mistake when rearranging 2 A^(-1) = A - 5I.'
    ]
  }
];
