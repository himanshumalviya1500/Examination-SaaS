import React from "react";
import { Row, Col } from "antd";
import Classes from "./Classes";
import AssignedTests from "./AssignedTests";
import "./Dashboard.css";

function Dashboard(props) {
  const trimLength = 8;
  // console.log(userInfo);

  return (
    <>
      <div className="container dashboard">
        <Row gutter={[48, 10]} justify="center" style={{ gap: "20px" }}>
          <Col
            className="gutter-row"
            xs={24}
            sm={24}
            md={9}
            xl={9}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              boxShadow: "20px 20px 40px -6px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(0px)",
              WebkitBackdropFilter: "blur(0px)",
              borderRadius: "10px",
            }}
          >
            <AssignedTests trimLength={trimLength} />
          </Col>
          <Col
            className="gutter-row"
            xs={24}
            sm={24}
            md={9}
            xl={9}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              boxShadow: "20px 20px 40px -6px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(0px)",
              WebkitBackdropFilter: "blur(0px)",
              borderRadius: "10px",
            }}
          >
            <Classes trimLength={trimLength} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
