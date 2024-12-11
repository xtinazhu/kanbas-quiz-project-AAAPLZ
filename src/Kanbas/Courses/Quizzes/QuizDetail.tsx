import React, { useEffect } from "react";
import { FaCheckCircle, FaPencilAlt, FaEllipsisV, FaBan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as client from "./client";
import { selectQuiz, updateQuiz } from "./reducer";

interface StoreState {
  quizzesReducer: {
    quizzes: Quiz[];
    quiz: Quiz;
    currentAttempt?: QuizAttempt;
  };
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
  questions: any[];
  attempts?: QuizAttempt[];
}

interface QuizAttempt {
  userId: string;
  quizId: string;
  answers: Record<string, any>;
  score: number;
  startedAt: string;
  submittedAt?: string;
}

export default function QuizDetail() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const quiz = useSelector((state: StoreState) => state.quizzesReducer.quiz);

    const togglePublishStatus = async (quizId: string) => {
        if (!quizId || !quiz) return;
        
        try {
            const updatedQuizData = {
                ...quiz,
                published: !quiz.published
            };
            
            const updatedQuiz = await client.updateQuiz(updatedQuizData);
            dispatch(updateQuiz(updatedQuiz));
        } catch (error) {
            console.error('Error updating quiz:', error);
        }
    };

    const handleEdit = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/EditDetail`);
    };

    const handlePreview = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`);
    };

    useEffect(() => {
        const fetchQuiz = async () => {
          try {
            if (qid && qid !== "undefined") {  // 添加检查
              const fetchedQuiz = await client.findQuizById(qid);
              dispatch(selectQuiz(fetchedQuiz));
            }
          } catch (error) {
            console.error('Error fetching quiz:', error);
          }
        };
      
        fetchQuiz();
      }, [qid, dispatch]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!quiz) return <div>Loading...</div>;

    return (
        <div className="flex-fill ms-5 me-5">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Quiz: {quiz.title}</h2>
                <div className="d-flex">
                    <button
                        className="btn btn-light me-2"
                        onClick={() => quiz._id && togglePublishStatus(quiz._id)}
                    >
                        {quiz.published ? (
                            <span className="text-success">
                                <FaCheckCircle /> Published
                            </span>
                        ) : (
                            <span className="text-secondary">
                                <FaBan /> Not Published
                            </span>
                        )}
                    </button>

                    <button
                        className="btn btn-light me-2"
                        onClick={handlePreview}
                    >
                        Preview
                    </button>

                    <button 
                        className="btn btn-light me-2"
                        onClick={handleEdit}
                    >
                        <FaPencilAlt /> Edit
                    </button>

                    <button className="btn btn-light">
                        <FaEllipsisV />
                    </button>
                </div>
            </div>
            <hr />

            <div className="card">
                <div className="card-body">
                    <div className="mb-4">
                        <h5>Description</h5>
                        <p>{quiz.description}</p>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="mb-2">
                                <strong>Quiz Type:</strong> {quiz.quizType.replace(/_/g, ' ')}
                            </div>
                            <div className="mb-2">
                                <strong>Points:</strong> {quiz.points}
                            </div>
                            <div className="mb-2">
                                <strong>Assignment Group:</strong> {quiz.assignmentGroup}
                            </div>
                            <div className="mb-2">
                                <strong>Time Limit:</strong> {quiz.timeLimit} Minutes
                            </div>
                            <div className="mb-2">
                                <strong>Access Code:</strong> {quiz.accessCode || 'None'}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-2">
                                <strong>Multiple Attempts:</strong> {quiz.multipleAttempts ? `Yes (Max: ${quiz.maxAttempts})` : 'No'}
                            </div>
                            <div className="mb-2">
                                <strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers ? 'Yes' : 'No'}
                            </div>
                            <div className="mb-2">
                                <strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? 'Yes' : 'No'}
                            </div>
                            <div className="mb-2">
                                <strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime ? 'Yes' : 'No'}
                            </div>
                            <div className="mb-2">
                                <strong>Webcam Required:</strong> {quiz.webcamRequired ? 'Yes' : 'No'}
                            </div>
                            <div className="mb-2">
                                <strong>Lock Questions:</strong> {quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h5>Time Settings</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Due Date</th>
                                    <th>For</th>
                                    <th>Available From</th>
                                    <th>Until</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{formatDate(quiz.dueDate)}</td>
                                    <td>Everyone</td>
                                    <td>{formatDate(quiz.availableFrom)}</td>
                                    <td>{formatDate(quiz.availableUntil)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {quiz.questions.length > 0 && (
                        <div className="mt-4">
                            <h5>Questions</h5>
                            <p>Total Questions: {quiz.questions.length}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}