//在QuizEditor页面里面，用于编辑quiz的Detail

import React from 'react';

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

interface QuizDetailEditorProps {
  quiz: Quiz;
  onQuizChange: (quiz: Quiz) => void;
  onSave: () => void;
  onCancel: () => void;
}

const QuizDetailsEditor = ({ quiz, onQuizChange, onSave, onCancel }: QuizDetailEditorProps) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    onQuizChange({
      ...quiz,
      [name]: fieldValue,
    });
  };

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
      .toISOString()
      .slice(0, 16);
    return localDate;
  };
  
  const handleDateChange = (name: string, value: string) => {
    const localDate = new Date(value);
    onQuizChange({
      ...quiz,
      [name]: localDate.toISOString(),
    });
  };

  return (
    <div className="container">
      <div className="mb-4">
        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="published"
            className="form-check-input"
            checked={quiz.published}
            onChange={handleInputChange}
          />
          <label className="form-check-label">Published</label>
        </div>
      </div>

      <div className="container">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            value={quiz.title}
            type="text"
            name="title"
            id="title"
            className="form-control"
            placeholder="Unnamed Quiz"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            value={quiz.description}
            name="description"
            id="description"
            className="form-control"
            rows={3}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quizType" className="form-label">Quiz Type</label>
          <select
            id="quizType"
            name="quizType"
            className="form-select"
            value={quiz.quizType}
            onChange={handleInputChange}
          >
            <option value="GRADED_QUIZ">Graded Quiz</option>
            <option value="PRACTICE_QUIZ">Practice Quiz</option>
            <option value="GRADED_SURVEY">Graded Survey</option>
            <option value="UNGRADED_SURVEY">Ungraded Survey</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="points" className="form-label">Points</label>
          <input
            type="number"
            id="points"
            name="points"
            className="form-control"
            value={quiz.points}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="assignmentGroup" className="form-label">Assignment Group</label>
          <select
            id="assignmentGroup"
            name="assignmentGroup"
            className="form-select"
            value={quiz.assignmentGroup}
            onChange={handleInputChange}
          >
            <option value="ASSIGNMENTS">Assignments</option>
            <option value="QUIZZES">Quizzes</option>
            <option value="EXAMS">Exams</option>
            <option value="PROJECT">Project</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="timeLimit" className="form-label">Time Limit (minutes)</label>
          <input
            type="number"
            id="timeLimit"
            name="timeLimit"
            className="form-control"
            value={quiz.timeLimit}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="accessCode" className="form-label">Access Code</label>
          <input
            type="text"
            id="accessCode"
            name="accessCode"
            className="form-control"
            value={quiz.accessCode}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <h4>Options</h4>
          <div className="form-check mb-2">
            <input
              type="checkbox"
              id="shuffleAnswers"
              name="shuffleAnswers"
              className="form-check-input"
              checked={quiz.shuffleAnswers}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="shuffleAnswers">
              Shuffle Answers
            </label>
          </div>

          <div className="form-check mb-2">
            <input
              type="checkbox"
              id="showCorrectAnswers"
              name="showCorrectAnswers"
              className="form-check-input"
              checked={quiz.showCorrectAnswers}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="showCorrectAnswers">
              Show Correct Answers
            </label>
          </div>

          <div className="form-check mb-2">
            <input
              type="checkbox"
              id="multipleAttempts"
              name="multipleAttempts"
              className="form-check-input"
              checked={quiz.multipleAttempts}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="multipleAttempts">
              Allow Multiple Attempts
            </label>
          </div>

          {quiz.multipleAttempts && (
            <div className="ms-4 mb-2">
              <label htmlFor="maxAttempts" className="form-label">Maximum Attempts</label>
              <input
                type="number"
                id="maxAttempts"
                name="maxAttempts"
                className="form-control"
                value={quiz.maxAttempts}
                onChange={handleInputChange}
                min={1}
              />
            </div>
          )}

          <div className="form-check mb-2">
            <input
              type="checkbox"
              id="oneQuestionAtATime"
              name="oneQuestionAtATime"
              className="form-check-input"
              checked={quiz.oneQuestionAtATime}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="oneQuestionAtATime">
              One Question at a Time
            </label>
          </div>

          <div className="form-check mb-2">
            <input
              type="checkbox"
              id="lockQuestionsAfterAnswering"
              name="lockQuestionsAfterAnswering"
              className="form-check-input"
              checked={quiz.lockQuestionsAfterAnswering}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="lockQuestionsAfterAnswering">
              Lock Questions After Answering
            </label>
          </div>

          <div className="form-check mb-2">
            <input
              type="checkbox"
              id="webcamRequired"
              name="webcamRequired"
              className="form-check-input"
              checked={quiz.webcamRequired}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="webcamRequired">
            Webcam Required
            </label>
          </div>
        </div>

        <div className="mb-4">
          <h4>Time Settings</h4>
          
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">Due Date</label>
            <input
              type="datetime-local"
              id="dueDate"
              className="form-control"
              value={formatDateForInput(quiz.dueDate)}
              onChange={(e) => handleDateChange("dueDate", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="availableFrom" className="form-label">Available From</label>
            <input
              type="datetime-local"
              id="availableFrom"
              className="form-control"
              /*value={new Date(quiz.availableFrom).toISOString().slice(0, 16)}*/
              value={formatDateForInput(quiz.availableFrom)}
              onChange={(e) => handleDateChange("availableFrom", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="availableUntil" className="form-label">Available Until</label>
            <input
              type="datetime-local"
              id="availableUntil"
              className="form-control"
              
              value={formatDateForInput(quiz.availableUntil)}
              onChange={(e) => handleDateChange("availableUntil", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mb-3">
        <button 
          className="btn btn-secondary me-2" 
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className="btn btn-danger" 
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default QuizDetailsEditor;