import { createSlice } from "@reduxjs/toolkit";

// Question type definitions
interface BaseQuestion {
  _id?: string;
  title: string;
  points: number;
  question: string;
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'MULTIPLE_CHOICE';
  choices: Array<{
    text: string;
    isCorrect: boolean;
  }>;
}

interface TrueFalseQuestion extends BaseQuestion {
  type: 'TRUE_FALSE';
  correctAnswer: boolean;
}

interface FillInBlankQuestion extends BaseQuestion {
  type: 'FILL_IN_BLANK';
  possibleAnswers: string[];
}

type Question = MultipleChoiceQuestion | TrueFalseQuestion | FillInBlankQuestion;

interface QuizAttempt {
  userId: string;
  quizId: string;
  answers: Record<string, any>; // Store answers based on question type
  score: number;
  startedAt: string;
  submittedAt?: string;
}

interface Quiz {
  _id?: string;
  title: string;
  course: string;
  description: string;
  points: number;
  quizType: 'GRADED_QUIZ' | 'PRACTICE_QUIZ' | 'GRADED_SURVEY' | 'UNGRADED_SURVEY';
  assignmentGroup: 'QUIZZES' | 'EXAMS' | 'ASSIGNMENTS' | 'PROJECT';
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
  questions: Question[];
  attempts?: QuizAttempt[];
}

interface QuizzesState {
  quizzes: Quiz[];
  quiz: Quiz;
  currentAttempt?: QuizAttempt;
}

const initialState: QuizzesState = {
  quizzes: [],
  quiz: {
    title: "New Quiz",
    description: "Please complete this quiz by the due date.",
    course: "",
    points: 100,
    quizType: "GRADED_QUIZ",
    assignmentGroup: "QUIZZES",
    published: false,
    timeLimit: 20,
    multipleAttempts: false,
    maxAttempts: 1,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: new Date().toISOString(),
    availableFrom: new Date().toISOString(),
    availableUntil: new Date().toISOString(),
    shuffleAnswers: true,
    questions: []
  }
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: Quiz = {
        _id: new Date().getTime().toString(),
        ...initialState.quiz,
        ...quiz
      };
      state.quizzes = [newQuiz, ...state.quizzes];
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) =>
        quiz._id === action.payload._id ? action.payload : quiz
      );
      if (state.quiz._id === action.payload._id) {
        state.quiz = action.payload;
      }
    },
    selectQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    togglePublishQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((quiz) =>
        quiz._id === quizId 
          ? { ...quiz, published: !quiz.published } 
          : quiz
      );
    },
    // New reducers for quiz questions
    addQuestion: (state, { payload }) => {
      if (state.quiz._id) {
        state.quiz.questions.push(payload);
        state.quizzes = state.quizzes.map(quiz =>
          quiz._id === state.quiz._id ? state.quiz : quiz
        );
      }
    },
    updateQuestion: (state, { payload: { questionId, updates } }) => {
      if (state.quiz._id) {
        state.quiz.questions = state.quiz.questions.map(question =>
          question._id === questionId ? { ...question, ...updates } : question
        );
        state.quizzes = state.quizzes.map(quiz =>
          quiz._id === state.quiz._id ? state.quiz : quiz
        );
      }
    },
    deleteQuestion: (state, { payload: questionId }) => {
      if (state.quiz._id) {
        state.quiz.questions = state.quiz.questions.filter(q => q._id !== questionId);
        state.quizzes = state.quizzes.map(quiz =>
          quiz._id === state.quiz._id ? state.quiz : quiz
        );
      }
    },
    // Quiz attempt management
    startQuizAttempt: (state, { payload: { userId, quizId } }) => {
      const attempt: QuizAttempt = {
        userId,
        quizId,
        answers: {},
        score: 0,
        startedAt: new Date().toISOString()
      };
      state.currentAttempt = attempt;
      
      // Add attempt to quiz
      const quiz = state.quizzes.find(q => q._id === quizId);
      if (quiz) {
        quiz.attempts = quiz.attempts || [];
        quiz.attempts.push(attempt);
      }
    },
    submitQuizAttempt: (state, { payload: { answers, score } }) => {
      if (state.currentAttempt) {
        state.currentAttempt.answers = answers;
        state.currentAttempt.score = score;
        state.currentAttempt.submittedAt = new Date().toISOString();
        
        // Update the attempt in the quiz
        const quiz = state.quizzes.find(q => q._id === state.currentAttempt?.quizId);
        if (quiz?.attempts) {
          quiz.attempts = quiz.attempts.map(attempt => 
            attempt.userId === state.currentAttempt?.userId &&
            attempt.startedAt === state.currentAttempt?.startedAt
              ? state.currentAttempt
              : attempt
          );
        }
        
        state.currentAttempt = undefined;
      }
    }
  },
});

export const { 
  setQuiz, 
  addQuiz, 
  deleteQuiz, 
  updateQuiz, 
  selectQuiz, 
  togglePublishQuiz,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  startQuizAttempt,
  submitQuizAttempt
} = quizzesSlice.actions;

export default quizzesSlice.reducer;