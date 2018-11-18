import React, { Component } from "react";

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "...loading",
      url: "http://www.filltext.com?rows=10&f={firstName}"
    };
  }

  componentDidMount() {
    let r = new XMLHttpRequest();
    r.open("GET", this.state.url, true);
    r.onreadystatechange = () => {
      if (r.readyState !== 4 || r.status !== 200) return;
      var data = JSON.parse(r.responseText);
      this.setState({ data });
    };
    r.send();
  }

  render() {
    let divStyle = {backgroundColor:'#424242',color: '#AFAFAF', minHeight:'100vh', width: '100vw',margin:'0',padding:'20px',boxSizing:'border-box'};
    return (
      <div style={divStyle}>
        <div><pre>{JSON.stringify(this.state.data, null, 2)}</pre></div>
      </div>
    );
  }
}

export default Request;
 