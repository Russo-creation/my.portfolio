import * as actionTypes from "../actions";

const intialState = {
  languageSet: "en",
  languageList: [
    {
      lang: "pl",
      varName: "polski"
    },
    {
      lang: "en",
      varName: "english"
    }
  ],
  languageBottomMenu: [
    {
      lang: "pl",
      varName: "ustaw język zawartości"
    },
    {
      lang: "en",
      varName: "set langage content"
    }
  ]
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.LanguageChange:
      if (state.languageSet !== action.language) {
        return {
          ...state,
          languageSet: action.language
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};

export default reducer;
