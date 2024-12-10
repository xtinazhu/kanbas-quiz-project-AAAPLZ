import { FaPlus, FaEllipsisVertical } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import React, { useState } from "react";
import { useParams } from "react-router";

export default function QuizControls(
  { quizName, setQuizName, addQuiz }:
  { quizName: string; setQuizName: (title: string) => void; addQuiz: () => void; }
) {
  const { cid } = useParams();
  const [showContextMenu, setShowContextMenu] = useState(false);

  const toggleContextMenu = () => {
    setShowContextMenu(!showContextMenu);
  };

  return (
    <div>
      <div id="wd-quiz-controls" className="text-nowrap">

        {/* Context menu button */}
        <div className="float-end position-relative">
          <button className="btn btn-lg btn-secondary me-1" onClick={toggleContextMenu}>
          <FaEllipsisVertical />
          </button>
          {showContextMenu && (
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href={`#/Kanbas/Courses/${cid}/Quizzes/EditQuiz`}>Edit</a></li>
              <li><button className="dropdown-item">Delete</button></li>
              <li><button className="dropdown-item">Publish</button></li>
              <li><button className="dropdown-item">Copy</button></li>
              <li><button className="dropdown-item">Sort</button></li>
            </ul>
            )}
            </div>

        {/* +Quiz button */}
        <a id="wd-quiz-controls" className="btn btn-lg btn-danger me-1 float-end" 
          href={`#/Kanbas/Courses/${cid}/Quizzes/NewQuiz`}>
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Quiz
        </a>

      </div>

      {/* search bar */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <CiSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
        <input id="wd-text-fields-search" placeholder="Search for Quiz" style={{ paddingLeft: '30px', height: '45px', width: '100%' }} />
      </div>

    </div>
);}
