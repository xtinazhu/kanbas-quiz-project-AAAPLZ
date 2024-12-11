import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdAdd } from 'react-icons/io';
import { MdEdit, MdDelete } from 'react-icons/md';

import * as questionClient from './client';
import * as quizClient from '../client';
import { 
  addQuestion, 
  setQuestions, 
  updateQuestion 
} from './questionsReducer';

// Enum for Question Types
enum QuestionType {
  MultipleChoice = 'MC',
  TrueFalse = 'TF',
  FillInBlanks = 'BLANKS'
}

// Strongly typed Question Interface
interface Question {
  _id?: string;
  title: string;
  questionType: QuestionType;
  points: number;
  question: string;
  options: string[];
  answers: string[];
  quiz?: string;
}

// Simplified State Interface
interface QuestionsState {
  questions: Question[];
  question: Question | null;
}

// Component for rendering different question type editors
const QuestionEditor: React.FC<{
  questionType: QuestionType;
  question: Question;
  onQuestionUpdate: (updatedQuestion: Question) => void;
}> = ({ questionType, question, onQuestionUpdate }) => {
  const renderEditor = () => {
    switch (questionType) {
      case QuestionType.MultipleChoice:
        return (
          <MultipleChoiceEditor 
            question={question} 
            onUpdate={onQuestionUpdate} 
          />
        );
      case QuestionType.TrueFalse:
        return (
          <TrueOrFalseEditor 
            question={question} 
            onUpdate={onQuestionUpdate} 
          />
        );
      case QuestionType.FillInBlanks:
        return (
          <FillInBlanksEditor 
            question={question} 
            onUpdate={onQuestionUpdate} 
          />
        );
      default:
        return null;
    }
  };

  return <div className="question-editor">{renderEditor()}</div>;
};

// Individual Question Type Editors
const MultipleChoiceEditor: React.FC<{
  question: Question;
  onUpdate: (question: Question) => void;
}> = ({ question, onUpdate }) => {
  const handleOptionAdd = () => {
    onUpdate({
      ...question,
      options: [...question.options, '']
    });
  };

  const handleOptionDelete = (index: number) => {
    const newOptions = question.options.filter((_, i) => i !== index);
    onUpdate({
      ...question,
      options: newOptions,
      answers: question.answers.filter(ans => newOptions.includes(ans))
    });
  };

  return (
    <div className="multiple-choice-editor">
      {question.options.map((option, index) => (
        <div key={index} className="option-input-group">
          <input 
            value={option}
            onChange={(e) => {
              const newOptions = [...question.options];
              newOptions[index] = e.target.value;
              onUpdate({ ...question, options: newOptions });
            }}
            placeholder={`Option ${index + 1}`}
          />
          <button onClick={() => handleOptionDelete(index)}>
            <MdDelete />
          </button>
        </div>
      ))}
      <button onClick={handleOptionAdd}>
        <IoMdAdd /> Add Option
      </button>
    </div>
  );
};

const TrueOrFalseEditor: React.FC<{
  question: Question;
  onUpdate: (question: Question) => void;
}> = ({ question, onUpdate }) => {
  return (
    <div className="true-false-editor">
      <select 
        value={question.answers[0] || ''} 
        onChange={(e) => onUpdate({
          ...question, 
          answers: [e.target.value],
          options: ['True', 'False']
        })}
      >
        <option value="">Select Answer</option>
        <option value="True">True</option>
        <option value="False">False</option>
      </select>
    </div>
  );
};

const FillInBlanksEditor: React.FC<{
  question: Question;
  onUpdate: (question: Question) => void;
}> = ({ question, onUpdate }) => {
  const handleBlankAdd = () => {
    onUpdate({
      ...question,
      answers: [...question.answers, '']
    });
  };

  return (
    <div className="fill-in-blanks-editor">
      {question.answers.map((blank, index) => (
        <div key={index} className="blank-input-group">
          <input 
            value={blank}
            onChange={(e) => {
              const newBlanks = [...question.answers];
              newBlanks[index] = e.target.value;
              onUpdate({ ...question, answers: newBlanks });
            }}
            placeholder={`Blank ${index + 1}`}
          />
          <button onClick={() => {
            const newBlanks = question.answers.filter((_, i) => i !== index);
            onUpdate({ ...question, answers: newBlanks });
          }}>
            <MdDelete />
          </button>
        </div>
      ))}
      <button onClick={handleBlankAdd}>
        <IoMdAdd /> Add Blank
      </button>
    </div>
  );
};

// Main Quiz Questions Component
export default function QuizQuestions() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [currentQuestionType, setCurrentQuestionType] = useState<QuestionType>(QuestionType.MultipleChoice);
  
  // Use type assertion instead of KanbasState
  const questionList = useSelector(
    (state: { questionReducer: QuestionsState }) => 
      state.questionReducer.questions
  );

  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    title: '',
    questionType: QuestionType.MultipleChoice,
    points: 1,
    question: '',
    options: [],
    answers: []
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      if (quizId) {
        try {
          const questions = await questionClient.findAllQuestionsForQuiz(quizId);
          dispatch(setQuestions(questions));
        } catch (error) {
          console.error('Failed to fetch questions', error);
        }
      }
    };
    fetchQuestions();
  }, [quizId, dispatch]);

  const handleQuestionSave = async () => {
    try {
      if (currentQuestion._id) {
        await questionClient.updateQuestion(quizId!, currentQuestion._id, currentQuestion);
        dispatch(updateQuestion(currentQuestion));
      } else {
        const newQuestion = await questionClient.createQuestion(quizId!, currentQuestion);
        dispatch(addQuestion(newQuestion));
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving question', error);
    }
  };

  return (
    <div className="quiz-questions-container">
      {/* Question List Table */}
      <table className="questions-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questionList.map((q) => (
            <tr key={q._id}>
              <td>{q.title}</td>
              <td>{q.questionType}</td>
              <td>{q.points}</td>
              <td>
                <button onClick={() => {
                  setCurrentQuestion(q);
                  setCurrentQuestionType(q.questionType);
                  setIsEditing(true);
                }}>
                  <MdEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Action Buttons */}
      <div className="actions-container">
        <button 
          onClick={() => {
            setCurrentQuestion({
              title: '',
              questionType: currentQuestionType,
              points: 1,
              question: '',
              options: [],
              answers: []
            });
            setIsEditing(true);
          }}
        >
          <IoMdAdd /> New Question
        </button>
      </div>

      {/* Question Editor Modal/Inline */}
      {isEditing && (
        <div className="question-editor-modal">
          <select 
            value={currentQuestionType}
            onChange={(e) => setCurrentQuestionType(e.target.value as QuestionType)}
          >
            <option value={QuestionType.MultipleChoice}>Multiple Choice</option>
            <option value={QuestionType.TrueFalse}>True/False</option>
            <option value={QuestionType.FillInBlanks}>Fill in Blanks</option>
          </select>

          <QuestionEditor 
            questionType={currentQuestionType}
            question={currentQuestion}
            onQuestionUpdate={setCurrentQuestion}
          />

          <div className="editor-actions">
            <button onClick={handleQuestionSave}>Save Question</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}