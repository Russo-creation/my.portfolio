import * as actionTypes from "../actions";

const intialState = {
  shortMenuShow: false
};

const WindowDimensions = () => {
  const dim = {
    width:
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,

    height:
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
  };

  return dim;
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.MenuHideShow:
      const dims = WindowDimensions();

      if (dims.width <= 600 || dims.height <= 700) {
        return {
          ...state,
          shortMenuShow: true
        };
      } else {
        return {
          ...state,
          shortMenuShow: false
        };
      }
    default:
      return state;
  }
};

export default reducer;
