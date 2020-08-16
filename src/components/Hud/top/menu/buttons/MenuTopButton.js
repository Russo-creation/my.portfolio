import React from "react";

const MenuButton = props => {
  const { menuBottom, index, describe, title } = props;

  return (
    <div
      className={`buttonCage ${menuBottom === index ? "selectedButton" : null}`}
      onClick={() => props.handleClickMenuButton(index)}
    >
      <div>{title}</div>
      <div className="buttonDescribe">{describe}</div>
    </div>
  );
};

export default MenuButton;
