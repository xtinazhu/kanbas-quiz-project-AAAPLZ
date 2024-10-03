import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
export default function AssignmentControls() {
  return (
    <div><div id="wd-assignment-controls" className="text-nowrap">
      <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment</button>

      <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group</button>
    </div>
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <CiSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
      <input id="wd-text-fields-search" placeholder="Search..." style={{ paddingLeft: '30px', height: '45px', width: '100%' }} />
    </div></div>
);}
