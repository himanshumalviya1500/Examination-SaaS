import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import StudentDashboard from "../Pages/Dashboard/Dashboard";
import TeacherDashboard from "../Pages/Teacher/Dashboard/Dashboard";
import AttemptTest from "../Pages/AttemptTest/AttemptTest";
import Navbar from "../Pages/Navbar";
import Result from "../Pages/Result/ResultWrapper";
import TestInstruction from "../Pages/TestInstructions/TestInstruction";
import IndividualResult from "../Pages/Result/ShowResult";
import TestPreviewWrapper from "../Pages/TestPreview/TestPreviewWrapper";
import { connect } from "react-redux";
import { Modal } from "antd";
import Profile from "../Pages/Profile/Profile";
import { Roles } from "../Roles/roles";
import CreateTest from "../Pages/Teacher/CreateTest/CreateTest";
import AssignedTestsWrapper from "../Pages/Teacher/AssigenedTest/AssignedTestsWrapper";
import TestStatus from "../Pages/Teacher/TestStatus/TestStatus";
import { message } from "antd";
import { Offline } from "react-detect-offline";
import Login from "../Pages/LogIn/Login";
import Signup from "../Pages/SignUp/Signup";

function App(props) {
  const [count, setCount] = useState(1);

  const handleOffline = () => {
    setCount(count + 1);
    if (count % 2 === 0) {
      message.success("Connected to internet");
    } else {
      message.error("Please connect to internet");
    }
  };

  useEffect(() => {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    window.addEventListener("keydown", (e) => {
      console.log(e);
      if (e.key === "F12") {
        e.preventDefault();
      }
    });
  }, []);

  const { selectedTestName, selectedAssignedTestName } = props;
  const role = props.userInfo.role;
  const { confirm } = Modal;

  return (
    <div className={count % 2 ? "" : "pointer__select__none"}>
      <Offline onChange={(e) => handleOffline(e)}></Offline>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                component={
                  Roles.teacher === role ? TeacherDashboard : StudentDashboard
                }
              />
            }
          />
          <Route
            path="/attempt-test"
            element={<ProtectedRoute component={AttemptTest} />}
          />
          <Route
            path="/create-test"
            element={
              <ProtectedRoute
                component={Roles.teacher === role ? CreateTest : AttemptTest}
              />
            }
          />
          <Route
            path="/result"
            element={<ProtectedRoute component={Result} />}
          />
          <Route
            path={`/result/${selectedTestName}`}
            element={<ProtectedRoute component={IndividualResult} />}
          />
          <Route
            path="/test-instructions"
            element={<ProtectedRoute component={TestInstruction} />}
          />
          <Route
            path="/start-test"
            element={<ProtectedRoute component={TestPreviewWrapper} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route
            path="/assigned-test"
            element={
              <ProtectedRoute
                component={
                  Roles.teacher === role
                    ? AssignedTestsWrapper
                    : StudentDashboard
                }
              />
            }
          />
          <Route
            path={`/test-status/${selectedAssignedTestName}`}
            element={<ProtectedRoute component={TestStatus} />}
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedTestName: state.selectedTest.selectedTestResultData?.[0]?.testName
    ?.replace(/\s+/g, "-")
    .toLowerCase(),
  userInfo: state.auth.user,
  selectedAssignedTestName:
    state.selectedTest.selectedAssignedTestData?.[0]?.testName
      ?.replace(/\s+/g, "-")
      .toLowerCase(),
});

export default connect(mapStateToProps)(App);
