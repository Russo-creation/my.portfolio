import React from "react";
import { connect } from "react-redux";
import "../../../../../scss/Hud/center/information/scene0start/start.scss";

const StartInfo = (props) => {
  return (
    <div>
      <div id="startCenteredText">
        <div>
          {props.languageSet === "en" ? "Welcome to my portfolio" : null}
          {props.languageSet === "pl" ? "Witaj na moim portfolio" : null}
        </div>
        <div>
          {props.languageSet === "en"
            ? "Choose proper quality for best performance"
            : null}
          {props.languageSet === "pl"
            ? "wybierz jakość grafiki dla najlepszej wydajności"
            : null}
        </div>
      </div>
      {props.scrollDownInfo ? (
        <div id="downTextScroll">
          {props.languageSet === "en" ? "SCROLL TO DISCOVER" : null}
          {props.languageSet === "pl" ? "SCROLLUJ BY ZOBACZYĆ ZAWARTOŚĆ" : null}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    languageSet: state.lang.languageSet,
  };
};

export default connect(mapStateToProps)(React.memo(StartInfo));
