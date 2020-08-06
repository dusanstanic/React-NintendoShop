import React, { useEffect, useState } from "react";
import "./GameDetails.css";

import * as GameService from "../../service/GamesService";

import GameM from "../../models/GamesM";

import Aux from "../../hoc/Auxiliary";

const GameDetails = (props: any) => {
  const [game, setGameData] = useState<GameM>();

  useEffect(() => {
    const gameId: number = props.match.params.id;
    GameService.getGameById(gameId).then((game) => {
      setGameData(game);
    });
  }, [props.match.params.id]);

  if (game) {
    return (
      <Aux>
        <section className="main-game">
          <h2 className="main-game__title">{game.title}</h2>
          <img
            src="http://127.0.0.1:8887/pegi7.png"
            className="main-game__pegiRating"
            alt="Nintendo Switch Game Pegi Rating"
          ></img>
          <h4 className="main-game__releaseDate">{game.releaseDate}</h4>
          <h4 className="main-game__price">{game.price} ,00 RSD</h4>
          <img
            src={game.image}
            className="main-game__image"
            alt="Nintendo Switch Game"
          ></img>
          <p className="main-game__description">{game.description}</p>
        </section>
      </Aux>
    );
  } else {
    return <div>No Game Found !</div>;
  }
};

export default GameDetails;
