import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectQuiz, setQuiz } from "../../reducer";

const QuizDetailsEditor = () => {
  const quiz = useSelector((state: any) => state.quizzesReducer.quiz);
  const dispatch = useDispatch();
  const { qid } = useParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type} = e.target;
  
    const fieldValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
  
    dispatch(
      selectQuiz({
        ...quiz,
        [name]: fieldValue,
      })
    );
  };

  return (
    <div className="container-fluid">
      <h2>{quiz.title}</h2>
      <input
        value={quiz.title}
        type="text"
        name="title"
        className="form-control mb-2"
        placeholder="Unnamed Quiz"
        onChange={handleInputChange}
      />
      <div className="container">
      <div className="mb-3 row justify-content-center">
          <label htmlFor="type" className="col-sm-4 col-form-label text-end">
            Quiz Type
          </label>
          <select
            id="type"
            name="type"
            className="form-select"
            value={quiz.type}
            onChange={handleInputChange}
          >
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
        </div>
        <div className="mb-3 row justify-content-center">
          <label htmlFor="points" className="col-sm-3 col-form-label text-end">
            Points
          </label>
          <div className="col-sm-7">
            <input
              type="number"
              name="points"
              className="form-control"
              value={quiz.points}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3 row justify-content-center">
          <label htmlFor="group" className="col-sm-4 col-form-label text-end">
            Assignment Group
          </label>
          <select
            id="group"
            name="group"
            className="form-select"
            value={quiz.group}
            onChange={handleInputChange}
          >
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </select>
        </div>

        <div className="mb-3 row justify-content-center">
          <label htmlFor="accessCode" className="col-sm-4 col-form-label text-end">
            Shuffle Answers
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              name="accessCode"
              className="form-control"
              value={quiz.accessCode}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-3 row justify-content-center">
          <label htmlFor="showAnswers" className="col-sm-4 col-form-label text-end">
            Show Correct Answers
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              name="showAnswers"
              className="form-control"
              value={quiz.showAnswers}
              placeholder="Immediately"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-3 row justify-content-center">
          <label htmlFor="responses" className="col-sm-4 col-form-label text-end">
            View Responses
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              name="responses"
              className="form-control"
              value={quiz.responses}
              placeholder="Always"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <b>Options</b>
          <div className="form-check">
            <input
              type="checkbox"
              name="shuffleAnswers"
              className="form-check-input"
              checked={quiz.shuffleAnswers}
              onChange={handleInputChange}
            />
            <label className="form-check-label">Shuffle Answers</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="multipleAttempts"
              className="form-check-input"
              checked={quiz.multipleAttempts}
              onChange={handleInputChange}
            />
            <label className="form-check-label">Allow Multiple Attempts</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="oneQuestionataTime"
              className="form-check-input"
              checked={quiz.oneQuestionataTime}
              onChange={handleInputChange}
            />
            <label className="form-check-label">One Question at a Time</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="webCam"
              className="form-check-input"
              checked={quiz.webCam}
              onChange={handleInputChange}
            />
            <label className="form-check-label">Webcam Required</label>
          </div>
        </div>

        <div>
          <h4>Assign</h4>
          <input
            type="date"
            name="dueTime"
            className="form-control"
            value={quiz.dueTime}
            onChange={handleInputChange}
          />
          <h4>Available From</h4>
          <input
            type="date"
            name="availableFrom"
            className="form-control"
            value={quiz.availableFrom}
            onChange={handleInputChange}
          />
          <h4>Until</h4>
          <input
            type="date"
            name="availableUntil"
            className="form-control"
            value={quiz.availableUntil}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizDetailsEditor;