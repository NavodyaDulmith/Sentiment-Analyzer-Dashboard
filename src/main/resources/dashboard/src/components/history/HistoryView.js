import React from "react";
import "../../css/Projectview.css";
import axios from "axios";

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
      results: [
        /* {
          id: 1,
          sentence:
            "Sample Text 111111111111111111111111111111111111111111111111111111",
          confidence: "0.999885082244873",
          negative: "0.999885082244873",
          neutral: "8.876612992025912e-05",
          positive: "2.614063305372838e-05",
          creationDate: "March 8th 2022",
          sentiment: "Negative",
        },
        {
          id: 1,
          sentence:
            "Sample Text 22222222222222222222222222222222222222222222222222222222",
          confidence: "0.999885082244873",
          negative: "0.999885082244873",
          neutral: "8.876612992025912e-05",
          positive: "2.614063305372838e-05",
          creationDate: "March 8th 2022",
          sentiment: "Positive",
        },
        {
          id: 1,
          sentence:
            "Sample Text 333333333333333333333333333333333333333333333333333333333",
          confidence: "0.999885082244873",
          negative: "0.999885082244873",
          neutral: "8.876612992025912e-05",
          positive: "2.614063305372838e-05",
          creationDate: "March 8th 2022",
          sentiment: "Neutral",
        },
        {
          id: 1,
          sentence:
            "Sample Text 444444444444444444444444444444444444444444444444444444444",
          confidence: "0.999885082244873",
          negative: "0.999885082244873",
          neutral: "8.876612992025912e-05",
          positive: "2.614063305372838e-05",
          creationDate: "March 8th 2022",
          sentiment: "Negative",
        }, */
      ],
    };
  }

  componentDidMount() {
    /* this.setState({loading: true}); */
    axios
      .get("http://localhost:8080/api/v1/csa/history")
      //.then(response => console.log(response.data))
      .then((response) => response.data)
      .then((data) => {
        console.log(data, "results");
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

                  {/* <div class="box">
                    <div style={box} class="container ">
                      <div class="text-grey font-weight-bold">
                        Analaysed Text :{" "}
                        <p class="text-success">{result.sentence}</p>
                      </div>
                      <hr />
                      <div class="column font-weight-bold text-center text-danger">
                        {result.sentiment}
                        <p class="p-1 font-weight-normal font-italic text-grey">
                          Sentiment
                        </p>
                      </div>
                      <div>
                        <div class="column font-weight-normal text-center">
                          {result.confidence}
                          <p class="p-1 font-weight-normal font-italic text-grey">
                            Confidence
                          </p>
                        </div>
                        <div class="column  font-weight-normal text-center">
                          {result.creationDate}
                          <p class="p-1 font-weight-normal font-italic text-grey">
                            Last Analysis Date
                          </p>
                        </div>

                        <div class="column font-weight-normal text-center">
                          {result.negative}
                          <p class="p-1 font-weight-normal font-italic text-grey">
                            Negative probability
                          </p>
                        </div>

                        <div class="column font-weight-normal text-center">
                          {result.neutral}
                          <p class="p-1 font-weight-normal font-italic text-grey">
                            Neutral probability
                          </p>
                        </div>

                        <div class="column font-weight-normal text-center ">
                          {result.positive}
                          <p class="p-1 font-weight-normal font-italic text-grey">
                            Positive probability
                          </p>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div> */}
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
