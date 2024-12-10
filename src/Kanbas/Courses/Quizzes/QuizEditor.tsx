import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addQuiz } from "./reducer";
import * as courseClient from "../client";
import * as quizClient from "./client";

interface Quiz {
  _id?: string;
  title: string;
  description: string;
  points: number;
  timeLimit: number;
  dueDate: string;
  availableFromDate: string;
  availableUntilDate: string;
  shuffleAnswers: boolean;
  allowMultipleAttempts: boolean;
  maxAttempts?: number;
}

export default function QuizEditor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cid, qid } = useParams();

  const [quiz, setQuiz] = useState<Quiz>({
    title: "",
    description: "Please complete this quiz by the due date. Read each question carefully and select the best answer.",
    points: 100,
    timeLimit: 60,
    dueDate: new Date().toISOString().slice(0, 16),
    availableFromDate: new Date().toISOString().slice(0, 16),
    availableUntilDate: new Date().toISOString().slice(0, 16),
    shuffleAnswers: false,
    allowMultipleAttempts: false,
    maxAttempts: 1
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      if (cid && qid) {
        try {
          const quizzes = await courseClient.findQuizzesForCourse(cid);
          const existingQuiz = quizzes.find((q: Quiz) => q._id === qid);
          if (existingQuiz) {
            const formattedQuiz = {
              ...existingQuiz,
              dueDate: new Date(existingQuiz.dueDate).toISOString().slice(0, 16),
              availableFromDate: new Date(existingQuiz.availableFromDate).toISOString().slice(0, 16),
              availableUntilDate: new Date(existingQuiz.availableUntilDate).toISOString().slice(0, 16)
            };
            setQuiz(formattedQuiz);
          }
        } catch (error) {
          console.error("Failed to fetch quiz:", error);
          alert("Failed to load quiz details.");
        }
      }
    };

    fetchQuiz();
  }, [cid, qid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked
      : type === 'number' 
        ? parseInt(value) 
        : value;

    setQuiz(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const handleSave = async () => {
    if (!cid) return;
    
    if (!quiz.title.trim()) {
      alert("Quiz title is required");
      return;
    }
  
    try {
      const quizData = {
        ...quiz,
        course: cid,
        dueDate: quiz.dueDate || new Date().toISOString(),
        availableFromDate: quiz.availableFromDate || new Date().toISOString(),
        availableUntilDate: quiz.availableUntilDate || new Date().toISOString(),
      };
  
      if (qid) {
        const updatedQuiz = await quizClient.updateQuiz(quizData);
        dispatch(addQuiz(updatedQuiz));
      } else {
        const newQuiz = await courseClient.createQuizForCourse(cid, quizData);
        dispatch(addQuiz(newQuiz));
      }
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Failed to save quiz:", error);
      alert("Failed to save quiz. Please check all required fields.");
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  return (
    <div id="wd-quiz-editor" className="kb-margin-right-left kb-padded-bottom-right kb-border-fat">
      <div className="row">Quiz Name</div>
      <div className="row">
        <input 
          id="wd-quiz-name"
          name="title"
          className="col-12 kb-input-height"
          value={quiz.title}
          placeholder="Quiz Name"
          onChange={handleChange}
        />
      </div><br />
      
      <div className="row">
        <textarea 
          id="wd-quiz-description"
          name="description"
          className="col-12 kb-textarea-height"
          value={quiz.description}
          onChange={handleChange}
        />
      </div><br />

      <div className="row">
        <div className="col-4 kb-textalign-center-right">
          Points&nbsp;
        </div>
        <input 
          id="wd-points"
          name="points"
          type="number"
          className="col-8 kb-input-height"
          value={quiz.points}
          onChange={handleChange}
        />
      </div><br />

      <div className="row">
        <div className="col-4 kb-textalign-center-right">Time Limit (minutes)&nbsp;</div>
        <input 
          id="wd-time-limit"
          name="timeLimit"
          type="number"
          className="col-8 kb-input-height"
          value={quiz.timeLimit}
          onChange={handleChange}
        />
      </div><br />

      <div className="row">
        <div className="col-4 kb-textalign-center-right">Due Date&nbsp;</div>
        <input 
          type="datetime-local"
          name="dueDate"
          className="col-8 kb-input-height"
          value={quiz.dueDate}
          onChange={handleChange}
        />
      </div><br />

      <div className="row">
        <div className="col-4 kb-textalign-center-right">Available From&nbsp;</div>
        <input 
          type="datetime-local"
          name="availableFromDate"
          className="col-8 kb-input-height"
          value={quiz.availableFromDate}
          onChange={handleChange}
        />
      </div><br />

      <div className="row">
        <div className="col-4 kb-textalign-center-right">Available Until&nbsp;</div>
        <input 
          type="datetime-local"
          name="availableUntilDate"
          className="col-8 kb-input-height"
          value={quiz.availableUntilDate}
          onChange={handleChange}
        />
      </div><br />

      <div className="row">
        <div className="col-4 kb-textalign-center-right">Quiz Options&nbsp;</div>
        <div className="col-8">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="shuffleAnswers"
              name="shuffleAnswers"
              checked={quiz.shuffleAnswers}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="shuffleAnswers">
              Shuffle Answers
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="allowMultipleAttempts"
              name="allowMultipleAttempts"
              checked={quiz.allowMultipleAttempts}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="allowMultipleAttempts">
              Allow Multiple Attempts
            </label>
          </div>
          {quiz.allowMultipleAttempts && (
            <div className="mt-2">
              <label htmlFor="maxAttempts">Maximum Attempts:&nbsp;</label>
              <input
                type="number"
                id="maxAttempts"
                name="maxAttempts"
                className="form-control"
                value={quiz.maxAttempts}
                onChange={handleChange}
                min="1"
              />
            </div>
          )}
        </div>
      </div><br />

      <hr />

      <div>
        <div id="wd-quiz-controls" className="text-nowrap">
          <button 
            className="btn btn-lg btn-danger me-1 float-end"
            onClick={handleSave}
          >
            Save
          </button>

          <button 
            className="btn btn-lg btn-secondary me-1 float-end"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}