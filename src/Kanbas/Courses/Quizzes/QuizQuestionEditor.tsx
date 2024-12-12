import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Quiz, QuizQuestion, QuestionType, NewQuestionRequest } from './types';

interface QuizQuestionsProps {
  quiz: Quiz;
  onQuizChange: (quiz: Quiz) => void;
  onSave: () => void;
  onCancel: () => void;
}

const QuizQuestionsEditor: React.FC<QuizQuestionsProps> = ({ 
  quiz, 
  onQuizChange,
  onSave,
  onCancel 
}) => {
  const [editingQuestion, setEditingQuestion] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<NewQuestionRequest | null>(null);

  // 处理问题分数变化
  const handleQuestionPointsChange = (index: number, points: number) => {
    const updatedQuestions = quiz.questions.map((q, i) => {
      if (i === index) {
        return { ...q, points: Math.max(0, points) };
      }
      return q;
    });
    
    onQuizChange({
      ...quiz,
      questions: updatedQuestions
    });
  };

  // 添加新问题
  const handleAddQuestion = () => {
    const newQuestion: NewQuestionRequest = {
      title: `Question ${quiz.questions.length + 1}`,
      type: 'MULTIPLE_CHOICE',
      points: 10,
      question: "",
      choices: [
        { text: "Option 1", isCorrect: true },
        { text: "Option 2", isCorrect: false },
        { text: "Option 3", isCorrect: false },
        { text: "Option 4", isCorrect: false }
      ]
    };
    
    onQuizChange({
      ...quiz,
      questions: [...quiz.questions, newQuestion as QuizQuestion]
    });
  };

  // 删除问题
  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = quiz.questions.filter((_, i) => i !== index);
    onQuizChange({
      ...quiz,
      questions: updatedQuestions
    });
  };

  // 开始编辑问题
  const handleStartEdit = (index: number) => {
    setEditingQuestion(index);
    setEditFormData({ ...quiz.questions[index] });
  };

  // 保存编辑的问题
  const handleSaveEdit = () => {
    if (editingQuestion === null || !editFormData) return;

    const updatedQuestions = quiz.questions.map((q, i) => {
      if (i === editingQuestion) {
        return {
          ...editFormData,
          _id: q._id // 保留原有的 _id
        } as QuizQuestion;
      }
      return q;
    });

    onQuizChange({
      ...quiz,
      questions: updatedQuestions
    });

    setEditingQuestion(null);
    setEditFormData(null);
  };

  // 更新问题类型
  const handleQuestionTypeChange = (type: QuestionType) => {
    if (!editFormData) return;

    let updatedFormData: NewQuestionRequest = {
      ...editFormData,
      type
    };

    // 根据问题类型设置默认值
    if (type === 'MULTIPLE_CHOICE') {
      updatedFormData.choices = [
        { text: "Option 1", isCorrect: true },
        { text: "Option 2", isCorrect: false },
        { text: "Option 3", isCorrect: false }
      ];
      delete updatedFormData.correctAnswer;
      delete updatedFormData.possibleAnswers;
    } else if (type === 'TRUE_FALSE') {
      updatedFormData.correctAnswer = true;
      delete updatedFormData.choices;
      delete updatedFormData.possibleAnswers;
    } else if (type === 'FILL_IN_BLANK') {
      updatedFormData.possibleAnswers = [""];
      delete updatedFormData.choices;
      delete updatedFormData.correctAnswer;
    }

    setEditFormData(updatedFormData);
  };

  // 移动问题位置
  const handleMoveQuestion = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= quiz.questions.length) return;

    const updatedQuestions = [...quiz.questions];
    const temp = updatedQuestions[index];
    updatedQuestions[index] = updatedQuestions[newIndex];
    updatedQuestions[newIndex] = temp;

    onQuizChange({
      ...quiz,
      questions: updatedQuestions
    });
  };

  // 计算总分
  const totalPoints = quiz.questions.reduce((sum, q) => sum + (q.points || 0), 0);

  return (
    <div className="container">


      {(!quiz.questions || quiz.questions.length === 0) && (
        <div className="text-center text-muted my-4">
          No questions added yet. Click "New Question" to begin.
        </div>
      )}

      <div className="mb-4">
        {quiz.questions.map((question: QuizQuestion, index: number) => (
          <div key={question._id || index} className="card mb-2">
            <div className="card-body">
              {editingQuestion === index ? (
                <div>
                  <div className="mb-3">
                    <label className="form-label">Question Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editFormData?.title || ''}
                      onChange={(e) => setEditFormData(prev => 
                        prev ? {...prev, title: e.target.value} : null
                      )}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Question Type</label>
                    <select
                      className="form-select"
                      value={editFormData?.type || 'MULTIPLE_CHOICE'}
                      onChange={(e) => handleQuestionTypeChange(e.target.value as QuestionType)}
                    >
                      <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                      <option value="TRUE_FALSE">True/False</option>
                      <option value="FILL_IN_BLANK">Fill in the Blank</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Question Text</label>
                    <textarea
                      className="form-control"
                      value={editFormData?.question || ''}
                      onChange={(e) => setEditFormData(prev => 
                        prev ? {...prev, question: e.target.value} : null
                      )}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Points</label>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      value={editFormData?.points || 0}
                      onChange={(e) => setEditFormData(prev => 
                        prev ? {...prev, points: Number(e.target.value)} : null
                      )}
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button 
                      className="btn btn-secondary me-2" 
                      onClick={() => {
                        setEditingQuestion(null);
                        setEditFormData(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn btn-primary" 
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title">
                      {index + 1}. {question.title}
                    </h5>
                    <div className="input-group mb-2" style={{ width: '150px' }}>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={question.points}
                        min="0"
                        onChange={(e) => handleQuestionPointsChange(index, Number(e.target.value))}
                      />
                      <span className="input-group-text">pts</span>
                    </div>
                    <small className="text-muted d-block">Type: {question.type}</small>
                    <small className="text-muted d-block">Question: {question.question}</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <button 
                      className="btn btn-outline-secondary btn-sm me-2"
                      onClick={() => handleMoveQuestion(index, 'up')}
                      disabled={index === 0}
                    >
                      <FaArrowUp />
                    </button>
                    <button 
                      className="btn btn-outline-secondary btn-sm me-2"
                      onClick={() => handleMoveQuestion(index, 'down')}
                      disabled={index === quiz.questions.length - 1}
                    >
                      <FaArrowDown />
                    </button>
                    <button 
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => handleStartEdit(index)}
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
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mb-4">
        <button 
          className="btn btn-secondary"
          onClick={handleAddQuestion}
        >
          <FaPlus className="me-2" />
          New Question
        </button>
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

export default QuizQuestionsEditor;