/**
 * In theory, you should only have to edit the requestConfig file to make a request.
 * You should only need to edit this file to process the request.
 */
import React, { Component } from "react";
import config from './requestConfig';


class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "...loading"
    };
  }

  addEndPoints = ([...newURL]) => {
    //not necessary to spread, but spreading is non-destructive and makes code more readable - reader can deduce that this method expects an array
    console.groupCollapsed("addEndPoints()");
    let urlWithEndpoints = [...newURL];
    return new Promise((resolve, reject) => {
      config.endpoints.map((endpoint, index) => {
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
      if (config.parameters.length > 0) {// If parameters are present
        newURL.push("?");// Begin query section of URL string
        config.parameters.map((parameter, index) => {
          console.log(
            `Parameter: %c${parameter}`,
            "color: orange"
          );
          newURL.push(
            config.parameters[index + 1] !== null &&
              config.parameters[index + 1] !== undefined
              ? `${parameter}&`
              : newURL.push(parameter)// if there is another parameter after the current one, add a combinator
          );
          return null;
        });
      }
      newURL.splice(newURL.length -1, 1);//Don't know why but a single digit was always at the end of the array
      let final_URL = newURL.join(""); //convert into URL string to pass into makeRequest
      console.log(`%cfinal_URL = ${typeof(final_URL)}: ${final_URL}`, "color: orange");
      resolve(final_URL);
      reject(error => console.log(`%c${error}`, 'color: #f9450e'))
      console.groupEnd();
    });
  };
  buildURL = () => {
    console.groupCollapsed("buildURL");
    return new Promise((resolve, reject) => {
      let newURL = [config.base_URL]; //put base url into array so I can add endpoints and parameters
      this.addEndPoints(newURL) //returns urlWithEndpoints
        .then(urlWithEndpoints => this.addParams(urlWithEndpoints)) //returns final_URL
        .then(final_URL => resolve(final_URL))
        .catch(error => reject(error => console.log(`%c${error}`, 'color: #f9450e')))
      console.groupEnd();
    });
  };

  componentWillMount() {
    this.buildURL().then(final_URL => this.makeRequest(final_URL));
  };

  makeRequest = URL => {
    console.groupCollapsed('makeRequest()')
    console.log(`%cRequest URL is ${URL}`, "color: #007ACC");
    let r = new XMLHttpRequest();
    r.open("GET", URL, true);
    r.onreadystatechange = () => {
      if (r.readyState !== 4 || r.status !== 200) return;
      var data = JSON.parse(r.responseText);
      this.processData(data);
    };
    r.send();
    console.groupEnd();
  };

  processData = input => {
    return new Promise((resolve, reject) => {
      //
      let data = input; //Replace this with your logic
      //
      resolve(this.setState({data}))
      reject(error => console.log(error))
    });
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
};

export default Request;