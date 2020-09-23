import * as actionTypes from "./ActionTypes/gameDataActionTypes";

import GameM from "../../models/GameM";
import { GenreM } from "../../models/GenreM";

export const set_games = (games: GameM[]) => {
  return {
    type: actionTypes.SET_GAMES,
    payload: { games: games },
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

export type ActionTypes = SetGamesAction | SetGenresAction | SetPgRatingsAction;
