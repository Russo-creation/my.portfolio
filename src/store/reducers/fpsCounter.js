import * as actionTypes from "../actions";

const intialState = {
  fpsCounter: 0,
  fpsBottomMenu: [
    {
      lang: "pl",
      varName: "częstotliwość klatek"
    },
    {
      lang: "en",
      varName: "frame rate"
    }
  ]
};

let times = [];

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.FpsUpdate:
      const now = performance.now();
      while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
      }
      times.push(now);

      return {
        ...state,
        fpsCounter: times.length
      };

    default:
      return state;
  }
};

export default reducer;
