import React, { Component } from "react";

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "...loading",
      base_URL: "http://www.filltext.com",
      endpoints: [],
      params: ["rows=10", "name={firstName}"]
    };
  }

  addEndPoints = ([...newURL]) => {
    return new Promise((resolve, reject) => {
      for(let i = 0; i < this.state.endpoints; i++){
        console.log(`Endpoint: %c${this.state.endpoints[i]}`, "color: orange");
        newURL.push(this.state.endpoints[i])
      }
      let URLWithEndPoints = newURL;
      resolve(URLWithEndPoints)
    });
  }
  
  addParams = ([...newURL]) => {
    return new Promise((resolve, reject) => {
      if (this.state.params.length > 0) {
        newURL.push("?");
        for (let i = 0; i < this.state.params.length; i++) {
          console.log(`Parameter: %c${this.state.params[i]}`, "color: orange");
          newURL.push(
            this.state.params[i + 1] !== null &&
              this.state.params[i + 1] !== undefined
              ? `${this.state.params[i]}&`
              : newURL.push(this.state.params[i])
          );
        }
      }
      let final_URL = newURL.join("");//convert into URL string to pass into makeRequest
      resolve(final_URL);
    });
  };
  buildURL = () => {
    return new Promise((resolve, reject) => {
      let newURL = [this.state.base_URL]; //put base url into array so I can add endpoints and parameters
      this.addEndPoints(newURL)//returns URLWithEndPoints
      .then( URLWithEndPoints => this.addParams(URLWithEndPoints))//returns final_URL
      .then(final_URL => resolve(final_URL))
    });
  };

  componentWillMount() {
    this.buildURL().then(final_URL => this.makeRequest(final_URL));
  }

  makeRequest = URL => {
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
