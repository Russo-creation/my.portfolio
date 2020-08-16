import React from "react";
import ReactDOM from "react-dom";

import "./scss/style.scss";
import App from "./pages/App";
import * as serviceWorker from "./serviceWorker";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import fpsCounterReducer from "./store/reducers/fpsCounter";
import scrollTrackerReducer from "./store/reducers/scrollTracker";
import languageReducer from "./store/reducers/language";
import qualityReducer from "./store/reducers/quality";
import loadingSceneReducer from "./store/reducers/initialLoading";
import hideShowMenuReducer from "./store/reducers/hideShowMenu";

const rootReducer = combineReducers({
  fps: fpsCounterReducer,
  s_track: scrollTrackerReducer,
  lang: languageReducer,
  quality: qualityReducer,
  loadScene: loadingSceneReducer,
  hideShowMenu: hideShowMenuReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
