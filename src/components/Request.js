import React, { Component } from "react";

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "...loading",
      base_url: "http://www.filltext.com",
      params: ["rows=10", "name={firstName}"],
      final_url: ""
    };
  }

  buildURL = () => {
    let newURL = [this.state.base_url];
    if (this.state.params.length > 0) {
      newURL.push("?");
      for (let i = 0; i < this.state.params.length; i++) {
        console.log(this.state.params[i]);
        if (
          this.state.params[i + 1] !== null &&
          this.state.params[i + 1] !== undefined
        ) {
          newURL.push(`${this.state.params[i]}&`);
        } else {
          newURL.push(this.state.params[i]);
        }
      }
    }
    let final_url = newURL.join("");
    this.setState({ final_url });
  };

  componentWillMount() {
    this.buildURL();
  }

  componentDidMount() {
    this.makeRequest();
  }

  makeRequest = () => {
    let r = new XMLHttpRequest();
    r.open("GET", this.state.final_url, true);
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
