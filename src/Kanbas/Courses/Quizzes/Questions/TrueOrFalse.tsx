import React from "react";

const TrueOrFalseQuestionEditor = () => {
    return (
        <div className="quiz-question-editor">
            <hr />
            <div className="question-content">
                <label className="question-label">Question:</label>
                <textarea
                    className="question-input"
                    placeholder="Type your question here"
                ></textarea>
            </div>

            <div className="answer-section">
                <label className="answer-label">Answers:</label>
                <div className="answer-options">
                    <label className="answer-choice">
                        <input
                            className="answer-radio"
                            type="radio"
                            name="correct-option"
                            value="true"
                        />
                        True
                    </label>

                    <label className="answer-choice">
                        <input
                            className="answer-radio"
                            type="radio"
                            name="correct-option"
                            value="false"
                        />
                        False
                    </label>
                </div>
            </div>
        </div>
    );
};

export default TrueOrFalseQuestionEditor;