import { RxCross2 } from "react-icons/rx";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addAssignment } from "./reducer";
import * as client from "./client";

interface Assignment {
  _id?: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableFromDate: string;
  availableUntilDate: string;
}

export default function AssignmentEditor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cid } = useParams();

  const [assignment, setAssignment] = useState<Assignment>({
    title: "",
    description: `The assignment is available online. 
      Submit a link to the landing page of your Web application running on Netlify. 
      The landing page should include the following: Your full name and section Links to each of the 
      lab assignment Link to the Kanbas application Links to all relevant source code repositories.`,
    points: 100,
    dueDate: new Date().toISOString().slice(0, 16),
    availableFromDate: new Date().toISOString().slice(0, 16),
    availableUntilDate: new Date().toISOString().slice(0, 16)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAssignment(prev => ({
      ...prev,
      [name]: name === 'points' ? parseInt(value) : value
    }));
  };

  const handleSave = async () => {
    if (!cid) return;
    
    if (!assignment.title.trim()) {
      alert("Assignment title is required");
      return;
    }
  
    try {
      const assignmentData = {
        ...assignment,
        course: cid,
        dueDate: assignment.dueDate || new Date().toISOString(),
        availableFromDate: assignment.availableFromDate || new Date().toISOString(),
        availableUntilDate: assignment.availableUntilDate || new Date().toISOString(),
      };
  
      const newAssignment = await client.createAssignment(cid, assignmentData);
      dispatch(addAssignment(newAssignment));
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Failed to save assignment:", error);
      alert("Failed to save assignment. Please check all required fields.");
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="kb-margin-right-left kb-padded-bottom-right kb-border-fat">
      <div className="row">Assignment Name</div>
      <div className="row">
        <input 
          id="wd-assignment-name"
          name="title"
          className="col-12 kb-input-height"
          value={assignment.title}
          placeholder="Assignment Name"
          onChange={handleChange}
        />
      </div><br />
      
      <div className="row">
        <textarea 
          id="wd-assignment-description"
          name="description"
          className="col-12 kb-textarea-height"
          value={assignment.description}
          onChange={handleChange}
        />
      </div><br />

      <div className="row">
        <div className="col-4 kb-textalign-center-right">
          Points&nbsp;
        </div>
        <input 
          id="wd-points"
          name="points"
          type="number"
          className="col-8 kb-input-height"
          value={assignment.points}
          onChange={handleChange}
        />
      </div><br />

      <div className="row">
        <div className="col-4 kb-textalign-center-right">Due Date&nbsp;</div>
        <input 
          type="datetime-local"
          name="dueDate"
          className="col-8 kb-input-height"
          value={assignment.dueDate}
          onChange={handleChange}
        />
      </div><br />

      <div className="row">
        <div className="col-4 kb-textalign-center-right">Available From&nbsp;</div>
        <input 
          type="datetime-local"
          name="availableFromDate"
          className="col-8 kb-input-height"
          value={assignment.availableFromDate}
          onChange={handleChange}
        />
      </div><br />

      <div className="row">
        <div className="col-4 kb-textalign-center-right">Available Until&nbsp;</div>
        <input 
          type="datetime-local"
          name="availableUntilDate"
          className="col-8 kb-input-height"
          value={assignment.availableUntilDate}
          onChange={handleChange}
        />
      </div><br />

      <hr />

      <div>
        <div id="wd-assignment-controls" className="text-nowrap">
          <button 
            className="btn btn-lg btn-danger me-1 float-end"
            onClick={handleSave}
          >
            Save
          </button>

          <button 
            className="btn btn-lg btn-secondary me-1 float-end"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}