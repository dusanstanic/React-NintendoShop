import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import "./Header.css";

import Aux from "../../hoc/Auxiliary";

import App from "../../Container/App/App";

const Header = () => {
  return (
    <Aux>
      <div className="topnav">
        <NavLink
          className="nav-item"
          to="/"
          activeClassName="nav-item-active"
          exact
        >
          Home
        </NavLink>
        <NavLink
          className="nav-item"
          activeClassName="nav-item-active"
          to={{ pathname: "/games", hash: "#submit", search: "?name=true" }}
          exact
        >
          Games
        </NavLink>
      </div>
      <Switch>
        <Route path="/games" component={App} />
      </Switch>
    </Aux>
  );
};

export default Header;
