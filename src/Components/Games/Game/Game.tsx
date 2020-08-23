import React from "react";

import classes from "./Game.module.css";

import Aux from "../../../hoc/Auxiliary";

import GamesM from "../../../models/GameM";

const Game = (props: { game: GamesM; showGame: any }) => {
  return (
    <Aux>
      <div onClick={props.showGame} className={classes["game-tile"]}>
        <div className={classes["game-tile-banner"]}>PreOrder</div>
        <img
          alt="game"
          src={props.game.images ? props.game.images[0].destination : ""}
          className={classes["game-tile-image"]}
        ></img>
        <h4 className={classes["game-tile-title"]}>{props.game.title}</h4>
        <h4 className={classes["game-tile-price"]}>{props.game.price} din</h4>
      </div>
    </Aux>
  );
};

export default Game;
