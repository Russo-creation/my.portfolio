import React, { Component } from "react";

import { Spring } from "react-spring/renderprops";

import { connect } from "react-redux";
import "../../../../scss/Hud/center/information/informations.scss";

import StartInfo from "./scene0start/StartInfo";
import ContactInfo from "./scene3contact/ContactInfo";
import AboutInfo from "./scene1about/AboutInfo";
import ProjectInfo from "./scene2projects/ProjectInfo";

class Informations extends Component {
  state = {
    scrollDownInfo: true,
  };

  changeScrollDownInfo = () => {
    this.setState({
      scrollDownInfo: false,
    });
  };

  componentDidUpdate() {
    const { actualScene, loadingFnished, scrollTrackPercentage } = this.props;

    //hidng scroll to discaver bottom text
    if (this.state.scrollDownInfo) {
      if (loadingFnished && (scrollTrackPercentage > 15 || actualScene > 0)) {
        this.changeScrollDownInfo();
      }
    }
  }

  render() {
    const {
      s_track,
      actualScene,
      loadingFnished,
      scrollTrackPercentage,
    } = this.props;

    //scolls condition to display component
    const startDisplay = () => {
      if (scrollTrackPercentage < 20) {
        return true;
      } else {
        return false;
      }
    };

    const projectDisplay = () => {
      if (scrollTrackPercentage >= 10 && scrollTrackPercentage < 90) {
        return true;
      } else {
        return false;
      }
    };

    if (loadingFnished) {
      return (
        <div id="wrapper">
          <div className="noiseDiv"></div>
          <div
            className="contentCage"
            id="contentStart"
            style={{ minHeight: "400vh" }}
          ></div>
          <div
            className="contentCage"
            id="contentAbout"
            style={{ minHeight: "1200vh" }}
          ></div>
          <div
            className="contentCage"
            id="contentProjects"
            style={{ minHeight: "1200vh" }}
          ></div>
          <div
            className="contentCage"
            id="contentContact"
            style={{ minHeight: "400vh" }}
          ></div>
          {actualScene === s_track ? (
            <div className="centeringContentCage">
              {actualScene === 0 ? (
                <Spring
                  {...(startDisplay() ? { from: { opacity: 0 } } : {})}
                  to={{ opacity: startDisplay() ? 1 : 0 }}
                  config={{ duration: startDisplay() ? 600 : 300 }}
                  delay={this.state.scrollDownInfo ? 3000 : 100}
                >
                  {(props) => (
                    <div style={props}>
                      <StartInfo scrollDownInfo={this.state.scrollDownInfo} />
                    </div>
                  )}
                </Spring>
              ) : null}
              {actualScene === 1 ? <AboutInfo /> : null}
              {actualScene === 2 ? (
                <Spring
                  {...(projectDisplay() ? { from: { opacity: 0 } } : {})}
                  to={{ opacity: projectDisplay() ? 1 : 0 }}
                  config={{ duration: projectDisplay() ? 400 : 300 }}
                  {...(projectDisplay() ? { delay: 200 } : { delay: 0 })}
                >
                  {(props) => (
                    <div style={props}>
                      <ProjectInfo />
                    </div>
                  )}
                </Spring>
              ) : null}
              {actualScene === 3 ? <ContactInfo /> : null}
            </div>
          ) : null}
        </div>
      );
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    s_track: state.s_track.scrollTrackSet,
    loadingFnished: state.loadScene.loadingFnished,
    actualScene: state.s_track.actualScene,
    scrollTrackPercentage: state.s_track.scrollTrackPercentage,
  };
};

export default connect(mapStateToProps)(React.memo(Informations));
