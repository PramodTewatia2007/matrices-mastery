export type LanguageMode = 'en' | 'hinglish' | 'both';
export type ThemeMode = 'dark' | 'light';

export interface ConceptExplanation {
  mathDefinition: string;
  simpleEnglish: string;
  hinglish: string;
  whyItMatters: string;
  prerequisites: string[];
  pitfalls: string[];
}

export interface FormulaItem {
  name: string;
  latex: string;
  description: string;
  hinglishDescription: string;
  symbols?: { symbol: string; meaning: string }[];
  conditions?: string;
  proofOrJustification?: string;
}

export interface SolvedExample {
  id: string;
  moduleId: string;
  subtopicId?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  question: string;
  questionLatex?: string;
  conceptUsed: string;
  given: string;
  required: string;
  formulaOrTheorem: string;
  whyThisMethod: string;
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    hinglishDescription: string;
    latex?: string;
    matrix?: string[][];
    rowOperation?: string;
  }[];
  finalAnswer: string;
  finalAnswerLatex?: string;
  verification: string;
  englishExplanation: string;
  hinglishExplanation: string;
  commonMistakes: string[];
}

export interface PracticeQuestion {
  id: string;
  moduleId: string;
  subtopicId?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  questionLatex?: string;
  matrixInput?: number[][];
  hints: {
    hint1: string; // Concept / starting point
    hint2: string; // Formula / method
    hint3: string; // Next useful step
  };
  finalAnswer: string;
  finalAnswerLatex?: string;
  fullSolution: {
    steps: string[];
    englishExplanation: string;
    hinglishExplanation: string;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionLatex?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  hinglishExplanation: string;
}

export interface QuickCheck {
  id: string;
  question: string;
  answer: string;
  explanation: string;
}

export interface ModuleSummary {
  quickRevision: string[];
  hinglishRevision: string[];
  importantFormulas: { name: string; latex: string }[];
  theorems: { name: string; statement: string; condition: string }[];
  commonMistakes: string[];
  examTips: string[];
  quickChecks: QuickCheck[];
}

export interface Subtopic {
  id: string;
  title: string;
  description: string;
  hinglishDescription: string;
  concept: ConceptExplanation;
  formulas: FormulaItem[];
}

export interface SyllabusModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  hinglishTitle: string;
  iconName: string;
  estimatedMinutes: number;
  subtopics: Subtopic[];
  summary: ModuleSummary;
  visualizationType?: 'linear_system' | 'vector_3d' | 'determinant' | 'matrix_transform' | 'eigen' | 'orthogonal' | 'cayley';
}

export interface UserProgressState {
  userId: string;
  completedTopics: string[];
  completedLessons: string[];
  viewedExamples: string[];
  questionAttempts: Record<string, {
    isCorrect: boolean;
    hintsUsed: number;
    attempts: number;
  }>;
  bookmarkedItems: {
    id: string;
    type: 'topic' | 'example' | 'question';
    title: string;
    moduleId: string;
    createdAt: string;
  }[];
  quizScores: {
    quizId: string;
    topicId: string;
    score: number;
    total: number;
    percentage: number;
    date: string;
  }[];
  settings: {
    language: LanguageMode;
    theme: ThemeMode;
    difficulty: 'all' | 'beginner' | 'intermediate' | 'advanced';
  };
}
