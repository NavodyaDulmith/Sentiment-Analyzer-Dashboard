import React, {Component} from "react";

import {Button, Col, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
/* import MyToast from "./MyToast";
 */
import axios from "axios";
import "../../css/Issue.css";

export default class AnalyzeView extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    this.projectChange = this.projectChange.bind(this);
    this.submitProject = this.submitProject.bind(this);
  }

  initialState = {
    name: "",
    key: "",
    path: "",
  };

  resetProject = () => {
    this.setState(() => this.initialState);
  };

  submitProject = (event) => {
    event.preventDefault();

    const project = {
      name: this.state.name,
      key: this.state.key,
      path: this.state.path,
    };

    alert("Violation Scanning Started!");
    axios
      .post("http://localhost:8080/api/v1/cvf/addProject", project)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);
          alert("Project Successfully Added!");
        } else {
          this.setState({ show: false });
        }
      });

    this.setState(this.initialState);
  };

  projectChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { name, key, path } = this.state;

    return (
      <div>
        <div className="jumbotron bg-secondary text-white background">
          <div id="left">
            <h1 className="display-5">CoVacciMOOD Analyzer</h1>
          </div>
        </div>

        <Form
          onReset={this.resetProject}
          onSubmit={this.submitProject}
          id="projectFormId"
        >
          <Form.Row>
            <Form.Group as={Col} controlId="formGridTitle">
              <Form.Control
                required
                autoComplete="off"
                type="test"
                name="name"
                value={name}
                onChange={this.projectChange}
                className={"bg-light text-black"}
                placeholder="Enter your text here"
                as="textarea"
              />
            </Form.Group>
            <Button
              class="btnsize"
              size="lg"
              variant="outline-success"
              type="submit"
            >
              <FontAwesomeIcon icon={"cogs"} /> Analyze
            </Button>
          </Form.Row>
        </Form>
      </div>
    );
  }
}
