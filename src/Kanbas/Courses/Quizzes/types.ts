//question type

export interface QuestionChoice {
  text: string;
  isCorrect: boolean;
}

export type QuestionType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_IN_BLANK';

export interface NewQuestionRequest {
  title: string;
  type: QuestionType;
  points: number;
  question: string;
  choices?: QuestionChoice[];
  correctAnswer?: boolean;
  possibleAnswers?: string[];
}

export interface QuizQuestion {
  _id: string;
  title: string;
  type: QuestionType;
  points: number;
  question: string;
  choices?: QuestionChoice[];
  correctAnswer?: boolean;
  possibleAnswers?: string[];
}