import { createSlice } from '@reduxjs/toolkit';

<<<<<<< HEAD
interface Quiz {
    _id: string;
    title: string;
    type: string;
    cid: string;
    points: number;
    noOfQuestions: number;
    dueTime: string;
    availableFrom: string;
    availableUntil: string;
    published: boolean;
    timelimit: number;
    shuffleAnswers: boolean;
    multipleAttempts: boolean;
    noOfAttempts: number;
    showCorrectAnswers: string;
    accessCode: string;
    oneQuestionataTime: boolean;
    webCam: boolean;
    lockQuestions: boolean;
    group: string;
    viewResponses: string;
    viewResult: boolean;
  }

interface QuizzesState {
  quizzes: Quiz[];
  quiz: Quiz;
}

const initialState: QuizzesState = {
  quizzes: [],
  quiz: {
    _id: "Q1",
    title: 'New Quiz',
    type: 'Graded Quiz',
    points: 100,
    noOfQuestions: 10,
    dueTime: '2024-05-10',
    availableFrom: '2024-02-15',
    availableUntil: '2024-05-15',
    published: true,
    timelimit: 20,
    shuffleAnswers: true,
    multipleAttempts: false,
    noOfAttempts: 1,
    showCorrectAnswers: 'Immediately',
    accessCode: '',
    oneQuestionataTime: true,
    webCam: false,
    lockQuestions: false,
    group: 'QUIZZES',
    viewResponses: 'Always',
    viewResult: false,
    cid: 'RS101',
  },
};

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes = [action.payload, ...state.quizzes];
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter((quiz) => quiz._id !== action.payload);
    },
    updateQuiz: (state, action) => {
      const index = state.quizzes.findIndex((quiz) => quiz._id === action.payload._id);
      if (index !== -1) {
        state.quizzes[index] = {
          ...state.quizzes[index],
          ...action.payload.changes,
        };
=======
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
  answers: Record<string, any>;
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
  selectedQuestionId: string | null;
  isQuestionEditing: boolean;
  questionDraft: Question | null;
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
  },
  selectedQuestionId: null,
  isQuestionEditing: false,
  questionDraft: null
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
>>>>>>> main
      }
    },
    selectQuiz: (state, action) => {
      state.quiz = action.payload;
<<<<<<< HEAD
    },
    setQuiz: (state, action) => {
      state.quizzes = action.payload;
=======
      state.selectedQuestionId = null;
      state.isQuestionEditing = false;
      state.questionDraft = null;
    },
    togglePublishQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((quiz) =>
        quiz._id === quizId 
          ? { ...quiz, published: !quiz.published } 
          : quiz
      );
    },
    // Question management
    setSelectedQuestion: (state, { payload: questionId }) => {
      state.selectedQuestionId = questionId;
      state.questionDraft = questionId 
        ? state.quiz.questions.find(q => q._id === questionId) || null
        : null;
    },
    setQuestionEditing: (state, { payload: isEditing }) => {
      state.isQuestionEditing = isEditing;
      if (!isEditing) {
        state.questionDraft = null;
      }
    },
    updateQuestionDraft: (state, { payload: updates }) => {
      if (state.questionDraft) {
        state.questionDraft = { ...state.questionDraft, ...updates };
      }
    },
    saveQuestion: (state) => {
      if (state.questionDraft && state.quiz._id) {
        const updatedQuestion = { ...state.questionDraft } as Question;
        
        if (state.selectedQuestionId) {
          // Update existing question
          state.quiz.questions = state.quiz.questions.map(question =>
            question._id === state.selectedQuestionId 
              ? updatedQuestion
              : question
          );
        } else {
          // Add new question
          state.quiz.questions.push(updatedQuestion);
        }
        
        // Update quiz in quizzes array
        state.quizzes = state.quizzes.map(quiz =>
          quiz._id === state.quiz._id ? state.quiz : quiz
        );
        
        // Reset editing state
        state.isQuestionEditing = false;
        state.questionDraft = null;
      }
    },
    cancelQuestionEdit: (state) => {
      state.isQuestionEditing = false;
      state.questionDraft = null;
    },
    createNewQuestion: (state, { payload: questionType }) => {
      const newQuestion: Partial<Question> = {
        _id: new Date().getTime().toString(),
        title: "New Question",
        points: 1,
        question: "",
        type: questionType,
      };

      // Add type-specific properties
      switch (questionType) {
        case 'MULTIPLE_CHOICE':
          (newQuestion as MultipleChoiceQuestion).choices = [];
          break;
        case 'TRUE_FALSE':
          (newQuestion as TrueFalseQuestion).correctAnswer = true;
          break;
        case 'FILL_IN_BLANK':
          (newQuestion as FillInBlankQuestion).possibleAnswers = [];
          break;
      }

      state.questionDraft = newQuestion as Question;
      state.selectedQuestionId = null;
      state.isQuestionEditing = true;
    },
    deleteQuestion: (state, { payload: questionId }) => {
      if (state.quiz._id) {
        state.quiz.questions = state.quiz.questions.filter(q => q._id !== questionId);
        // Update quiz in quizzes array
        state.quizzes = state.quizzes.map(quiz =>
          quiz._id === state.quiz._id ? state.quiz : quiz
        );
        // Reset question editing state
        if (state.selectedQuestionId === questionId) {
          state.selectedQuestionId = null;
          state.isQuestionEditing = false;
          state.questionDraft = null;
        }
      }
    },
    reorderQuestions: (state, { payload: newQuestionIds }: { payload: string[] }) => {
      if (state.quiz._id) {
        const reorderedQuestions = newQuestionIds
          .map((id: string) => state.quiz.questions.find(q => q._id === id))
          .filter((q: Question | undefined): q is Question => q !== undefined);
        
        state.quiz.questions = reorderedQuestions;
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
>>>>>>> main
    },
  },
});

<<<<<<< HEAD
export const { addQuiz, deleteQuiz, updateQuiz, selectQuiz, setQuiz } = quizzesSlice.actions;
=======
export const { 
  setQuiz, 
  addQuiz, 
  deleteQuiz, 
  updateQuiz, 
  selectQuiz, 
  togglePublishQuiz,
  setSelectedQuestion,
  setQuestionEditing,
  updateQuestionDraft,
  saveQuestion,
  cancelQuestionEdit,
  createNewQuestion,
  deleteQuestion,
  reorderQuestions,
  startQuizAttempt,
  submitQuizAttempt
} = quizzesSlice.actions;

>>>>>>> main
export default quizzesSlice.reducer;