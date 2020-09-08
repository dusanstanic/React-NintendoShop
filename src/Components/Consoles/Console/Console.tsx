import React from "react";

import classes from "./Console.module.css";

import ConsoleM from "../../../models/ConsoleM";
import Aux from "../../../hoc/Auxiliary";

interface PropsI {
  console: ConsoleM;
}

const Console = (props: PropsI) => {
  const gameConsole = props.console;
  let newBanner: JSX.Element = <Aux>{null}</Aux>;
  if (gameConsole.type === "Switch") {
    newBanner = <div className={classes["console-banner-new"]}>New</div>;
  }

  return (
    <div className={classes["console-tile"]}>
      <img
        className={classes["console-image"]}
        alt="console"
        src={gameConsole.image}
      />
      <img
        className={classes["console-logo"]}
        alt="logo"
        src={gameConsole.logo}
      />
      <h4 className={classes["console-title"]}>{gameConsole.title}</h4>
      <div className={classes["console-price-item"]}>
        <div className={classes["console-price"]}>{gameConsole.price} RSD</div>
        <button className={classes["console-add-to-cart-btn"]} />
      </div>
      {newBanner}
    </div>
  );
};

export default Console;
