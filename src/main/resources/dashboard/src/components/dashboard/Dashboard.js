import React from "react";
import axios from "axios";
import "../../css/Issue.css";
import Chart from "react-apexcharts";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

const x = {
  enabled: true,
  easing: "easeinout",
  speed: 5000,
  animateGradually: {
    enabled: true,
    delay: 1000,
  },
  dynamicAnimation: {
    enabled: true,
    speed: 1000,
  },
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    /* this.state = {
          loading: false,
          issues: [],
          disabled: false,
          options: {
            labels: [],
            chart: {
              foreColor: "#b3b3b3",
            },
          },
          series: [],
        }; */
    /* this.state1 = {
          options: {
            labels: ["Positive", "Negative", "Neutral"],
          },
          series: [44, 55, 41],
        }; */

    this.state = {
      chart_2_options: {
        labels: ["?","?","?"],
        chart: {
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 8000,
            animateGradually: {
              enabled: true,
              delay: 1500,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 3500,
            },
          },
        },
      },
      chart_2_series: [0, 0, 1],
      options: {
        chart: {
          id: "basic-bar",
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 1500,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 1500,
            },
          },
        },
        xaxis: {
          categories: [],
        },
        theme: {
          monochrome: {
            enabled: true,
            color: "#255aee",
            shadeTo: "light",
            shadeIntensity: 0.65,
          },
        },
      },
      series: [
        {
          name: "series-1",
          data: [0, 0, 0],
        },
      ],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/v1/csa/charts/options")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ chart_2_options: { labels: data } });
        this.setState({ options: { xaxis: { categories: data } } });
        this.setState({
          chart_2_options: { chart: { animations: x } },
        });
      });

    axios
      .get("http://localhost:8080/api/v1/csa/charts/series")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ chart_2_series: data });
        this.setState({ series: [{ data: data }] });
        this.setState({
          chart_2_options: { chart: { animations: x } },
        });
        console.log(this.state, "state");
      });
  }

  render() {
    // console.log(this.props.location);
    //console.log(this.props.location.state.project_key);
    console.log(this.state, "state");

    return (
      <div>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title></Card.Title>
              <div class="jumbotron jumbotron-fluid box">
                <div class="container">
                  <h3 class=" font-weight-bold text-dark">
                    Welcome To CoVacciMOOD Dashboard...
                  </h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </CardGroup>
        <br></br>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>
                Analysed Text Count {this.state.count} 125
              </Card.Title>
              <div className="app">
                <div className="row">
                  <div className="mixed-chart">
                    <Chart
                      options={this.state.options}
                      series={this.state.series}
                      type="bar"
                      width="500"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Prediction Summary</Card.Title>
              <div class="box">
                <div className="donut">
                  <Chart
                    options={this.state.chart_2_options}
                    series={this.state.chart_2_series}
                    type="donut"
                    width="380"
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    );
    window.location.reload();
  }
}

export default Dashboard;
