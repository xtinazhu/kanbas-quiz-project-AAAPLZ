import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const addQuestionToQuiz = async (quizId: string, question: any) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return response.data;
};

export const updateQuizQuestion = async (
  quizId: string,
  questionId: string,
  question: any
) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/questions/${questionId}`,
    question
  );
  return response.data;
};

export const deleteQuizQuestion = async (quizId: string, questionId: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}/questions/${questionId}`
  );
  return response.data;
};

export const reorderQuizQuestions = async (quizId: string, questionIds: string[]) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/questions/reorder`,
    { questionIds }
  );
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};