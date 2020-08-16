import React from "react";
import SkillText from "./SkillText";

const SkillRight = (porps) => {
  return porps.array.map((item, index) =>
    (porps.parity + index) % 2 ? (
      <SkillText key={item.name + "r"} text="" />
    ) : (
      <SkillText
        key={item.name + "r"}
        text={item.name}
        ratio={item.ratio}
        align="R"
      />
    )
  );
};

export default SkillRight;
