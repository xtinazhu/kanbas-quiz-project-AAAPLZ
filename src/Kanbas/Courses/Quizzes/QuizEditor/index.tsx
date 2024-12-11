import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBan, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import QuizDetailsEditor from "./Details";
import QuizQuestions from "../Questions";
import * as quizClient from "../client";
import { addQuiz, updateQuiz } from "../reducer";

const QuizEditor = () => {
  const quiz = useSelector((state: any) => state.quizzesReducer.quiz);
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [view, setView] = useState("details");

  const handleSave = async () => {
    if (quizId) {
      try {
        const updatedQuiz = await quizClient.updateQuiz(quiz);
        dispatch(updateQuiz(updatedQuiz));
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
      } catch (error) {
        console.error("Error saving quiz:", error);
      }
    } else {
      console.error("Quiz ID not found.");
    }
  };

  const handleSaveAndPublish = async () => {
    if (!courseId) {
      console.error("Course ID is undefined.");
      return;
    }

    try {
      if (quizId) {
        const updatedQuiz = { ...quiz, published: true };
        const savedQuiz = await quizClient.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(savedQuiz));
      } else {
        const newQuiz = await quizClient.createQuiz(courseId, quiz);
        dispatch(addQuiz(newQuiz));
      }
      navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    } catch (error) {
      console.error("Error saving and publishing quiz:", error);
    }
  };

  return (
    <div>
      <h1>Editor</h1>
      <div className="flex-column flex-fill">
        {/* Header Section */}
        <div className="d-flex justify-content-end">
          <h5 style={{ marginRight: "10px" }}>Points: {quiz.points}</h5>
          {quiz.published ? (
            <p style={{ color: "green" }}>
              <FaCheckCircle /> Published
            </p>
          ) : (
            <p style={{ color: "grey" }}>
              <FaBan /> Not Published
            </p>
          )}
          <button className="top-buttons" style={{ marginLeft: 10 }}>
            <FaEllipsisV />
          </button>
        </div>
        <hr />

        {/* Tab Section */}
        <div className="nav nav-tabs">
          <button
            onClick={() => setView("details")}
            className={`btn ${view === "details" ? "btn-primary" : "btn-light"}`}
          >
            Details
          </button>
          <button
            onClick={() => setView("questions")}
            className={`btn ${view === "questions" ? "btn-primary" : "btn-light"}`}
          >
            Questions
          </button>
        </div>

        {/* Content Section */}
        {view === "details" ? <QuizDetailsEditor /> : <QuizQuestions />}
        <hr />

        {/* Footer Section */}
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <input
              className="form-check-input"
              type="checkbox"
              id="notifyChange"
              style={{ marginRight: "5px" }}
            />
            <label className="form-check-label" htmlFor="notifyChange">
              Notify users this quiz has changed
            </label>
          </div>
          <div>
            <Link
              to={`/Kanbas/Courses/${courseId}/Quizzes`}
              className="btn btn-light"
              style={{ marginRight: "5px" }}
            >
              Cancel
            </Link>
            <button
              className="btn btn-light"
              style={{ marginRight: "5px" }}
              onClick={handleSaveAndPublish}
            >
              Save & Publish
            </button>
            <button className="btn btn-danger" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizEditor;