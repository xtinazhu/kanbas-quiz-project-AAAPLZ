import { FaPlus, FaEllipsisVertical } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { deleteQuiz, togglePublishQuiz } from "./reducer";
import * as quizClient from "./client";
import * as courseClient from "../client";

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

interface QuizControlsProps {
  quiz?: Quiz;
  setQuizName: (title: string) => void;
  quizName: string;
  addQuiz: () => void;
}

function isValidQuiz(quiz: any): quiz is Quiz {
  return (
    quiz &&
    typeof quiz.title === 'string' &&
    typeof quiz.description === 'string' &&
    typeof quiz.course === 'string' &&
    typeof quiz.points === 'number' &&
    Array.isArray(quiz.questions)
  );
}

export default function QuizControls({
  quiz,
  setQuizName,
  quizName,
  addQuiz
}: QuizControlsProps) {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showContextMenu, setShowContextMenu] = useState(false);

  const toggleContextMenu = () => {
    setShowContextMenu(!showContextMenu);
  };

  const handleAddQuiz = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!cid) {
      alert("Course ID is required");
      return;
    }
  
    try {
      const defaultQuizData = {
        title: "New Quiz",
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
        availableUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        shuffleAnswers: true,
        questions: []
      };
  
      const newQuiz = await courseClient.createQuizForCourse(cid, defaultQuizData);
      
      if (!newQuiz?._id) {
        throw new Error("Failed to create quiz: No quiz ID returned");
      }
  
      // Use navigate after successful quiz creation
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}/EditDetail`);
    } catch (error) {
      console.error("Failed to create quiz:", error);
      alert("Failed to create quiz. Please check your connection and try again.");
    }
  };

  const handleDelete = async () => {
    if (!quiz) return;
    try {
      await quizClient.deleteQuiz(quiz._id);
      dispatch(deleteQuiz(quiz._id));
      setShowContextMenu(false);
    } catch (error) {
      console.error("Failed to delete quiz:", error);
      alert("Failed to delete quiz. Please try again.");
    }
  };

  const handleTogglePublish = async () => {
    if (!quiz) return;
    try {
      const updatedQuiz: Quiz = {
        ...quiz,
        published: !quiz.published,
        questions: quiz.questions || [],
        attempts: quiz.attempts || []
      };
      await quizClient.updateQuiz(updatedQuiz);
      dispatch(togglePublishQuiz(quiz._id));
      setShowContextMenu(false);
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
      alert("Failed to update quiz status. Please try again.");
    }
  };

  return (
    <div>
      <div id="wd-quiz-controls" className="text-nowrap">
        {/* Context menu button */}
        {/*{quiz && (
          <div className="float-end position-relative">
            <button 
              className="btn btn-lg btn-secondary me-1" 
              onClick={toggleContextMenu}
            >
              <FaEllipsisVertical />
            </button>
            {showContextMenu && (
              <ul className="btn btn-lg btn-secondary me-1 dropdown-menu dropdown-menu-end">
                <li>
                  <a 
                    className="dropdown-item" 
                    href={`#/Kanbas/Courses/${cid}/Quizzes/EditQuiz/${quiz._id}`}
                    onClick={() => setShowContextMenu(false)}
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <button 
                    className="dropdown-item"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </li>
                <li>
                  <button 
                    className="dropdown-item"
                    onClick={handleTogglePublish}
                  >
                    {quiz.published ? "Unpublish" : "Publish"}
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}*/}

        {/* +Quiz button and search bar */}
        {!quiz && (
          <>
            <a 
              className="btn btn-lg btn-danger me-1 float-end"
              href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/EditDetail`}
            >
              <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
              Quiz
            </a>

            <div style={{ position: 'relative', display: 'inline-block' }}>
              <CiSearch 
                style={{ 
                  position: 'absolute', 
                  left: '10px', 
                  top: '50%', 
                  transform: 'translateY(-50%)' 
                }} 
              />
              <input 
                id="wd-text-fields-search" 
                placeholder="Search for Quiz" 
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                style={{ 
                  paddingLeft: '30px', 
                  height: '45px', 
                  width: '100%' 
                }} 
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}