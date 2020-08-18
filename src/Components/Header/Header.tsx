import React, { useEffect, useState } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import classes from "./Header.module.css";

import GameM from "../../models/GamesM";

import * as GameService from "../../service/GamesService";

import Aux from "../../hoc/Auxiliary";

import * as actionTypes from "../../store/actions/gameDisplay";

import App from "../../Container/App/App";
import ManageGames from "../../Container/ManageGames/ManageGames";
import Consoles from "../Consoles/Consoles";

interface PropsI {
  setGames: (games: GameM[]) => void;
}

const Header = (props: PropsI) => {
  console.log(props);

  useEffect(() => {
    GameService.getGames().then((games: GameM[]) => {
      console.log("useEffect In");
      props.setGames(games);
      console.log("useEffect In Finished");
    });
    console.log("useEffect Out");
  }, []);

  /* GameService.getGames().then((games: GameM[]) => {
    console.log("useEffect In");
    props.setGames(games);
    console.log("useEffect In Finished");
  });*/

  console.log("Render Header.tsx");
  return (
    <Aux>
      <header className={classes["main-header"]}>
        <div>
          <NavLink
            to="/"
            activeClassName="nav-item-active"
            exact
            className={classes["main-header__brand"]}
          >
            <img
              src="http://127.0.0.1:8887/nintendoIcon.jpg"
              alt="Nintendo Shop"
              className={classes["main-header__icon"]}
            />
          </NavLink>
        </div>
        <nav className={classes["main-nav"]}>
          <ul className={classes["main-nav__items"]}>
            <li className={classes["main-nav__item"]}>
              <NavLink to="/" activeClassName="nav-item-active" exact>
                Home
              </NavLink>
            </li>
            <li className={classes["main-nav__item"]}>
              <NavLink
                activeClassName="nav-item-active"
                to={{
                  pathname: "/games",
                  hash: "#submit",
                  search: "?name=true",
                }}
                exact
              >
                Games
              </NavLink>
            </li>
            <li className={classes["main-nav__item"]}>
              <NavLink
                activeClassName="nav-item-active"
                to={{
                  pathname: "/manageGames",
                  hash: "#submit",
                  search: "?name=true",
                }}
                exact
              >
                Manage Games
              </NavLink>
            </li>
            <li className={classes["main-nav__item"]}>
              <NavLink
                activeClassName="nav-item-active"
                to={{
                  pathname: "/manageGames",
                  hash: "#submit",
                  search: "?name=true",
                }}
                exact
              >
                Consoles
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route path="/games" component={App} />
        <Route path="/manageGames" component={ManageGames} />
        <Route path="/consoles" component={ManageGames} />
        <Route path="/manageConsoles" component={ManageGames} />
      </Switch>
    </Aux>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setGames: (games: GameM[]) =>
      dispatch({ type: actionTypes.SET_GAMES, payload: { games: games } }),
  };
};

// const mapStateToProp = (state: any) => {
//   return {
//     games: state.gameDisplay.games,
//   };
// };

export default connect(null, mapDispatchToProps)(Header);
