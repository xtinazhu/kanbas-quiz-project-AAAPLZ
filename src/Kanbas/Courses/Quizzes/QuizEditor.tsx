import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBan, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import QuizDetailsEditor from "./QuizDetailEditor";
import * as quizClient from "./client";
import * as courseClient from "../client";
import { addQuiz, updateQuiz } from "./reducer";
import QuizQuestions from "./Questions";

// 定义 Quiz 类型
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
  questions: any[];
}

// 定义 Redux store 中的 quiz state 类型
interface QuizzesState {
  quiz: Quiz;
  quizzes: Quiz[];
}

// 定义根 state 类型
interface RootState {
  quizzesReducer: QuizzesState;
}

export default function QuizEditor() {
  const quiz = useSelector((state: RootState) =>
        state.quizzesReducer.quiz);
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [view, setView] = useState('details');
  const [notifyUsers, setNotifyUsers] = useState(false);

  const handleSave = async () => {
        if (qid) {
            try {
                const status = await quizClient.updateQuiz(quiz);
                dispatch(updateQuiz(quiz));
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/detail`);
            } catch (error) {
                console.error("Failed to save quiz:", error);
                alert("Failed to save quiz. Please try again.");
            }
        }
  };

    const handleSaveAndPublish = async () => {
        if (!cid) {
            alert("Course ID is required");
            return;
        }

        try {
            if (qid) {
                const updatedQuiz = { ...quiz, published: true };
                const status = await quizClient.updateQuiz(updatedQuiz);
                dispatch(updateQuiz(updatedQuiz));
            } else {
                const newQuiz = await courseClient.createQuizForCourse(cid, { ...quiz, published: true });
                dispatch(addQuiz(newQuiz));
            }
            navigate(`/Kanbas/Courses/${cid}/Quizzes/`);
        } catch (error) {
            console.error("Failed to save and publish quiz:", error);
            alert("Failed to save and publish quiz. Please try again.");
        }
    };

    return (
        <div>
            <h2>Quiz Editor</h2>
            <div className="flex-column flex-fill">
                {/* Top Section */}
                <div className="d-flex justify-content-end align-items-center">
                    <h5 className="me-3">Points {quiz.points}</h5>
                    {quiz.published ? (
                        <p className="text-success mb-0 me-3">
                            <FaCheckCircle className="me-1" /> Published
                        </p>
                    ) : (
                        <p className="text-secondary mb-0 me-3">
                            <FaBan className="me-1" /> Not Published
                        </p>
                    )}
                    <button className="btn btn-light">
                        <FaEllipsisV />
                    </button>
                </div>
                <hr />

                {/* Tab Navigation */}
                <div className="nav nav-tabs mb-3">
                    <button 
                        onClick={() => setView('details')} 
                        className={`btn ${view === 'details' ? 'btn-primary' : 'btn-light'} me-2`}
                    >
                        Details
                    </button>
                    <button 
                        onClick={() => setView('questions')} 
                        className={`btn ${view === 'questions' ? 'btn-primary' : 'btn-light'}`}
                    >
                        Questions
                    </button>
                </div>

                {/* Content Section */}
                {view === 'details' ? <QuizDetailsEditor /> : <QuizQuestions />}
                <hr />

                {/* Footer Section */}
                <div className="d-flex align-items-center justify-content-between">
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox"
                            id="notifyUsers"
                            checked={notifyUsers}
                            onChange={(e) => setNotifyUsers(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="notifyUsers">
                            Notify users this quiz has changed
                        </label>
                    </div>
                    <div className="d-flex justify-content-center">
                        {/*<Link 
                            to={`/Kanbas/Courses/${cid}/Quizzes`}
                            className="btn btn-light me-2"
                        >
                            Cancel
                        </Link>*/}
                        <button 
                            className="btn btn-success me-2"
                            onClick={handleSaveAndPublish}
                        >
                            Save & Publish
                        </button>
                        {/*<button 
                            className="btn btn-primary"
                            onClick={handleSave}
                        >
                            Save
                        </button>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}