import "./styles.css";
import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
export default function Kanbas() {
  return (
    <div id="wd-kanbas">
      <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <h1>Yihua Zhu 20593</h1>
          <h3>GitHub: https://a1--1-kanbas-react-web-app-a1.netlify.app/#/Kanbas/Account/Signin</h3>
          <h1>Kanbas</h1>
          <Routes>
              <Route path="/" element={<Navigate to="Dashboard" />} />
              <Route path="/Account/*" element={<Account />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Courses/:cid/*" element={<Courses />} />
              <Route path="/Calendar" element={<h1>Calendar</h1>} />
              <Route path="/Inbox" element={<h1>Inbox</h1>} />
            </Routes>
        </div>
    </div>
);}
