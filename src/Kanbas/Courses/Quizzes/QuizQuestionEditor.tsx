import React from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

interface Question {
  _id?: string;
  title: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_IN_BLANK';
  points: number;
  question: string;
}

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
  questions: Question[];
}

interface QuizQuestionsProps {
  quiz: Quiz;
  onQuizChange: (quiz: Quiz) => void;
  onSave: () => void;
  onCancel: () => void;
}

const QuizQuestions: React.FC<QuizQuestionsProps> = ({ 
  quiz, 
  onQuizChange,
  onSave,
  onCancel 
}) => {
  const handleAddQuestion = () => {
    const newQuestion: Question = {
      title: "New Question",
      type: 'MULTIPLE_CHOICE',
      points: 10,
      question: ""
    };
    
    onQuizChange({
      ...quiz,
      questions: [...quiz.questions, newQuestion]
    });
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = quiz.questions.filter((_, i) => i !== index);
    onQuizChange({
      ...quiz,
      questions: updatedQuestions
    });
  };

  return (
    <div className="container">
      {/* Empty list prompt */}
      {(!quiz.questions || quiz.questions.length === 0) && (
        <div className="text-center text-muted my-4">
          No questions added. Click "New Question" to begin.
        </div>
      )}

      {/* Questions list */}
      <div className="mb-4">
        {quiz.questions && quiz.questions.map((question: Question, index: number) => (
          <div key={question._id || index} className="card mb-2">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">{question.title}</h5>
                  <p className="card-text mb-0">{question.points} pts</p>
                  <small className="text-muted">Type: {question.type}</small>
                </div>
                <div>
                  <button 
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => {/* Add edit functionality */}}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDeleteQuestion(index)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add question button */}
      <div className="d-flex justify-content-center mb-4">
        <button 
          className="btn btn-secondary"
          onClick={handleAddQuestion}
        >
          <FaPlus className="me-2" />
          New Question
        </button>
      </div>

      {/* Bottom buttons */}
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

export default QuizQuestions;