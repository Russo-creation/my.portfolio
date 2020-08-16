import * as actionTypes from "../actions";

const intialState = {
  qualitySet: 1,
  qualityChange: false,
  qualityList: [
    {
      lang: "pl",
      list: [
        { varName: "niska" },
        { varName: "średnia" },
        { varName: "wysoka" },
      ],
    },
    {
      lang: "en",
      list: [{ varName: "low" }, { varName: "medium" }, { varName: "high" }],
    },
  ],
  qualityBottomMenu: [
    {
      lang: "pl",
      varName: "ustaw efekty wizualne",
    },
    {
      lang: "en",
      varName: "set visual effects",
    },
  ],
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.QualityChange:
      if (state.qualitySet !== action.quality) {
        return {
          ...state,

          qualitySet: action.quality,
          qualityChange: true,
        };
      } else {
        return state;
      }

    case actionTypes.QualityChangeNotification:
      return {
        ...state,
        qualityChange: false,
      };

    default:
      return state;
  }
};

export default reducer;
