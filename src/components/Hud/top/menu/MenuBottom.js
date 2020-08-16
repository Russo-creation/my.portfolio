import React from "react";
import { connect } from "react-redux";
import MenuBottomButtons from "./buttons/MenuBottomButtons";
import "../../../../scss/Hud/top/menu/menuBottom.scss";
import { useSpring, animated } from "react-spring";

const SvgCross = (props) => {
  const crossPath =
    "M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z";

  return (
    <svg width="14" height="14" viewBox="-4 -4 30 30">
      <path d={crossPath} />
    </svg>
  );
};

const BottomMenu = (props) => {
  const {
    languageSet,
    menuBottom,
    fpsBottomMenu,
    qualityBottomMenu,
    languageBottomMenu,
  } = props;

  let tittleText;
  if (menuBottom === 0) {
    const arr = fpsBottomMenu.filter((array) => array.lang === languageSet);
    tittleText = arr[0].varName;
  } else if (menuBottom === 1) {
    const arr = qualityBottomMenu.filter((array) => array.lang === languageSet);
    tittleText = arr[0].varName;
  } else if (menuBottom === 2) {
    const arr = languageBottomMenu.filter(
      (array) => array.lang === languageSet
    );
    tittleText = arr[0].varName;
  }

  const propsAnim = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 400 },
  });

  return (
    <>
      <animated.div style={propsAnim} className="menuChooseCage">
        <div className="titleClose">
          <div style={{ float: "left" }}>{tittleText}</div>
          <div id="close" onClick={() => props.handleClickCloseMenuBottom()}>
            {languageSet === "en" ? "close" : "zamknij"} <SvgCross />
          </div>
          <div id="titleLine"></div>
        </div>
      </animated.div>

      <div className="buttonsLine">
        <MenuBottomButtons menuBottom={menuBottom} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    fpsBottomMenu: state.fps.fpsBottomMenu,

    qualityBottomMenu: state.quality.qualityBottomMenu,

    languageBottomMenu: state.lang.languageBottomMenu,
    languageSet: state.lang.languageSet,
  };
};

export default connect(mapStateToProps)(React.memo(BottomMenu));
