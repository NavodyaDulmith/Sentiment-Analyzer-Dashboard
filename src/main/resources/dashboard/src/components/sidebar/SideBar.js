import React, {Component} from "react";
import "../../css/SideBar.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

const style = {
  position: "absolute",
  bottom: "40px",
};
class SideBar extends Component {
  render() {
    return (
      <div class="sidenav">
        <div class="container nav-link text-center">
          <FontAwesomeIcon icon={faUser} size="3x" />
          <p class="">Admin</p>
        </div>
        <Link to={""} className="nav-link">
          Analayzer
        </Link>
        <Link to={"history"} className="nav-link">
          Dashboard
        </Link>
        <Link className="nav-link">History</Link>
        <Link className="nav-link">Profile</Link>
        <Link className="nav-link">About Us</Link>
        <div style={style}>
          <Link className="nav-link">Sign Out</Link>
        </div>
      </div>
    );
  }
}

export default SideBar;
