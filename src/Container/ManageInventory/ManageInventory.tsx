import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Route,
  RouteComponentProps,
  withRouter,
  NavLink,
} from "react-router-dom";

import classes from "./ManageInventory.module.css";

import Aux from "../../hoc/Auxiliary";
import ManageConsoles from "../../Components/ManageConsoles/ManageConsoles";

interface IProps extends RouteComponentProps {}

interface IState {
  isUserPanelOpened: boolean;
}

class ManageInventory extends Component<IProps, IState> {
  state = {
    isUserPanelOpened: true,
  };

  toggleUserPanel = () => {
    this.setState({ isUserPanelOpened: !this.state.isUserPanelOpened });
  };

  render() {
    let isUserPanelOpened = this.state.isUserPanelOpened;
    let hide = "";
    let resize = "";

    if (!isUserPanelOpened) {
      hide = classes["hide"];
      resize = classes["resize"];
    }

    return (
      <Aux>
        <div className={classes["background"]}></div>
        <div className={classes["manage-inventory-panel"]}>
          <div className={classes["manage-inventory-panel-user"] + " " + hide}>
            <button
              className={classes["toggle-panel-user-btn"]}
              onClick={this.toggleUserPanel}
            >
              {isUserPanelOpened ? "<" : ">"}
            </button>
            <div className={classes["column"]}>
              <button>Users</button>
              <NavLink
                to={{
                  pathname: this.props.match.url + "/manageProducts/game",
                }}
              >
                <button>Games</button>
              </NavLink>
              <NavLink
                to={{
                  pathname: this.props.match.url + "/manageProducts/console",
                }}
              >
                <button>Consoles</button>
              </NavLink>
              <button>Merchandise</button>
            </div>
          </div>
          <div
            className={classes["manage-inventory-panel-product"] + " " + resize}
          >
            <Route
              path={this.props.match.url + "/manageProducts/:type"}
              component={ManageConsoles}
            />
          </div>
        </div>
      </Aux>
    );
  }
}

export default withRouter(ManageInventory);
