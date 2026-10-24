import { SyllabusModule } from '../types';

export const SYLLABUS_MODULES: SyllabusModule[] = [
  // --- MODULE 1 ---
  {
    id: 'module-1',
    number: 1,
    title: 'Linear Systems of Equations',
    subtitle: 'Representation, Elementary Operations & Gaussian Elimination',
    hinglishTitle: 'Linear Equations ke Systems: AX = B aur Gaussian Elimination',
    iconName: 'Layers',
    estimatedMinutes: 45,
    visualizationType: 'linear_system',
    subtopics: [
      {
        id: 'm1-s1',
        title: 'Matrix Representation: AX = B',
        description: 'Systems of linear equations represented compactly in matrix form.',
        hinglishDescription: 'Kayi linear equations ko ek saath compactly AX = B matrix form mein likhna.',
        concept: {
          mathDefinition: 'A system of m linear equations in n variables a_{i1}x_1 + ... + a_{in}x_n = b_i (i=1..m) is represented by AX = B, where A is m×n, X is n×1, and B is m×1.',
          simpleEnglish: 'Instead of writing long equations with x, y, and z, we separate the coefficients into matrix A, the unknowns into vector X, and the constants into vector B.',
          hinglish: 'Equations ke numbers (coefficients) ko matrix A mein, variables (x, y, z) ko X mein, aur right-hand side ke constants ko B mein alag kar ke likhte hain.',
          whyItMatters: 'Forms the foundational language of robotics, computer graphics, optimization algorithms, and finite element simulations.',
          prerequisites: ['Basic algebra', 'Vectors and arrays'],
          pitfalls: ['Forgetting to put 0 when a variable is missing in one of the equations', 'Swapping rows in A without updating the corresponding row in B']
        },
        formulas: [
          {
            name: 'Matrix Equation',
            latex: 'A X = B \\iff \\begin{bmatrix} a_{11} & \\dots & a_{1n} \\\\ \\vdots & \\ddots & \\vdots \\\\ a_{m1} & \\dots & a_{mn} \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ \\vdots \\\\ x_n \\end{bmatrix} = \\begin{bmatrix} b_1 \\\\ \\vdots \\\\ b_m \\end{bmatrix}',
            description: 'Compact representation of m linear equations in n unknowns.',
            hinglishDescription: 'Linear system ka compact form jisme A coefficients hai aur X variables.',
            symbols: [
              { symbol: 'A', meaning: 'Coefficient matrix of size m×n' },
              { symbol: 'X', meaning: 'Column vector of n unknowns' },
              { symbol: 'B', meaning: 'Constant column vector of size m×1' }
            ]
          },
          {
            name: 'Augmented Matrix',
            latex: '[A \\mid B] = \\begin{bmatrix} a_{11} & \\dots & a_{1n} & \\bigm| & b_1 \\\\ \\vdots & \\ddots & \\vdots & \\bigm| & \\vdots \\\\ a_{m1} & \\dots & a_{mn} & \\bigm| & b_m \\end{bmatrix}',
            description: 'Coefficient matrix augmented with the constants column for row reduction.',
            hinglishDescription: 'Coefficient matrix aur constant vector B ko ek sath jod kar banaya gaya bada matrix.',
            symbols: [
              { symbol: '[A|B]', meaning: 'Augmented matrix of dimension m×(n+1)' }
            ]
          }
        ]
      },
      {
        id: 'm1-s2',
        title: 'Gaussian & Gauss-Jordan Elimination',
        description: 'Systematic elimination using elementary row operations to reach REF and RREF.',
        hinglishDescription: 'Step-by-step row operations karke matrix ko Row-Echelon aur Reduced Row-Echelon form mein lana.',
        concept: {
          mathDefinition: 'Gaussian elimination transforms [A|B] to Row Echelon Form (REF) via forward elimination. Gauss-Jordan extends this to Reduced Row Echelon Form (RREF) where all pivot entries are 1 and sole non-zero entries in their columns.',
          simpleEnglish: 'Gaussian elimination works like systematically canceling variables one by one until you can solve from the bottom row upwards (back substitution). Gauss-Jordan goes further and solves every variable directly.',
          hinglish: 'Pehle forward pass mein diagonal ke neeche ke sabhi numbers ko zero banate hain (REF). Fir backward pass mein pivots ko 1 bana kar pivot ke upar wale sabhi numbers ko bhi zero kar dete hain (RREF).',
          whyItMatters: 'The universal, most numerically stable standard algorithm used in scientific computing to solve linear equations.',
          prerequisites: ['AX = B matrix form', 'Elementary row operations'],
          pitfalls: ['Dividing by zero when choosing a pivot', 'Arithmetic sign mistakes when performing R_i -> R_i - c * R_j']
        },
        formulas: [
          {
            name: 'Elementary Row Operations',
            latex: 'R_i \\leftrightarrow R_j, \\quad R_i \\to c R_i \\; (c \\neq 0), \\quad R_i \\to R_i + k R_j',
            description: 'The three reversible operations that preserve the solution set of the linear system.',
            hinglishDescription: 'Teen valid row operations: rows ko swap karna, kisi non-zero number se multiply karna, ya kisi row ka multiple dusri row mein jodna/ghatana.',
            symbols: [
              { symbol: 'R_i <-> R_j', meaning: 'Swap row i and row j' },
              { symbol: 'c R_i', meaning: 'Multiply row i by non-zero scalar c' },
              { symbol: 'R_i + k R_j', meaning: 'Add k times row j to row i' }
            ]
          }
        ]
      }
    ],
    summary: {
      quickRevision: [
        'A linear system AX = B has either: unique solution, infinitely many solutions, or no solution (inconsistent).',
        'Homogeneous systems AX = 0 always have at least the trivial solution X = 0.',
        'Elementary row operations do NOT alter the solution set.',
        'In REF, each pivot is strictly to the right of the pivot above it, and rows of all zeros are at the bottom.'
      ],
      hinglishRevision: [
        'Linear system ke sirf teen cases hote hain: Single Unique Solution, Infinite Solutions, ya No Solution.',
        'AX = 0 (Homogeneous) hamesha consistent hota hai kyunki x=0, y=0, z=0 hamesha satisfy karta hai.',
        'Elementary row operations lagane se equations ka solution kabhi nahi badalta.',
        'RREF mein har pivot 1 hota hai aur apne pure column mein akela non-zero element hota hai.'
      ],
      importantFormulas: [
        { name: 'Matrix Form', latex: 'A X = B' },
        { name: 'Augmented Matrix', latex: '[A \\mid B]' },
        { name: 'Rouché-Capelli Condition', latex: '\\text{rank}(A) = \\text{rank}([A \\mid B])' }
      ],
      theorems: [
        {
          name: 'Consistency Theorem',
          statement: 'A linear system AX = B is consistent if and only if the constant column B is a linear combination of the columns of A.',
          condition: 'Rank(A) must equal Rank([A|B])'
        }
      ],
      commonMistakes: [
        'Swapping rows without swapping the right-hand constant in B.',
        'Multiplying a row by 0 (scalar must be non-zero c ≠ 0).',
        'Confusing Row Echelon Form (REF) with Reduced Row Echelon Form (RREF).'
      ],
      examTips: [
        'Always double check if equations are arranged in standard order (x, y, z) before writing the matrix.',
        'If a row turns into [0 0 0 | k] where k ≠ 0, stop immediately! The system is inconsistent (no solution).'
      ],
      quickChecks: [
        {
          id: 'qc-1',
          question: 'Can a linear system have exactly 2 solutions?',
          answer: 'No. A linear system over real numbers can only have 0, 1, or infinitely many solutions.',
          explanation: 'If X1 and X2 are two distinct solutions, then any convex combination c*X1 + (1-c)*X2 is also a solution for any real c.'
        },
        {
          id: 'qc-2',
          question: 'Is the homogeneous system AX = 0 ever inconsistent?',
          answer: 'Never.',
          explanation: 'X = [0, 0, ..., 0]^T is always a solution (the trivial solution).'
        },
        {
          id: 'qc-3',
          question: 'What is the maximum number of pivots a 3x5 matrix can have?',
          answer: 'At most 3 pivots.',
          explanation: 'Pivots occur in distinct rows and columns, so rank ≤ min(3, 5) = 3.'
        },
        {
          id: 'qc-4',
          question: 'Does swapping two rows in an augmented matrix change the determinant of A?',
          answer: 'Yes, it multiplies the determinant of A by -1.',
          explanation: 'Row swaps invert the orientation, negating the determinant.'
        },
        {
          id: 'qc-5',
          question: 'If rank(A) = number of unknowns n in a homogeneous system, what is the solution?',
          answer: 'Only the trivial solution X = 0.',
          explanation: 'There are zero free variables, so only x1 = x2 = ... = xn = 0 exists.'
        }
      ]
    }
  },

  // --- MODULE 2 ---
  {
    id: 'module-2',
    number: 2,
    title: 'Linear Independence and Dependence',
    subtitle: 'Vector Relations, Pivots, Span & Dimension',
    hinglishTitle: 'Linear Independence aur Dependence: Vectors aur Pivots ka Khel',
    iconName: 'Compass',
    estimatedMinutes: 40,
    visualizationType: 'vector_3d',
    subtopics: [
      {
        id: 'm2-s1',
        title: 'Definition of Independence & Trivial Solution',
        description: 'Testing if vectors contain redundant spatial information.',
        hinglishDescription: 'Check karna ki kya koi vector baaki vectors ke combination se banaya ja sakta hai ya sab independent hain.',
        concept: {
          mathDefinition: 'A set of vectors {v1, ..., vk} is linearly independent if c1*v1 + ... + ck*vk = 0 holds if and only if c1 = c2 = ... = ck = 0 (only the trivial solution). If non-zero scalars exist, they are linearly dependent.',
          simpleEnglish: 'Vectors are linearly independent if none of them is redundant. No vector can be built as a combination of the others.',
          hinglish: 'Agar c1*v1 + c2*v2 + ... = 0 equation ka sirf ek hi hal ho (saare c zero hon), toh vectors Independent hain. Agar koi bhi ek vector doosre vectors se milkar ban sakta hai, toh wo Dependent hain.',
          whyItMatters: 'Determines the minimum number of coordinates/features needed in machine learning (PCA), state-space control, and structural stability.',
          prerequisites: ['Matrix multiplication', 'Homogeneous linear systems'],
          pitfalls: ['Assuming two vectors are independent just because they are not identical', 'Any set containing the zero vector is automatically linearly dependent!']
        },
        formulas: [
          {
            name: 'Vector Independence Equation',
            latex: 'c_1 \\mathbf{v}_1 + c_2 \\mathbf{v}_2 + \\dots + c_k \\mathbf{v}_k = \\mathbf{0} \\iff c_1 = c_2 = \\dots = c_k = 0',
            description: 'Fundamental condition for linear independence.',
            hinglishDescription: 'Linear independence ki shart: sabhi coefficients ka zero hona zaroori hai.',
            symbols: [
              { symbol: 'v_i', meaning: 'The given vectors in R^n' },
              { symbol: 'c_i', meaning: 'Scalar coefficients' }
            ]
          },
          {
            name: 'Matrix Rank Test for Independence',
            latex: '\\text{rank}([\\mathbf{v}_1 \\; \\mathbf{v}_2 \\; \\dots \\; \\mathbf{v}_k]) = k',
            description: 'Vectors are independent if and only if every column is a pivot column (rank equals number of vectors).',
            hinglishDescription: 'Vectors ko columns bana kar rank nikalo. Agar Rank = k (vectors ki sankhya), toh independent hain.',
            symbols: [
              { symbol: 'k', meaning: 'Number of vectors tested' }
            ]
          }
        ]
      }
    ],
    summary: {
      quickRevision: [
        'A set of k vectors in R^n with k > n is ALWAYS linearly dependent.',
        'Any set containing the zero vector is linearly dependent.',
        'Two vectors are dependent if and only if one is a scalar multiple of the other.',
        'For n vectors in R^n, they are independent if and only if det(A) ≠ 0.'
      ],
      hinglishRevision: [
        'Agar vectors ki sankhya unke dimensions se zyada ho (k > n), toh wo hamesha Dependent honge.',
        'Kisi bhi set mein agar Zero vector (0) shaamil hai, toh wo set pakka Dependent hai.',
        'Do vectors dependent tab hote hain jab ek vector doosre ka seedha multiple ho (v2 = k * v1).',
        'Square matrix ke case mein agar det(A) ≠ 0 hai, toh saare columns Linearly Independent hain.'
      ],
      importantFormulas: [
        { name: 'Independence Condition', latex: 'c_1 v_1 + \\dots + c_k v_k = 0 \\implies c_i = 0' },
        { name: 'Determinant Test', latex: '\\det([v_1 \\dots v_n]) \\neq 0 \\iff \\text{Independent}' }
      ],
      theorems: [
        {
          name: 'Pivot Theorem for Independence',
          statement: 'The columns of matrix A are linearly independent if and only if every column is a pivot column in REF (no free variables).',
          condition: 'Rank(A) = number of columns'
        }
      ],
      commonMistakes: [
        'Thinking that 4 vectors in 3D space can be independent (impossible, max rank in R^3 is 3).',
        'Forgetting that if det = 0, vectors are dependent.'
      ],
      examTips: [
        'For 3 vectors in R^3, quickly put them as rows or columns of a 3x3 matrix and compute determinant. If det ≠ 0, answer Independent directly!'
      ],
      quickChecks: [
        {
          id: 'qc-m2-1',
          question: 'Are vectors [1, 2] and [2, 4] linearly independent?',
          answer: 'No, they are linearly dependent.',
          explanation: 'The second vector is exactly 2 times the first vector (collinear in 2D).'
        },
        {
          id: 'qc-m2-2',
          question: 'Can 4 vectors in R^3 be linearly independent?',
          answer: 'No, never.',
          explanation: 'In R^3, maximum rank is 3. 4 vectors will always have at least one free variable, making them dependent.'
        },
        {
          id: 'qc-m2-3',
          question: 'If a set contains the zero vector [0, 0, 0], is it independent?',
          answer: 'No, it is always dependent.',
          explanation: '1*[0, 0, 0] = 0 uses a non-zero coefficient c1=1, satisfying the dependence relation.'
        },
        {
          id: 'qc-m2-4',
          question: 'What is the connection between linear independence and matrix rank?',
          answer: 'The number of linearly independent column/row vectors equals the matrix rank.',
          explanation: 'Rank is precisely the dimension of the column (or row) space.'
        },
        {
          id: 'qc-m2-5',
          question: 'If det(A) = 0 for a 3x3 matrix, what does that say about its rows?',
          answer: 'The rows are linearly dependent.',
          explanation: 'A zero determinant means at least one row is a linear combination of the other rows.'
        }
      ]
    }
  },

  // --- MODULE 3 ---
  {
    id: 'module-3',
    number: 3,
    title: 'Determinants',
    subtitle: 'Properties, Cofactors, Cramer’s Rule & Volume Scaling',
    hinglishTitle: 'Determinants: Properties, Expansion, aur Area Scaling',
    iconName: 'Square',
    estimatedMinutes: 50,
    visualizationType: 'determinant',
    subtopics: [
      {
        id: 'm3-s1',
        title: 'Properties & Cofactor Expansion',
        description: 'Laplace cofactor expansion and core determinant algebraic properties.',
        hinglishDescription: 'Cofactors ke sath expansion aur determinant ki properties (row swaps, triangular matrices).',
        concept: {
          mathDefinition: 'The determinant is a unique scalar function mapping square matrices to scalars, characterized by multilinearity, alternating property on rows, and det(I) = 1.',
          simpleEnglish: 'A single number associated with a square matrix that measures how much the matrix scales volume, and whether the matrix can be inverted.',
          hinglish: 'Ek square matrix ka khas number jo batata hai ki transformation space ko kitna expand/shrink karta hai. Agar det = 0 hai, toh matrix invertible nahi hai.',
          whyItMatters: 'Used in Jacobian transformations for multivariable integration, characteristic equations for stability, and Cramer’s rule.',
          prerequisites: ['Square matrix definition', 'Basic permutations'],
          pitfalls: ['Forgetting the alternating sign pattern (+, -, +, -) in cofactor expansion', 'Multiplying a matrix by scalar c multiplies det by c^n, NOT just c!']
        },
        formulas: [
          {
            name: 'Laplace Cofactor Expansion',
            latex: '\\det(A) = \\sum_{j=1}^n (-1)^{i+j} a_{ij} M_{ij} = \\sum_{j=1}^n a_{ij} C_{ij}',
            description: 'Expansion along any row i (or column j) using minors M_ij and cofactors C_ij.',
            hinglishDescription: 'Kisi bhi row ya column ke anusaar cofactors ko multiply karke determinant nikaalna.',
            symbols: [
              { symbol: 'M_{ij}', meaning: 'Minor: determinant of (n-1)×(n-1) submatrix after removing row i and column j' },
              { symbol: 'C_{ij} = (-1)^{i+j} M_{ij}', meaning: 'Signed cofactor' }
            ]
          },
          {
            name: 'Scalar Multiplication Property',
            latex: '\\det(c A) = c^n \\det(A)',
            description: 'Scaling an n×n matrix by scalar c scales the determinant by c to the power n.',
            hinglishDescription: 'n×n matrix ko c se multiply karne par determinant c^n guna badh jata hai.',
            symbols: [
              { symbol: 'n', meaning: 'Order of the square matrix' }
            ]
          },
          {
            name: 'Product Rule',
            latex: '\\det(A B) = \\det(A) \\cdot \\det(B)',
            description: 'Determinant of a matrix product is the product of their determinants.',
            hinglishDescription: 'Dono matrices ke product ka determinant unke alag-alag determinants ke product ke barabar hota hai.'
          }
        ]
      }
    ],
    summary: {
      quickRevision: [
        'det(A^T) = det(A): Transpose has the identical determinant.',
        'det(AB) = det(A) * det(B).',
        'det(A^(-1)) = 1 / det(A).',
        'If any row or column is all zeros, or if two rows/columns are identical or proportional, det(A) = 0.',
        'For triangular and diagonal matrices, det is simply the product of main diagonal elements.'
      ],
      hinglishRevision: [
        'Matrix ka transpose lene se determinant bilkul nahi badalta: det(A^T) = det(A).',
        'Inverse ka determinant seedha 1 / det(A) hota hai.',
        'Agar kisi matrix ki koi poori row 0 ho, ya do rows aapas mein barabar hon, toh det turant 0 ho jata hai.',
        'Upper/Lower triangular matrix mein bas diagonal ke elements ko multiply kar do, wahi determinant hai.'
      ],
      importantFormulas: [
        { name: '2x2 Determinant', latex: '\\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc' },
        { name: 'Scalar Rule', latex: '\\det(k A) = k^n \\det(A)' },
        { name: 'Inverse Determinant', latex: '\\det(A^{-1}) = \\frac{1}{\\det(A)}' }
      ],
      theorems: [
        {
          name: 'Invertibility Theorem',
          statement: 'A square matrix A is invertible if and only if det(A) ≠ 0.',
          condition: 'Square matrix'
        }
      ],
      commonMistakes: [
        'Writing det(cA) = c det(A) instead of c^n det(A).',
        'Thinking det(A + B) = det(A) + det(B) (FATAL ERROR! This is FALSE in general).'
      ],
      examTips: [
        'Always look for a row or column with the most zeros before doing cofactor expansion to save time!'
      ],
      quickChecks: [
        {
          id: 'qc-m3-1',
          question: 'If A is 3x3 and det(A) = 5, what is det(2A)?',
          answer: '40',
          explanation: 'det(2A) = 2^3 * det(A) = 8 * 5 = 40.'
        },
        {
          id: 'qc-m3-2',
          question: 'Does det(A + B) equal det(A) + det(B)?',
          answer: 'No! Almost never.',
          explanation: 'Determinant is multilinear in each row individually, not linear across addition of whole matrices.'
        },
        {
          id: 'qc-m3-3',
          question: 'What is the determinant of an upper triangular matrix with diagonal [2, -3, 5]?',
          answer: '-30',
          explanation: 'Product of diagonal entries: 2 * (-3) * 5 = -30.'
        },
        {
          id: 'qc-m3-4',
          question: 'If det(A) = 4, what is det(A^(-1))?',
          answer: '1/4 (or 0.25)',
          explanation: 'det(A^(-1)) = 1 / det(A) = 1/4.'
        },
        {
          id: 'qc-m3-5',
          question: 'What happens to det(A) if we swap two rows?',
          answer: 'The sign reverses (multiplied by -1).',
          explanation: 'Row swaps change orientation, so det becomes -det.'
        }
      ]
    }
  },

  // --- MODULE 4 ---
  {
    id: 'module-4',
    number: 4,
    title: 'Inverse of a Matrix',
    subtitle: 'Existence, Adjoint Formula, Gauss-Jordan & Invertibility',
    hinglishTitle: 'Inverse of a Matrix: Adjoint Method aur Gauss-Jordan',
    iconName: 'RotateCcw',
    estimatedMinutes: 45,
    subtopics: [
      {
        id: 'm4-s1',
        title: 'Definition & Adjoint Method',
        description: 'Conditions for invertibility and the classical adjoint formula.',
        hinglishDescription: 'Inverse ka matlab aur Adjoint method: A^(-1) = adj(A) / det(A).',
        concept: {
          mathDefinition: 'For an n×n square matrix A, an inverse A^(-1) exists if and only if A is non-singular (det(A) ≠ 0), satisfying A A^(-1) = A^(-1) A = I_n.',
          simpleEnglish: 'The matrix equivalent of dividing by a number. Multiplying a matrix by its inverse undoes the transformation and returns the identity matrix.',
          hinglish: 'Jaise 5 ka reciprocal 1/5 hota hai (5 * 1/5 = 1), waise hi matrix A ka inverse A^(-1) hota hai jise multiply karne par Identity matrix I milta hai.',
          whyItMatters: 'Used to solve matrix equations AX = B as X = A^(-1)B, decrypt ciphers, and un-distort camera lenses.',
          prerequisites: ['Determinants', 'Matrix multiplication'],
          pitfalls: ['Attempting to find inverse of a non-square matrix (undefined)', 'Transposing the cofactor matrix is required for adj(A); forgetting the transpose is the most common exam mistake!']
        },
        formulas: [
          {
            name: 'Adjoint Inverse Formula',
            latex: 'A^{-1} = \\frac{1}{\\det(A)} \\text{adj}(A) = \\frac{1}{\\det(A)} [C_{ij}]^T',
            description: 'Inverse expressed as the transpose of the cofactor matrix divided by the determinant.',
            hinglishDescription: 'Cofactors matrix ka transpose lekar use determinant se divide karne par inverse milta hai.',
            symbols: [
              { symbol: 'adj(A)', meaning: 'Adjugate matrix (transpose of the cofactor matrix)' },
              { symbol: 'det(A)', meaning: 'Determinant of A (must be non-zero)' }
            ]
          },
          {
            name: '2x2 Shortcut Inverse',
            latex: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}^{-1} = \\frac{1}{ad - bc} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}',
            description: 'Swap main diagonal elements, change signs of off-diagonal elements, divide by determinant.',
            hinglishDescription: 'Main diagonal ke elements ko aapas mein swap karo, baaki dono ke aage minus lagao, aur determinant se divide kar do.'
          },
          {
            name: 'Reversal Property',
            latex: '(A B)^{-1} = B^{-1} A^{-1}, \\quad (A^T)^{-1} = (A^{-1})^T',
            description: 'Inverse of a product reverses the order of factors (socks and shoes principle).',
            hinglishDescription: 'Product ka inverse lene par order reverse ho jata hai: pehle B^(-1) fir A^(-1).'
          }
        ]
      }
    ],
    summary: {
      quickRevision: [
        'A^(-1) exists if and only if det(A) ≠ 0 (matrix is non-singular).',
        'AA^(-1) = A^(-1)A = I.',
        '(AB)^(-1) = B^(-1) A^(-1).',
        'Gauss-Jordan method: [A | I] ~ [I | A^(-1)].'
      ],
      hinglishRevision: [
        'Inverse tabhi nikal sakta hai jab det(A) ≠ 0 ho.',
        'A ko uske inverse se multiply karne par hamesha Identity matrix I aana chahiye.',
        '(AB)^(-1) mein order ulta ho kar B^(-1) A^(-1) ban jata hai.',
        'Gauss-Jordan mein [A | I] ko row operations se [I | A^(-1)] banate hain.'
      ],
      importantFormulas: [
        { name: 'Adjoint Formula', latex: 'A^{-1} = \\frac{1}{\\det(A)} \\text{adj}(A)' },
        { name: 'Product Inverse', latex: '(A B)^{-1} = B^{-1} A^{-1}' }
      ],
      theorems: [
        {
          name: 'Uniqueness of Inverse',
          statement: 'If a matrix has an inverse, the inverse is unique.',
          condition: 'Square non-singular matrix'
        }
      ],
      commonMistakes: [
        'Forgetting to transpose the cofactor matrix to get the adjoint.',
        'Applying (AB)^(-1) = A^(-1)B^(-1) (WRONG, order must reverse to B^(-1)A^(-1)).'
      ],
      examTips: [
        'Always verify your calculated inverse by multiplying with the original matrix: A * A^(-1) must equal I.'
      ],
      quickChecks: [
        {
          id: 'qc-m4-1',
          question: 'Can a 3x4 matrix have an inverse?',
          answer: 'No. Only square matrices can have a standard two-sided inverse.',
          explanation: 'Dimensions must be square so that AA^(-1) = A^(-1)A = I.'
        },
        {
          id: 'qc-m4-2',
          question: 'What is (A^T)^(-1) in terms of A^(-1)?',
          answer: '(A^(-1))^T',
          explanation: 'Transposition and inversion commute.'
        },
        {
          id: 'qc-m4-3',
          question: 'What is the adjoint of identity matrix I_3?',
          answer: 'I_3',
          explanation: 'det(I)=1 and I^(-1)=I, so adj(I) = 1 * I = I.'
        },
        {
          id: 'qc-m4-4',
          question: 'If A is invertible, what is det(adj(A)) for an n x n matrix?',
          answer: '(det(A))^(n-1)',
          explanation: 'Since A * adj(A) = det(A) * I, taking det gives det(A) * det(adj(A)) = (det(A))^n.'
        },
        {
          id: 'qc-m4-5',
          question: 'Why does a matrix with det = 0 have no inverse?',
          answer: 'It collapses dimension, losing information that cannot be reversed.',
          explanation: 'If Ax = 0 for some non-zero x, then A^(-1)(0) would have to equal both 0 and x, which is impossible.'
        }
      ]
    }
  },

  // --- MODULE 5 ---
  {
    id: 'module-5',
    number: 5,
    title: 'Rank of a Matrix',
    subtitle: 'Row Rank, Column Rank, Echelon Form & Non-zero Minors',
    hinglishTitle: 'Rank of a Matrix: Linearly Independent Rows aur Minors',
    iconName: 'BarChart2',
    estimatedMinutes: 45,
    subtopics: [
      {
        id: 'm5-s1',
        title: 'Definition & Echelon Method',
        description: 'Row rank = Column rank = number of non-zero rows in REF.',
        hinglishDescription: 'Row reduction karke non-zero rows ginna hi Matrix ka Rank hai.',
        concept: {
          mathDefinition: 'The rank of matrix A, denoted rank(A) or ρ(A), is the maximum number of linearly independent row vectors (or column vectors). It equals the number of non-zero rows in any Row-Echelon Form of A.',
          simpleEnglish: 'Rank tells you the true dimension of the information inside the matrix. Any redundant equations or rows get canceled out.',
          hinglish: 'Rank batata hai ki matrix mein kitni aisi rows hain jo sach mein kaam ki hain aur kisi doosri row ka duplicate ya combination nahi hain.',
          whyItMatters: 'Fundamental criterion for classifying whether systems of equations have solutions (Rouché-Capelli).',
          prerequisites: ['Elementary row operations', 'Linear independence'],
          pitfalls: ['Counting rows in the original matrix instead of in Row-Echelon Form', 'Stopping row operations before reaching true echelon form']
        },
        formulas: [
          {
            name: 'Rank Bounds',
            latex: '0 \\le \\text{rank}(A) \\le \\min(m, n)',
            description: 'Rank cannot exceed the number of rows m or number of columns n.',
            hinglishDescription: 'Rank kabhi bhi rows ya columns ki sankhya se zyada nahi ho sakta.',
            symbols: [
              { symbol: 'm', meaning: 'Number of rows' },
              { symbol: 'n', meaning: 'Number of columns' }
            ]
          },
          {
            name: 'Fundamental Theorem of Rank',
            latex: '\\text{Row Rank}(A) = \\text{Column Rank}(A) = \\text{rank}(A)',
            description: 'The number of independent rows always equals the number of independent columns for any matrix.',
            hinglishDescription: 'Chaahe rows se gino ya columns se, independent vectors ki sankhya hamesha barabar aati hai.'
          }
        ]
      }
    ],
    summary: {
      quickRevision: [
        'Rank = number of non-zero rows in Row-Echelon Form (REF).',
        'Rank = order of the largest non-zero minor.',
        'Row rank always equals column rank.',
        'An n×n matrix has full rank n if and only if det(A) ≠ 0.'
      ],
      hinglishRevision: [
        'Echelon form mein zero rows ko chhodkar baaki bachi non-zero rows ki ginti hi Rank hai.',
        'Sabse bada minor jiska determinant non-zero ho, uska order hi rank hota hai.',
        'Square matrix ka rank n tabhi hota hai jab uska det(A) ≠ 0 ho.'
      ],
      importantFormulas: [
        { name: 'Rank Upper Bound', latex: '\\text{rank}(A_{m \\times n}) \\le \\min(m, n)' },
        { name: 'Rank of Transpose', latex: '\\text{rank}(A^T) = \\text{rank}(A)' }
      ],
      theorems: [
        {
          name: 'Invariance of Rank Under Row Operations',
          statement: 'Elementary row and column operations do not change the rank of a matrix.',
          condition: 'Valid elementary operations'
        }
      ],
      commonMistakes: [
        'Assuming rank is simply the number of rows with any non-zero element in the original unreduced matrix.'
      ],
      examTips: [
        'Reduce to upper triangular echelon form first; count the number of pivots to state the rank with confidence.'
      ],
      quickChecks: [
        {
          id: 'qc-m5-1',
          question: 'What is the rank of the zero matrix of size 3x3?',
          answer: '0',
          explanation: 'The zero matrix contains no non-zero rows and no non-zero minors.'
        },
        {
          id: 'qc-m5-2',
          question: 'What is the maximum rank of a 4x7 matrix?',
          answer: '4',
          explanation: 'rank(A) ≤ min(4, 7) = 4.'
        },
        {
          id: 'qc-m5-3',
          question: 'If det(A) = 0 for a 3x3 matrix, can its rank be 3?',
          answer: 'No. Its rank must be at most 2.',
          explanation: 'Rank is 3 if and only if the 3x3 minor (the determinant) is non-zero.'
        },
        {
          id: 'qc-m5-4',
          question: 'Does transposing a matrix change its rank?',
          answer: 'No, rank(A^T) = rank(A).',
          explanation: 'Row rank equals column rank.'
        },
        {
          id: 'qc-m5-5',
          question: 'What is the rank of the 5x5 Identity matrix I_5?',
          answer: '5',
          explanation: 'All 5 rows are pivots and linearly independent.'
        }
      ]
    }
  },

  // --- MODULE 6 ---
  {
    id: 'module-6',
    number: 6,
    title: 'Rank-Nullity Theorem',
    subtitle: 'Null Space, Column Space, Kernel & Fundamental Dimension Formula',
    hinglishTitle: 'Rank-Nullity Theorem: Dimension Formula aur Null Space',
    iconName: 'Maximize2',
    estimatedMinutes: 45,
    subtopics: [
      {
        id: 'm6-s1',
        title: 'Rank-Nullity Theorem & Proof',
        description: 'Statement, proof, and numerical verification of Rank(A) + Nullity(A) = n.',
        hinglishDescription: 'Formula: rank(A) + nullity(A) = columns ki sankhya n, aur iska geometric proof.',
        concept: {
          mathDefinition: 'For any m×n matrix A representing a linear transformation T: R^n -> R^m, dim(Col(A)) + dim(Null(A)) = n, i.e., rank(A) + nullity(A) = n.',
          simpleEnglish: 'Every column is either a pivot column (contributing to rank) or a free column (contributing to nullity). Their total sum must equal the total number of columns n.',
          hinglish: 'Total variables (columns n) do hisson mein bat jaate hain: Pivot variables (Rank) aur Free variables (Nullity). Dono ka jod hamesha n hota hai.',
          whyItMatters: 'Conservation law of dimension in linear algebra; used in network analysis, conservation of degrees of freedom in robotics.',
          prerequisites: ['Rank of matrix', 'Null space and free variables'],
          pitfalls: ['Using the number of rows m instead of columns n in the formula', 'Confusing nullity with the number of zero rows']
        },
        formulas: [
          {
            name: 'Rank-Nullity Formula',
            latex: '\\text{rank}(A) + \\text{nullity}(A) = n',
            description: 'Fundamental theorem connecting dimension of column space and null space.',
            hinglishDescription: 'Rank aur Nullity ka jod hamesha matrix ke columns ki sankhya n ke barabar hota hai.',
            symbols: [
              { symbol: 'rank(A)', meaning: 'Dimension of column space (number of pivot columns)' },
              { symbol: 'nullity(A)', meaning: 'Dimension of null space / kernel (number of free variables)' },
              { symbol: 'n', meaning: 'Total number of columns (dimension of domain R^n)' }
            ]
          }
        ]
      }
    ],
    summary: {
      quickRevision: [
        'rank(A) + nullity(A) = n (where n is the number of COLUMNS, not rows).',
        'Nullity equals the number of free variables in RREF of AX = 0.',
        'Null space is the subspace of all vectors X such that AX = 0.',
        'If rank(A) = n, then nullity(A) = 0 and Null(A) = {0}.'
      ],
      hinglishRevision: [
        'Rank(A) + Nullity(A) = Columns ki sankhya n.',
        'Nullity ka matlab hota hai ki kitne free variables bache hain AX = 0 solve karte waqt.',
        'Agar rank poora n hai, toh nullity 0 hogi (sirf zero vector solution hai).'
      ],
      importantFormulas: [
        { name: 'Rank-Nullity Identity', latex: '\\dim(\\text{Col } A) + \\dim(\\text{Null } A) = n' }
      ],
      theorems: [
        {
          name: 'Rank-Nullity Theorem',
          statement: 'Let T: V -> W be a linear transformation from an n-dimensional vector space V. Then rank(T) + nullity(T) = dim(V).',
          condition: 'Finite-dimensional vector space V'
        }
      ],
      commonMistakes: [
        'Adding nullity to rank and expecting m (number of rows) instead of n (number of columns).'
      ],
      examTips: [
        'Count the pivot columns first to get rank r. Immediately compute nullity = n - r.'
      ],
      quickChecks: [
        {
          id: 'qc-m6-1',
          question: 'If a 3x5 matrix has rank 2, what is its nullity?',
          answer: '3',
          explanation: 'n = 5. nullity = n - rank = 5 - 2 = 3.'
        },
        {
          id: 'qc-m6-2',
          question: 'Can an invertible 4x4 matrix have a non-zero nullity?',
          answer: 'No, nullity is 0.',
          explanation: 'An invertible 4x4 matrix has rank 4, so nullity = 4 - 4 = 0.'
        },
        {
          id: 'qc-m6-3',
          question: 'What is the nullity of the zero matrix of size 3x4?',
          answer: '4',
          explanation: 'Rank is 0, so nullity = 4 - 0 = 4.'
        },
        {
          id: 'qc-m6-4',
          question: 'In AX = 0, what does nullity represent in terms of solutions?',
          answer: 'The number of independent parameters in the general solution.',
          explanation: 'Each free variable corresponds to one basis vector in the null space.'
        },
        {
          id: 'qc-m6-5',
          question: 'Does the Rank-Nullity theorem hold for non-square matrices?',
          answer: 'Yes, absolutely.',
          explanation: 'It applies to any m×n matrix; the right hand side is always n (columns).'
        }
      ]
    }
  },

  // --- MODULE 7 ---
  {
    id: 'module-7',
    number: 7,
    title: 'System of Linear Equations Using Rank',
    subtitle: 'Rouché-Capelli Theorem, Consistency & Parametric Solutions',
    hinglishTitle: 'Rank se Equations Solve Karna: Rouché-Capelli Theorem',
    iconName: 'GitFork',
    estimatedMinutes: 50,
    visualizationType: 'linear_system',
    subtopics: [
      {
        id: 'm7-s1',
        title: 'Rouché-Capelli Theorem',
        description: 'Classifying solutions using Rank(A) and Rank([A|B]).',
        hinglishDescription: 'Rank(A) aur Rank([A|B]) ko compare karke pata lagana ki solution exist karega ya nahi.',
        concept: {
          mathDefinition: 'A system AX = B is consistent if and only if rank(A) = rank([A|B]). If this common rank r equals n (number of unknowns), there is a unique solution; if r < n, there are infinitely many solutions with (n-r) free parameters. If rank(A) < rank([A|B]), the system is inconsistent.',
          simpleEnglish: 'Compare the rank of the coefficients with the rank including the constants. If adding constants increases the rank, equations contradict each other (no solution).',
          hinglish: 'Agar B ko add karne par rank badh jata hai, matlab koi contradiction (jaise 0 = 5) aa gayi hai, toh No Solution. Agar rank barabar hai aur n ke equal hai toh Unique Solution, aur n se kam hai toh Infinite Solutions.',
          whyItMatters: 'The gold standard test taught in all engineering and university exams to determine solution behavior.',
          prerequisites: ['Rank calculation', 'Augmented matrix [A|B]'],
          pitfalls: ['Forgetting that rank([A|B]) can NEVER be smaller than rank(A)', 'Mixing up number of equations m with number of variables n']
        },
        formulas: [
          {
            name: 'Rouché-Capelli Classification',
            latex: '\\begin{cases} \\text{rank}(A) < \\text{rank}([A \\mid B]) & \\implies \\text{Inconsistent (No solution)} \\\\ \\text{rank}(A) = \\text{rank}([A \\mid B]) = n & \\implies \\text{Consistent (Unique solution)} \\\\ \\text{rank}(A) = \\text{rank}([A \\mid B]) < n & \\implies \\text{Consistent (Infinitely many solutions)} \\end{cases}',
            description: 'Complete classification of linear systems based on rank.',
            hinglishDescription: 'Linear system ke teeno cases ki Rouché-Capelli conditions.',
            symbols: [
              { symbol: 'n', meaning: 'Number of variables (unknowns)' }
            ]
          }
        ]
      }
    ],
    summary: {
      quickRevision: [
        'Rank(A) < Rank([A|B]): Inconsistent (No solution).',
        'Rank(A) = Rank([A|B]) = n: Unique solution.',
        'Rank(A) = Rank([A|B]) = r < n: Infinitely many solutions with n - r free parameters.',
        'Homogeneous systems AX = 0 have non-trivial solutions if and only if rank(A) < n.'
      ],
      hinglishRevision: [
        'Rank(A) < Rank([A|B]) ka matlab No Solution.',
        'Dono rank barabar aur n ke equal hon toh Unique Solution.',
        'Dono rank barabar lekin n se kam hon toh Infinite Solutions.',
        'Homogeneous AX = 0 mein non-trivial solution tabhi hota hai jab det(A) = 0 ya rank < n ho.'
      ],
      importantFormulas: [
        { name: 'Consistency Condition', latex: '\\text{rank}(A) = \\text{rank}([A \\mid B])' }
      ],
      theorems: [
        {
          name: 'Rouché-Capelli Theorem',
          statement: 'A linear system AX = B has at least one solution if and only if rank(A) = rank([A|B]).',
          condition: 'Any system of linear equations'
        }
      ],
      commonMistakes: [
        'Saying infinitely many solutions exist when rank(A) < rank([A|B]) (that is NO solution!).'
      ],
      examTips: [
        'For parameter problems (e.g. find lambda and mu for unique/no/infinite solutions), reduce to echelon form and analyze the last row [0 0 (lambda - a) | (mu - b)].'
      ],
      quickChecks: [
        {
          id: 'qc-m7-1',
          question: 'If rank(A) = 2 and rank([A|B]) = 3 for 3 unknowns, how many solutions?',
          answer: '0 (No solution / Inconsistent)',
          explanation: 'rank(A) < rank([A|B]).'
        },
        {
          id: 'qc-m7-2',
          question: 'If rank(A) = rank([A|B]) = 2 for 4 unknowns, how many free parameters?',
          answer: '2 free parameters (Infinitely many solutions)',
          explanation: 'Number of free parameters = n - r = 4 - 2 = 2.'
        },
        {
          id: 'qc-m7-3',
          question: 'Can rank([A|B]) ever be strictly less than rank(A)?',
          answer: 'No, never.',
          explanation: 'Adding a column can only maintain or increase the rank, never decrease it.'
        },
        {
          id: 'qc-m7-4',
          question: 'For a square system AX = 0, when do non-trivial solutions exist?',
          answer: 'When det(A) = 0.',
          explanation: 'det(A) = 0 means rank(A) < n, giving at least one free variable.'
        },
        {
          id: 'qc-m7-5',
          question: 'In an echelon row [0 0 0 | 7], what does this indicate?',
          answer: 'The system is inconsistent (0x + 0y + 0z = 7 is impossible).',
          explanation: 'The equation 0 = 7 has no solution.'
        }
      ]
    }
  },

  // --- MODULE 8 ---
  {
    id: 'module-8',
    number: 8,
    title: 'Symmetric Matrices',
    subtitle: 'Aᵀ = A, Real Eigenvalues, Orthogonal Eigenvectors & Quadratic Forms',
    hinglishTitle: 'Symmetric Matrices: Aᵀ = A aur Real Eigenvalues',
    iconName: 'Shield',
    estimatedMinutes: 40,
    subtopics: [
      {
        id: 'm8-s1',
        title: 'Definition & Spectral Properties',
        description: 'Properties of symmetric matrices, real eigenvalues, and orthogonal eigenvectors.',
        hinglishDescription: 'Symmetric matrix Aᵀ = A ke properties: sabhi eigenvalues real hote hain aur eigenvectors aapas mein perpendicular hote hain.',
        concept: {
          mathDefinition: 'A square matrix A is symmetric if A^T = A, meaning a_ij = a_ji for all i, j. By the Spectral Theorem, all eigenvalues of a real symmetric matrix are real, and eigenvectors corresponding to distinct eigenvalues are mutually orthogonal.',
          simpleEnglish: 'A matrix that is identical to its mirror image across the main diagonal. They possess extraordinary mathematical symmetry.',
          hinglish: 'Jo matrix main diagonal ke aar-paar mirror image jaisa hota hai (a_ij = a_ji). Iske saare eigenvalues hamesha real numbers hote hain aur eigenvectors 90 degree par hote hain.',
          whyItMatters: 'Central to mechanics (inertia tensor, stress tensor), physics (Hamiltonians), covariance matrices in statistics, and machine learning (PCA).',
          prerequisites: ['Matrix transpose', 'Eigenvalues and eigenvectors'],
          pitfalls: ['Assuming the product of two symmetric matrices is always symmetric (only true if AB = BA, i.e., they commute!)']
        },
        formulas: [
          {
            name: 'Symmetry Condition',
            latex: 'A^T = A \\iff a_{ij} = a_{ji} \\quad \\forall i, j',
            description: 'Transpose equals original matrix.',
            hinglishDescription: 'Transpose lene par matrix bilkul waisa hi rehta hai.',
            symbols: []
          },
          {
            name: 'Orthogonality of Eigenvectors',
            latex: '\\lambda_1 \\neq \\lambda_2 \\implies \\mathbf{v}_1 \\cdot \\mathbf{v}_2 = \\mathbf{v}_1^T \\mathbf{v}_2 = 0',
            description: 'Eigenvectors corresponding to distinct eigenvalues of a real symmetric matrix are strictly perpendicular.',
            hinglishDescription: 'Alag-alag eigenvalues ke corresponding eigenvectors hamesha aapas mein 90 degree (orthogonal) hote hain.'
          }
        ]
      }
    ],
    summary: {
      quickRevision: [
        'A^T = A.',
        'All eigenvalues of a real symmetric matrix are purely REAL numbers.',
        'Eigenvectors corresponding to distinct eigenvalues are mutually orthogonal.',
        'A real symmetric matrix can ALWAYS be orthogonally diagonalized: A = P D P^T with P orthogonal.',
        'The product AB is symmetric if and only if AB = BA (A and B commute).'
      ],
      hinglishRevision: [
        'Symmetric matrix ka transpose wahi matrix hota hai: A^T = A.',
        'Real symmetric matrix ke saare eigenvalues hamesha REAL hote hain (kabhi complex/imaginary nahi aate).',
        'Distinct eigenvalues ke eigenvectors aapas mein perpendicular (dot product = 0) hote hain.',
        'Ise hamesha orthogonally diagonalize kiya ja sakta hai: A = P D P^T.'
      ],
      importantFormulas: [
        { name: 'Symmetric Condition', latex: 'A^T = A' },
        { name: 'Orthogonal Diagonalization', latex: 'A = P D P^T \\quad (P^T P = I)' }
      ],
      theorems: [
        {
          name: 'Spectral Theorem for Real Symmetric Matrices',
          statement: 'Every real symmetric matrix has real eigenvalues and an orthonormal basis of eigenvectors.',
          condition: 'Real entries, A^T = A'
        }
      ],
      commonMistakes: [
        'Thinking AB is always symmetric if A and B are symmetric (AB is symmetric ONLY if AB = BA).'
      ],
      examTips: [
        'If an exam question asks you to check orthogonality of eigenvectors of a symmetric matrix, verify their dot product v1 · v2 = 0.'
      ],
      quickChecks: [
        {
          id: 'qc-m8-1',
          question: 'Can a real symmetric matrix have imaginary eigenvalues?',
          answer: 'Never. All eigenvalues are guaranteed to be real.',
          explanation: 'Proven by the Spectral Theorem using complex conjugates.'
        },
        {
          id: 'qc-m8-2',
          question: 'If A and B are symmetric, is A + B symmetric?',
          answer: 'Yes, always.',
          explanation: '(A + B)^T = A^T + B^T = A + B.'
        },
        {
          id: 'qc-m8-3',
          question: 'Is A^T * A always symmetric for any matrix A?',
          answer: 'Yes, always.',
          explanation: '(A^T * A)^T = A^T * (A^T)^T = A^T * A.'
        },
        {
          id: 'qc-m8-4',
          question: 'If v1 and v2 are eigenvectors for distinct eigenvalues of a symmetric matrix, what is v1 · v2?',
          answer: '0 (orthogonal)',
          explanation: 'Eigenvectors of distinct eigenvalues are mutually perpendicular.'
        },
        {
          id: 'qc-m8-5',
          question: 'What is the inverse of an orthogonal matrix P in A = P D P^T?',
          answer: 'P^T',
          explanation: 'For orthogonal matrices, P^(-1) = P^T.'
        }
      ]
    }
  },

  // --- MODULE 9 ---
  {
    id: 'module-9',
    number: 9,
    title: 'Skew-Symmetric Matrices',
    subtitle: 'Aᵀ = −A, Zero Diagonal, Odd-Order Determinants & Decomposition',
    hinglishTitle: 'Skew-Symmetric Matrices: Aᵀ = −A aur Decomposition',
    iconName: 'Minimize2',
    estimatedMinutes: 40,
    subtopics: [
      {
        id: 'm9-s1',
        title: 'Definition & Canonical Decomposition',
        description: 'Properties, zero main diagonal entries, and decomposing any matrix into symmetric and skew-symmetric parts.',
        hinglishDescription: 'Aᵀ = −A, diagonal elements hamesha 0 hote hain, aur formula A = (A + Aᵀ)/2 + (A − Aᵀ)/2.',
        concept: {
          mathDefinition: 'A square matrix A is skew-symmetric (or anti-symmetric) if A^T = -A, meaning a_ij = -a_ji. Since a_ii = -a_ii, all main diagonal entries must be zero.',
          simpleEnglish: 'A matrix where reflecting across the diagonal flips the sign of every element, forcing all diagonal numbers to be zero.',
          hinglish: 'Transpose lene par poora matrix negative ho jata hai (Aᵀ = −A). Main diagonal ke sabhi elements hamesha zero hote hain.',
          whyItMatters: 'Used in 3D cross products (cross-product matrix), angular velocity representations in robotics, and Lie algebras.',
          prerequisites: ['Matrix transpose', 'Symmetric matrices'],
          pitfalls: ['Forgetting that main diagonal elements must be 0', 'Thinking the determinant of an even-order skew-symmetric matrix is 0 (it is often non-zero and always a perfect square!)']
        },
        formulas: [
          {
            name: 'Skew-Symmetric Condition',
            latex: 'A^T = -A \\implies a_{ii} = 0, \\quad a_{ij} = -a_{ji}',
            description: 'Transpose equals negative of original matrix; diagonal entries must be zero.',
            hinglishDescription: 'Transpose lene par negative aata hai aur diagonal hamesha 0 hota hai.',
            symbols: []
          },
          {
            name: 'Decomposition Theorem',
            latex: 'A = \\underbrace{\\frac{A + A^T}{2}}_{\\text{Symmetric Part } S} + \\underbrace{\\frac{A - A^T}{2}}_{\\text{Skew-Symmetric Part } K}',
            description: 'Any square matrix can be uniquely written as the sum of a symmetric and skew-symmetric matrix.',
            hinglishDescription: 'Kisi bhi square matrix ko uniquely ek symmetric aur ek skew-symmetric matrix ke jod ke roop mein likha ja sakta hai.'
          },
          {
            name: 'Odd-Order Determinant Property',
            latex: 'n \\text{ is odd} \\implies \\det(A) = 0',
            description: 'The determinant of every odd-order skew-symmetric matrix is identically zero.',
            hinglishDescription: 'Kisi bhi odd order (jaise 3x3, 5x5) skew-symmetric matrix ka determinant hamesha 0 hota hai.'
          }
        ]
      }
    ],
    summary: {
      quickRevision: [
        'A^T = -A.',
        'All main diagonal elements are strictly ZERO (a_ii = 0).',
        'Eigenvalues are either purely imaginary (±iβ) or zero.',
        'Determinant of any odd-order skew-symmetric matrix is always 0: det(A) = 0 for odd n.',
        'Any square matrix A = (A + A^T)/2 + (A - A^T)/2.'
      ],
      hinglishRevision: [
        'A^T = -A hota hai.',
        'Main diagonal ke saare elements hamesha 0 hone chahiye.',
        'Odd order (3x3, 5x5) ka determinant hamesha ZERO hota hai.',
        'Har square matrix ko uniquely Symmetric aur Skew-Symmetric ke sum mein toda ja sakta hai.'
      ],
      importantFormulas: [
        { name: 'Decomposition', latex: 'A = \\frac{1}{2}(A + A^T) + \\frac{1}{2}(A - A^T)' },
        { name: 'Odd Order Determinant', latex: '\\det(A_{3 \\times 3}) = 0' }
      ],
      theorems: [
        {
          name: 'Odd-Order Skew-Symmetric Determinant Theorem',
          statement: 'If A is an n×n skew-symmetric matrix and n is odd, then det(A) = 0.',
          condition: 'A^T = -A, n is odd'
        }
      ],
      commonMistakes: [
        'Claiming 4x4 skew-symmetric matrix must have det = 0 (FALSE! For even n, det(A) ≥ 0 and can be non-zero).'
      ],
      examTips: [
        'In exams, if given a 3x3 skew-symmetric matrix and asked for determinant, write det = 0 directly citing the odd-order theorem.'
      ],
      quickChecks: [
        {
          id: 'qc-m9-1',
          question: 'Can a skew-symmetric matrix have non-zero elements on its main diagonal?',
          answer: 'No. Since a_ii = -a_ii, 2*a_ii = 0, so a_ii = 0.',
          explanation: 'Only zero satisfies x = -x for real numbers.'
        },
        {
          id: 'qc-m9-2',
          question: 'What is the determinant of a 3x3 skew-symmetric matrix?',
          answer: '0',
          explanation: 'det(A) = det(A^T) = det(-A) = (-1)^3 det(A) = -det(A) => 2*det(A) = 0 => det(A) = 0.'
        },
        {
          id: 'qc-m9-3',
          question: 'If A is skew-symmetric, what can be said about its eigenvalues?',
          answer: 'They are purely imaginary or zero (0 or ±iβ).',
          explanation: 'Since x^T A x = 0 for real vectors, real parts of eigenvalues must be zero.'
        },
        {
          id: 'qc-m9-4',
          question: 'Is the sum of two skew-symmetric matrices also skew-symmetric?',
          answer: 'Yes.',
          explanation: '(A + B)^T = A^T + B^T = -A - B = -(A + B).'
        },
        {
          id: 'qc-m9-5',
          question: 'What is the symmetric part of [[1, 2], [4, 5]]?',
          answer: '[[1, 3], [3, 5]]',
          explanation: '(A + A^T)/2 = ([[1, 2], [4, 5]] + [[1, 4], [2, 5]]) / 2 = [[2, 6], [6, 10]] / 2 = [[1, 3], [3, 5]].'
        }
      ]
    }
  },

  // --- MODULE 10 ---
  {
    id: 'module-10',
    number: 10,
    title: 'Orthogonal Matrices',
    subtitle: 'AᵀA = I, A⁻¹ = Aᵀ, Isometries & Rotations/Reflections',
    hinglishTitle: 'Orthogonal Matrices: AᵀA = I, Rotations aur Reflections',
    iconName: 'Compass',
    estimatedMinutes: 45,
    visualizationType: 'orthogonal',
    subtopics: [
      {
        id: 'm10-s1',
        title: 'Definition & Geometric Isometry',
        description: 'Conditions A^T A = I, preservation of lengths and angles, and rotations vs reflections.',
        hinglishDescription: 'AᵀA = I, iska inverse seedha iska transpose hota hai. Ye lengths aur angles ko preserve karta hai.',
        concept: {
          mathDefinition: 'A real square matrix Q is orthogonal if Q^T Q = Q Q^T = I, which implies Q^(-1) = Q^T. The column vectors (and row vectors) form an orthonormal basis for R^n.',
          simpleEnglish: 'A transformation that rotates or reflects space without stretching or compressing it. Distances between points and angles between vectors remain identical.',
          hinglish: 'Ek aisi transformation jo space ko bas rotate ya mirror karti hai, bina kisi cheez ko khinche ya dabaye. Iske rows aur columns unit length ke hote hain aur aapas mein 90 degree par hote hain.',
          whyItMatters: 'Essential in computer vision, robotics kinematics, quantum mechanics (unitary matrices), and QR decomposition.',
          prerequisites: ['Vector dot product and norm', 'Matrix inverse'],
          pitfalls: ['Confusing orthogonal vectors (dot product = 0) with an orthogonal matrix (columns must be BOTH orthogonal AND unit length, i.e., orthonormal!)']
        },
        formulas: [
          {
            name: 'Orthogonal Matrix Condition',
            latex: 'Q^T Q = Q Q^T = I \\iff Q^{-1} = Q^T',
            description: 'Transpose equals inverse.',
            hinglishDescription: 'Transpose aur inverse dono barabar hote hain.',
            symbols: []
          },
          {
            name: 'Determinant of Orthogonal Matrix',
            latex: '\\det(Q) = \\pm 1 \\quad (\\det(Q) = +1 \\implies \\text{Rotation}, \\; \\det(Q) = -1 \\implies \\text{Reflection})',
            description: 'Determinant is strictly +1 (proper rotation) or -1 (reflection / improper rotation).',
            hinglishDescription: 'Determinant sirf +1 ya -1 ho sakta hai. +1 ka matlab rotation, -1 ka matlab reflection.',
            symbols: []
          },
          {
            name: '2D Rotation Matrix',
            latex: 'R(\\theta) = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}, \\quad \\det(R) = \\cos^2\\theta + \\sin^2\\theta = 1',
            description: 'Standard 2D counter-clockwise rotation matrix.',
            hinglishDescription: '2D plane mein theta angle se rotate karne wala standard orthogonal matrix.'
          }
        ]
      }
    ],
    summary: {
      quickRevision: [
        'Q^T Q = Q Q^T = I, meaning Q^(-1) = Q^T.',
        'Columns and rows form an orthonormal set (unit length and mutually perpendicular).',
        'det(Q) = ±1.',
        'Preserves Euclidean length: ||Qx|| = ||x||.',
        'Preserves dot products and angles: (Qx) · (Qy) = x · y.'
      ],
      hinglishRevision: [
        'Q ka inverse nikaalna sabse aasan hai: bas transpose le lo: Q^(-1) = Q^T.',
        'Determinant hamesha ya toh +1 hoga ya -1.',
        'Length aur angle bilkul preserve rehte hain (rigid body motion).',
        'Columns ka aapas mein dot product 0 hota hai aur har column ki length 1 hoti hai.'
      ],
      importantFormulas: [
        { name: 'Orthogonal Definition', latex: 'Q^T Q = I' },
        { name: 'Length Preservation', latex: '\\|Q \\mathbf{x}\\| = \\|\\mathbf{x}\\|' }
      ],
      theorems: [
        {
          name: 'Isometry Theorem',
          statement: 'A linear transformation preserves Euclidean lengths if and only if its standard matrix is orthogonal.',
          condition: 'Real inner product space'
        }
      ],
      commonMistakes: [
        'Checking orthogonality of columns without checking if their lengths equal 1 (must be orthonormal!).'
      ],
      examTips: [
        'To prove a matrix is orthogonal, calculate A^T * A. If the result is the Identity matrix I, the proof is complete.'
      ],
      quickChecks: [
        {
          id: 'qc-m10-1',
          question: 'What is the inverse of an orthogonal matrix Q?',
          answer: 'Q^T (its transpose)',
          explanation: 'Since Q^T Q = I, Q^T is the left and right inverse.'
        },
        {
          id: 'qc-m10-2',
          question: 'Can an orthogonal matrix have determinant equal to 2?',
          answer: 'No. det(Q) must be either +1 or -1.',
          explanation: 'det(Q^T Q) = det(Q)^2 = det(I) = 1 => det(Q) = ±1.'
        },
        {
          id: 'qc-m10-3',
          question: 'Does an orthogonal transformation change the angle between two vectors?',
          answer: 'No, angles are strictly preserved.',
          explanation: '(Qx)·(Qy) = x^T Q^T Q y = x^T I y = x·y.'
        },
        {
          id: 'qc-m10-4',
          question: 'Is the product of two orthogonal matrices orthogonal?',
          answer: 'Yes, always.',
          explanation: '(AB)^T (AB) = B^T (A^T A) B = B^T I B = B^T B = I.'
        },
        {
          id: 'qc-m10-5',
          question: 'What geometric transformation does [[0, -1], [1, 0]] perform?',
          answer: '90° counter-clockwise rotation.',
          explanation: 'Matches R(θ) with θ = 90°, det = 1.'
        }
      ]
    }
  },

  // --- MODULE 11 ---
  {
    id: 'module-11',
    number: 11,
    title: 'Eigenvalues and Eigenvectors',
    subtitle: 'Characteristic Equation, Eigenspaces & Multiplicities',
    hinglishTitle: 'Eigenvalues aur Eigenvectors: Av = λv aur Eigenspaces',
    iconName: 'Target',
    estimatedMinutes: 55,
    visualizationType: 'eigen',
    subtopics: [
      {
        id: 'm11-s1',
        title: 'Definition & Characteristic Equation',
        description: 'det(A - lambda*I) = 0, finding eigenvalues and corresponding eigenspaces.',
        hinglishDescription: 'det(A - λI) = 0 se eigenvalues nikaalna aur (A - λI)v = 0 se eigenvectors nikaalna.',
        concept: {
          mathDefinition: 'For an n×n matrix A, a non-zero vector v is an eigenvector corresponding to scalar eigenvalue λ if A v = λ v. Equivalently, (A - λ I) v = 0, which requires det(A - λ I) = 0.',
          simpleEnglish: 'When a matrix acts on an eigenvector, the vector doesn’t turn or rotate; it only stretches or shrinks by the factor λ.',
          hinglish: 'Eigenvector wo khas vector hai jo matrix se multiply hone par apni disha nahi badalta, bas lamba ya chhota ho jata hai factor λ (eigenvalue) se.',
          whyItMatters: 'Powers Google PageRank, facial recognition (eigenfaces), vibration modes of bridges/skyscrapers, and quantum energy states.',
          prerequisites: ['Determinants', 'Null space and homogeneous systems'],
          pitfalls: ['The zero vector v = 0 is NEVER an eigenvector (even though λ can be 0!)', 'Confusing Algebraic Multiplicity (root count) with Geometric Multiplicity (independent eigenvectors count)']
        },
        formulas: [
          {
            name: 'Eigenvector Equation',
            latex: 'A \\mathbf{v} = \\lambda \\mathbf{v} \\iff (A - \\lambda I) \\mathbf{v} = \\mathbf{0} \\quad (\\mathbf{v} \\neq \\mathbf{0})',
            description: 'Core definition of eigenvalue and eigenvector.',
            hinglishDescription: 'Matrix A vector v ko lambda guna scale karta hai.',
            symbols: [
              { symbol: 'A', meaning: 'Square matrix of size n×n' },
              { symbol: 'lambda', meaning: 'Scalar eigenvalue' },
              { symbol: 'v', meaning: 'Non-zero eigenvector' }
            ]
          },
          {
            name: 'Characteristic Equation',
            latex: '\\det(A - \\lambda I) = 0',
            description: 'Polynomial equation in lambda whose roots are the eigenvalues of matrix A.',
            hinglishDescription: 'det(A - lambda*I) = 0 karke lambda ki values nikaali jaati hain.',
            symbols: []
          },
          {
            name: 'Trace & Determinant Relations',
            latex: '\\sum_{i=1}^n \\lambda_i = \\text{tr}(A), \\quad \\prod_{i=1}^n \\lambda_i = \\det(A)',
            description: 'Sum of eigenvalues equals the trace; product of eigenvalues equals the determinant.',
            hinglishDescription: 'Eigenvalues ka jod matrix ke Trace ke barabar aur unka product Determinant ke barabar hota hai.'
          }
        ]
      }
    ],
    summary: {
      quickRevision: [
        'Av = λv where v ≠ 0.',
        'Characteristic equation: det(A - λI) = 0.',
        'Sum of eigenvalues = Trace(A) (sum of main diagonal elements).',
        'Product of eigenvalues = det(A).',
        'Eigenvalues of triangular and diagonal matrices are simply the diagonal entries.',
        'Geometric Multiplicity (GM) ≤ Algebraic Multiplicity (AM) for every eigenvalue.'
      ],
      hinglishRevision: [
        'Av = λv (v kabhi bhi zero vector nahi ho sakta).',
        'Characteristic equation det(A - λI) = 0 se lambda nikaalte hain.',
        'Saare eigenvalues ka jod = Trace (diagonal elements ka sum).',
        'Saare eigenvalues ka product = Determinant.',
        'Triangular matrix ke eigenvalues seedha uske diagonal elements hote hain.'
      ],
      importantFormulas: [
        { name: 'Characteristic Equation', latex: '\\det(A - \\lambda I) = 0' },
        { name: 'Trace Relation', latex: '\\sum \\lambda_i = \\text{tr}(A)' },
        { name: 'Determinant Relation', latex: '\\prod \\lambda_i = \\det(A)' }
      ],
      theorems: [
        {
          name: 'Eigenvalues of Matrix Powers',
          statement: 'If λ is an eigenvalue of A with eigenvector v, then λ^k is an eigenvalue of A^k with the same eigenvector v.',
          condition: 'Square matrix A, integer k ≥ 1'
        }
      ],
      commonMistakes: [
        'Listing v = 0 as an eigenvector (eigenvectors must be NON-ZERO by definition).',
        'Sign mistakes when expanding det(A - λI) for 3x3 matrices.'
      ],
      examTips: [
        'Always check your calculated eigenvalues using the Trace and Determinant shortcuts: Sum = Trace, Product = Det!'
      ],
      quickChecks: [
        {
          id: 'qc-m11-1',
          question: 'What are the eigenvalues of [[4, 0], [0, -3]]?',
          answer: '4 and -3',
          explanation: 'For diagonal matrices, eigenvalues are the diagonal entries.'
        },
        {
          id: 'qc-m11-2',
          question: 'If a 2x2 matrix has trace 5 and determinant 6, what are its eigenvalues?',
          answer: '2 and 3',
          explanation: 'λ1 + λ2 = 5, λ1 * λ2 = 6. Roots of λ^2 - 5λ + 6 = 0 are 2 and 3.'
        },
        {
          id: 'qc-m11-3',
          question: 'Can an eigenvalue be zero (λ = 0)?',
          answer: 'Yes! A matrix has eigenvalue 0 if and only if det(A) = 0 (singular matrix).',
          explanation: 'det(A - 0*I) = det(A) = 0.'
        },
        {
          id: 'qc-m11-4',
          question: 'If λ is an eigenvalue of A, what is the eigenvalue of A^(-1)?',
          answer: '1 / λ',
          explanation: 'Av = λv => v = A^(-1)(λv) => A^(-1)v = (1/λ)v.'
        },
        {
          id: 'qc-m11-5',
          question: 'Can the geometric multiplicity ever exceed the algebraic multiplicity?',
          answer: 'No, 1 ≤ GM ≤ AM always.',
          explanation: 'By fundamental algebraic theorem of linear operators.'
        }
      ]
    }
  },

  // --- MODULE 12 ---
  {
    id: 'module-12',
    number: 12,
    title: 'Diagonalization of Matrices',
    subtitle: 'Similar Matrices, A = PDP⁻¹, Powers Aᵏ & Defective Matrices',
    hinglishTitle: 'Matrix Diagonalization: A = PDP⁻¹ aur Matrix Powers',
    iconName: 'Grid',
    estimatedMinutes: 50,
    subtopics: [
      {
        id: 'm12-s1',
        title: 'Diagonalization Condition & Matrix Powers',
        description: 'Conditions for diagonalizability (GM = AM) and computing high matrix powers A^k.',
        hinglishDescription: 'Matrix ko diagonal form mein badalna: A = PDP⁻¹, aur badi powers A^k aasani se nikaalna.',
        concept: {
          mathDefinition: 'An n×n matrix A is diagonalizable if it is similar to a diagonal matrix D, i.e., there exists an invertible modal matrix P such that P^(-1) A P = D or A = P D P^(-1). This holds if and only if A has n linearly independent eigenvectors.',
          simpleEnglish: 'Diagonalizing is like rotating your coordinate system so the transformation becomes simple stretching along each axis. It turns calculating A^100 from an impossible task into trivial arithmetic.',
          hinglish: 'Matrix ko aisi coordinate system mein dekhna jahan har axis alag-alag scale hoti hai. Isse matrix ki badi powers A^k nikaalna bohot aasan ho jata hai: A^k = P D^k P⁻¹.',
          whyItMatters: 'Used in solving systems of coupled differential equations (vibrations, population models) and Markov chains.',
          prerequisites: ['Eigenvalues and eigenvectors', 'Matrix inverse'],
          pitfalls: ['Assuming every matrix is diagonalizable (defective matrices where GM < AM cannot be diagonalized!)', 'Putting eigenvectors in columns of P in a different order than eigenvalues in D']
        },
        formulas: [
          {
            name: 'Diagonalization Factorization',
            latex: 'A = P D P^{-1} \\iff P^{-1} A P = D = \\begin{bmatrix} \\lambda_1 & 0 & \\dots \\\\ 0 & \\lambda_2 & \\dots \\\\ \\vdots & \\vdots & \\ddots \\end{bmatrix}',
            description: 'Modal matrix P formed by eigenvectors; diagonal matrix D formed by eigenvalues.',
            hinglishDescription: 'P matrix eigenvectors se banta hai aur D matrix eigenvalues se.',
            symbols: [
              { symbol: 'P', meaning: 'Modal matrix whose columns are linearly independent eigenvectors' },
              { symbol: 'D', meaning: 'Diagonal matrix containing the corresponding eigenvalues' }
            ]
          },
          {
            name: 'Matrix Power Formula',
            latex: 'A^k = P D^k P^{-1} = P \\begin{bmatrix} \\lambda_1^k & 0 \\\\ 0 & \\lambda_2^k \\end{bmatrix} P^{-1}',
            description: 'Computing matrix powers by simply raising diagonal eigenvalues to power k.',
            hinglishDescription: 'A^k nikaalne ke liye bas diagonal ke numbers ki power k karke P aur P⁻¹ se multiply kar do.'
          }
        ]
      }
    ],
    summary: {
      quickRevision: [
        'A is diagonalizable if and only if it has n linearly independent eigenvectors.',
        'If an n×n matrix has n distinct eigenvalues, it is GUARANTEED to be diagonalizable.',
        'If eigenvalues repeat, A is diagonalizable if and only if GM = AM for each repeated eigenvalue.',
        'A^k = P D^k P^(-1).'
      ],
      hinglishRevision: [
        'Matrix diagonalizable tabhi hota hai jab uske paas n linearly independent eigenvectors hon.',
        'Agar saare eigenvalues alag-alag (distinct) hain, toh matrix pakka diagonalizable hoga.',
        'Eigenvalues repeat hone par Geometric Multiplicity = Algebraic Multiplicity hona zaroori hai.',
        'A^k = P D^k P⁻¹ se kitni bhi badi power chutkiyon mein nikaal sakte hain.'
      ],
      importantFormulas: [
        { name: 'Diagonalization Formula', latex: 'A = P D P^{-1}' },
        { name: 'Matrix Power Formula', latex: 'A^k = P D^k P^{-1}' }
      ],
      theorems: [
        {
          name: 'Distinct Eigenvalues Diagonalizability Theorem',
          statement: 'An n×n matrix with n distinct eigenvalues is always diagonalizable.',
          condition: 'All n eigenvalues distinct'
        }
      ],
      commonMistakes: [
        'Mixing the order of columns in P with diagonal entries in D (column 1 of P MUST correspond to entry (1,1) of D).'
      ],
      examTips: [
        'If you find all eigenvalues distinct (e.g., 1, 2, 3 for 3x3), you do NOT need to check GM=AM; state immediately that A is diagonalizable!'
      ],
      quickChecks: [
        {
          id: 'qc-m12-1',
          question: 'Is [[1, 1], [0, 1]] diagonalizable?',
          answer: 'No (defective matrix).',
          explanation: 'λ = 1 with AM = 2, but solving (A - I)v = 0 yields only 1 independent eigenvector (GM = 1 < AM).'
        },
        {
          id: 'qc-m12-2',
          question: 'If A = P D P^(-1), what is D^3 for D = diag(2, -1)?',
          answer: 'diag(8, -1)',
          explanation: '2^3 = 8 and (-1)^3 = -1.'
        },
        {
          id: 'qc-m12-3',
          question: 'Can every real symmetric matrix be diagonalized?',
          answer: 'Yes, always (by the Spectral Theorem).',
          explanation: 'Every real symmetric matrix has full orthonormal eigenvectors.'
        },
        {
          id: 'qc-m12-4',
          question: 'What is the relation between det(A) and det(D)?',
          answer: 'det(A) = det(D)',
          explanation: 'det(A) = det(P) * det(D) * det(P^(-1)) = det(D).'
        },
        {
          id: 'qc-m12-5',
          question: 'If A has eigenvalues 2, 5, -1 for a 3x3 matrix, is A diagonalizable?',
          answer: 'Yes, guaranteed.',
          explanation: 'All 3 eigenvalues are distinct.'
        }
      ]
    }
  },

  // --- MODULE 13 ---
  {
    id: 'module-13',
    number: 13,
    title: 'Cayley-Hamilton Theorem',
    subtitle: 'p(A) = O, Matrix Inverses & Evaluating High Matrix Powers',
    hinglishTitle: 'Cayley-Hamilton Theorem: p(A) = 0 aur A⁻¹ nikaalna',
    iconName: 'Cpu',
    estimatedMinutes: 45,
    subtopics: [
      {
        id: 'm13-s1',
        title: 'Theorem Statement & Applications',
        description: 'Every square matrix satisfies its characteristic equation: p(A) = O. Finding A^(-1) and A^k.',
        hinglishDescription: 'Har square matrix apni characteristic equation ko satisfy karta hai. Iski madad se A⁻¹ aur badi powers nikaalte hain.',
        concept: {
          mathDefinition: 'Every square matrix A satisfies its own characteristic equation. That is, if p(λ) = det(λ I - A) = λ^n + c_{n-1}λ^{n-1} + ... + c_0 = 0, then p(A) = A^n + c_{n-1}A^{n-1} + ... + c_0 I = O (the zero matrix).',
          simpleEnglish: 'Take the characteristic polynomial you found for eigenvalues, replace λ with matrix A and constants with c*I, and the result is guaranteed to be the zero matrix.',
          hinglish: 'Characteristic polynomial mein lambda ki jagah matrix A rakh do aur constant number ke sath Identity matrix I laga do. Poora sum zero matrix (O) ban jayega!',
          whyItMatters: 'Extremely popular examination question; provides an algebraic method to compute matrix inverses and simplify high matrix powers without division.',
          prerequisites: ['Characteristic polynomial', 'Matrix multiplication and identity matrix'],
          pitfalls: ['Forgetting to attach the Identity matrix I to the constant term (e.g. writing c_0 instead of c_0 * I)', 'Saying p(A) = 0 scalar instead of the zero matrix O']
        },
        formulas: [
          {
            name: 'Cayley-Hamilton Identity',
            latex: 'p(A) = A^n + c_{n-1} A^{n-1} + \\dots + c_1 A + c_0 I = O',
            description: 'Substitution of matrix A into its characteristic polynomial produces the zero matrix.',
            hinglishDescription: 'Matrix A ko characteristic equation mein rakhne par Zero Matrix milta hai.',
            symbols: [
              { symbol: 'O', meaning: 'Zero matrix of size n×n' },
              { symbol: 'I', meaning: 'Identity matrix of size n×n' }
            ]
          },
          {
            name: 'Inverse via Cayley-Hamilton',
            latex: 'A^{-1} = -\\frac{1}{c_0} \\left( A^{n-1} + c_{n-1} A^{n-2} + \\dots + c_1 I \\right) \\quad (\\text{where } c_0 = (-1)^n \\det(A) \\neq 0)',
            description: 'Multiplying the Cayley-Hamilton identity by A^(-1) yields an expression for the inverse in terms of powers of A.',
            hinglishDescription: 'Dono taraf A^(-1) se multiply karke inverse ka formula nikaal lete hain.'
          }
        ]
      }
    ],
    summary: {
      quickRevision: [
        'Every square matrix satisfies its own characteristic equation: p(A) = O.',
        'Constant term c_0 in characteristic polynomial is (-1)^n det(A).',
        'Inverse formula: multiply p(A) = O by A^(-1) and isolate A^(-1).',
        'Higher powers A^m can be reduced to a polynomial in A of degree at most n-1 using polynomial long division.'
      ],
      hinglishRevision: [
        'Har square matrix apni characteristic equation ko satisfy karta hai: p(A) = O.',
        'Constant number ke sath I lagana kabhi na bhoolein (c0 * I).',
        'Inverse nikaalne ke liye equation ko A⁻¹ se multiply karke isolate kar lete hain.',
        'A ki kitni bhi badi power ho (jaise A^8), use polynomial division se lower powers (A^2, A, I) mein badal sakte hain.'
      ],
      importantFormulas: [
        { name: 'Cayley-Hamilton Formula', latex: 'p(A) = O' },
        { name: 'Inverse Expression', latex: 'A^{-1} = -\\frac{1}{\\det(A)} (\\dots)' }
      ],
      theorems: [
        {
          name: 'Cayley-Hamilton Theorem',
          statement: 'Let A be an n×n matrix over any commutative ring, and let p(λ) = det(λI - A). Then p(A) = O.',
          condition: 'Square matrix A'
        }
      ],
      commonMistakes: [
        'Writing the constant term as scalar c instead of c * I.',
        'Writing the result as 0 (scalar) instead of the zero matrix O.'
      ],
      examTips: [
        'In exams, verification requires computing powers like A^2 and A^3 explicitly and showing their matrix sum equals [[0, 0], [0, 0]].'
      ],
      quickChecks: [
        {
          id: 'qc-m13-1',
          question: 'If characteristic equation of A is λ^2 - 5λ + 6 = 0, what equation does A satisfy?',
          answer: 'A^2 - 5A + 6I = O',
          explanation: 'By Cayley-Hamilton, replace λ with A and 6 with 6I.'
        },
        {
          id: 'qc-m13-2',
          question: 'Using A^2 - 5A + 6I = O, what is A^(-1)?',
          answer: '(5I - A) / 6',
          explanation: '6I = 5A - A^2 => 6 A^(-1) = 5I - A => A^(-1) = (5I - A)/6.'
        },
        {
          id: 'qc-m13-3',
          question: 'Can Cayley-Hamilton be used if det(A) = 0?',
          answer: 'Yes, p(A) = O is still true, but A^(-1) cannot be computed because c0 = 0.',
          explanation: 'The theorem holds for all square matrices, invertible or singular.'
        },
        {
          id: 'qc-m13-4',
          question: 'For a 2x2 matrix A, what is its characteristic polynomial in terms of trace and det?',
          answer: 'λ^2 - tr(A)λ + det(A) = 0',
          explanation: 'So A^2 - tr(A)A + det(A)I = O always for any 2x2 matrix.'
        },
        {
          id: 'qc-m13-5',
          question: 'How do you express A^4 in terms of lower powers if A^2 = 3A - 2I?',
          answer: 'Square both sides: A^4 = (3A - 2I)^2 = 9A^2 - 12A + 4I = 9(3A - 2I) - 12A + 4I = 15A - 14I.',
          explanation: 'Repeated substitution simplifies any high power.'
        }
      ]
    }
  },

  // --- MODULE 14 ---
  {
    id: 'module-14',
    number: 14,
    title: 'Orthogonal Transformations',
    subtitle: 'Inner Product Preservation, Rotations, Reflections & Geometric Mapping',
    hinglishTitle: 'Orthogonal Transformations: Geometric Mapping aur Rigid Motions',
    iconName: 'RotateCw',
    estimatedMinutes: 40,
    visualizationType: 'orthogonal',
    subtopics: [
      {
        id: 'm14-s1',
        title: 'Definition & Distance Preservation',
        description: 'Transformations preserving inner products, lengths, distances, and angles. Matrix vs transformation distinction.',
        hinglishDescription: 'Linear transformation jo inner product, lengths, aur angles ko preserve kare. Orthogonal matrix aur transformation mein antar.',
        concept: {
          mathDefinition: 'A linear transformation T: V -> V on an inner product space is orthogonal if <T(u), T(v)> = <u, v> for all u, v in V. This preserves vector norms ||T(v)|| = ||v|| and distances ||T(u) - T(v)|| = ||u - v|| (an isometry).',
          simpleEnglish: 'An orthogonal transformation moves vectors around like a rigid object. It can rotate or reflect, but it never stretches, shrinks, or bends space.',
          hinglish: 'Ye transformation space ko rigid body ki tarah ghumati ya mirror karti hai. Kisi bhi do points ke beech ki doori ya vectors ke beech ka angle hamesha waisa hi rehta hai.',
          whyItMatters: 'Underpins rigid body dynamics in aerospace, 3D graphics cameras, crystallographic point groups, and quantum mechanics.',
          prerequisites: ['Inner products and norms', 'Orthogonal matrices'],
          pitfalls: ['Confusing the abstract transformation T with its matrix representation with respect to a non-orthonormal basis']
        },
        formulas: [
          {
            name: 'Inner Product Preservation',
            latex: '\\langle T(\\mathbf{u}), T(\\mathbf{v}) \\rangle = \\langle \\mathbf{u}, \\mathbf{v} \\rangle \\quad \\forall \\mathbf{u}, \\mathbf{v}',
            description: 'Defining property of an orthogonal transformation.',
            hinglishDescription: 'Transformation ke baad bhi dot product wahi rehta hai.',
            symbols: []
          },
          {
            name: 'Distance Preservation (Isometry)',
            latex: '\\|T(\\mathbf{u}) - T(\\mathbf{v})\\| = \\|\\mathbf{u} - \\mathbf{v}\\|',
            description: 'Distances between any two points are preserved.',
            hinglishDescription: 'Points ke beech ka faasla bilkul nahi badalta.'
          }
        ]
      }
    ],
    summary: {
      quickRevision: [
        'An orthogonal transformation preserves inner products, lengths, and angles.',
        'Its matrix representation relative to an orthonormal basis is an orthogonal matrix (Q^T Q = I).',
        'Composition of two orthogonal transformations is an orthogonal transformation.',
        'The inverse of an orthogonal transformation is also an orthogonal transformation.'
      ],
      hinglishRevision: [
        'Orthogonal transformation lengths aur angles ko preserve karta hai.',
        'Orthonormal basis ke respect mein iska matrix ek Orthogonal matrix banta hai.',
        'Do orthogonal transformations ko milane (compose karne) par naya transformation bhi orthogonal hota hai.',
        'Iska inverse bhi ek orthogonal transformation hota hai.'
      ],
      importantFormulas: [
        { name: 'Norm Preservation', latex: '\\|T(\\mathbf{x})\\| = \\|\\mathbf{x}\\|' },
        { name: 'Angle Preservation', latex: '\\cos\\theta = \\frac{T(\\mathbf{u}) \\cdot T(\\mathbf{v})}{\\|T(\\mathbf{u})\\| \\|T(\\mathbf{v})\\|} = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}' }
      ],
      theorems: [
        {
          name: 'Orthogonal Transformation Matrix Theorem',
          statement: 'A linear transformation T is orthogonal if and only if its matrix relative to any orthonormal basis is an orthogonal matrix.',
          condition: 'Orthonormal basis'
        }
      ],
      commonMistakes: [
        'Thinking an orthogonal transformation can scale a vector by 2 (norms MUST be strictly preserved, factor is always 1).'
      ],
      examTips: [
        'To show T is orthogonal, show ||T(x)|| = ||x|| for an arbitrary vector x.'
      ],
      quickChecks: [
        {
          id: 'qc-m14-1',
          question: 'Does an orthogonal transformation change the area of a shape in 2D?',
          answer: 'No. Area is multiplied by |det(Q)| = 1, so area is preserved.',
          explanation: 'It is a rigid isometric transformation.'
        },
        {
          id: 'qc-m14-2',
          question: 'Is every rotation in 3D an orthogonal transformation?',
          answer: 'Yes, with det = +1.',
          explanation: 'Rotations preserve Euclidean distance and orientation.'
        },
        {
          id: 'qc-m14-3',
          question: 'Can an orthogonal transformation have eigenvalue equal to 3?',
          answer: 'No. All real eigenvalues must be either +1 or -1.',
          explanation: '||T(v)|| = ||v|| => |λ| ||v|| = ||v|| => |λ| = 1.'
        },
        {
          id: 'qc-m14-4',
          question: 'What is the inverse of a rotation by angle θ?',
          answer: 'Rotation by angle -θ.',
          explanation: 'R(θ)^(-1) = R(-θ) = R(θ)^T.'
        },
        {
          id: 'qc-m14-5',
          question: 'What is the distinction between an orthogonal matrix and an orthogonal transformation?',
          answer: 'A transformation is an abstract coordinate-free geometric mapping; a matrix is its numerical table representation relative to a specific basis.',
          explanation: 'With an orthonormal basis, the transformation is represented by an orthogonal matrix.'
        }
      ]
    }
  }
];
