import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { RxRocket } from "react-icons/rx";
import { RxTriangleDown } from "react-icons/rx";
import ProtectedContent from "../../Account/ProtectedContent";
import { setQuiz, addQuiz, updateQuiz, deleteQuiz } from "./reducer";
import QuizControls from "./QuizControls";
import * as courseClient from "../client";
import * as quizClient from "./client";

interface Quiz {
  _id: string;
    title: string;
    type: string;
    description: string;
    cid: string;
    points: number;
    noOfQuestions: number;
    dueTime: string;
    availableFrom: string;
    availableUntil: string;
    published: boolean;
    timeLimit: number;
    shuffleAnswers: boolean;
    multipleAttempts: boolean;
    noOfAttempts: number;
    showCorrectAnswers: string;
    accessCode: string;
    oneQuestionataTime: boolean;
    webCam: boolean;
    lockQuestions: boolean;
    group: string;
    viewResponses: string;
    viewResult: boolean;
}

export default function Quizzes() {
  const { cid } = useParams();
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
        course: cid,
        points: 100,
        timeLimit: 60,
        dueDate: new Date().toISOString(),
        availableFromDate: new Date().toISOString(),
        availableUntilDate: new Date().toISOString(),
        description: "",
        shuffleAnswers: false,
        allowMultipleAttempts: false,
        maxAttempts: 1
      };
      
      const newQuiz = await quizClient.createQuiz(cid, quizData);
      dispatch(addQuiz(newQuiz));
      setQuizName("");
    } catch (error) {
      console.error("Failed to create quiz:", error);
      alert("Failed to create quiz. Please check all required fields.");
    }
  };

  const updateExistingQuiz = async (quizId: string, updates: Partial<Quiz>) => {
    try {
      const updatedQuiz = await quizClient.updateQuiz({ _id: quizId, ...updates });
      dispatch(updateQuiz(updatedQuiz));
    } catch (error) {
      console.error("Failed to update quiz:", error);
    }
  };

  const deleteExistingQuiz = async (quizId: string) => {
    try {
      await quizClient.deleteQuiz(quizId);
      dispatch(deleteQuiz(quizId));
    } catch (error) {
      console.error("Failed to delete quiz:", error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      if (!cid) return;
      const fetchedQuizzes = await quizClient.findQuizzesForCourse(cid);
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
                  </div>
                  <div id="wd-quiz-list" className="d-flex flex-column flex-grow-1 ms-3">
                    <a className="wd-quiz-link"
                       href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>
                      <b>{quiz.title}</b>
                    </a>
                    <div style={{ fontSize: '1rem' }}>
                      <span className="text-danger">Multiple Modules</span>
                      <span className="mx-2">|</span>
                      <b>Available from</b> {formatDate(quiz.availableFrom)}
                      <span className="mx-2">|</span>
                      <b>Due</b> {formatDate(quiz.dueTime)}
                      <span className="mx-2">|</span>
                      {quiz.points} pts
                      <span className="mx-2">|</span>
                      {quiz.timeLimit} minutes
                    </div>
                  </div>
                  
                  <div>
                    <ProtectedContent>
                      <div className="d-flex">
                        <button 
                          className="btn btn-danger me-2"
                          onClick={() => deleteExistingQuiz(quiz._id)}
                        >
                          Delete
                        </button>
                        <button className="btn btn-light">
                          <i className="fa fa-ellipsis-v"></i>
                        </button>
                      </div>
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