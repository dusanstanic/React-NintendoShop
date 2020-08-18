import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import gameDisplayReducer from "./store/reducers/gameDisplay";
import manageGameReducer from "./store/reducers/manageGames";
import Header from "./Components/Header/Header";

const rootReducer = combineReducers({
  gameDisplay: gameDisplayReducer,
  manageGames: manageGameReducer,
});

const store = createStore(rootReducer);

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
