import * as React from "react";

import Dropdown from "./ui/Dropdown";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Dropdown
        multiSelect
        id="flavors"
        fieldLabel="Flavors"
        choices={["chocolate", "banana", "strawberry"]}
      />
      <br />
      <Dropdown
        id="flavors"
        fieldLabel="Flavors"
        choices={["chocolate", "banana", "strawberry"]}
      />
    </div>
  );
}

export default App;
