import React, { Component } from "react";
import "./Main.css";
import Dropdown from "../Dropdown/Dropdown";

class Main extends Component {
  render() {
    return (
      <div className="main">
        <h1>MAIN</h1>
        <Dropdown />
      </div>
    );
  }
}

export default Main;
