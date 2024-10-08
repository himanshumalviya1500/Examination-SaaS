import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

class ProtectedRoute extends React.Component {
  render() {
    const Component = this.props.component;
    return this.props.isAuthenticated ? (
      <Component userInfo={this.props.userInfo} />
    ) : (
      <Navigate to="/signin" />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userInfo: state.auth.user,
  };
};
export default connect(mapStateToProps, null)(ProtectedRoute);
