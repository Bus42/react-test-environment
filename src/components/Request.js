import React, { Component } from "react";

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://ghibliapi.herokuapp.com",
      resources: ["films", "species", "people"]
    };
  }
  handleClick = e => {
    const output = document.getElementById("root");

    const logo = document.createElement("img");
    logo.setAttribute('src', 'logo.png');
    logo.setAttribute('alt', 'no image available');

    const container = document.createElement("div");
    container.setAttribute("class", "container");

    output.appendChild(logo);
    output.appendChild(container);

    var request = new XMLHttpRequest();
    request.open("GET", `${this.state.url}/${this.state.resources[0]}`, true);
    request.onload = function() {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
        data.forEach(movie => {
          const card = document.createElement("div");
          card.setAttribute("class", "card");

          const h1 = document.createElement("h1");
          h1.textContent = movie.title;

          const p = document.createElement("p");
          movie.description = movie.description.substring(0, 300);
          p.textContent = `${movie.description}...`;

          container.appendChild(card);
          card.appendChild(h1);
          card.appendChild(p);
        });
      } else {
        const errorMessage = document.createElement("marquee");
        errorMessage.textContent = `Gah, it's not working!`;
        output.appendChild(errorMessage);
      }
    };

    request.send();
  };
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Request Data</button>
        <div id="Request">Output will go here</div>
      </div>
    );
  }
}

export default Request;
