import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as db from "./Database";
import ProtectedContent from "./Account/ProtectedContent";
import ProtectedEnrollment from "./Account/ProtectedEnrollment";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Manage enrollments in state
  const [enrollments, setEnrollments] = useState<any[]>([]);

  // Load enrollments from localStorage or initialize from db
  useEffect(() => {
    const storedEnrollments = localStorage.getItem("enrollments");
    if (storedEnrollments) {
      setEnrollments(JSON.parse(storedEnrollments));
    } else {
      setEnrollments(db.enrollments);
    }
  }, []);

  const [showEnrolledCourses, setShowEnrolledCourses] = useState(true);
  const toggleShowEnrolledCourses = () => {
    setShowEnrolledCourses(!showEnrolledCourses);
  };

  const displayedCourses = showEnrolledCourses
    ? courses.filter((course) =>
        enrollments.some(
          (enrollment) =>
            enrollment.user === currentUser._id &&
            enrollment.course === course._id
        )
      )
    : courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <ProtectedEnrollment>
        <button
          className="btn btn-primary float-end mb-3"
          onClick={toggleShowEnrolledCourses}
        >
          Enrollments
        </button>
      </ProtectedEnrollment>

      <ProtectedContent>
        <h5>
          New Course
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={addNewCourse}
          >
            Add
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>
        <br />
        <input
          value={course.name}
          className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <textarea
          value={course.description}
          className="form-control"
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />
        <hr />
      </ProtectedContent>

      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course) => {
            // Check if the user is enrolled in this course
            const isEnrolled = enrollments.some(
              (enrollment) =>
                enrollment.user === currentUser._id &&
                enrollment.course === course._id
            );

            return (
              <div
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
                key={course._id}
              >
                <div className="card rounded-3 overflow-hidden">
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <img src={course.image} width="100%" height={160} />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}
                      </p>
                      <button className="btn btn-primary">Go</button>

                      <ProtectedContent>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </ProtectedContent>
                    </div>
                  </Link>
                  {/* Enroll/Unenroll Buttons */}
                  <ProtectedEnrollment>
                    {isEnrolled ? (
                      <button
                        className="btn btn-danger m-2"
                        onClick={(e) => {
                          e.preventDefault();
                          // Unenroll the user
                          const updatedEnrollments = enrollments.filter(
                            (enrollment) =>
                              !(
                                enrollment.user === currentUser._id &&
                                enrollment.course === course._id
                              )
                          );
                          setEnrollments(updatedEnrollments);
                          localStorage.setItem(
                            "enrollments",
                            JSON.stringify(updatedEnrollments)
                          );
                        }}
                      >
                        Unenroll
                      </button>
                    ) : (
                      <button
                        className="btn btn-success m-2"
                        onClick={(e) => {
                          e.preventDefault();
                          // Enroll the user
                          const newEnrollment = {
                            _id: Date.now().toString(),
                            user: currentUser._id,
                            course: course._id,
                          };
                          const updatedEnrollments = [
                            ...enrollments,
                            newEnrollment,
                          ];
                          setEnrollments(updatedEnrollments);
                          localStorage.setItem(
                            "enrollments",
                            JSON.stringify(updatedEnrollments)
                          );
                        }}
                      >
                        Enroll
                      </button>
                    )}
                  </ProtectedEnrollment>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
