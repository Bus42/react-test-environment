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
    let styles = {
        Request: {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'flex-start',
            backgroundColor: '#007ACC'
        },
      li: {
        padding: "8px",
        margin: "5px",
        borderRadius: "8px",
        boxShadow: "2px 3px 6px blue",
        flex: '1 1 auto',
        backgroundColor: '#424242',
        border: "3px solid #434343",
        color: 'white'
      },
      ul: {
        listStyleType: "none",
        display: 'flex',
        flexFlow: 'row wrap'
      }
    };
    let listItems = [];
    let response = JSON.stringify(this.state.data);
    let r = response.replace(/[^a-z:]/gi, " ").split(/,/)[0];
    r.split(/\s\s+/).forEach(item => {
      if (item.length > 0) {
        listItems.push(item);
      }
    });
    let list = [...listItems];
    return (
      <div id="Request" style={styles.Request}>
        <ul style={styles.ul}>
          {list.map(item => (
            <li style={styles.li} key={Math.random()}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Request;
