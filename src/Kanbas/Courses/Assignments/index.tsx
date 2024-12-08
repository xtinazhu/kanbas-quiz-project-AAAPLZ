import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical } from 'react-icons/bs';
import { FaRegPenToSquare } from "react-icons/fa6";
import AssignmentControls from "./AssignmentControls";
import SingleAssignmentButtons from "./SingleAssignmentButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import ProtectedContent from "../../Account/ProtectedContent";
import { setAssignment, addAssignment, updateAssignment, deleteAssignment } from "./reducer";
import * as client from "./client";

interface Assignment {
  _id: string;
  title: string;
  description?: string;
  points: number;
  dueDate: string;
  availableFromDate: string;
  availableUntilDate: string;
  course: string;
}

export default function Assignments() {
  const { cid } = useParams();
  const [assignmentName, setAssignmentName] = useState("");
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();

  const createAssignmentForCourse = async () => {
    if (!cid || !assignmentName.trim()) {
      alert("Assignment title is required");
      return;
    }
    
    try {
      const assignmentData = {
        title: assignmentName.trim(),
        course: cid,
        points: 100,
        dueDate: new Date().toISOString(),
        availableFromDate: new Date().toISOString(),
        availableUntilDate: new Date().toISOString(),
        description: ""
      };
      
      const newAssignment = await client.createAssignment(cid, assignmentData);
      dispatch(addAssignment(newAssignment));
      setAssignmentName("");
    } catch (error) {
      console.error("Failed to create assignment:", error);
      alert("Failed to create assignment. Please check all required fields.");
    }
  };

  const updateExistingAssignment = async (assignmentId: string, updates: Partial<Assignment>) => {
    try {
      const updatedAssignment = await client.updateAssignment({ _id: assignmentId, ...updates });
      dispatch(updateAssignment(updatedAssignment));
    } catch (error) {
      console.error("Failed to update assignment:", error);
    }
  };

  const deleteExistingAssignment = async (assignmentId: string) => {
    try {
      await client.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    } catch (error) {
      console.error("Failed to delete assignment:", error);
    }
  };

  const fetchAssignments = async () => {
    try {
      if (!cid) return;
      const fetchedAssignments = await client.findAssignmentsForCourse(cid);
      dispatch(setAssignment(fetchedAssignments));
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

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
              <ProtectedContent>
                <AssignmentControlButtons />
              </ProtectedContent>
            </div>

            <ul className="wd-lessons list-group rounded-0">
              {assignments.map((assignment: Assignment) => (
                <li key={assignment._id}
                    className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center justify-content-between">
                  <div>
                    <BsGripVertical className="me-2 fs-4" />
                    <FaRegPenToSquare className="me-2 fs-4" />
                  </div>
                  <div id="wd-assignment-list" className="d-flex flex-column flex-grow-1 ms-3">
                    <a className="wd-assignment-link"
                       href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                      <b>{assignment.title}</b>
                    </a>
                    <div style={{ fontSize: '1rem' }}>
                      <span className="text-danger">Multiple Modules</span>
                      <span className="mx-2">|</span>
                      <b>Available from</b> {formatDate(assignment.availableFromDate)}
                      <span className="mx-2">|</span>
                      <b>Due</b> {formatDate(assignment.dueDate)}
                      <span className="mx-2">|</span>
                      {assignment.points} pts
                    </div>
                  </div>
                  
                  <div>
                    <ProtectedContent>
                      <SingleAssignmentButtons
                        assignmentId={assignment._id}
                        deleteAssignment={deleteExistingAssignment}
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