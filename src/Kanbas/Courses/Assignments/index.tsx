import AssignmentControls from "./AssignmentControls";
import SingleAssignmentBottons from "./SingleAssignmentBottons";
import AssignmentControlButtons from "./AssignmentControlBottons";
import { BsGripVertical } from 'react-icons/bs';
import { FaRegPenToSquare } from "react-icons/fa6";
export default function Assignments() {
  return (
    <div className="wd-margin-left wd-padded-bottom-right wd-border-fat">
      <AssignmentControls /><br /><br /><br />
      <div id="wd-assignments">

        <ul id="wd-modules" className="list-group rounded-0">
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> 
              <BsGripVertical className="me-2 fs-3" />
              <b>ASSIGNMENTS</b>
              <AssignmentControlButtons />
            </div>

            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center justify-content-between">
                <div>
                  <BsGripVertical className="me-2 fs-4" />
                  <FaRegPenToSquare className="me-2 fs-4" />
                </div>
                <div className="d-flex flex-column flex-grow-1 ms-3">
                  <b>A1</b>
                  <div>
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

              <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center justify-content-between">
                <div>
                  <BsGripVertical className="me-2 fs-4" />
                  <FaRegPenToSquare className="me-2 fs-4" />
                </div>
                <div className="d-flex flex-column flex-grow-1 ms-3">
                  <b>A2</b>
                  <div>
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-2">|</span>
                    <b>Not available until</b> May 13 at 12:00 am
                    <span className="mx-2">|</span>
                    <b>Due</b> May 20 at 11:59 pm <span className="mx-2">|</span> 100 pts
                  </div>
                </div>
                <div>
                  <SingleAssignmentBottons />
                </div>
              </li>

              <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center justify-content-between">
                <div>
                  <BsGripVertical className="me-2 fs-4" />
                  <FaRegPenToSquare className="me-2 fs-4" />
                </div>
                <div className="d-flex flex-column flex-grow-1 ms-3">
                  <b>A3</b>
                  <div>
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-2">|</span>
                    <b>Not available until</b> May 20 at 12:00 am
                    <span className="mx-2">|</span>
                    <b>Due</b> May 27 at 11:59 pm <span className="mx-2">|</span> 100 pts
                  </div>
                </div>
                <div>
                  <SingleAssignmentBottons />
                </div>
              </li>
              
            </ul>
          </li>
        </ul>
      </div>
    </div>
);}
