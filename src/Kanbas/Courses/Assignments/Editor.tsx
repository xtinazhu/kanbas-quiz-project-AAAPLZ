import { RxCross2 } from "react-icons/rx";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as db from "../../Database";
export default function AssignmentEditor() {
  const { cid, aid, description , points, due , available_from , available_until } = useParams();
  const navigate = useNavigate();
  const assignments = db.assignments;
  const [assignment, setAssignment] = useState<any>(null);

  useEffect(() => {
    // Find the assignment by its ID and ensure the course ID matches
    const selectedAssignment = assignments.find((a: any) => a._id === aid && a.course === cid);
    setAssignment(selectedAssignment);
  }, [aid, cid, assignments]);
  

  const handleSave = () => {
    // Create a new updated assignment object
    const updatedAssignment = {
      ...assignment,
      aid: aid,
      description: description,
      points: points,
      due: due,
      available_from: available_from,
      available_until: available_until
    };

    // Update the assignment in the database
    const assignmentIndex = assignments.findIndex((a: any) => a._id === aid);
    if (assignmentIndex > -1) {
      assignments[assignmentIndex] = updatedAssignment;
    }

    // Redirect back to the assignments list page after saving
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };


  return (
    <div id="wd-assignments-editor" className="kb-margin-right-left kb-padded-bottom-right kb-border-fat">
      <div className="row">Assignment Name</div>

      <div className="row">
        <input id="wd-name" className="col-12 kb-input-height" value={aid} />
      </div><br />
      
      <div className="row">
      <textarea id="wd-description" className="col-12 kb-textarea-height">
          The assignment is available online. 
          Submit a link to the landing page of your Web application running on Netlify. 
          The landing page should include the following: Your full name and section Links to each of the 
          lab assignment Link to the Kanbas application Links to all relevant source code repositories.
        </textarea>
      </div><br />

      <div className="row">
        <div className="col-4 kb-textalign-center-right">
          Points&nbsp;
        </div>
        <input id="wd-name" className="col-8 kb-input-height" value={points || "100"} />
      </div><br />

      <div className="row">
        <div className="col-4 kb-textalign-center-right">
          Assignment Group&nbsp;
        </div>
          <select id="wd-group" className="col-8 kb-input-height">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          </select>
      </div><br />

      <div className="row">
        <div className="col-4 kb-textalign-center-right">
          Display Grade as&nbsp;
        </div>
          <select id="wd-group" className="col-8 kb-input-height">
            <option value="Percentage">Percentage</option>
          </select>
      </div><br />

      <div className="row">
        <div className="col-4 kb-textalign-center-right">
          Submission Type&nbsp;
        </div>
        <div className="col-8  kb-border-thin wd-border-solid">
          <div className="kb-assignment-editor-margin-all-around">
            <select id="wd-group" className="col-12 kb-input-height">
              <option value="Online">Online</option>
            </select>
            <br /><br />
            <label htmlFor="wd-submission-type">
              <h5>Online Entry Option</h5></label><br /><br />
              <input type="checkbox" name="check-online-Options" id="wd-text-entry"/>
              <label htmlFor="wd-text-entry">&nbsp;Text Entry</label><br/><br/>

              <input type="checkbox" name="check-online-Options" id="wd-website-url"/>
              <label htmlFor="wd-website-url">&nbsp;Website URL</label><br/><br/>

              <input type="checkbox" name="check-online-Options" id="wd-media-recordings"/>
              <label htmlFor="wd-media-recordings">&nbsp;Media Recordings</label><br/><br/>

              <input type="checkbox" name="check-online-Options" id="wd-student-annotation"/>
              <label htmlFor="wd-student-annotation">&nbsp;Student Annotation</label><br/><br/>

              <input type="checkbox" name="check-online-Options" id="wd-file-upload"/>
              <label htmlFor="wd-file-upload">&nbsp;File Uploads</label>
            </div>
        </div>
      </div><br />

      <div className="row">
        <div className="col-4 kb-textalign-center-right">
          Assign&nbsp;
        </div>
        <div className="col-8  kb-border-thin wd-border-solid">
          <div className="kb-assignment-editor-margin-all-around">
            <h5>Assign to</h5>
            <div className="row col-12  kb-border-thin wd-border-solid kb-assign-margin">
              <div className="row col-3 bg-secondary text-black kb-input-margin">
                <div>Everyone</div>
                <div className="float-end"><RxCross2 /></div>
              </div>
            </div><br />
            
            <h5>Due</h5>
            <div className="row col-12  kb-border-thin wd-border-solid kb-assign-margin">
              <input type="datetime-local" id="wd-due-date" name="dateTimeInput" value="2024-05-13 23:59"></input>
            </div><br />

            <div className="row">
              <div className="col-6">
                <h5>Available from</h5>
              </div>
              <div className="col-6">
                <h5>Unitl</h5>
              </div>
            </div>
            <div className="row kb-assign-margin">
              <div className="col-5 kb-border-thin wd-border-solid">
                <input type="datetime-local" id="wd-available-from" name="dateTimeInput" value="2024-05-03 23:59"></input>
              </div><br />
              <div className="col-5 kb-border-thin wd-border-solid kb-assign-margin-left">
                <input type="datetime-local" id="wd-available-from" name="dateTimeInput" value="2024-05-13 23:59"></input>
              </div>
            </div>
            
          </div>
        </div>
      </div><br />

      <hr />

      <div><div id="wd-assignment-controls" className="text-nowrap">
      <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end" onClick={handleSave} >
        Save</button>

      <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-1 float-end" onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments`)} >
        Cancel</button>
      </div></div>

    </div>
);}