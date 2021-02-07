import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Route,
  NavLink,
  Switch,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Header.module.css";
import classes1 from "./Header.module.scss";

import GameM from "../../models/GameM";
import { GenreM } from "../../models/GenreM";
import ConsoleM from "../../models/ConsoleM";

import * as GameService from "../../service/GamesService";
import * as GenreService from "../../service/GenreService";
import * as ConsoleService from "../../service/ConsoleService";

import Aux from "../../hoc/Auxiliary";

import * as actionTypes from "../../store/actions/index";

import App from "../../Container/App/App";
import ManageGames from "../../Container/ManageGames/ManageGames";
import Login from "../Login/Login";
import ConsoleMain from "../../Container/ConsolesMain/ConsolesMain";
import Modal from "../../shared/UI/Modal/Modal";
import Register from "../Register/Register";
import UserPanel from "../UserPanel/UserPanel";
import Home from "../../Container/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Logout from "../Logout/Logout";
import { UserInfo } from "../../models/UserInfo";
import ManageInventory from "../../Container/ManageInventory/ManageInventory";
import SearchBar from "../../shared/UI/SearchBar/SearchBar";
import SearchResult from "../../Container/SearchResult/SearchResult";

interface PropsI extends RouteComponentProps {
  setGames: (games: GameM[]) => void;
  setGenres: (genres: GenreM[]) => void;
  setPgRatings: (pgRatings: string[]) => void;
  setSelectedGames: (games: GameM[]) => void;
  setConsoles: (consoles: ConsoleM[]) => void;
  setConsoleTypes: (consoleTypes: string[]) => void;
  setSelectedConsoles: (consoles: ConsoleM[]) => void;
  isAuthenticated: boolean;
  userRole: string;
  userInfo: UserInfo;
  authCheckState: Function;
}

enum FormType {
  LOGIN = "login",
  REGISTER = "register",
}

const Header = (props: PropsI) => {
  const [userForm, setUserForm] = useState<JSX.Element>();
  const [showModal, setShowModal] = useState(false);

  const [isSearchClicked, setIsSearchClicked] = useState(false);

  useEffect(() => {
    GameService.getGames().then((games: GameM[]) => {
      props.setGames(games);
      props.setSelectedGames(games);
    });
    GenreService.getGenres().then((genres: GenreM[]) => {
      props.setGenres(genres);
    });
    ConsoleService.getConsoles().then((consoles: ConsoleM[]) => {
      props.setConsoles(consoles);
      props.setSelectedConsoles(consoles);
    });
    ConsoleService.findAllConsoleTypes().then((consoleTypes) => {
      props.setConsoleTypes(consoleTypes);
    });

    props.setPgRatings(["3", "7", "12", "16", "18"]);

    props.authCheckState();

    if (props.location.pathname === "/") {
      props.history.push({ pathname: "/home" });
    }
  }, []);

  const hideModal = () => {
    setShowModal(false);
    setUserForm(<></>);
  };

  const showUserModal = (type: FormType) => {
    if (type === FormType.LOGIN) {
      setUserForm(
        <Login
          closeModal={hideModal}
          showRegisterForm={() => showUserModal(FormType.REGISTER)}
        />
      );
    } else {
      setUserForm(
        <Register
          closeModal={hideModal}
          showLoginForm={() => showUserModal(FormType.LOGIN)}
        />
      );
    }
    setShowModal(true);
  };

  let userAuthNav = (
    <Aux>
      <li className={classes1["nav__item"]}>
        <NavLink
          onClick={() => showUserModal(FormType.LOGIN)}
          to={{}}
          className={classes1["nav__link"]}
        >
          Login
        </NavLink>
      </li>
      <li className={classes1["nav__item"]}>
        <NavLink
          onClick={() => showUserModal(FormType.REGISTER)}
          to={{}}
          className={classes1["nav__link"]}
        >
          Register
        </NavLink>
      </li>
    </Aux>
  );

  if (props.isAuthenticated) {
    userAuthNav = (
      <Aux>
        <li
          className={`${classes1["nav__item"]}  ${classes1["nav__item--user"]}`}
        >
          <NavLink
            to={{ pathname: "/userPanel" }}
            className={classes1["nav__link"]}
          >
            {props.userInfo.firstName}
          </NavLink>
        </li>
        <li className={classes["nav__item"]}>
          <NavLink
            to={{ pathname: "/logout" }}
            className={classes1["nav__link"]}
          >
            Logout
          </NavLink>
        </li>
      </Aux>
    );
  }

  const routers = [];
  if (props.isAuthenticated) {
    routers.push(<Route path="/userPanel" component={UserPanel} />);
    if (props.userRole === "Admin") {
      routers.push(<Route path="/manageGames" component={ManageGames} />);
    }
  }

  return (
    <Aux>
      <div className={classes1["background"]}></div>
      <Modal show={showModal} closeModal={hideModal}>
        {userForm}
      </Modal>

      <header className={classes1["header"]}>
        <div className={classes1["header-top"]}>
          <div className={classes1["header-top__nav"]}>
            <div className={classes1["nav"]}>
              <nav className={classes1["nav__nav"]}>
                <ul className={classes1["nav__items"]}>
                  <li className={classes1["nav__item"]}>
                    <img
                      alt="Phone"
                      src={"http://127.0.0.1:8887/telephone-icon.png"}
                      className={classes1["nav__image"]}
                    />
                    <span className={classes1["nav__info"]}>065 23 23 839</span>
                  </li>
                  <li className={classes1["nav__item"]}>
                    <img
                      alt="Contact Email"
                      src={"http://127.0.0.1:8887/message-icon.png"}
                      className={classes1["nav__image"]}
                    />
                    <span> dusan.stanic97@hotmail.com</span>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={classes1["nav__items"]}>
              <nav className={classes1["nav__nav"]}>
                <ul className={classes1["nav__items"]}>
                  {userAuthNav}
                  <li
                    className={`${classes1["nav__item"]} ${classes1["nav__item--cart"]}`}
                  >
                    <img
                      alt="Shopping Cart"
                      src={"http://127.0.0.1:8887/shopping%20bag%20icon.png"}
                      className={classes1["nav__image"]}
                    />
                    <span className={classes1["nav__info--quantity"]}>0</span>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className={classes1["mobile-main-header"]}>
          <button className={classes1["mobile-button"]}>=</button>
          <nav className={classes1["mobile-main-nav"]}>
            <ul className={classes1["mobile-nav__items"]}>
              <li className={classes1["mobile-nav__item"]}>
                <NavLink
                  to={{
                    pathname: "/home",
                  }}
                >
                  HOME
                </NavLink>
              </li>
              <li className={classes1["mobile-nav__item"]}>
                <NavLink
                  to={{
                    pathname: "/games",
                  }}
                >
                  GAMES
                </NavLink>
              </li>
              <li className={classes1["mobile-nav__item"]}>
                <NavLink
                  to={{
                    pathname: "/consoles",
                  }}
                >
                  CONSOLES
                </NavLink>
              </li>
              <li className={classes1["mobile-nav__item"]}>
                <NavLink
                  to={{
                    pathname: "/manageInventory",
                  }}
                >
                  MANAGE INVENTORY
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className={classes1["header-main"]}>
          <div>
            <NavLink to="/home" className={classes1["header-main__brand"]}>
              <img
                src="http://127.0.0.1:8887/Nintendo%20Logo.png"
                alt="Nintendo Shop"
                className={classes1["header-main__icon"]}
              />
            </NavLink>
          </div>
          <nav className={classes1["main-nav"]}>
            {isSearchClicked ? (
              <SearchBar setIsSearchClicked={setIsSearchClicked} />
            ) : (
              <ul className={classes1["main-nav__items"]}>
                <li className={classes1["main-nav__item"]}>
                  <NavLink
                    to="/home"
                    activeClassName={classes1["main-nav__link--active"]}
                    className={classes1["main-nav__link"]}
                  >
                    Home
                  </NavLink>
                </li>
                <li className={classes1["main-nav__item"]}>
                  <NavLink
                    activeClassName={classes1["main-nav__link--active"]}
                    className={classes1["main-nav__link"]}
                    to={{
                      pathname: "/games",
                    }}
                  >
                    Games
                  </NavLink>
                </li>
                <li className={classes1["main-nav__item"]}>
                  <NavLink
                    activeClassName={classes1["main-nav__link--active"]}
                    className={classes1["main-nav__link"]}
                    to={{
                      pathname: "/consoles",
                    }}
                  >
                    Consoles
                  </NavLink>
                </li>
                <li className={classes1["main-nav__item"]}>
                  <NavLink
                    activeClassName={classes1["main-nav__link--active"]}
                    className={classes1["main-nav__link"]}
                    to={{
                      pathname: "/manageInventory",
                    }}
                  >
                    Manage Inventory
                  </NavLink>
                  <NavLink
                    activeClassName={classes1["main-nav__link--active"]}
                    className={classes1["main-nav__link"]}
                    to={{
                      pathname: "/manageGames",
                    }}
                  >
                    Manage Games
                  </NavLink>
                </li>
                <li
                  className={
                    classes1["main-nav__item"] + " " + classes1["search"]
                  }
                >
                  <input
                    type="text"
                    name="search"
                    placeholder="Search"
                    onFocus={() => {
                      setIsSearchClicked(true);
                    }}
                  />
                  <img
                    src="http://127.0.0.1:8887/search%20logo%20main.jpg"
                    alt="search"
                  />
                </li>
              </ul>
            )}
          </nav>
        </div>
      </header>
      <div className={classes1["routes"]}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/games" component={App} />
          <Route path="/consoles" component={ConsoleMain} />
          <Route path="/manageGames" component={ManageGames} />
          <Route path="/userPanel" component={UserPanel} />
          <Route path="/manageInventory" component={ManageInventory} />
          <Route path="/logout" component={Logout} />
          <Route path="/searchResults" component={SearchResult} />
          <Route component={PageNotFound} />
          {/* <Redirect from="/" to="/home" /> */}
        </Switch>
      </div>
      <footer></footer>
    </Aux>
  );
};

const mapStateToProp = (state: any) => {
  return {
    isAuthenticated: state.authentication.token !== "",
    userRole: state.authentication.userRole,
    userInfo: state.authentication.userInfo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setGames: (games: GameM[]) => dispatch(actionTypes.initGames()),
    setGenres: (genres: GenreM[]) => dispatch(actionTypes.set_genres(genres)),
    setPgRatings: (pgRatings: string[]) =>
      dispatch(actionTypes.set_pgRatings(pgRatings)),
    setSelectedGames: (games: GameM[]) =>
      dispatch(actionTypes.set_selected_games(games)),
    setConsoles: (consoles: ConsoleM[]) =>
      dispatch(actionTypes.set_consoles(consoles)),
    setConsoleTypes: (consolesTypes: string[]) =>
      dispatch(actionTypes.set_console_types(consolesTypes)),
    setSelectedConsoles: (consoles: ConsoleM[]) =>
      dispatch(actionTypes.set_selected_consoles(consoles)),
    authCheckState: () => {
      dispatch(actionTypes.authCheckState());
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(withRouter(Header));
