import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./SelectTest.css";
import TestList from "./TestList";
import { fetchAssignedTests } from "../../ExamActions/TeacherActions";
import { selectedAssignedTest } from "../../ExamActions/selectActions";

function SelectTest(props) {
  const { tests, profileID } = props;
  console.log(props);

  const handleSelectedTest = (testData) => {
    props.selectedTest(testData);
  };

  useEffect(() => {
    props.fetchTests(profileID);
  }, []);

  return (
    <>
      <div className="select__test__container">
        <TestList tests={tests} handleSelectedTest={handleSelectedTest} />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tests: state.teacher.assignedTests,
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchTests: (profileID) => dispatch(fetchAssignedTests(profileID)),
    selectedTest: (testData) => dispatch(selectedAssignedTest(testData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectTest);
