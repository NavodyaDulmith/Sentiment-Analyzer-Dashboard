import React from "react";
import {Navbar} from "react-bootstrap";
import "../myStyles.css";

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="topnav">
        <Navbar fixed="top" expand="lg" variant="dark" className="topnav">
          <Navbar.Brand href="">V-Canteen</Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

export default HeaderBar;
