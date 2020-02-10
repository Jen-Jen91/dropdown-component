import React from "react";
import "./App.css";
import Dropdown from "./Dropdown/Dropdown";

function App() {
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
    <div className="app">
      <Dropdown
        placeholder="Mechanism"
        subtitle="Mechanism of Injury"
        data={mechanismData}
      />
    </div>
  );
}

export default App;
