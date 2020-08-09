import React from "react";
import classes from "./Games.module.css";
import { Route } from "react-router-dom";

import RouteProps from "../../models/Route";
import GamesM from "../../models/GamesM";

import Aux from "../../hoc/Auxiliary";

import GameSearchOptions from "../GameSearchOptions/GameSearchOptions";
import Game from "./Game/Game";
import GameDetails from "../GameDetails/GameDetails";

const Games = (props: {
  games: GamesM[];
  routerProps: RouteProps;
  updateDisplayedGames: Function;
}) => {
  const showGame = (id: number | undefined) => {
    props.routerProps.history.push({ pathname: "/games/" + id });
  };

  return (
    <Aux>
      <div className={classes["main-game-grid"]}>
        <GameSearchOptions
          class={classes["game-search-options"]}
          updateDisplayedGames={props.updateDisplayedGames}
        ></GameSearchOptions>
        <div className={classes["games-list-container"]}>
          {props.games.map((game: GamesM) => {
            return (
              <Game
                key={game.id}
                game={game}
                showGame={() => showGame(game.id)}
              />
            );
          })}
        </div>
      </div>
      <Route path="/games/:id" component={GameDetails} />
    </Aux>
  );
};

export default Games;
