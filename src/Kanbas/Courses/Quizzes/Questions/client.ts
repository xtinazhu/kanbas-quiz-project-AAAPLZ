import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

const QUIZZES_API = `${API_BASE}/api/quizzes`;

export const updateQuestion = async (quizId: string, questionId: string, questionData: any) => {
  const response = await axios.put(
    `${QUIZZES_API}/${quizId}/questions/${questionId}`,
    questionData
  );
  return response.data;
};

export const deleteQuestion = async (quizId: string, questionId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
  return response.data;
};

export const createQuestion = async (quizId: string, questionData: any) => {
  const response = await axios.post(
    `${QUIZZES_API}/${quizId}/questions`,
    questionData
  );
  return response.data;
};

export const findAllQuestionsForQuiz = async (quizId: string) => {
  console.log(quizId)
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};

export const findQuestionById = async (quizId: string, questionId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
  return response.data;
};