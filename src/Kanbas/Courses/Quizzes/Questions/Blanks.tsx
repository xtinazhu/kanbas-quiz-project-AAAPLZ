import React from "react";
import { IoIosAdd } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";

const Blanks = () => {
  return (
    <div className="quiz-question-editor">
      <hr />
      <div className="question-container">
        <label className="question-label">Question:</label>
        <textarea
          className="question-input"
          placeholder="Question"
        ></textarea>
      </div>

      <div className="answers-container">
        <div className="answer-item correct-answer">
          <label className="answer-label">Correct Answer</label>
          <textarea
            className="answer-input"
            placeholder="Answer"
          ></textarea>
          <div className="action-icons">
            <MdEdit className="edit-icon" />
            <MdDelete className="delete-icon" />
          </div>
        </div>

        <div className="answer-item possible-answer">
          <label className="answer-label">Possible Answer</label>
          <textarea
            className="answer-input"
            placeholder="Possible answer"
          ></textarea>
          <div className="action-icons">
            <MdEdit className="edit-icon" />
            <MdDelete className="delete-icon" />
          </div>
        </div>
        <button className="add-answer-btn">
          <IoIosAdd /> Add Another Answer
        </button>
      </div>
    </div>
  );
};

export default Blanks;