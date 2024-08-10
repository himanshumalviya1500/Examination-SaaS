import React from "react";
import { Col } from "antd";
import "./StudentStatus.css";

export default function StudentStatus(props) {
  const { student, className, testName } = props;

  return (
    <>
      {student.map((stu, index) => (
        <Col
          key={index}
          className="gutter-row gutter-col-adder"
          sm={24}
          xs={24}
          md={6}
          lg={6}
        >
          <div className="student__status__wrapper">
            <div className="status__header">
              <p className="status__header__heading">
                {stu.firstName?.toUpperCase()} {stu.lastName?.toUpperCase()}
                <p>{className}</p>
              </p>
            </div>
            <div className="student__status__body">
              <div className="status__test">
                Test Name: <span className="status__testname"> {testName}</span>
              </div>
              <div className="status__test__total">
                Total Marks:{" "}
                <span className="status__testname">{stu.totalMarks}</span>
              </div>
              <div className="status__test__obtained">
                Obtained Marks:{" "}
                <span className="status__testname">{stu.correct}</span>
              </div>
              <div className="status__test__correct">
                Correct Answers:{" "}
                <span className="status__testname success-wihtoutFont">
                  {stu.correct}
                </span>
              </div>
              <div className="status__test__wrong">
                Wrong Answers:{" "}
                <span className="status__testname danger">{stu.wrong}</span>
              </div>
              <div className="status__test__unanswered">
                Not Answered:{" "}
                <span className="status__testname primary-wihtoutFont">
                  {stu.unanswered}
                </span>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </>
  );
}
