import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";

import "../../../scss/Hud/bottom/scrollTracker.scss";
import ScrollTrackerButton from "./ScrollTrackerButton";

class ScrollTracker extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.props.onScrollBarTrack);
  }

  render() {
    const arr = this.props.scrollTrackerList.filter(
      (list) => list.lang === this.props.languageSet
    );

    return (
      <div className="HudScrollTrackerCage">
        <div id="ScrollLeftLine"></div>
        <div id="ScrollRightLine"></div>
        <div id="ScrollBottomLine"></div>

        <div id="scrollTrackCage">
          {arr[0].list.map((item, index) => (
            <ScrollTrackerButton
              key={item.id}
              scrollText={item.varName}
              scrollTrackSet={this.props.scrollTrackSet}
              scrollTrackPercentage={this.props.scrollTrackPercentage}
              index={index}
              onManualChange={(index) => this.props.onManualChange(index)}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    scrollTrackSet: state.s_track.scrollTrackSet,
    scrollTrackPercentage: state.s_track.scrollTrackPercentage,
    languageSet: state.lang.languageSet,
    scrollTrackerList: state.s_track.scrollTrackerList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onScrollBarTrack: () =>
      dispatch({
        type: actionTypes.ScrollBarTracker,
      }),
    onManualChange: (element) =>
      dispatch({
        type: actionTypes.ManualBarTracker,
        scrollElement: element,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ScrollTracker));
