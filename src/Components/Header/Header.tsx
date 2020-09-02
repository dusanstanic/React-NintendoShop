import React, { useEffect } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Header.module.css";

import GameM from "../../models/GameM";

import * as GameService from "../../service/GamesService";
import * as GenreService from "../../service/GenreService";

import Aux from "../../hoc/Auxiliary";

import * as gameDataActionTypes from "../../store/actions/gameData";
import * as gameDisplayActionTypes from "../../store/actions/gameDisplay";

import App from "../../Container/App/App";
import ManageGames from "../../Container/ManageGames/ManageGames";
import { GenreM } from "../../models/GenreM";
import Login from "../Login/Login";

interface PropsI {
  setGames: (games: GameM[]) => void;
  setGenres: (genres: GenreM[]) => void;
  setPgRatings: (pgRatings: string[]) => void;
  setSelectedGames: (games: GameM[]) => void;
}

const Header = (props: PropsI) => {
  useEffect(() => {
    GameService.getGames().then((games: GameM[]) => {
      props.setGames(games);
      props.setSelectedGames(games);
    });
    GenreService.getGenres().then((genres: GenreM[]) => {
      props.setGenres(genres);
    });
    props.setPgRatings(["3", "7", "12", "16", "18"]);
  }, []);

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
              <NavLink to="/login" activeClassName="nav-item-active" exact>
                Login
              </NavLink>
            </li>
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
        <Route path="/login" component={Login} />
        <Route path="/games" component={App} />
        <Route path="/manageGames" component={ManageGames} />
        <Route path="/consoles" component={ManageGames} />
        <Route path="/manageConsoles" component={ManageGames} />
      </Switch>
    </Aux>
  );
};

const mapStateToProp = (state: any) => {
  return {
    games: state.gameData.games,
    genres: state.gameData.genres,
    pgRatings: state.gameData.pgRatings,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setGames: (games: GameM[]) =>
      dispatch({
        type: gameDataActionTypes.SET_GAMES,
        payload: { games: games },
      }),
    setGenres: (genres: GenreM[]) =>
      dispatch({
        type: gameDataActionTypes.SET_GENRES,
        payload: { genres: genres },
      }),
    setPgRatings: (pgRatings: string[]) =>
      dispatch({
        type: gameDataActionTypes.SET_PEGIRATINGS,
        payload: { pgRatings: pgRatings },
      }),
    setSelectedGames: (selectedGames: GameM[]) =>
      dispatch({
        type: gameDisplayActionTypes.SET_SELECTED_GAMES,
        payload: { games: selectedGames },
      }),
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Header);
