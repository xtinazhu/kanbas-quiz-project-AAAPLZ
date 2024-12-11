import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Enum for Question Types for improved type safety
export enum QuestionType {
  MultipleChoice = 'MC',
  TrueFalse = 'TF',
  FillInBlanks = 'BLANKS'
}

// Comprehensive Question Interface with Optional Chaining
export interface Question {
  _id?: string;
  title: string;
  questionType: QuestionType;
  points: number;
  question: string;
  options: string[];
  answers: string[];
  quiz?: string;
}

// Structured State Interface
interface QuestionsState {
  questions: Question[];
  currentQuestion: Question | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial State with Enhanced Structure
const initialState: QuestionsState = {
  questions: [],
  currentQuestion: null,
  status: 'idle',
  error: null
};

// Create Slice with More Robust Reducers
const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    // Strongly typed payload actions
    setQuestions(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
      state.status = 'succeeded';
    },
    
    addQuestion(state, action: PayloadAction<Question>) {
      // Prepend new question and ensure unique entries
      const isDuplicate = state.questions.some(q => q._id === action.payload._id);
      if (!isDuplicate) {
        state.questions.unshift(action.payload);
      }
    },
    
    updateQuestion(state, action: PayloadAction<Question>) {
      const index = state.questions.findIndex(q => q._id === action.payload._id);
      if (index !== -1) {
        // Create a new array to ensure immutability
        state.questions = state.questions.map((question, idx) => 
          idx === index ? action.payload : question
        );
      }
    },
    
    deleteQuestion(state, action: PayloadAction<string>) {
      state.questions = state.questions.filter(q => q._id !== action.payload);
    },
    
    selectQuestion(state, action: PayloadAction<Question>) {
      state.currentQuestion = action.payload;
    },
    
    // Additional utility reducer for error handling
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.status = action.payload ? 'failed' : 'idle';
    },
    
    // Reset state to initial conditions
    resetQuestions(state) {
      state.questions = [];
      state.currentQuestion = null;
      state.status = 'idle';
      state.error = null;
    }
  }
});

// Export Actions with Type Annotations
export const { 
  addQuestion, 
  deleteQuestion, 
  updateQuestion, 
  selectQuestion, 
  setQuestions,
  setError,
  resetQuestions
} = questionsSlice.actions;

export default questionsSlice.reducer;
