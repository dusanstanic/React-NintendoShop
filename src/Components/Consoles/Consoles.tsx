import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import classes from "./Consoles.module.css";

import ConsoleM from "../../models/ConsoleM";

import Aux from "../../hoc/Auxiliary";
import Console from "./Console/Console";
import ConsoleSearchOptions from "../ConsoleSearchOptions/ConsoleSearchOptions";
import ConsoleSearchFilter from "../ConsoleSearchFilter/ConsoleSearchFilter";

interface PropsI extends RouteComponentProps<{}> {
  consoles: ConsoleM[];
}

class Consoles extends Component<PropsI, {}> {
  render() {
    console.log("Render Consoles");
    console.log(this.props.consoles);

    const consoles = this.props.consoles.map((console: ConsoleM) => {
      return <Console key={console.id} console={console} />;
    });

    return (
      <Aux>
        <div className={classes["consoles"]}>
          <div className={classes["console-search-filter-container"]}>
            <ConsoleSearchFilter />
          </div>
          <div className={classes["console-games-container"]}>{consoles}</div>
          <div className={classes["console-search-options-container"]}>
            <ConsoleSearchOptions />
          </div>
        </div>
      </Aux>
    );
  }
}

const mapStateToProp = (state: any) => {
  return {
    consoles: state.consoleData.consoles,
  };
};

export default connect(mapStateToProp, null)(Consoles);
