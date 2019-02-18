import React, { Component } from "react";
import MapContent from "./MapContent";
import universitiesInQingDao from './universities';

import "./css/style.css";
import "./css/bootstrap.css";

class App extends Component {

  render() {
    return (
      <div className="App">
        <MapContent
          allUniversities={universitiesInQingDao}
        />
      </div>
    );
  }
}

export default App;
