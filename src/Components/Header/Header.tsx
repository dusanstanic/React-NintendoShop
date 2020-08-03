import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import "./Header.css";

import Aux from "../../hoc/Auxiliary";

import App from "../../Container/App/App";

const Header = () => {
  return (
    <Aux>
      <header className="main-header">
        <div>
          <NavLink
            to="/"
            activeClassName="nav-item-active"
            exact
            className="main-header__brand"
          >
            <img
              src="http://127.0.0.1:8887/nintendoIcon.jpg"
              alt="uHost - Your favorite hosting company"
              className="main-header__icon"
            />
          </NavLink>
        </div>
        <nav className="main-nav">
          <ul className="main-nav__items">
            <li className="main-nav__item">
              {" "}
              <NavLink to="/" activeClassName="nav-item-active" exact>
                Home
              </NavLink>
            </li>
            <li className="main-nav__item">
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
            <li className="main-nav__item">
              <NavLink
                activeClassName="nav-item-active"
                to={{
                  pathname: "/games",
                  hash: "#submit",
                  search: "?name=true",
                }}
                exact
              >
                Merchandise
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route path="/games" component={App} />
      </Switch>
    </Aux>
  );
};

export default Header;
