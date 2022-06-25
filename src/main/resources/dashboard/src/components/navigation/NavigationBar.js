import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../../App.css";

const style = { width: "25px" };

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar class="navbar" fixed="top">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to={""} className="navbar-brand text-white ">
              <img src="logo.png" alt="" style={style} />
              CoVacciMOOD
            </Link>
          </Nav>
          <Nav>
            <Nav.Link className="text-white-fade" href="#deets">
              Settings
            </Nav.Link>
            <Nav.Link className="text-white-fade" eventKey={2} href="#memes">
              Help
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
