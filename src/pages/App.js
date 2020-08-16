import React, { Component } from "react";
import "../scss/style.scss";

import Hud from "../components/Hud/Hud";
import ThreeInitial from "../components/three/three_initial";
import Informations from "../components/Hud/center/informations/Informations";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Hud />
        <ThreeInitial />
        <div id="three-noise-texture"></div>
        <div>
          <Informations scrollTrackerList={this.scrollTrackerList} />
        </div>
      </div>
    );
  }
}

export default React.memo(App);
