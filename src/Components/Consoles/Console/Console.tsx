import React, { useState } from "react";

import classes from "./Console.module.scss";

import ConsoleM from "../../../models/ConsoleM";
import Aux from "../../../hoc/Auxiliary";
import Modal from "../../../shared/UI/Modal/ModalConsole/Modal";

import ConsoleQucikView from "../../ConsoleQuickView/ConsoleQuickView";

interface PropsI {
  console: ConsoleM;
}

const Console = (props: PropsI) => {
  const [showModal, setShowModal] = useState(false);
  const [quickView, setQuickView] = useState<JSX.Element>();

  const gameConsole = props.console;
  let newBanner: JSX.Element = <Aux>{null}</Aux>;
  if (gameConsole.type === "Switch") {
    newBanner = <div className={classes["product__banner--new"]}>New</div>;
  }

  const showConsoleQuickView = () => {
    setShowModal(true);
  };

  const closeConsoleQuickView = () => {
    setShowModal(false);
    setQuickView(<></>);
  };

  const setModalQuickView = () => {
    showConsoleQuickView();
    setQuickView(<ConsoleQucikView console={props.console} />);
  };

  return (
    <Aux>
      <Modal show={showModal} closeModal={closeConsoleQuickView}>
        {quickView}
      </Modal>
      <div className={classes["product"]}>
        <div className={classes["product__wrapper"]}>
          <img
            className={classes["product__image"]}
            alt="Nintendo Console"
            src={gameConsole.image}
          />
          <div className={classes["caption"]}>
            <div
              className={`${classes["caption__icon"]} ${classes["caption__icon--show"]}`}
              // onClick={showConsoleQuickView}
              onClick={setModalQuickView}
            ></div>
            <div
              className={`${classes["caption__icon"]} ${classes["caption__icon--compare"]}`}
            ></div>
            <div
              className={`${classes["caption__icon"]} ${classes["caption__icon--favorite"]}`}
            ></div>
          </div>
        </div>
        <img
          className={classes["product__logo"]}
          alt="logo"
          src={gameConsole.logo}
        />
        <h4 className={classes["product__title"]}>{gameConsole.title}</h4>
        <div className={classes["price-item"]}>
          <div className={classes["price-item__price"]}>
            {gameConsole.price} RSD
          </div>
          <button className={classes["price-item__cart"]} />
        </div>
        {newBanner}
      </div>
    </Aux>
  );
};

export default Console;
