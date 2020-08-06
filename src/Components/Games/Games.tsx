import React from "react";
import classes from "./Games.module.css";
import { Route } from "react-router-dom";

import RouteProps from "../../models/Route";
import GamesM from "../../models/GamesM";

import Aux from "../../hoc/Auxiliary";

import Game from "./Game/Game";
import GameDetails from "../GameDetails/GameDetails";

const Games = (props: { games: GamesM[]; routerProps: RouteProps }) => {
  const showGame = (id: number | undefined) => {
    props.routerProps.history.push({ pathname: "/games/" + id });
  };

  return (
    <Aux>
      <div className={classes["main-game-grid"]}>
        <div className={classes["game-search-options"]}>
          <div className={classes["game-serach-options-pgRating"]}>
            <h4 className={classes["game-search-options-title"]}>
              Pegi Rating
            </h4>
          </div>
          <div>
            <h4 className={classes["game-search-options-title"]}>Pick Genre</h4>
          </div>
        </div>
        <div className={classes["games-list-container"]}>
          {props.games.map((game: GamesM, index: number) => {
            return (
              <Game
                key={index}
                game={game}
                showGame={() => showGame(game.id)}
              />
            );
          })}
        </div>
        <Route path="/games/:id" component={GameDetails} />
      </div>
    </Aux>
  );
};

export default Games;
