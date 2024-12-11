import React from "react";
import { IoIosAdd } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
  
  const MultipleChoice  = () => {
  return (
    <div className="quiz-question-editor">
      <hr />
      <div className="question-body">
        <label className="question-label">Question:</label>
        <textarea
          placeholder="Enter your question"
          className="question-textarea"
        ></textarea>
      </div>

      <div className="answers-section">
        <div className="answer correct-answer">
          <label className="answer-label">Correct Answer</label>
          <textarea
            placeholder="Answer text"
            className="answer-textarea"
          ></textarea>
          <div className="icons-container">
            <MdEdit className="edit-icon" />
            <MdDelete className="delete-icon" />
          </div>
        </div>

        <div className="answer possible-answer">
          <label className="answer-label">Possible Answer</label>
          <textarea
            placeholder="Answer text"
            className="answer-textarea"
          ></textarea>
          <div className="icons-container">
            <MdEdit className="edit-icon" />
            <MdDelete className="delete-icon" />
          </div>
        </div>
        <button className="add-answer-button">
          <IoIosAdd /> Add Another Answer
        </button>
      </div>
    </div>
  );
}
export default MultipleChoice;