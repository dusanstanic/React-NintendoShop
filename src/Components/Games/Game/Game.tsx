import React from "react";

import Aux from "../../../hoc/Auxiliary";

import GamesM from "../../../models/GamesM";

const Game = (props: { game: GamesM; showGame: any }) => {
  return (
    <Aux>
      <tr onClick={props.showGame}>
        <td>{props.game.title}</td>
        <td>{props.game.price} din</td>
      </tr>
    </Aux>
  );
};

export default Game;
