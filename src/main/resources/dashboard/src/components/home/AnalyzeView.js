import React, {Component} from "react";

import {Col, Form} from "react-bootstrap";
import axios from "axios";
import "../../css/Issue.css";

export default class AnalyzeView extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    this.state.output = "";
    this.projectChange = this.projectChange.bind(this);
    this.submitProject = this.submitProject.bind(this);
  }

  initialState = {
    text: "",
    probabilities: {},
  };

  resetProject = () => {
    this.setState(() => this.initialState);
  };

  submitProject = (event) => {
    event.preventDefault();

    const text = {
      text: this.state.name,
    };

    axios
      .post("http://localhost:8080/api/v1/csa/analyse", text)
      .then((response) => {
        console.log(response);
        if (response.data != null) {
          console.log("response", response.data);
          this.setState({ show: true });
          this.setState({ output: response.data });
          this.setState({ probabilities: response.data.probabilities });
          console.log("set output", this.state);
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
    const { name } = this.state;

    return (
      <div>
        <div class="jumbotron jumbotron-fluid jumbo_style jumbo-img">
          <div class="container">
            <h1 class=" font-weight-bold text-dark">
              CoVacciMOOD Sentiment Analayzer
            </h1>
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
            <button type="submit" class="btn btn-outline-success btn_size">
              Analyze
            </button>
          </Form.Row>
        </Form>
        {this.state.show === true ? (
          <div class="box">
            <div class="container">
              <h3 class="font-weight-light">Prediction Result</h3>
              <hr></hr>
              <p class="text-danger font-weight-bold">
                Classified Class : {this.state.output.sentiment}
              </p>
              <hr></hr>
              <br></br>
              <p class="">
                Positive Pobability : {this.state.probabilities.positive}
              </p>
              <p class="">
                Negative Pobability : {this.state.probabilities.negative}
              </p>
              <p class="">
                Neutral Pobability : {this.state.probabilities.neutral}
              </p>
              <br></br>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {this.state.loading === true ? (
          <div class="box">
            <div class="container"></div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
