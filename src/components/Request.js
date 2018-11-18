import React, { Component } from "react";
import { type } from "os";

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "...loading",
      base_URL: "https://ghibliapi.herokuapp.com",            // Change base_URL to consume a different API
      endpoints: ["/films"],                                  // Edit endpoints to what you will be using for the request. Do not delete, if not using endpoint, set to empty array
      parameters: ["limit=2", "fields=title,description,url"] // Edit parameters to what you will be using for the request. Do not delete, if not using parameters, set to empty array
    };
  }

  addEndPoints = ([...newURL]) => {
    //not necessary to spread, but spreading is non-destructive and makes code more readable - reader can deduce that this method expects an array
    console.groupCollapsed("addEndPoints()");
    let urlWithEndpoints = [...newURL];
    return new Promise((resolve, reject) => {
      this.state.endpoints.map((endpoint, index) => {
        console.log(
          `Endpoint: %c${endpoint}`,
          "color: orange"
        );
        urlWithEndpoints.push(endpoint);
        return null;
      });
      resolve(
        urlWithEndpoints,
        console.log(`%curlWithEndpoints = ${typeof(urlWithEndpoints)}: ${urlWithEndpoints}`, "color: orange")
      );
      reject(error => console.log(`%c${error}`, 'color: #f9450e'))
      console.groupEnd();
    });
  };

  addParams = ([...newURL]) => {
    console.groupCollapsed("addParams()");
    return new Promise((resolve, reject) => {
      if (this.state.parameters.length > 0) {
        newURL.push("?");
        this.state.parameters.map((parameter, index) => {
          console.log(
            `Parameter: %c${parameter}`,
            "color: orange"
          );
          newURL.push(
            this.state.parameters[index + 1] !== null &&
              this.state.parameters[index + 1] !== undefined
              ? `${parameter}&`
              : newURL.push(parameter)
          );
          return null;
        });
      }
      let final_URL = newURL.join(""); //convert into URL string to pass into makeRequest
      console.log(`%cfinal_URL = ${type(final_URL)}: ${final_URL}`, "color: orange");
      resolve(final_URL);
      reject(error => console.log(`%c${error}`, 'color: #f9450e'))
      console.groupEnd();
    });
  };
  buildURL = () => {
    console.groupCollapsed("buildURL");
    return new Promise((resolve, reject) => {
      let newURL = [this.state.base_URL]; //put base url into array so I can add endpoints and parameters
      this.addEndPoints(newURL) //returns urlWithEndpoints
        .then(urlWithEndpoints => this.addParams(urlWithEndpoints)) //returns final_URL
        .then(final_URL => resolve(final_URL))
        .catch(error => reject(error => console.log(`%c${error}`, 'color: #f9450e')))
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
