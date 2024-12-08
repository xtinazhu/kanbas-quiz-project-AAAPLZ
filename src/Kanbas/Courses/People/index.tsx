import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PeopleTable from "./Table";
import * as courseClient from "../client";

function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsersForCourse = async () => {
    try {
      if (cid) {
        const users = await courseClient.findUsersForCourse(cid);
        setUsers(users);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsersForCourse();
  }, [cid]);

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>People</h2>
        <div className="float-end">
          <button className="btn btn-secondary me-2">Filter People</button>
          <button className="btn btn-danger">+ People</button>
        </div>
      </div>
      <hr />
      <PeopleTable users={users} />
    </div>
  );
}

export default People;