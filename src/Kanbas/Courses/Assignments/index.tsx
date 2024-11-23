import AssignmentControls from "./AssignmentControls";
import SingleAssignmentButtons from "./SingleAssignmentButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BsGripVertical } from 'react-icons/bs';
import { FaRegPenToSquare } from "react-icons/fa6";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ProtectedContent from "../../Account/ProtectedContent";

import { setAssignment, addAssignment, updateAssignment, deleteAssignment, editAssignment }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";

import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const [assignmentName, setAssignmentName] = useState("");
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();

  const saveAssignment = async (assignment: any) => {
    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  const createAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = {
      title: assignmentName,
      course: cid,
      points: 100,
      dueDate: new Date().toISOString(),
      availableFromDate: new Date().toISOString(),
    };
    const assignment = await coursesClient.createAssignmentForCourse(cid, newAssignment);
    dispatch(addAssignment(assignment));
    setAssignmentName("");
  };

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignment(assignments));
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  return (
    <div className="wd-margin-left wd-padded-bottom-right wd-border-fat">
      <ProtectedContent>
        <AssignmentControls 
          setAssignmentName={setAssignmentName} 
          assignmentName={assignmentName}
          addAssignment={createAssignmentForCourse} 
        />
      </ProtectedContent>
      <br /><br /><br />

      <div id="wd-assignments">
        <ul id="wd-assignment" className="list-group rounded-0">
          <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> 
              <BsGripVertical className="me-2 fs-3" />
              <b>ASSIGNMENTS</b>
              <ProtectedContent><AssignmentControlButtons /></ProtectedContent>
            </div>

            <ul className="wd-lessons list-group rounded-0">
              {assignments.map((assignment: any) => (
                <li key={assignment._id} 
                    className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center justify-content-between">
                  <div>
                    <BsGripVertical className="me-2 fs-4" />
                    <FaRegPenToSquare className="me-2 fs-4" />
                  </div>
                  <div id="wd-assignment-list" className="d-flex flex-column flex-grow-1 ms-3">
                    <a className="wd-assignment-link"
                       href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                      <b>
                        {!assignment.editing && assignment.title}
                        {assignment.editing && (
                          <input 
                            className="form-control w-50 d-inline-block"
                            onChange={(e) => dispatch(
                              updateAssignment({ ...assignment, title: e.target.value })
                            )}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                saveAssignment({ ...assignment, editing: false });
                              }
                            }}
                            defaultValue={assignment.title} 
                          />
                        )}
                      </b>
                    </a>
                    <div style={{ fontSize: '1rem' }}>
                      <span className="text-danger">Multiple Modules</span>
                      <span className="mx-2">|</span>
                      <b>Not available until</b> {new Date(assignment.availableFromDate || new Date()).toLocaleDateString()} 
                      <span className="mx-2">|</span>
                      <b>Due</b> {new Date(assignment.dueDate || new Date()).toLocaleDateString()} 
                      <span className="mx-2">|</span>
                      {assignment.points || 100} pts
                    </div>
                  </div>
                  
                  <div>
                    <ProtectedContent>
                      <SingleAssignmentButtons 
                        assignmentId={assignment._id}
                        deleteAssignment={(assignmentId) => removeAssignment(assignmentId)}
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