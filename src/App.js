import React from "react";
import Dropdown from "./Dropdown/Dropdown";
import "./App.scss";

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
    <main className="app">
      <Dropdown
        placeholder="Mechanism"
        subtitle="Mechanism of Injury"
        listData={mechanismData}
      />
    </main>
  );
}

export default App;
