import React, { Component } from "react";
import "./App.css";
import AppRouter from "./components/appRouter/AppRouter";
class App extends Component {
  render() {
    return (<main id="app-wrapper">
    <AppRouter/>
    </main>);
  }
}

export default App;
