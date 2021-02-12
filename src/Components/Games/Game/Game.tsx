import React from "react";

import classes from "./Game.module.scss";

import Aux from "../../../hoc/Auxiliary";

import GamesM from "../../../models/GameM";

const Game = (props: { game: GamesM; showGame: any }) => {
  return (
    <Aux>
      <div className={classes["product"]}>
        <div className={classes["product__wrapper"]}>
          <img
            alt="Nintendo Product"
            src={props.game.images && props.game.images[0].destination}
            className={classes["product__image"]}
          ></img>
          <div className={classes["caption"]}>
            <div
              className={`${classes["caption__icon"]} ${classes["caption__icon--show"]}`}
              onClick={props.showGame}
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
          src={props.game.consoles ? props.game.consoles[0].logo : ""}
        />
        <div className={classes["product__date-wrapper"]}>
          <div className={classes["product__date"]}>
            Release Date: {props.game.releaseDate.toLocaleDateString()}
          </div>
        </div>
        <h4 className={classes["product__title"]}>{props.game.title}</h4>
        <div className={classes["price-item"]}>
          <div className={classes["price-item__condition"]}>
            {props.game.status}
          </div>
          <div className={classes["price-item__price"]}>
            {props.game.price}
            <span
              style={{
                display: "inline-block",
                padding: "4px",
              }}
            >
              <span style={{ fontSize: "9px", display: "block" }}>,00</span>
              <span style={{ fontSize: "9px", display: "block" }}>RSD</span>
            </span>
          </div>
          <button className={classes["price-item__cart"]}></button>
        </div>
        <div className={classes["product__banner"]}>PreOrder</div>
      </div>
    </Aux>
  );
};

export default Game;
