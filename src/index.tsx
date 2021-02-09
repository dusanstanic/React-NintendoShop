import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { BrowserRouter } from "react-router-dom";

import gameDataReducer from "./store/reducers/gameData";
import consoleDataReducer from "./store/reducers/consoleData";
import gameDisplayReducer from "./store/reducers/gameDisplay";
import consoleDisplayReducer from "./store/reducers/consoleDisplay";
import authenticationReducer from "./store/reducers/authentication";
import manageGameReducer from "./store/reducers/manageGames";

import Header from "./Components/Header/Header";

const logger = (store: any) => {
  return (next: any) => {
    return (action: any) => {
      // console.log("[Middleware] Dispatching ", action);
      const result = next(action);
      // console.log("[Middleware] next state", store.getState());
      return result;
    };
  };
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  gameData: gameDataReducer,
  consoleData: consoleDataReducer,
  gameDisplay: gameDisplayReducer,
  consoleDisplay: consoleDisplayReducer,
  manageGames: manageGameReducer,
  authentication: authenticationReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
