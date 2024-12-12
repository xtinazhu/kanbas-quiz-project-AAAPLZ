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

export type QuizType = 'GRADED_QUIZ' | 'PRACTICE_QUIZ' | 'GRADED_SURVEY' | 'UNGRADED_SURVEY';
export type AssignmentGroupType = 'QUIZZES' | 'EXAMS' | 'ASSIGNMENTS' | 'PROJECT';

export interface Quiz {
  _id?: string;
  title: string;
  course: string;
  description: string;
  points: number;
  quizType: QuizType;
  assignmentGroup: AssignmentGroupType;
  published: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  maxAttempts: number;
  showCorrectAnswers: boolean;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  shuffleAnswers: boolean;
  questions: QuizQuestion[];
}

// 可选：如果需要创建新Quiz的请求接口
export interface NewQuizRequest extends Omit<Quiz, '_id' | 'questions'> {
  questions?: NewQuestionRequest[];
}