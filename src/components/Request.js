import React, { Component } from "react";

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "...loading",
      base_URL: "http://www.filltext.com",
      params: ["rows=10", "name={firstName}"]
    };
  }

  addParams = ([...newURL]) => {
    return new Promise((resolve, reject) => {
      if (this.state.params.length > 0) {
        newURL.push("?");
        for (let i = 0; i < this.state.params.length; i++) {
          console.log(this.state.params[i]);
          newURL.push(
            this.state.params[i + 1] !== null &&
              this.state.params[i + 1] !== undefined
              ? `${this.state.params[i]}&`
              : newURL.push(this.state.params[i])
          );
        }
      }
      let final_URL = newURL.join("");
      resolve(final_URL);
    });
  };

  buildURL = () => {
    let newURL = [this.state.base_URL]; //put base url into array so I can add endpoints and parameters
    this.addParams(newURL) //returns final_URL
      .then(final_URL => {
        this.makeRequest(final_URL);
      });
  };

  componentWillMount() {
    this.buildURL();
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
