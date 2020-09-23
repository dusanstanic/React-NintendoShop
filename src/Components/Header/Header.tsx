import React, { useEffect, useState, MouseEvent } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Header.module.css";

import GameM from "../../models/GameM";
import { GenreM } from "../../models/GenreM";
import ConsoleM from "../../models/ConsoleM";

import * as GameService from "../../service/GamesService";
import * as GenreService from "../../service/GenreService";
import * as ConsoleService from "../../service/ConsoleService";

import Aux from "../../hoc/Auxiliary";

import * as gameDataActionTypes from "../../store/actions/gameData";
import * as consoleDataActionTypes from "../../store/actions/consoleData";
import * as gameDisplayActionTypes from "../../store/actions/gameDisplay";
import * as consoleDisplayActionTypes from "../../store/actions/consoleDisplay";

import App from "../../Container/App/App";
import ManageGames from "../../Container/ManageGames/ManageGames";
import Login from "../Login/Login";
import ConsoleMain from "../../Container/ConsolesMain/ConsolesMain";
import Modal from "../../shared/Modal/Modal";
import Register from "../Register/Register";

interface PropsI {
  setGames: (games: GameM[]) => void;
  setGenres: (genres: GenreM[]) => void;
  setPgRatings: (pgRatings: string[]) => void;
  setSelectedGames: (games: GameM[]) => void;
  setConsoles: (consoles: ConsoleM[]) => void;
  setSelectedConsoles: (consoles: ConsoleM[]) => void;
}

enum FormType {
  LOGIN = "login",
  REGISTER = "register",
}

const Header = (props: PropsI) => {
  const [userForm, setUserForm] = useState<JSX.Element>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    GameService.getGames().then((games: GameM[]) => {
      console.log("props.setGames(games);");
      props.setGames(games);
      props.setSelectedGames(games);
    });
    GenreService.getGenres().then((genres: GenreM[]) => {
      console.log("props.setGenres(genres);");
      props.setGenres(genres);
    });
    ConsoleService.getConsoles().then((consoles: ConsoleM[]) => {
      console.log("props.setConsoles(consoles);");
      props.setConsoles(consoles);
      props.setSelectedConsoles(consoles);
    });
    console.log("props.setPgRatings");
    props.setPgRatings(["3", "7", "12", "16", "18"]);
  }, []);

  const hideModal = () => {
    setShowModal(false);
    setUserForm(<></>);
  };

  const showLoginModal = (type: FormType) => {
    if (type === FormType.LOGIN) {
      setUserForm(<Login />);
    } else {
      setUserForm(<Register />);
    }
    setShowModal(true);
  };

  return (
    <Aux>
      <div className={classes["background"]}></div>
      <Modal show={showModal} closeModal={hideModal}>
        {userForm}
      </Modal>

      <header className={classes["header"]}>
        <div className={classes["header-top"]}>
          <div className={classes["row"]}>
            <div className={classes["column"]}>
              <nav className={classes["info-link-nav"]}>
                <ul className={classes["info-link-nav__items"]}>
                  <li className={classes["info-link-nav__item"]}>
                    <img
                      alt="Contact Phone Number"
                      src={"http://127.0.0.1:8887/telephone-icon.png"}
                      style={{ verticalAlign: "middle" }}
                    />
                    <span> 065 23 23 839</span>
                  </li>
                  <li className={classes["info-link-nav__item"]}>
                    <img
                      alt="Contact Phone Number"
                      src={"http://127.0.0.1:8887/message-icon.png"}
                      style={{ verticalAlign: "middle" }}
                    />
                    <span> dusan.stanic97@hotmail.com</span>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={classes["column"]}>
              <nav className={classes["info-link-nav"]}>
                <ul className={classes["info-link-nav__items"]}>
                  <li className={classes["info-link-nav__item"]}>
                    <NavLink
                      onClick={() => showLoginModal(FormType.LOGIN)}
                      to={{}}
                      exact
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className={classes["info-link-nav__item"]}>
                    <NavLink
                      onClick={() => showLoginModal(FormType.REGISTER)}
                      to={{}}
                      exact
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className={classes["info-link-nav__item"]}>
                    <div
                      style={{
                        backgroundColor: "#fdc90e",
                        color: "black",
                        borderRadius: "5px",
                        padding: "5px",
                        paddingLeft: "10px",
                      }}
                    >
                      <img
                        alt="Shopping Cart"
                        src={
                          "http://127.0.0.1:8887/Shopping%20Cart%20-%20Icon%203.png"
                        }
                        style={{
                          width: "1.5rem",
                          height: "15px",
                          verticalAlign: "middle",
                        }}
                      />
                      <span
                        style={{
                          verticalAlign: "middle",
                          display: "inline-block",
                          paddingLeft: "5px",
                        }}
                      >
                        {" "}
                        0
                      </span>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className={classes["main-header"]}>
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
                <NavLink
                  to="/"
                  activeClassName={classes["nav-item-active"]}
                  exact
                >
                  Home
                </NavLink>
              </li>
              <li className={classes["main-nav__item"]}>
                <NavLink
                  activeClassName={classes["nav-item-active"]}
                  to={{
                    pathname: "/games",
                  }}
                  exact
                >
                  Games
                </NavLink>
              </li>
              <li className={classes["main-nav__item"]}>
                <NavLink
                  activeClassName={classes["nav-item-active"]}
                  to={{
                    pathname: "/consoles",
                  }}
                  exact
                >
                  Consoles
                </NavLink>
              </li>
              <li className={classes["main-nav__item"]}>
                <NavLink
                  activeClassName={classes["nav-item-active"]}
                  to={{
                    pathname: "/manageGames",
                  }}
                  exact
                >
                  Manage Games
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className={classes["routes"]}>
        <Switch>
          <Route path="/games" component={App} />
          <Route path="/manageGames" component={ManageGames} />
          <Route path="/consoles" component={ConsoleMain} />
          <Route path="/manageConsoles" component={ConsoleMain} />
        </Switch>
      </div>
      <footer></footer>
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
    setConsoles: (consoles: ConsoleM[]) =>
      dispatch({
        type: consoleDataActionTypes.SET_CONSOLES,
        payload: { consoles: consoles },
      }),
    setSelectedConsoles: (consoles: ConsoleM[]) =>
      dispatch({
        type: consoleDisplayActionTypes.SET_SELECTED_CONSOLES,
        payload: { consoles: consoles },
      }),
  };
};

export default connect(null, mapDispatchToProps)(Header);
