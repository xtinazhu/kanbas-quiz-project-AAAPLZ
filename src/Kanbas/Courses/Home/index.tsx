import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
  return (
    <div id="wd-courses-home">
      <h2>Home</h2>
      <div className="d-flex" id="wd-home">
        <div className="flex-fill">
          <Modules />
        </div>
        <div className="d-none d-md-block">
          <CourseStatus />
        </div>
      </div>
    </div>
  );
}
