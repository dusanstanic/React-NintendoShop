import React from "react";

import classes from "./Game.module.css";

import Aux from "../../../hoc/Auxiliary";

import GamesM from "../../../models/GamesM";

const Game = (props: { game: GamesM; showGame: any }) => {
  return (
    <Aux>
      <div onClick={props.showGame} className={classes["game-tile"]}>
        <img
          alt="game"
          src={props.game.image}
          className={classes["game-tile-image"]}
        ></img>
        <h4 className={classes["game-tile-title"]}>{props.game.title}</h4>
        <h4 className={classes["game-tile-price"]}>
          {props.game.price} ,00 din
        </h4>
      </div>
    </Aux>
  );
};

export default Game;
