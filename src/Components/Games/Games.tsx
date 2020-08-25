import React from "react";
import classes from "./Games.module.css";
import { Route } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

import GameM from "../../models/GameM";

import Aux from "../../hoc/Auxiliary";

import { GameDisplayState } from "../../store/reducers/gameDisplay";
import { GameDataState } from "../../store/reducers/gameData";

import GameSearchOptions from "../GameSearchOptions/GameSearchOptions";
import Game from "./Game/Game";
import GameDetails from "../GameDetails/GameDetails";

interface PropsI
  extends RouteComponentProps<{}>,
    GameDisplayState,
    GameDataState {
  setGames: (games: GameM[]) => void;
  setSelectedPgRatings: (pgRatings: string[]) => void;
  setSelectedGenres: (genres: string[]) => void;
  setSelectedGames: (games: GameM[]) => void;
  setSelectedGamesByPgRating: (games: GameM[]) => void;
  setSelectedGamesByGenre: (games: GameM[]) => void;
}

const Games = (props: PropsI) => {
  const showGame = (id: number | undefined) => {
    props.history.push({ pathname: "/games/" + id });
  };

  return (
    <Aux>
      <div className={classes["main-game-grid"]}>
        <GameSearchOptions
          class={classes["game-search-options"]}
          routerProps={props}
        ></GameSearchOptions>
        <div className={classes["games-list-container"]}>
          {props.selectedGames.map((game: GameM) => {
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
