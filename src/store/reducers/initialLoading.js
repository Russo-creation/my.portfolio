import * as actionTypes from "../actions";

const intialState = {
  loadingFnished: false,

  loadingProgress: 0,
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.LoadingSceneFinished:
      return { ...state, loadingFnished: true };

    case actionTypes.LoadingSceneProgress:
      return { ...state, loadingProgress: action.progress.toFixed(1) * 1 };

    default:
      return { ...state };
  }
};

export default reducer;
