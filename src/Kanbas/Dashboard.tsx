import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as enrollmentClient from "./Enrollments/client";
import * as courseClient from "./Courses/client";
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
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [showEnrolledCourses, setShowEnrolledCourses] = useState(true);
  const [allCourses, setAllCourses] = useState<any[]>(courses);

  // Function to load enrollments for the current user
  const loadEnrollments = async () => {
    if (currentUser && currentUser._id) {
      try {
        const userEnrollments = await enrollmentClient.findUserEnrollments(currentUser._id);
        setEnrollments(userEnrollments);
        localStorage.setItem(
          `enrollments_${currentUser._id}`,
          JSON.stringify(userEnrollments)
        );
      } catch (error) {
        console.error("Error loading enrollments:", error);
        const storedEnrollments = localStorage.getItem(
          `enrollments_${currentUser._id}`
        );
        if (storedEnrollments) {
          setEnrollments(JSON.parse(storedEnrollments));
        }
      }
    } else {
      setEnrollments([]);
    }
  };

  // Load all courses
  const loadAllCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      setAllCourses(allCourses);
    } catch (error) {
      console.error("Error loading all courses:", error);
    }
  };

  // Load enrollments when component mounts or currentUser changes
  useEffect(() => {
    loadEnrollments();
    loadAllCourses();
  }, [currentUser]);

  const toggleShowEnrolledCourses = () => {
    setShowEnrolledCourses(!showEnrolledCourses);
  };

  const displayedCourses = showEnrolledCourses 
    ? allCourses.filter((course) => 
        enrollments.some((enrollment) => enrollment.course === course._id)
      )
    : allCourses;

  const handleEnroll = async (courseId: string, event: React.MouseEvent) => {
    event.preventDefault();
    try {
      await enrollmentClient.enrollInCourse(courseId);
      const newEnrollment = {
        _id: Date.now().toString(),
        user: currentUser._id,
        course: courseId,
      };
      const updatedEnrollments = [...enrollments, newEnrollment];
      setEnrollments(updatedEnrollments);
      localStorage.setItem(
        `enrollments_${currentUser._id}`,
        JSON.stringify(updatedEnrollments)
      );
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  const handleUnenroll = async (courseId: string, event: React.MouseEvent) => {
    event.preventDefault();
    try {
      await enrollmentClient.unenrollFromCourse(courseId);
      const updatedEnrollments = enrollments.filter(
        (enrollment) => enrollment.course !== courseId
      );
      setEnrollments(updatedEnrollments);
      localStorage.setItem(
        `enrollments_${currentUser._id}`,
        JSON.stringify(updatedEnrollments)
      );
    } catch (error) {
      console.error("Error unenrolling:", error);
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <ProtectedEnrollment>
        <button
          className="btn btn-primary float-end mb-3"
          onClick={toggleShowEnrolledCourses}
        >
          {showEnrolledCourses ? "Show All Courses" : "Show My Courses"}
        </button>
      </ProtectedEnrollment>

      {/* Rest of your code remains the same... */}
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
        {showEnrolledCourses ? "My Courses" : "All Courses"} ({displayedCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course) => {
            const isEnrolled = enrollments.some(
              (enrollment) => enrollment.course === course._id
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
                  <ProtectedEnrollment>
                    {isEnrolled ? (
                      <button
                        className="btn btn-danger m-2"
                        onClick={(e) => handleUnenroll(course._id, e)}
                      >
                        Unenroll
                      </button>
                    ) : (
                      <button
                        className="btn btn-success m-2"
                        onClick={(e) => handleEnroll(course._id, e)}
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