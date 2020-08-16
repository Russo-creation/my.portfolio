import React from "react";
import SkillText from "./SkillText";

const SkillLeft = (porps) => {
  return porps.array.map((item, index) =>
    (porps.parity + index) % 2 ? (
      <SkillText
        key={item.name + "l"}
        text={item.name}
        ratio={item.ratio}
        align="L"
      />
    ) : (
      <SkillText key={item.name + "l"} text="" />
    )
  );
};

export default SkillLeft;
