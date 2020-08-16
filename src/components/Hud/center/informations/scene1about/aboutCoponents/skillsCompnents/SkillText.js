import React from "react";
import SkillRatioCreator from "./SkillRatioCreator";

const SkillText = (props) => {
  const { text, ratio, align } = props;

  if (text === "") {
    return <div className="skillRatioContener"></div>;
  } else {
    return (
      <div className="skillRatioContener">
        <div className="skillRatioCenter">
          <div>{text}</div>
          <div className="skillRatio">
            <SkillRatioCreator ratio={ratio} align={align} />
          </div>
        </div>
      </div>
    );
  }
};

export default SkillText;
