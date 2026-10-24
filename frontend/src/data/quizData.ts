import { QuizQuestion } from '../types';

export const MODULE_QUIZZES: Record<string, QuizQuestion[]> = {
  'module-1': [
    {
      id: 'qz-m1-1',
      question: 'Which of the following elementary row operations changes the solution set of a linear system?',
      options: [
        'Swapping two rows',
        'Multiplying a row by a non-zero scalar',
        'Adding a row of all zeros',
        'None of the above (elementary row operations never change the solution set)'
      ],
      correctOptionIndex: 3,
      explanation: 'Elementary row operations are completely reversible and preserve the solution set.',
      hinglishExplanation: 'Row operations reversible hote hain aur inse equations ka solution set kabhi nahi badalta.'
    },
    {
      id: 'qz-m1-2',
      question: 'In an augmented matrix, if a row reduces to [0 0 0 | 5], the system has:',
      options: [
        'A unique solution',
        'Infinitely many solutions',
        'No solution (inconsistent)',
        'Exactly 5 solutions'
      ],
      correctOptionIndex: 2,
      explanation: 'The equation translates to 0x + 0y + 0z = 5, which is 0 = 5 (a contradiction).',
      hinglishExplanation: '0 = 5 ek impossible equation hai, iska matlab system Inconsistent hai (No solution).'
    },
    {
      id: 'qz-m1-3',
      question: 'A homogeneous system AX = 0 with 4 equations and 6 unknowns has:',
      options: [
        'No solution',
        'Only the trivial solution',
        'Infinitely many solutions (at least 2 free variables)',
        'Cannot be determined'
      ],
      correctOptionIndex: 2,
      explanation: 'Since equations m = 4 < unknowns n = 6, there are at least n - m = 2 free variables, guaranteeing infinitely many solutions.',
      hinglishExplanation: 'Variables equations se zyada hain (6 > 4), isliye kam se kam 2 free variables honge aur anant solutions milenge.'
    }
  ],
  'module-3': [
    {
      id: 'qz-m3-1',
      question: 'If A is an invertible 3x3 matrix and det(A) = 3, what is det(3A)?',
      options: ['9', '27', '81', '3'],
      correctOptionIndex: 2,
      explanation: 'det(cA) = c^n det(A). For n = 3: 3^3 * 3 = 27 * 3 = 81.',
      hinglishExplanation: 'Formula: c^n * det(A) = 3^3 * 3 = 27 * 3 = 81.'
    },
    {
      id: 'qz-m3-2',
      question: 'If two rows of a square matrix are identical, its determinant is:',
      options: ['1', '-1', '0', 'The sum of the diagonal entries'],
      correctOptionIndex: 2,
      explanation: 'Swapping the two identical rows multiplies the determinant by -1, but the matrix is unchanged, so det = -det => det = 0.',
      hinglishExplanation: 'Do same rows hone par determinant turant 0 ho jata hai.'
    }
  ],
  'module-11': [
    {
      id: 'qz-m11-1',
      question: 'What is the sum of all eigenvalues of matrix A equal to?',
      options: ['Determinant of A', 'Trace of A', 'Rank of A', 'Order of A'],
      correctOptionIndex: 1,
      explanation: 'Sum of eigenvalues always equals the trace (sum of main diagonal elements).',
      hinglishExplanation: 'Eigenvalues ka jod hamesha matrix ke Trace ke barabar hota hai.'
    },
    {
      id: 'qz-m11-2',
      question: 'Can the zero vector [0, 0, ... 0]^T ever be an eigenvector?',
      options: [
        'Yes, when the eigenvalue is 0',
        'Yes, for the zero matrix',
        'No, eigenvectors must be non-zero by definition',
        'Only in complex spaces'
      ],
      correctOptionIndex: 2,
      explanation: 'By definition, an eigenvector must be a non-zero vector (v ≠ 0).',
      hinglishExplanation: 'Definition ke anusaar eigenvector kabhi bhi zero vector nahi ho sakta.'
    }
  ],
  'module-13': [
    {
      id: 'qz-m13-1',
      question: 'The Cayley-Hamilton theorem states that every square matrix satisfies its own:',
      options: [
        'Echelon form',
        'Characteristic equation',
        'Diagonal form',
        'Adjugate equation'
      ],
      correctOptionIndex: 1,
      explanation: 'Every square matrix satisfies p(A) = O, its characteristic equation.',
      hinglishExplanation: 'Har square matrix apni characteristic equation ko satisfy karta hai: p(A) = O.'
    }
  ]
};
