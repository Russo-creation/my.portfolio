import React from "react";

const SkillRatioCreator = (props) => {
  const { ratio, align } = props;

  if (align === "L") {
    return (
      <>
        <div className={`skl_r  ${ratio > 4 ? "skWhite" : "skGrey"}`}></div>
        <div className={`skl_r  ${ratio > 3 ? "skWhite" : "skGrey"}`}></div>
        <div className={`skl_r  ${ratio > 2 ? "skWhite" : "skGrey"}`}></div>
        <div className={`skl_r  ${ratio > 1 ? "skWhite" : "skGrey"}`}></div>
        <div className={`skl_r  ${ratio > 0 ? "skWhite" : "skGrey"}`}></div>
      </>
    );
  } else {
    return (
      <>
        <div className={`skl_r  ${ratio > 0 ? "skWhite" : "skGrey"}`}></div>
        <div className={`skl_r  ${ratio > 1 ? "skWhite" : "skGrey"}`}></div>
        <div className={`skl_r  ${ratio > 2 ? "skWhite" : "skGrey"}`}></div>
        <div className={`skl_r  ${ratio > 3 ? "skWhite" : "skGrey"}`}></div>
        <div className={`skl_r  ${ratio > 4 ? "skWhite" : "skGrey"}`}></div>
      </>
    );
  }
};

export default SkillRatioCreator;
