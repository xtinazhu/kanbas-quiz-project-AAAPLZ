import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { RxRocket } from "react-icons/rx";
import { RxTriangleDown } from "react-icons/rx";
import ProtectedContent from "../../Account/ProtectedContent";
import { setQuiz, addQuiz } from "./reducer";
import QuizControls from "./QuizControls";
import * as courseClient from "../client";

// 使用与reducer一致的Quiz接口
interface Quiz {
  _id: string;
  title: string;
  description: string;
  course: string;
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
  attempts?: any[];
}

export default function Quizzes() {
  const { cid, qid } = useParams();
  const [quizName, setQuizName] = useState("");
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();

  const createQuizForCourse = async () => {
    if (!cid || !quizName.trim()) {
      alert("Quiz title is required");
      return;
    }
    
    try {
      const quizData = {
        title: quizName.trim(),
        description: "Please complete this quiz by the due date.",
        course: cid,
        points: 100,
        quizType: "GRADED_QUIZ",
        assignmentGroup: "QUIZZES",
        published: false,
        timeLimit: 20,
        multipleAttempts: false,
        maxAttempts: 1,
        showCorrectAnswers: false,
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: new Date().toISOString(),
        availableFrom: new Date().toISOString(),
        availableUntil: new Date().toISOString(),
        shuffleAnswers: true,
        questions: []
      };
      
      const newQuiz = await courseClient.createQuizForCourse(cid, quizData);
      dispatch(addQuiz(newQuiz));
      setQuizName("");
    } catch (error) {
      console.error("Failed to create quiz:", error);
      alert("Failed to create quiz. Please check all required fields.");
    }
  };

  const fetchQuizzes = async () => {
    try {
      if (!cid) return;
      const fetchedQuizzes = await courseClient.findQuizzesForCourse(cid);
      dispatch(setQuiz(fetchedQuizzes));
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getQuizStatus = (quiz: Quiz) => {
    const now = new Date();
    const availableFrom = new Date(quiz.availableFrom);
    const availableUntil = new Date(quiz.availableUntil);

    if (now < availableFrom) {
      return `Not available until ${formatDate(quiz.availableFrom)}`;
    } else if (now > availableUntil) {
      return "Closed";
    } else {
      return "Available";
    }
  };

  return (
    <div className="wd-margin-left wd-padded-bottom-right wd-border-fat">
      <ProtectedContent>
        <QuizControls 
          setQuizName={setQuizName}
          quizName={quizName}
          addQuiz={createQuizForCourse}
        />
      </ProtectedContent>
      <br /><br /><br />

      <div id="wd-quizzes">
        <ul id="wd-quiz" className="list-group rounded-0">
          <li className="wd-quiz list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <RxTriangleDown className="me-2 fs-3" />
              <b>Assignment Quizzes</b>
            </div>

            <ul className="wd-lessons list-group rounded-0">
              {quizzes.map((quiz: Quiz) => (
                <li key={quiz._id}
                    className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center justify-content-between">
                  <div>
                    <RxRocket className="me-2 fs-4" />
                    {quiz.published ? 
                      <span className="text-success">✓</span> : 
                      <span className="text-danger">✗</span>}
                  </div>
                  <div id="wd-quiz-list" className="d-flex flex-column flex-grow-1 ms-3">
                    <a className="wd-quiz-link"
                       href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/detail`}>
                      <b>{quiz.title}</b>
                    </a>
                    <div style={{ fontSize: '1rem' }}>
                      <span className={`${getQuizStatus(quiz) === 'Available' ? 'text-success' : 'text-danger'}`}>
                        {getQuizStatus(quiz)}
                      </span>
                      <span className="mx-2">|</span>
                      <b>Due</b> {formatDate(quiz.dueDate)}
                      <span className="mx-2">|</span>
                      {quiz.points} pts
                      <span className="mx-2">|</span>
                      {quiz.timeLimit} minutes
                      <span className="mx-2">|</span>
                      {quiz.questions.length} Questions
                    </div>
                  </div>
                  
                  <div>
                    <ProtectedContent>
                      <QuizControls 
                        quiz={quiz}
                        setQuizName={setQuizName}
                        quizName={quizName}
                        addQuiz={createQuizForCourse}
                      />
                    </ProtectedContent>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}