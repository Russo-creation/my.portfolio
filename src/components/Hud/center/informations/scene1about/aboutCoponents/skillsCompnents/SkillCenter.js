import React from "react";
import { SkillHexagon } from "../svgIcons";

const SkillCenter = (porps) => {
  return porps.array.map((item, index) =>
    (porps.parity + index) % 2 ? (
      <SkillHexagon key={item.name + "c"} icon={item.icon} align="L" />
    ) : (
      <SkillHexagon key={item.name + "c"} icon={item.icon} align="R" />
    )
  );
};

export default SkillCenter;
