import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "../logIn/Login";
import Signup from "../signUp/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import StudentDashboard from "../dashboard/Dashboard";
import TeacherDashboard from "../Teacher/Dashboard/Dashboard";
import AttemptTest from "../attemptTest/AttemptTest";
import Navbar from "../navbar";
import Result from "../result/ResultWrapper";
import TestInstruction from "../TestInstructions/TestInstruction";
import IndividualResult from "../result/ShowResult";
import TestPreviewWrapper from "../testPreview/TestPreviewWrapper";
import { connect } from "react-redux";
import Profile from "../profile/Profile";
import { Roles } from "../Roles/roles";
import CreateTest from "../Teacher/CreateTest/CreateTest";
import AssignedTestsWrapper from "../Teacher/AssigenedTest/AssignedTestsWrapper";
import TestStatus from "../Teacher/TestStatus/TestStatus";
import { message } from "antd";
import { Offline } from "react-detect-offline";

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
  selectedTestName: state.selectedTest.selectedTestResultData.testName
    ?.replace(/\s+/g, "-")
    .toLowerCase(),
  userInfo: state.auth.user,
  selectedAssignedTestName: state.selectedTest.selectedAssignedTestData.testName
    ?.replace(/\s+/g, "-")
    .toLowerCase(),
});

export default connect(mapStateToProps)(App);
