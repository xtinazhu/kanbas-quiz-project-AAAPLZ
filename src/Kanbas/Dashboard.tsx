import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/reactjs.jpg" width={200} alt=""/>
            <div>
              <h5>
                 CS1234 React JS {/* Course 1 */}
              </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/5010/Home">
            <img src="/images/5010.jpg" width={200} alt=""/>
            <div>
              <h5>
                 CS5010 Programming Design Paradigm	{/* Course 2 */}
              </h5>
              <p className="wd-dashboard-course-title">
                Modern program design paradigms
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/5800/Home">
            <img src="/images/5800.jpg" width={200} alt=""/>
            <div>
              <h5>
                 CS5800 Algorithms {/* Course 3 */}
              </h5>
              <p className="wd-dashboard-course-title">
                The mathematical techniques used for computer algorithms
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/5400/Home">
            <img src="/images/5400.jpg" width={200} alt=""/>
            <div>
              <h5>
                 CS5400 Principles of Programming Language {/* Course 4 */}
              </h5>
              <p className="wd-dashboard-course-title">
                The basic components of programming languages
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/5500/Home">
            <img src="/images/5500.jpg" width={200} alt=""/>
            <div>
              <h5>
                 CS5500 Foundations of Software Engineering {/* Course 5 */}
              </h5>
              <p className="wd-dashboard-course-title">
                Software development life cycle models
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/5520/Home">
            <img src="/images/5520.jpg" width={200} alt=""/>
            <div>
              <h5>
                 CS5520 Mobile Application Development {/* Course 6 */}
              </h5>
              <p className="wd-dashboard-course-title">
                Mobile application development on mobile phones
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/5600/Home">
            <img src="/images/5600.jpg" width={200} alt=""/>
            <div>
              <h5>
                 CS5600 Computer Systems {/* Course 7 */}
              </h5>
              <p className="wd-dashboard-course-title">
                The structure, components, and internal operation of computer systems
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
