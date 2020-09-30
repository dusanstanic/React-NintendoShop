import * as actionTypes from "./ActionTypes/gameDataActionTypes";

import GameM from "../../models/GameM";
import { GenreM } from "../../models/GenreM";

import * as GameService from "../../service/GamesService";

export const set_games = (games: GameM[]) => {
  return {
    type: actionTypes.SET_GAMES,
    payload: { games: games },
  };
};

export const fetch_games_failed = () => {
  return {
    type: actionTypes.FETCH_GAMES_FAILED,
  };
};

export const initGames = () => {
  return (dispatch: any) => {
    GameService.getGames()
      .then((games) => {
        dispatch(set_games(games));
      })
      .catch((error) => {
        dispatch(fetch_games_failed());
      });
  };
};

export const set_genres = (genres: GenreM[]) => {
  return {
    type: actionTypes.SET_GENRES,
    payload: { genres: genres },
  };
};

export const set_pgRatings = (pgRatings: string[]) => {
  return {
    type: actionTypes.SET_PEGIRATINGS,
    payload: { pgRatings: pgRatings },
  };
};

interface SetGamesAction {
  type: typeof actionTypes.SET_GAMES;
  payload: { games: GameM[] };
}

interface SetGenresAction {
  type: typeof actionTypes.SET_GENRES;
  payload: { genres: GenreM[] };
}

interface SetPgRatingsAction {
  type: typeof actionTypes.SET_PEGIRATINGS;
  payload: { pgRatings: string[] };
}

interface FetchtGamesFailedAction {
  type: typeof actionTypes.FETCH_GAMES_FAILED;
}

export type ActionTypes =
  | SetGamesAction
  | SetGenresAction
  | SetPgRatingsAction
  | FetchtGamesFailedAction;
