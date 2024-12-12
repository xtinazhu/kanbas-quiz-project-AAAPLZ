import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaBan, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import QuizDetailsEditor from "./QuizDetailEditor";
import * as quizClient from "./client";
import * as courseClient from "../client";
import { addQuiz, updateQuiz } from "./reducer";
import QuizQuestionsEditor from "./QuizQuestionEditor";
import { Quiz, QuizQuestion } from './types';

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [view, setView] = useState('details');

  const calculateTotalPoints = (questions: QuizQuestion[]): number => {
    return questions.reduce((total, question) => total + (question.points || 0), 0);
  };

  const [quizData, setQuizData] = useState<Quiz>(() => ({
    title: "New Quiz",
    description: "Please complete this quiz by the due date.",
    course: cid || "",
    points: 0,
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
            // 加载时更新总分
            const totalPoints = calculateTotalPoints(existingQuiz.questions);
            setQuizData({
              ...existingQuiz,
              points: totalPoints
            });
          }
        } catch (error) {
          console.error("Failed to load quiz:", error);
        }
      };
      loadQuiz();
    }
  }, [qid]);

  const handleQuizChange = (updatedQuiz: Quiz) => {
    // 更新时自动计算总分
    const totalPoints = calculateTotalPoints(updatedQuiz.questions);
    setQuizData({
      ...updatedQuiz,
      points: totalPoints
    });
  };

  const handleSaveAndPublish = async () => {
    if (!cid) {
      alert("Course ID is required");
      return;
    }

    try {
      const quizToSave = { 
        ...quizData, 
        published: true,
        points: calculateTotalPoints(quizData.questions) // 确保使用最新的总分
      };
      
      if (qid === "NewQuiz") {
        const newQuiz = await courseClient.createQuizForCourse(cid, quizToSave);
        dispatch(addQuiz(newQuiz));
      } else {
        await quizClient.updateQuiz(quizToSave);
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
      const quizToSave = {
        ...quizData,
        points: calculateTotalPoints(quizData.questions) // 确保使用最新的总分
      };

      if (qid === "NewQuiz") {
        const newQuiz = await courseClient.createQuizForCourse(cid, quizToSave);
        dispatch(addQuiz(newQuiz));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}/detail`);
      } else {
        await quizClient.updateQuiz(quizToSave);
        dispatch(updateQuiz(quizToSave));
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
          <QuizQuestionsEditor
            quiz={quizData}
            onQuizChange={handleQuizChange}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
        <hr />

        {/* Footer Section */}
        <div className="d-flex justify-content-center">
          <div className="d-flex justify-content-center">
            <button 
              className="btn btn-danger me-2"
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