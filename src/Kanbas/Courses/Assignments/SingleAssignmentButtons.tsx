import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";

export default function SingleAssignmentButtons(
  { assignmentId, deleteAssignment }: { assignmentId: string; deleteAssignment: (assignmentId: string) => void; }
) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="float-end">
      <FaTrash className="text-danger me-2 mb-1" onClick={() => setShowConfirm(true)} />
      <GreenCheckmark />&nbsp;&nbsp;&nbsp;
      <IoEllipsisVertical className="fs-4" />

      {showConfirm && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Deletion</h5>
                  {/*<button type="button" className="close" onClick={() => setShowConfirm(false)}>
                    <span aria-hidden="true">&times;</span>
                  </button>*/}
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to remove this assignment?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                    No
                  </button>
                  <button type="button" className="btn btn-danger" onClick={() => {
                    deleteAssignment(assignmentId);
                    setShowConfirm(false);
                  }}>
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}
