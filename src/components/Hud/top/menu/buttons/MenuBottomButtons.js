import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../store/actions";

import { useSpring, animated } from "react-spring";

const MenuBottomButton = (props) => {
  const propsAnim = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 400 },
  });

  return (
    <animated.div
      style={propsAnim}
      className={`buttonCage ${props.selected ? "selectedButton" : null}`}
      onClick={props.menuBottom !== 0 ? () => props.handleClick() : null}
    >
      <div>{props.title}</div>
    </animated.div>
  );
};

const MenuBottomButtons = (props) => {
  if (props.menuBottom === 0) {
    return (
      <>
        <MenuBottomButton
          menuBottom={props.menuBottom}
          title="fps"
          selected={true}
        />
      </>
    );
  } else if (props.menuBottom === 1) {
    const arr = props.qualityList.filter(
      (list) => list.lang === props.languageSet
    );

    return (
      <>
        {arr[0].list.map((item, index) => (
          <MenuBottomButton
            key={item.varName}
            menuBottom={props.menuBottom}
            title={item.varName}
            handleClick={() => props.onQualityChange(index)}
            selected={props.qualitySet === index ? true : false}
          />
        ))}
      </>
    );
  } else if (props.menuBottom === 2) {
    return (
      <>
        {props.languageList.map((item) => (
          <MenuBottomButton
            key={item.varName}
            menuBottom={props.menuBottom}
            title={item.varName}
            handleClick={() => props.onLanguageChange(item.lang)}
            selected={props.languageSet === item.lang ? true : false}
          />
        ))}
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    qualityList: state.quality.qualityList,
    qualitySet: state.quality.qualitySet,

    languageList: state.lang.languageList,
    languageSet: state.lang.languageSet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLanguageChange: (index) =>
      dispatch({
        type: actionTypes.LanguageChange,
        language: index,
      }),
    onQualityChange: (index) =>
      dispatch({
        type: actionTypes.QualityChange,
        quality: index,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(MenuBottomButtons));
