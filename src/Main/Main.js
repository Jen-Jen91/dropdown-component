import React, { Component } from "react";
import "./Main.css";
import Dropdown from "../Dropdown/Dropdown";

class Main extends Component {
  render() {
    const mechanismData = [
      "Abrasion",
      "Blunt",
      "Burn",
      "Frost",
      "Gun Shot",
      "Laceration",
      "RTC",
      "Stab"
    ];

    return (
      <div className="main">
        <Dropdown
          placeholder="Mechanism"
          subtitle="Mechanism of Injury"
          data={mechanismData}
        />
      </div>
    );
  }
}

export default Main;
