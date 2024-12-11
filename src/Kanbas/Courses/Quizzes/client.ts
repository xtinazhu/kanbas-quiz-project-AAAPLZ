import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const updateQuiz = async (quiz:any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}/editor`, quiz);
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return data;
};

export const createQuiz = async (courseId: string, quizData: { title: string }): Promise<any> => {
    const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, quizData);
    return data;
  };

export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return data;
};
export const findQuizById = async (courseId: string, quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes/${quizId}`);
  return data;
};