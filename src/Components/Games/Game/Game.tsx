import React from "react";

import classes from "./Game.module.css";

import Aux from "../../../hoc/Auxiliary";

import GamesM from "../../../models/GameM";

const Game = (props: { game: GamesM; showGame: any }) => {
  return (
    <Aux>
      <div className={classes["game-tile"]}>
        <div className={classes["game-image-wrapper"]}>
          <img
            alt="Nintendo Game"
            src={props.game.images ? props.game.images[0].destination : ""}
            className={classes["game-tile-image"]}
          ></img>
          <div className={classes["game-caption-icons"]}>
            <div
              className={classes["game-caption-icon-show"]}
              onClick={props.showGame}
            ></div>
            <div className={classes["game-caption-icon-compare"]}></div>
            <div className={classes["game-caption-icon-favorite"]}></div>
          </div>
        </div>
        <img
          className={classes["game-logo"]}
          alt="logo"
          src={props.game.consoles ? props.game.consoles[0].logo : ""}
        />
        <div className={classes["game-tile-release-date-wrapper"]}>
          <div className={classes["game-tile-release-date"]}>
            Release Date: {props.game.releaseDate.toLocaleDateString()}
          </div>
        </div>
        <h4 className={classes["game-tile-title"]}>{props.game.title}</h4>
        <div className={classes["game-tile-price-item"]}>
          <div className={classes["game-tile-condition"]}>
            {props.game.status}
          </div>
          <div className={classes["game-tile-price"]}>
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
          <button className={classes["game-add-to-cart-btn"]}></button>
        </div>
        <div className={classes["game-tile-banner"]}>PreOrder</div>
      </div>
    </Aux>
  );
};

export default Game;
