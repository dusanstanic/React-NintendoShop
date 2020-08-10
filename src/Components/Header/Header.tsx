import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import classes from "./Header.module.css";

import Aux from "../../hoc/Auxiliary";

import App from "../../Container/App/App";
import ManageGames from "../../Container/ManageGames/ManageGames";

const Header = () => {
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
              alt="uHost - Your favorite hosting company"
              className={classes["main-header__icon"]}
            />
          </NavLink>
        </div>
        <nav className={classes["main-nav"]}>
          <ul className={classes["main-nav__items"]}>
            <li className={classes["main-nav__item"]}>
              {" "}
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
                Manage Consoles
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route path="/games" component={App} />
        <Route path="/manageGames" component={ManageGames} />
      </Switch>
    </Aux>
  );
};

export default Header;
