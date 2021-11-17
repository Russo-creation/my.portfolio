import React, { Component } from "react";
import "../scss/style.scss";

import Hud from "../components/Hud/Hud";
import ThreeInitial from "../components/three/three_initial";
import Content from "../components/Hud/center/informations/content";

import ReactGA from "react-ga4";
ReactGA.initialize("G-V8T7FK9MRX");

class App extends Component {
  componentDidMount() {
    ReactGA.send("pageview");
  }

  render() {
    return (
      <div className="App">
        <Hud />
        <ThreeInitial />
        <div id="three-noise-texture"></div>
        <div>
          <Content scrollTrackerList={this.scrollTrackerList} />
        </div>
      </div>
    );
  }
}

export default React.memo(App);
