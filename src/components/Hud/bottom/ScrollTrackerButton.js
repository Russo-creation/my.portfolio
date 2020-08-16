import React from "react";

const ScrollTrackerButton = (props) => {
  const handleClickButton = (index) => {
    props.onManualChange(index);
  };

  let stylesBcg;
  if (props.scrollTrackSet === props.index) {
    stylesBcg = {
      backgroundColor: "#ec004d",
      boxShadow: "0px 0px 4px 1px #ec004d",
      width: props.scrollTrackPercentage + "%",
    };
  } else if (props.scrollTrackSet > props.index) {
    stylesBcg = {
      backgroundColor: "#c4c4c4",
      boxShadow: "0px 0px 4px 1px #c4c4c4",
      width: "100%",
    };
  } else if (props.scrollTrackSet < props.index) {
    stylesBcg = {
      backgroundColor: "#ec004d",
      width: "0%",
    };
  }

  return (
    <div
      className="ScrollButton"
      onClick={() => handleClickButton(props.index)}
    >
      <div
        className={`ScrollText ${
          props.scrollTrackSet === props.index ? "ScrollTextActive" : null
        }`}
      >
        {props.scrollText}
      </div>
      <div className={"ScrollBcg"} style={stylesBcg}></div>
    </div>
  );
};

export default ScrollTrackerButton;
