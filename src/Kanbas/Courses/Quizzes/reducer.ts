import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    quizzes: [],
};
const quizSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuiz: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, { payload: quiz }) => {
            const newQuiz: any = {
                _id: new Date().getTime().toString(),
                title: quiz.title,
                description: quiz.description,
                course: quiz.course,
                type: quiz.type,
                assignmentGroup: quiz.assignmentGroup,
                time: quiz.time,
                attempts:quiz.attempts,
                access_code: quiz.access_code,
                points: quiz.points,
                due_date: quiz.due_date,
                available_date: quiz.available_date,
                until_date: quiz.until_date,
                score: quiz.score,
               // show_correct_answer: quiz.show_correct_answer,
              //  webcam_required: quiz.webcam_required,
               // one_question_at

            };
            state.quizzes = [...state.quizzes, newQuiz] as any;
        },
        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter(
                (m: any) => m._id !== quizId);
        },
        updateQuiz: (state, { payload:  updatedQuiz }) => {
            state.quizzes = state.quizzes.map((quiz:any) =>
                quiz._id === updatedQuiz._id ? updatedQuiz : quiz
            ) as any;
        },
        editQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.map((m: any) =>
                m._id === quizId ? { ...m, editing: true } : m
            ) as any;
        },
    },
});
export const {setQuiz, addQuiz, deleteQuiz, updateQuiz, editQuiz} =
    quizSlice.actions;
export default quizSlice.reducer;