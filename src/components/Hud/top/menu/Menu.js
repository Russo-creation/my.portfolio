import React, { Component } from "react";
import { connect } from "react-redux";
import "../../../../scss/Hud/top/menu/menu.scss";

import MenuHideShowButton from "./MenuHideShowButton";
import MenuBottom from "./MenuBottom";
import MenuButton from "./buttons/MenuTopButton";

const menuList = [
  {
    lang: "pl",
    list: [{ varName: "fps" }, { varName: "grafika" }, { varName: "language" }],
  },
  {
    lang: "en",
    list: [{ varName: "fps" }, { varName: "quality" }, { varName: "language" }],
  },
];

class Menu extends Component {
  state = {
    displayMenu: false,
    displayBottomMenu: false,
    menuBottom: null,
  };

  handleClickShortMenu = () => {
    this.setState({
      displayMenu: !this.state.displayMenu,
    });
  };

  handleClickMenuButton = (element) => {
    const { menuBottom, displayBottomMenu } = this.state;
    if (menuBottom === element) {
      this.setState({
        displayBottomMenu: !displayBottomMenu,
        menuBottom: displayBottomMenu ? null : element,
      });
    } else {
      this.setState({
        displayBottomMenu: true,
        menuBottom: element,
      });
    }
  };

  handleClickCloseMenuBottom = () => {
    this.setState({
      displayBottomMenu: false,
      menuBottom: null,
    });
  };

  render() {
    const {
      languageSet,
      fps,
      qualitySet,
      shortMenuShow,
      qualityList,
      languageList,
    } = this.props;
    const { menuBottom, displayMenu, displayBottomMenu } = this.state;

    const arrayMenuTittleName = menuList.filter(
      (array) => array.lang === languageSet
    );

    const arrayMenuDescribeQuality = qualityList.filter(
      (array) => array.lang === languageSet
    );

    const arrayMenuDescribeLanguage = languageList.filter(
      (array) => array.lang === languageSet
    );

    const ValuesToDescribe = [
      fps,
      arrayMenuDescribeQuality[0].list[qualitySet].varName,
      arrayMenuDescribeLanguage[0].varName,
    ];

    const MenuContruct = arrayMenuTittleName[0].list.map((item, index) => (
      <MenuButton
        key={index}
        title={`${item.varName}:`}
        describe={ValuesToDescribe[index]}
        menuBottom={menuBottom}
        index={index}
        handleClickMenuButton={(element) => this.handleClickMenuButton(element)}
      />
    ));

    return (
      <nav>
        <div className="buttonsLine" style={{ float: "right" }}>
          {!shortMenuShow ? MenuContruct : null}

          {shortMenuShow ? (
            <>
              <div
                className="cyberOrnament"
                style={{
                  boxShadow: " 1px 0px 6px 0px #c4c4c4",
                  float: "right",
                }}
              ></div>
              <MenuHideShowButton
                displayMenu={displayMenu}
                handleClickMenuButton={() => this.handleClickShortMenu()}
                languageSet={languageSet}
              />
            </>
          ) : (
            <div
              className="cyberOrnament"
              style={{ boxShadow: " 1px 0px 6px 0px #c4c4c4" }}
            ></div>
          )}
        </div>

        {shortMenuShow && displayMenu ? (
          <div className="buttonsLine shortMenu">{MenuContruct}</div>
        ) : null}

        {(displayBottomMenu && !shortMenuShow) ||
        (displayBottomMenu && shortMenuShow && displayMenu) ? (
          <MenuBottom
            menuBottom={menuBottom}
            handleClickCloseMenuBottom={() => this.handleClickCloseMenuBottom()}
            languageSet={languageSet}
          />
        ) : null}
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shortMenuShow: state.hideShowMenu.shortMenuShow,
    fps: state.fps.fpsCounter,

    qualityList: state.quality.qualityList,
    qualitySet: state.quality.qualitySet,

    languageList: state.lang.languageList,
    languageSet: state.lang.languageSet,
  };
};

export default connect(mapStateToProps)(React.memo(Menu));
