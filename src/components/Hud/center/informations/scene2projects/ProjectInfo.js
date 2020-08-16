import React, { Component } from "react";
import { connect } from "react-redux";
import "../../../../../scss/Hud/center/information/scene2projects/project.scss";

import PopulateProject from "./projectComponents/PopulateProject";
import moveSrcoll from "../scrolls/moveSrcoll";
import virtualScrollTracker from "../scrolls/virtualScrollTracker";

class ProjectInfo extends Component {
  constructor(props) {
    super(props);

    // create a ref to store the elements
    this.projectRef = React.createRef();
    this.scrollTrackerRef = React.createRef();
  }

  componentDidUpdate() {
    const { scrollTrackPercentage } = this.props;
    moveSrcoll(10, 90, this.projectRef, scrollTrackPercentage);
    virtualScrollTracker(
      this.projectRef.current,
      this.scrollTrackerRef.current
    );
  }

  LineStyles = (lineWidth, lineMarginRight) => {
    return { width: lineWidth + "px", marginRight: lineMarginRight + "px" };
  };

  render() {
    return (
      <div id="projectRightText">
        <div className="projectLines" style={this.LineStyles(1, 3)}></div>
        <div className="projectLines" style={this.LineStyles(3, 0)}></div>
        <div className="virtualTracker" ref={this.scrollTrackerRef}></div>
        <div id="projectContent" ref={this.projectRef}>
          <PopulateProject />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    scrollTrackPercentage: state.s_track.scrollTrackPercentage,
  };
};

export default connect(mapStateToProps)(React.memo(ProjectInfo));
