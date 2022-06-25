import React, {Component} from "react";
import "./App.css";
import HistoryView from "./components/history/HistoryView";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AnalyzeView from "./components/home/AnalyzeView";
import SideBar from "./components/sidebar/SideBar";
import {Col, Container, Row} from "react-bootstrap";

class App extends Component {
  authenticate() {
    return new Promise((resolve) => setTimeout(resolve, 1000)); // 2 seconds
  }

  componentDidMount() {
    this.authenticate().then(() => {
      const ele = document.getElementById("ipl-progress-indicator");
      if (ele) {
        // fade out
        ele.classList.add("available");
        setTimeout(() => {
          // remove from DOM
          ele.outerHTML = "";
        }, 2000);
      }
    });
  }

  render() {
    return (
        <div className="App">
          <Router>
            <SideBar/>
            <br/>
            <Container>
              <Row>
                <Col lg={12} className={"margin-top"}>
                  <Switch>
                    <Route path="/" exact component={AnalyzeView}></Route>
                    <Route path="/history" exact component={HistoryView}></Route>
                  </Switch>
                </Col>
              </Row>
            </Container>
            <br/>
          </Router>
        </div>
    );
  }
}

export default App;
