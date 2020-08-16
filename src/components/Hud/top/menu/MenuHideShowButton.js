import React from "react";

const MenuHideShowButton = props => {
  const { displayMenu, languageSet } = props;

  const list = [
    {
      lang: "pl",
      list: [{ varName: "pokaż" }, { varName: "ukryj" }]
    },
    {
      lang: "en",
      list: [{ varName: "show" }, { varName: "hide" }]
    }
  ];
  const arr = list.filter(items => items.lang === languageSet);

  return (
    <div
      className={`buttonCage ${displayMenu ? "selectedButton" : null}`}
      onClick={() => props.handleClickMenuButton()}
    >
      <div>Menu</div>
      <div className="buttonDescribe">
        {displayMenu ? arr[0].list[1].varName : arr[0].list[0].varName}
      </div>
    </div>
  );
};

export default MenuHideShowButton;
