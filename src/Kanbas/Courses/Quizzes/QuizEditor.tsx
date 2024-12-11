import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaBan, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import QuizDetailsEditor from "./QuizDetailEditor";
import * as quizClient from "./client";
import * as courseClient from "../client";
import { addQuiz, updateQuiz } from "./reducer";
import QuizQuestions from "./Questions";

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

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [view, setView] = useState('details');
  const [notifyUsers, setNotifyUsers] = useState(false);

  // 将 quiz 状态提升到父组件
  const [quizData, setQuizData] = useState<Quiz>(() => ({
    title: "New Quiz",
    description: "Please complete this quiz by the due date.",
    course: cid || "",
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
    availableUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    shuffleAnswers: true,
    questions: []
  }));

  // 加载现有的 quiz 数据
  useEffect(() => {
    if (qid && qid !== "NewQuiz" && qid !== "undefined") {
      const loadQuiz = async () => {
        try {
          const existingQuiz = await quizClient.findQuizById(qid);
          if (existingQuiz) {
            setQuizData(existingQuiz);
          }
        } catch (error) {
          console.error("Failed to load quiz:", error);
        }
      };
      loadQuiz();
    }
  }, [qid]);

  const handleQuizChange = (updatedQuiz: Quiz) => {
    setQuizData(updatedQuiz);
  };

  const handleSaveAndPublish = async () => {
    if (!cid) {
      alert("Course ID is required");
      return;
    }

    try {
      const quizToSave = { ...quizData, published: true };
      
      if (qid === "NewQuiz") {
        const newQuiz = await courseClient.createQuizForCourse(cid, quizToSave);
        dispatch(addQuiz(newQuiz));
      } else {
        const response = await quizClient.updateQuiz(quizToSave);
        dispatch(updateQuiz(quizToSave));
      }
      
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Failed to save and publish quiz:", error);
      alert("Failed to save and publish quiz. Please try again.");
    }
  };

  const handleSave = async () => {
    if (!cid) {
      alert("Course ID is required");
      return;
    }
    try {
      if (qid === "NewQuiz") {
        const newQuiz = await courseClient.createQuizForCourse(cid, quizData);
        dispatch(addQuiz(newQuiz));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}/detail`);
      } else {
        await quizClient.updateQuiz(quizData);
        dispatch(updateQuiz(quizData));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/detail`);
      }
    } catch (error) {
      console.error("Failed to save quiz:", error);
    }
  };
  
  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  return (
    <div>
      <h2>Quiz Editor</h2>
      <div className="flex-column flex-fill">
        {/* Top Section */}
        <div className="d-flex justify-content-end align-items-center">
          <h5 className="me-3">Points {quizData.points}</h5>
          {quizData.published ? (
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
        {view === 'details' ? (
          <QuizDetailsEditor 
            quiz={quizData} 
            onQuizChange={handleQuizChange}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <QuizQuestions />
        )}
        <hr />

        {/* Footer Section */}
        <div className="d-flex justify-content-center">
          {/*<div className="form-check">
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
          </div>*/}
          <div className="d-flex justify-content-center">
            <button 
              className="btn btn-success me-2"
              onClick={handleSaveAndPublish}
            >
              Save & Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}