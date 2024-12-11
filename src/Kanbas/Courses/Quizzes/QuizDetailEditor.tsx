import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { selectQuiz } from "./reducer";
import * as courseClient from "../client";
import * as client from "./client";

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

const QuizDetailsEditor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<Quiz>(() => {
    // 设置默认值
    return {
      title: "New Quiz",
      description: "Please complete this quiz by the due date.",
      course: cid || "",
      points: 100,
      quizType: "GRADED_QUIZ",
      assignmentGroup: "QUIZZES",
      published: false,
      timeLimit: 20,
      multipleAttempts: false,
      maxAttempts: 1,
      showCorrectAnswers: false,
      accessCode: "NO_CODE",  // 提供默认值
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      dueDate: new Date().toISOString(),
      availableFrom: new Date().toISOString(),
      availableUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      shuffleAnswers: true,
      questions: []
    };
  });

  useEffect(() => {
    // 仅当有 qid 且不是 NewQuiz 时加载数据
    if (qid && qid !== "NewQuiz") {
      const loadQuiz = async () => {
        try {
          const existingQuiz = await client.findQuizById(qid);
          if (existingQuiz) {
            setQuiz(existingQuiz);
          }
        } catch (error) {
          console.error("Failed to load quiz:", error);
          // 避免弹出过多的错误提示
          // alert("Failed to load quiz details.");
        }
      };
      loadQuiz();
    }
  }, [qid]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setQuiz({
      ...quiz,
      [name]: fieldValue,
    });
  };

  const handleDateChange = (name: string, value: string) => {
    setQuiz({
      ...quiz,
      [name]: new Date(value).toISOString(),
    });
  };

  const handleSave = async () => {
    if (!cid) {
      alert("Course ID is required");
      return;
    }

    try {
      if (qid === "NewQuiz") {
        // 创建新的 Quiz
        const newQuiz = await courseClient.createQuizForCourse(cid, quiz);
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
      } else {
        // 更新现有的 Quiz
        await client.updateQuiz(quiz);
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
      }
    } catch (error) {
      console.error("Failed to save quiz:", error);
      alert("Failed to save quiz. Please check all required fields.");
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  return (
    <div className="container">
      <div className="mb-4">
        <h2>Quiz Details</h2>
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
              value={new Date(quiz.dueDate).toISOString().slice(0, 16)}
              onChange={(e) => handleDateChange("dueDate", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="availableFrom" className="form-label">Available From</label>
            <input
              type="datetime-local"
              id="availableFrom"
              className="form-control"
              value={new Date(quiz.availableFrom).toISOString().slice(0, 16)}
              onChange={(e) => handleDateChange("availableFrom", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="availableUntil" className="form-label">Available Until</label>
            <input
              type="datetime-local"
              id="availableUntil"
              className="form-control"
              value={new Date(quiz.availableUntil).toISOString().slice(0, 16)}
              onChange={(e) => handleDateChange("availableUntil", e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <button className="btn btn-secondary me-2" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDetailsEditor;