import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { BiTargetLock } from "react-icons/bi";
import { FaChartSimple } from "react-icons/fa6";
import { GrAnnounce } from "react-icons/gr";
import { FaChartLine } from "react-icons/fa6";
import { FiBell } from "react-icons/fi";
import ProtectedContent from "../../Account/ProtectedContent";
export default function CourseStatus() {
  return (
    <div className="wd-margin-right-left wd-padded-bottom-right wd-border-fat">
      <div id="wd-course-status" style={{ width: "300px" }}>
        <h2>Course Status</h2>
        <ProtectedContent>
        <div className="d-flex">
          <div className="w-50 pe-1">
            <button className="btn btn-lg btn-secondary w-100 text-nowrap ">
              <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish </button>
          </div>
          <div className="w-50">
            <button className="btn btn-lg btn-success w-100">
              <FaCheckCircle className="me-2 fs-5" /> Publish </button>
          </div>
        </div></ProtectedContent><br />

        <ProtectedContent>
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <BiImport className="me-2 fs-5" /> Import Existing Content </button>
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons </button>
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <BiTargetLock className="me-2 fs-5" /> Choose Home Page </button></ProtectedContent>
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <FaChartSimple className="me-2 fs-5" /> View Course Stream </button>
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <GrAnnounce className="me-2 fs-5" /> New Announcement </button>
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <FaChartLine className="me-2 fs-5" /> New Analytics </button>
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <FiBell className="me-2 fs-5" /> View Course Notifications </button>
      </div>
    </div>
);}
