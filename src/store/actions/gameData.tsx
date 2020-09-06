import GameM from "../../models/GameM";
import { GenreM } from "../../models/GenreM";

export const SET_GAMES = "SET_GAMES";
export const SET_GENRES = "SET_GENRES";
export const SET_PEGIRATINGS = "SET_PEGIRATINGS";

interface SetGamesAction {
  type: typeof SET_GAMES;
  payload: { games: GameM[] };
}

interface SetGenresAction {
  type: typeof SET_GENRES;
  payload: { genres: GenreM[] };
}

interface SetPgRatingsAction {
  type: typeof SET_PEGIRATINGS;
  payload: { pgRatings: string[] };
}

export type ActionTypes = SetGamesAction | SetGenresAction | SetPgRatingsAction;
