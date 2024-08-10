import React, { useState } from "react";
import LeftMenu from "./LeftMenu";
import { Drawer, Button } from "antd";
import { connect } from "react-redux";
import "./Navbar.css";

const Navbar = (props) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className="menuBar">
      <div className="logo"></div>
      <div className="menuCon">
        <div className="leftMenu">
          <LeftMenu />
        </div>
        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Menu"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu role={props} />
        </Drawer>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.auth.user,
});

export default connect(mapStateToProps)(Navbar);
