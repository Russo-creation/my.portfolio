import React from "react";
import { connect } from "react-redux";
import "../../../../../scss/Hud/center/information/scene0start/start.scss";

const StartInfo = ({ languageSet, scrollDownInfo }) => {
  return (
    <div>
      <div id="startCenteredText">
        <div>
          {languageSet === "en" ? "Welcome to my portfolio" : null}
          {languageSet === "pl" ? "Witaj na moim portfolio" : null}
        </div>
        <div>
          {languageSet === "en"
            ? "Choose proper quality for best performance"
            : null}
          {languageSet === "pl"
            ? "wybierz jakość grafiki dla najlepszej wydajności"
            : null}
        </div>
      </div>
      {scrollDownInfo ? (
        <div id="downTextScroll">
          {languageSet === "en" ? "SCROLL TO DISCOVER" : null}
          {languageSet === "pl" ? "SCROLLUJ BY ZOBACZYĆ ZAWARTOŚĆ" : null}
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
