import React, { useState } from "react";

import classes from "./Console.module.css";

import ConsoleM from "../../../models/ConsoleM";
import Aux from "../../../hoc/Auxiliary";
import Modal from "../../../shared/Modal/ModalConsole/Modal";

import ConsoleQucikView from "../../ConsoleQuickView/ConsoleQuickView";

interface PropsI {
  console: ConsoleM;
}

const Console = (props: PropsI) => {
  const [showModal, setShowModal] = useState(false);

  const gameConsole = props.console;
  let newBanner: JSX.Element = <Aux>{null}</Aux>;
  if (gameConsole.type === "Switch") {
    newBanner = <div className={classes["console-banner-new"]}>New</div>;
  }

  const showConsoleQuickView = () => {
    setShowModal(true);
  };

  const closeConsoleQuickView = () => {
    setShowModal(false);
  };

  console.log("Render Console");
  return (
    <Aux>
      <Modal show={showModal} closeModal={closeConsoleQuickView}>
        <ConsoleQucikView console={props.console} />
      </Modal>
      <div className={classes["console-tile"]}>
        <div className={classes["console-image-wrapper"]}>
          <img
            className={classes["console-image"]}
            alt="console"
            src={gameConsole.image}
          />
          <div className={classes["console-caption-icons"]}>
            <div
              className={classes["console-caption-icon-show"]}
              onClick={showConsoleQuickView}
            ></div>
            <div className={classes["console-caption-icon-compare"]}></div>
            <div className={classes["console-caption-icon-favorite"]}></div>
          </div>
        </div>
        <img
          className={classes["console-logo"]}
          alt="logo"
          src={gameConsole.logo}
        />
        <h4 className={classes["console-title"]}>{gameConsole.title}</h4>
        <div className={classes["console-price-item"]}>
          <div className={classes["console-price"]}>
            {gameConsole.price} RSD
          </div>
          <button className={classes["console-add-to-cart-btn"]} />
        </div>
        {newBanner}
      </div>
    </Aux>
  );
};

export default Console;
