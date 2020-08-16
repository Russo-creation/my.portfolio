import React from "react";
import "../../../../scss/Hud/center/loader/loadingWindow.scss";
import { connect } from "react-redux";

import TopEffectImage from "../../../../images/loader/loading-top.png";
import qrCodeImage from "../../../../images/loader/qr-code.png";

const LoadingWindow = (props) => {
  return (
    <div id="loaderWindowCage">
      <div
        id="loaderImageTop"
        style={{ backgroundImage: "url(" + TopEffectImage + ")" }}
      ></div>

      <div className="LoaderFoldCage TaskCage">
        <p className="loaderTittle">task</p>
        <p className="loaderText">system initial</p>
      </div>
      <div className="hrDiv"></div>
      <div className="LoaderFoldCage TerminalCage">
        <p className="loaderTittle">terminal</p>
        <p className="loaderText">&gt; system init</p>
        <p className="loaderText">&gt; cd ./myportfolio</p>
        <p className="loaderText">&gt; npm start</p>
        <p className="loaderText">&gt; loading 3d assets</p>
        <p className="loaderText">
          &gt; {props.loadingProgress}% <span>_</span>
        </p>
        <div
          id="qrCode"
          style={{ backgroundImage: `url(${qrCodeImage})` }}
        ></div>
      </div>
      <div className="hrDiv hrDivLoadingCage"></div>
      <div className="LoaderFoldCage LoadingCage">
        <p className="loaderTittle">loading</p>
        <div id="proggressBarCage">
          <div
            id="proggressBar"
            style={{ width: props.loadingProgress + "%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loadingProgress: state.loadScene.loadingProgress,
  };
};

export default connect(mapStateToProps)(LoadingWindow);
