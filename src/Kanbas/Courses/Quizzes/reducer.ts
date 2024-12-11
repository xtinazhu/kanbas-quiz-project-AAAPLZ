import { createSlice } from '@reduxjs/toolkit';

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
      }
    },
    selectQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    setQuiz: (state, action) => {
      state.quizzes = action.payload;
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, selectQuiz, setQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;