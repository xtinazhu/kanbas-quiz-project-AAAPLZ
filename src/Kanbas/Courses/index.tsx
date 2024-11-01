import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { Navigate, Route, Routes , useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import React, { useState } from "react";
import * as db from "../Database";


export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const [assignments, setAssignments] = useState<any[]>(db.assignments);
  const [assignmentName, setAssignmentName] = useState("");
  const addAssignment = () => {
    setAssignments([ ...assignments, { _id: new Date().getTime().toString(),
                                     title: assignmentName, course: cid } ]);
    setAssignmentName("");
  };
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]} 
      </h2>
        <div className="d-flex">
          <div className="d-none d-md-block">
            <CoursesNavigation />
          </div>
          <div className="flex-fill">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:aid" 
                element={<AssignmentEditor
                assignmentName={assignmentName}
                setAssignmentName={setAssignmentName}
                addAssignment={addAssignment}
              />} />
              <Route path="People" element={<PeopleTable />} />
            </Routes>
          </div>
        </div>
    </div>
);}