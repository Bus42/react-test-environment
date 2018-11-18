import React, { Component } from "react";

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "...loading",
      base_URL: "https://ghibliapi.herokuapp.com", //change base_URL to consument different API
      endpoints: ["/films"], //edit endpoints to what you will be using for the request
      parameters: ["limit=2"] //same for parameters
    };
  }

  addEndPoints = ([...newURL]) => {
    //not necessary to spread, but makes code more readable - reader knows this expects an array
    console.group("addEndPoints()");
    let urlWithEndpoints = [...newURL];
    return new Promise((resolve, reject) => {
      this.state.endpoints.map((endpoint, index) => {
        console.log(
          `Endpoint: %c${this.state.endpoints[index]}`,
          "color: orange"
        );
        urlWithEndpoints.push(this.state.endpoints[index]);
        return null;
      });
      resolve(
        urlWithEndpoints,
        console.log(`%curlWithEndpoints = ${urlWithEndpoints}`, "color: orange")
      );
      console.groupEnd();
    });
  };

  addParams = ([...newURL]) => {
    console.group("addParams()");
    return new Promise((resolve, reject) => {
      if (this.state.parameters.length > 0) {
        newURL.push("?");
        this.state.parameters.map((parameter, index) => {
          console.log(
            `Parameter: %c${this.state.parameters[index]}`,
            "color: orange"
          );
          newURL.push(
            this.state.parameters[index + 1] !== null &&
              this.state.parameters[index + 1] !== undefined
              ? `${this.state.parameters[index]}&`
              : newURL.push(this.state.parameters[index])
          );
          return null;
        });
      }
      let final_URL = newURL.join(""); //convert into URL string to pass into makeRequest
      console.log(`%c${final_URL}`, "color: orange");
      resolve(final_URL);
      console.groupEnd();
    });
  };
  buildURL = () => {
    console.group("buildURL");
    return new Promise((resolve, reject) => {
      let newURL = [this.state.base_URL]; //put base url into array so I can add endpoints and parameters
      this.addEndPoints(newURL) //returns urlWithEndpoints
        .then(urlWithEndpoints => this.addParams(urlWithEndpoints)) //returns final_URL
        .then(final_URL => resolve(final_URL));
      console.groupEnd();
    });
  };

  componentWillMount() {
    this.buildURL().then(final_URL => this.makeRequest(final_URL));
  }

  makeRequest = URL => {
    console.log(`%c${URL}`, "color: #007ACC");
    let r = new XMLHttpRequest();
    r.open("GET", URL, true);
    r.onreadystatechange = () => {
      if (r.readyState !== 4 || r.status !== 200) return;
      var data = JSON.parse(r.responseText);
      this.setState({ data });
    };
    r.send();
  };

  render() {
    let divStyle = {
      backgroundColor: "#424242",
      color: "#AFAFAF",
      minHeight: "100vh",
      width: "100vw",
      margin: "0",
      padding: "20px",
      boxSizing: "border-box"
    };
    return (
      <div style={divStyle}>
        <div>
          <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

export default Request;
