import React, {Component} from "react";
import "../../css/SideBar.css";
import {Link} from "react-router-dom";

class SideBar extends Component {
  render() {
    return (
      <div class="sidenav">
        <Link to={""} className="nav-link">
          Analyzer
        </Link>
        <Link to={"history"} className="nav-link">
          History
        </Link>
      </div>
    );
  }
}

export default SideBar;
