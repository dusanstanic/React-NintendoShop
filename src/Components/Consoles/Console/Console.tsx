import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import classes from "./Console.module.css";

import ConsoleM from "../../../models/ConsoleM";

interface PropsI {
  console: ConsoleM;
}

const Console = (props: PropsI) => {
  const gameConsole = props.console;
  return (
    <div className={classes["console-tile"]}>
      <img
        className={classes["console-image"]}
        alt="console"
        src={gameConsole.image}
      />
      <img
        className={classes["console-logo"] + " " + classes["larger"]}
        alt="logo"
        src={gameConsole.logo}
      />
      <h4 className={classes["console-title"]}>{gameConsole.title}</h4>
      <div className={classes["console-price"]}>{gameConsole.price} RSD</div>
    </div>
  );
};

export default Console;
