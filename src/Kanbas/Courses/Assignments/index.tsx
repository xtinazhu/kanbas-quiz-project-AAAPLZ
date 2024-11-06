import AssignmentControls from "./AssignmentControls";
import SingleAssignmentButtons from "./SingleAssignmentButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BsGripVertical } from 'react-icons/bs';
import { FaRegPenToSquare } from "react-icons/fa6";

import React, { useState } from "react";
import { useParams } from "react-router";
import * as db from "../../Database";

import ProtectedContent from "../../Account/ProtectedContent";

import { addAssignment, updateAssignment, deleteAssignment , editAssignment }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Assignments() {
  const { cid } = useParams();
  const [assignmentName, setAssignmentName] = useState("");
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();

  return (
    <div className="wd-margin-left wd-padded-bottom-right wd-border-fat">
      <ProtectedContent><AssignmentControls 
        setAssignmentName={setAssignmentName} 
        assignmentName={assignmentName}
        addAssignment={() => {
          dispatch(addAssignment({ title: assignmentName, course: cid }));
          setAssignmentName("");
        }} />
      </ProtectedContent><br /><br /><br /> {/*用于添加新模块的控件，包括输入框和添加按钮*/}
      <div id="wd-assignments">

        <ul id="wd-assignment" className="list-group rounded-0">

          <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> 
              <BsGripVertical className="me-2 fs-3" />
              <b>ASSIGNMENTS</b>
              <ProtectedContent><AssignmentControlButtons /></ProtectedContent>
            </div>

            <ul className="wd-lessons list-group rounded-0">
              {assignments
                      .filter((assignment: any) => assignment.course === cid)
                      .map((assignment: any) => (
                        <li key={assignment._id} className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center justify-content-between">
                          <div>
                            <BsGripVertical className="me-2 fs-4" />
                            <FaRegPenToSquare className="me-2 fs-4" />
                          </div>
                          <div id="wd-assignment-list" className="d-flex flex-column flex-grow-1 ms-3">
                            <a className="wd-assignment-link"
                              href={`#/Kanbas/Courses/${cid}/Assignments/${assignments._id}`}>
                              <b>{!assignment.editing && assignment.title}
                                { assignment.editing && (
                              <input className="form-control w-50 d-inline-block"
                                onChange={(e) =>
                                  dispatch(
                                    updateAssignment({ ...assignment, title: e.target.value })
                                  )
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    dispatch(updateAssignment({ ...assignment, editing: false }));
                                  }
                                }}
                                defaultValue={assignment.title} />
                            )}</b>
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
                  <ProtectedContent><SingleAssignmentButtons 
                  assignmentId={assignment._id}
                  deleteAssignment={(assignmentId) => {
                    dispatch(deleteAssignment(assignmentId));
                  }} /></ProtectedContent>
                </div>
              </li>
                      ))}      
            </ul>
                    
          </li>
                    
        </ul>
      </div>
    </div>
);}