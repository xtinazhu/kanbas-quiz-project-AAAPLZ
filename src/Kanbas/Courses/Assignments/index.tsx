import AssignmentControls from "./AssignmentControls";
import SingleAssignmentBottons from "./SingleAssignmentBottons";
import AssignmentControlButtons from "./AssignmentControlBottons";
import { BsGripVertical } from 'react-icons/bs';
import { FaRegPenToSquare } from "react-icons/fa6";

import { useParams } from "react-router";
import * as db from "../../Database";
export default function Assignments() {
  const { cid } = useParams();
  const assignment = db.assignments;
  return (
    <div className="wd-margin-left wd-padded-bottom-right wd-border-fat">
      <AssignmentControls /><br /><br /><br />
      <div id="wd-assignments">

        <ul id="wd-assignment" className="list-group rounded-0">

          <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> 
              <BsGripVertical className="me-2 fs-3" />
              <b>ASSIGNMENTS</b>
              <AssignmentControlButtons />
            </div>

            <ul className="wd-lessons list-group rounded-0">
              {assignment
                  .filter((assignments: any) => assignments.course === cid)
                  .map((assignments: any) => (
              <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center justify-content-between">
                <div>
                  <BsGripVertical className="me-2 fs-4" />
                  <FaRegPenToSquare className="me-2 fs-4" />
                </div>
                <div id="wd-assignment-list" className="d-flex flex-column flex-grow-1 ms-3">
                  <a className="wd-assignment-link"
                    href={`#/Kanbas/Courses/${cid}/Assignments/${assignments._id}`}>
                    <b>{assignments._id}</b>
                  </a>
                  <div style={{ fontSize: '1rem' }}>
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-2">|</span>
                    <b>Not available until</b> May 6 at 12:00 am
                    <span className="mx-2">|</span>
                  <b>Due</b> May 13 at 11:59 pm <span className="mx-2">|</span> 100 pts
                  </div>
                </div>
                <div>
                  <SingleAssignmentBottons />
                </div>
              </li>
              ))}

            </ul>
          </li>
        </ul>
      </div>
    </div>
);}
