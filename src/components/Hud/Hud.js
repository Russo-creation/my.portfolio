import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

import LoadingWindow from "./center/loader/LoadingWindow";

import Logo from "./top/logo/Logo";
import Menu from "./top/menu/Menu";
import ScrollTracker from "./bottom/ScrollTracker";

import "../../scss/Hud/hud.scss";

class Hud extends Component {
  componentDidMount() {
    window.addEventListener("resize", this.props.onWindowResize);

    this.props.onWindowResize();
  }

  render() {
    return (
      <>
        {this.props.loadingFnished ? null : <LoadingWindow />}

        <Logo />

        <Menu />
        <ScrollTracker />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loadingFnished: state.loadScene.loadingFnished,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onWindowResize: () =>
      dispatch({
        type: actionTypes.MenuHideShow,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Hud));
