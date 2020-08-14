import React from "react";
import classes from "./Games.module.css";
import { Route } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

import GameM from "../../models/GamesM";

import Aux from "../../hoc/Auxiliary";

import GameSearchOptions from "../GameSearchOptions/GameSearchOptions";
import Game from "./Game/Game";
import GameDetails from "../GameDetails/GameDetails";

interface RouteProps extends RouteComponentProps<{}> {
  onIncrementCounter: Function;
  ctr: number;
  setGames: Function;
  setSelectedPgRatings: Function;
  setSelectedGenres: Function;
  setSelectedGames: Function;
  setSelectedGamesByPgRating: Function;
  setSelectedGamesByGenre: Function;
  games: GameM[];
  selectedGames: GameM[];
  selectedPgRatings: string[];
  selectedGenres: string[];
  selectedGamesByPgRating: GameM[];
  selectedGamesByGenre: GameM[];
}

const Games = (props: {
  routerProps: RouteProps;
  updateDisplayedGames: Function;
}) => {
  console.log(props);
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
          {props.routerProps.selectedGames.map((game: GameM) => {
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
