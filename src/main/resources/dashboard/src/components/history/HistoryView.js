import React from "react";
import {Link} from "react-router-dom";
import "../../css/Projectview.css";
import Chart from "react-apexcharts";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faSyncAlt, faTrash,} from "@fortawesome/free-solid-svg-icons";

const mystyle = {
  float: "right",
  "font-size": "14px",
  color: " #a1a1a1",
  height: "10px",
};

const style = {
  background: "linear-gradient(to right, #414345, #232526)",
};

const box = {
  "margin-bottom": "10px",
  width: "100%",
  "max-width": "100%",
  display: "inline-block",
};

const Loader = () => (
  <div class="divLoader">
    <svg class="svgLoader" viewBox="0 0 100 100" width="5em" height="5em">
      <path
        stroke="none"
        d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
        fill="#51CACC"
        transform="rotate(179.719 50 51)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 51;360 50 51"
          keyTimes="0;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        ></animateTransform>
      </path>
    </svg>
  </div>
);
export default class HistoryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      projects: [
        {
          id: 1,
          name: "Signal Server",
          key: "signal",
          violations: "249",
          loc: "13000",
          effort: "7d 1h",
          creationDate: "March 8th 2021",
          path: "D:/Projects/Test/Signal-Server-master",
        },
        {
          id: 2,
          name: "Whatsapp",
          key: "wt",
          violations: "678",
          loc: "24562",
          effort: "5d 1h",
          creationDate: "March 10th 2021",
          path: "",
        },
        {
          id: 3,
          name: "Project 3",
          key: "wt",
          violations: "1245",
          loc: "24562",
          effort: "5d 1h",
          creationDate: "March 10th 2021",
          path: "",
        },
        {
          id: 4,
          name: "Project 4",
          key: "wt",
          violations: "1956",
          loc: "24562",
          effort: "5d 1h",
          creationDate: "March 10th 2021",
          path: "",
        },
      ],
      options: {
        /* labels: ["Signal Server", "Whatsapp", "Project 3", "Project 4"], */
        labels: [],
        chart: {
          foreColor: "#b3b3b3",
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 3000,
            animateGradually: {
              enabled: true,
              delay: 150,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            },
          },
        },
      },
      /* series: [249, 678, 1245, 1956], */
      series: [],
    };
  }

  componentDidMount() {
    /*this.setState({loading: true});
    axios
        .get("http://localhost:8080/api/v1/cvf/projects")
        //.then(response => console.log(response.data))
        .then((response) => response.data)
        .then((data) => {
          console.log(data, "projects");
          this.setState({projects: data});
        });

    axios
        .post("http://localhost:8080/api/v1/cvf/chart")
        .then((response) => response.data)
        .then((data) => {
          this.setState({options: {labels: data.options}});
          this.setState({series: data.series});
          this.setState({loading: false});
        });*/
  }

  rescan = (pid) => {
    const id = { id: pid };
    alert("Project Rescanning Started!");
    axios
      .post("http://localhost:8080/api/v1/cvf/rescan", id)
      .then((response) => response.data)
      .then((data) => {
        alert("Project Rescanning Completed!");
      });
  };

  delete = (pid) => {
    const id = { id: pid };
    axios
      .post("http://localhost:8080/api/v1/cvf/delete", id)
      .then((response) => response.data)
      .then((data) => {
        window.location.reload();
      });
  };

  render() {
    return (
      <div>
        {this.state.loading === false ? (
          <div>
            <hr class="my-3" />
            <div class="jumbotron bg-secondary text-white background">
              <div id="left">
                <h1 class="display-4">
                  {this.state.projects.length} Projects Analyzed
                </h1>
                <hr class="my-3" />
              </div>
              <div id="right">
                <div className="donut">
                  <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="donut"
                    width="380"
                  />
                </div>
              </div>
            </div>
            <div class="bg-dark text-white" style={box}>
              <div class="card-body">
                <div class="text-grey text-left">
                  Projects{" "}
                  <Link to={"/addProject"} style={mystyle}>
                    <FontAwesomeIcon icon={faPlusSquare} /> New Project
                  </Link>
                </div>
              </div>
            </div>

            {this.state.projects.length === 0 ? (
              <div style={box} class="shadow-sm p-3 mb-5 bg-white rounded">
                No Projects Found!
              </div>
            ) : (
              this.state.projects.map((project) => (
                <div style={box} class="p-3 bg-dark rounded text-white ">
                  <Link
                    style={{ color: "white" }}
                    class="h5"
                    to={{
                      pathname: "/viewIssues",
                      state: {
                        project_name: project.name,
                        project_key: project.sonarProjectKey,
                        project_path: project.projectPath,
                      },
                    }}
                  >
                    {project.name}
                  </Link>

                  <FontAwesomeIcon
                    icon={faSyncAlt}
                    style={mystyle}
                    onClick={this.rescan.bind(this, project.id)}
                  />

                  <FontAwesomeIcon
                    icon={faTrash}
                    style={mystyle}
                    onClick={this.delete.bind(this, project.id)}
                  />
                  <hr />
                  <div>
                    <div class="column text-center text-danger">
                      {project.violations}
                      <p class="p-1 font-weight-light font-italic text-grey">
                        Code Violations
                      </p>
                    </div>

                    <div class="column text-center text-warning">
                      {project.effort} min
                      <p class="p-1 font-weight-light font-italic text-grey">
                        Effort
                      </p>
                    </div>
                    <div class="column text-center">
                      {project.creationDate}
                      <p class="p-1 font-weight-light font-italic text-grey">
                        Last Analysis Date
                      </p>
                    </div>
                  </div>
                  <br />
                </div>
              ))
            )}

            <hr class="my-4" />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}
