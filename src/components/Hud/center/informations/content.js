import React, { useState, useEffect } from 'react';

import { connect } from "react-redux";
import { useSpring, animated } from 'react-spring'
import "../../../../scss/Hud/center/information/informations.scss";

import StartInfo from "./scene0start/StartInfo";
import ContactInfo from "./scene3contact/ContactInfo";
import AboutInfo from "./scene1about/AboutInfo";
import ProjectInfo from "./scene2projects/ProjectInfo";

const Content = ({
  s_track,
  actualScene,
  loadingFnished,
  scrollTrackPercentage,
}) => {

  const [scrollDownInfo, setScrollDownInfo] = useState(true);

  const [initialDelayOnScene0, setInitialDelayOnScene0] = useState(true);
  const [visibleScene0, setVisibleScene0] = useState(false);

  const [visibleScene2, setVisibleScene2] = useState(false);


  const animationScene0 = useSpring({
    from: { opacity: 0 },
    to: async (next, cancel) => {
      setInitialDelayOnScene0(false);
      if (scrollTrackPercentage <= 20) {
        setVisibleScene0(true);
        await next({ opacity: 1, config: { duration: 1000 } });
      } else {
        await next({ opacity: 0, config: { duration: 1000 } });
      }
      
    },
    onRest: () => {
      if (scrollTrackPercentage <= 20) {
        setVisibleScene0(true);
      } else {
        setVisibleScene0(false);
        setScrollDownInfo(false);
      }
    },
    delay: initialDelayOnScene0 ? 3000 : 0,
  });

  const animationScene2 = useSpring({
    from: { opacity: 0 },
    to: async (next, cancel) => {
      if (scrollTrackPercentage >= 11 && scrollTrackPercentage <= 89) {
        setVisibleScene2(true);
        await next({ opacity: 1, config: { duration: 1000 } });
      } else {
        await next({ opacity: 0, config: { duration: 1000 } });
      }
    },
    onRest: () => {
      if (scrollTrackPercentage >= 11 && scrollTrackPercentage <= 89) {
        setVisibleScene2(true);
      } else {
        setVisibleScene2(false);
      }
    },
  });

  useEffect(() => {
    if (actualScene !== 0) {
      setInitialDelayOnScene0(false);
      setScrollDownInfo(false);
    } else {
      if (scrollTrackPercentage > 20) {
        setInitialDelayOnScene0(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualScene]);

  useEffect(() => {
    if (actualScene === 0 && scrollTrackPercentage > 20) {
      setInitialDelayOnScene0(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTrackPercentage]);


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
            {actualScene === 0 && visibleScene0 ? (
              <animated.div style={animationScene0}>
                <StartInfo scrollDownInfo={scrollDownInfo} />
              </animated.div>
            )
              :
              null}
            {actualScene === 1 ? <AboutInfo /> : null}
            {actualScene === 2 && visibleScene2 ? (
              <animated.div style={animationScene2}>
                <ProjectInfo />
              </animated.div>
            ) : null}
            {actualScene === 3 ? <ContactInfo /> : null}
          </div>
        ) : null}
      </div>
    );
  } else {
    return <></>;
  }
};

const mapStateToProps = (state) => {
  return {
    s_track: state.s_track.scrollTrackSet,
    loadingFnished: state.loadScene.loadingFnished,
    actualScene: state.s_track.actualScene,
    scrollTrackPercentage: state.s_track.scrollTrackPercentage,
  };
};

export default connect(mapStateToProps)(React.memo(Content));