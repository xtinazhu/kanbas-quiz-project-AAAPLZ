import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const USERS_API = `${REMOTE_SERVER}/api/users`;

// Create axios instance with credentials
const axiosWithCredentials = axios.create({ 
  withCredentials: true 
});

/**
 * Enroll current user in a course
 */
export const enrollInCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/enroll`
  );
  return response.data;
};

/**
 * Remove current user from a course
 */
export const unenrollFromCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/enroll`
  );
  return response.data;
};

/**
 * Get all enrollments for a course
 */
export const findCourseEnrollments = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/enrollments`
  );
  return response.data;
};

/**
 * Get all enrollments for a specific user
 */
export const findUserEnrollments = async (userId: string) => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}/${userId}/enrollments`
  );
  return response.data;
};

/**
 * Get current user's enrollments
 */
export const findMyEnrollments = async () => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}/current/enrollments`
  );
  return response.data;
};

/**
 * Check if current user is enrolled in a specific course
 */
export const checkEnrollmentStatus = async (courseId: string) => {
  const enrollments = await findCourseEnrollments(courseId);
  return enrollments.some((e: any) => e.user === "current");
};

/**
 * Get all enrollments (admin only)
 */
export const findAllEnrollments = async () => {
  const response = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/enrollments`
  );
  return response.data;
};