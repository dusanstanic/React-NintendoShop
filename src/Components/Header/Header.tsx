import React, { useEffect, useState } from "react";
import {
  Route,
  NavLink,
  Switch,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Header.module.css";

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
import Modal from "../../shared/Modal/Modal";
import Register from "../Register/Register";
import UserPanel from "../UserPanel/UserPanel";
import Home from "../../Container/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Logout from "../Logout/Logout";
import { UserInfo } from "../../models/UserInfo";
import ManageInventory from "../../Container/ManageInventory/ManageInventory";

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
      setUserForm(<Register closeModal={hideModal} />);
    }
    setShowModal(true);
  };

  let userAuthNav = (
    <Aux>
      <li className={classes["info-link-nav__item"]}>
        <NavLink onClick={() => showUserModal(FormType.LOGIN)} to={{}}>
          Login
        </NavLink>
      </li>
      <li className={classes["info-link-nav__item"]}>
        <NavLink onClick={() => showUserModal(FormType.REGISTER)} to={{}}>
          Register
        </NavLink>
      </li>
    </Aux>
  );

  if (props.isAuthenticated) {
    userAuthNav = (
      <Aux>
        <li className={classes["info-link-nav__item"]}>
          <NavLink
            to={{ pathname: "/userPanel" }}
            className={classes["info-link-nav-item-user"]}
          >
            {props.userInfo.firstName}
          </NavLink>
        </li>
        <li className={classes["info-link-nav__item"]}>
          <NavLink to={{ pathname: "/logout" }}>Logout</NavLink>
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
                      alt="Contact Email"
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
                  {userAuthNav}
                  <li className={classes["info-link-nav__item"]}>
                    <div
                      style={{
                        backgroundColor: "#fdc90e",
                        color: "black",
                        borderRadius: "5px",
                        padding: "5px",
                        paddingLeft: "5px",
                      }}
                    >
                      <img
                        alt="Shopping Cart"
                        src={"http://127.0.0.1:8887/shopping%20bag%20icon.png"}
                        style={{
                          width: "1rem",
                          height: "15px",
                          verticalAlign: "top",
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
            <NavLink to="/home" className={classes["main-header__brand"]}>
              <img
                src="http://127.0.0.1:8887/Nintendo%20Logo.png"
                alt="Nintendo Shop"
                className={classes["main-header__icon"]}
              />
            </NavLink>
          </div>
          <nav className={classes["main-nav"]}>
            <ul className={classes["main-nav__items"]}>
              <li className={classes["main-nav__item"]}>
                <NavLink
                  to="/home"
                  activeClassName={classes["nav-item-active"]}
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
                >
                  Manage Games
                </NavLink>
                <NavLink
                  activeClassName={classes["nav-item-active"]}
                  to={{
                    pathname: "/manageInventory",
                  }}
                >
                  Manage Inventory
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className={classes["routes"]}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/games" component={App} />
          <Route path="/consoles" component={ConsoleMain} />
          <Route path="/manageGames" component={ManageGames} />
          <Route path="/userPanel" component={UserPanel} />
          <Route path="/manageInventory" component={ManageInventory} />
          <Route path="/logout" component={Logout} />
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
