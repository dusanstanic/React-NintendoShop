import React, { useEffect, useState } from "react";
import Game from "../Games/Game/Game";

import * as GameService from "../../service/GamesService";

import GameM from "../../models/GamesM";

import Aux from "../../hoc/Auxiliary";

const GameDetails = (props: any) => {
  const [game, setGameData] = useState<GameM>({
    id: 1,
    title: "Luigi's Mansion 3",
    description: "description",
    releaseDate: new Date(),
    price: 8000,
    pgRating: "E",
    image: "",
    genre: { id: 1, type: "Platform" },
  });

  useEffect(() => {
    const gameId: number = props.match.params.id;
    GameService.getGameById(gameId).then((game) => {
      setGameData(game);
    });
  }, [game]);

  return (
    <Aux>
      GameDetails
      <div>
        <h1>{game.title}</h1>
        <h4>{game.price}</h4>
      </div>
    </Aux>
  );
};

export default GameDetails;
