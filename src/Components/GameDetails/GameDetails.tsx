import React, { useEffect, useState } from "react";
import "./GameDetails.css";

import * as GameService from "../../service/GamesService";

import GameM from "../../models/GamesM";

import Aux from "../../hoc/Auxiliary";

const GameDetails = (props: any) => {
  const [game, setGameData] = useState<GameM>({
    id: 1,
    title: "Luigi's Mansion 3",
    description:
      "Nakon što su primili poziv u luksuzni hotel, Luigi i društvo kreću na odmor iz snova.Međutim njegov san postoja noćna mora kada King Boo zarobi sve, osim Luigija. I sada uplašeni heroj Luigi uz pomoć profesora E. Gadd mora da prođe opasne spratove hotela kako bi spasio Maria i društvo.",
    releaseDate: new Date(1995, 11, 17),
    price: 8000,
    pgRating: "E",
    image: "D:React - NintendoShopimagesSwitch Luigi's Mansion 3.jpg",
    genre: { id: 1, type: "Platform" },
  });

  useEffect(() => {
    console.log("yoo");
    const gameId: number = props.match.params.id;
    GameService.getGameById(gameId).then((game) => {
      setGameData(game);
    });
  }, [props.match.params.id]);

  return (
    <Aux>
      <section className="main-game">
        <h2 className="main-game__title">{game.title}</h2>
        <img
          src="http://127.0.0.1:8887/pegi7.png"
          className="main-game__pegiRating"
          alt="Nintendo Switch Game Pegi Rating"
        ></img>
        <h4 className="main-game__releaseDate">Datum izlaska: 12.05.2019</h4>
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
};

export default GameDetails;
