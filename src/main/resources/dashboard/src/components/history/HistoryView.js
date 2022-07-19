import React from "react";
import "../../css/Projectview.css";
import axios from "axios";

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
      results: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/v1/csa/history")

      .then((response) => response.data)
      .then((data) => {
        this.setState({ results: data });
      });
  }

  render() {
    return (
      <div>
        {this.state.loading === false ? (
          <div>
            {this.state.results.length === 0 ? (
              <div style={box} class="shadow-sm p-3 mb-5 bg-white rounded">
                No results Found!
              </div>
            ) : (
              this.state.results.map((result) => (
                <div>
                  <div class="box">
                    <div class="container">
                      <p class="text-success font-weight-bold">
                        Analyzed Text :{result.sentence}
                      </p>
                      <hr></hr>
                      <p class="text-danger font-weight-bold">
                        Classified Class : {result.sentiment}
                      </p>

                      <p class="">Confidence : {result.confidence}</p>
                      <p class="">Positive Pobability : {result.positive}</p>
                      <p class="">Negative Pobability : {result.negative}</p>
                      <p class="">Neutral Pobability : {result.neutral}</p>
                      <p class="">Analyzed Date : {result.creationDate}</p>
                      <br></br>
                    </div>
                  </div>
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
