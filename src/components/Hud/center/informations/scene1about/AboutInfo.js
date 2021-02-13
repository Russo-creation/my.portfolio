import React, { Component } from "react";

import { Spring } from "react-spring/renderprops";
import { connect } from "react-redux";
import "../../../../../scss/Hud/center/information/scene1about/about.scss";

import Profile from "./aboutCoponents/Profile";
import Certificates from "./aboutCoponents/Certificates";
import Skills from "./aboutCoponents/Skills";

import moveSrcoll from "../scrolls/moveSrcoll";
import virtualScrollTracker from "../scrolls/virtualScrollTracker";

class AboutInfo extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the elements
    this.CertRef = React.createRef();
    this.SkillsRef = React.createRef();

    this.scrollTrackerCertRef = React.createRef();
    this.scrollTrackerSkillsRef = React.createRef();
  }

  componentDidUpdate = () => {
    const { scrollTrackPercentage } = this.props;
    //moving scroll of overflowdiv with main scrollbar
    moveSrcoll(26.6, 59.3, this.CertRef, scrollTrackPercentage);
    moveSrcoll(59.3, 90, this.SkillsRef, scrollTrackPercentage);

    //creating and manipulate scroll tracker in divs
    virtualScrollTracker(
      this.CertRef.current,
      this.scrollTrackerCertRef.current
    );

    virtualScrollTracker(
      this.SkillsRef.current,
      this.scrollTrackerSkillsRef.current
    );
  };

  render() {
    const { scrollTrackPercentage, languageSet } = this.props;

    //scolls condition to display component

    const notVisibleStartDisplay = () => {
      if (scrollTrackPercentage < 26.6) {
        return true;
      } else {
        return false;
      }
    };

    const profileDisplay = () => {
      if (scrollTrackPercentage >= 10 && scrollTrackPercentage < 26.6) {
        return true;
      } else {
        return false;
      }
    };

    const certificateDisplay = () => {
      if (scrollTrackPercentage >= 26.6 && scrollTrackPercentage < 59.3) {
        return true;
      } else {
        return false;
      }
    };

    const skillDisplay = () => {
      if (scrollTrackPercentage >= 59.3 && scrollTrackPercentage < 90) {
        return true;
      } else {
        return false;
      }
    };

    const notVisibleEndDisplay = () => {
      if (scrollTrackPercentage >= 59.3) {
        return true;
      } else {
        return false;
      }
    };

    return (
      <div id="aboutRightText">
        {notVisibleStartDisplay() ? (
          <Spring
            from={{
              ...(profileDisplay() ? { opacity: 0 } : {}),
              height: "100%",
            }}
            to={{ opacity: profileDisplay() ? 1 : 0, height: "100%", cursor: profileDisplay() ? 'auto' : 'default' }}
            config={{ duration: 600 }}
            {...(profileDisplay() ? { delay: 200 } : { delay: 0 })}
          >
            {(props) => (
              <div style={props}>
                <div id="aboutTittle">
                  {languageSet === "en" ? "PROFILE" : null}
                  {languageSet === "pl" ? "PROFIL" : null}
                </div>

                <Spring
                  from={{ height: profileDisplay() ? "0%" : "100%" }}
                  to={{ height: profileDisplay() ? "100%" : "0%" }}
                  config={{ duration: 400 }}
                  {...(profileDisplay() ? { delay: 200 } : { delay: 0 })}
                >
                  {(props2) => <div style={props2} id="aboutLine"></div>}
                </Spring>

                <div id="aboutContent">
                  <Profile />
                </div>
              </div>
            )}
          </Spring>
        ) : null}
        {certificateDisplay() ? (
          <Spring
            from={{ opacity: 0, height: "100%"}}
            to={{ opacity: 1, height: "100%" }}
            config={{ duration: 600 }}
            delay={200}
          >
            {(props) => (
              <div style={props}>
                <div id="aboutTittle">
                  {languageSet === "en" ? "CERTIFICATES" : null}
                  {languageSet === "pl" ? "CERTYFIKATY" : null}
                </div>
                <Spring
                  from={{ height: "0%" }}
                  to={{ height: "100%" }}
                  config={{ duration: 400 }}
                  delay={200}
                >
                  {(props2) => <div style={props2} id="aboutLine"></div>}
                </Spring>

                <div
                  className="virtualTracker"
                  ref={this.scrollTrackerCertRef}
                ></div>
                <div id="aboutContent" ref={this.CertRef}>
                  <Certificates />
                </div>
              </div>
            )}
          </Spring>
        ) : null}
        {notVisibleEndDisplay() ? (
          <Spring
            from={{
              ...(skillDisplay() ? { opacity: 0 } : {}),
              height: "100%",
            }}
            to={{ opacity: skillDisplay() ? 1 : 0, height: "100%", cursor: skillDisplay() ? 'auto' : 'default' }}
            config={{ duration: 600 }}
            {...(skillDisplay() ? { delay: 200 } : { delay: 0 })}
          >
            {(props) => (
              <div style={props}>
                <div id="aboutTittle">
                  {languageSet === "en" ? "SKILLS" : null}
                  {languageSet === "pl" ? "UMIEJĘTNOŚCI" : null}
                </div>
                <Spring
                  from={{ height: skillDisplay() ? "0%" : "100%" }}
                  to={{ height: skillDisplay() ? "100%" : "0%" }}
                  config={{ duration: 400 }}
                  {...(skillDisplay() ? { delay: 200 } : { delay: 0 })}
                >
                  {(props2) => <div style={props2} id="aboutLine"></div>}
                </Spring>
                <div
                  className="virtualTracker"
                  ref={this.scrollTrackerSkillsRef}
                ></div>
                <div
                  id="aboutContent"
                  ref={this.SkillsRef}
                  style={{ textAlign: "center" }}
                >
                  <Skills />
                </div>
              </div>
            )}
          </Spring>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    scrollTrackPercentage: state.s_track.scrollTrackPercentage,
    languageSet: state.lang.languageSet,
  };
};

export default connect(mapStateToProps)(React.memo(AboutInfo));
