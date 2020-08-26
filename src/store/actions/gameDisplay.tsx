import GameM from "../../models/GameM";

export const SET_GAMES = "SET_GAMES";
export const SET_SELECTED_GAMES = "SET_SELECTED_GAMES";
export const SET_SELECTED_PGRATINGS = "SET_SELECTED_PGRATINGS";
export const SET_SELECTED_GENRES = "SET_SELECTED_GENRES";
export const SET_SELECTED_GAMES_BY_PGRATING = "SET_SELECTED_GAMES_BY_PGRATING";
export const SET_SELECTED_GAMES_BY_GENRE = "SET_SELECTED_GAMES_BY_GENRE";

export interface SetGamesAction {
  type: typeof SET_GAMES;
  payload: { games: GameM[] };
}

export interface SetSelectedGamesAction {
  type: typeof SET_SELECTED_GAMES;
  payload: { games: GameM[] };
}

export interface SetSelectedPgRatingsAction {
  type: typeof SET_SELECTED_PGRATINGS;
  payload: { pgRatings: string[] };
}

export interface SetSelectedGenresAction {
  type: typeof SET_SELECTED_GENRES;
  payload: { genres: string[] };
}

export interface SetSelectedGamesByPgRatingAction {
  type: typeof SET_SELECTED_GAMES_BY_PGRATING;
  payload: { games: GameM[] };
}

export interface SetSelectedGamesByGenreAction {
  type: typeof SET_SELECTED_GAMES_BY_GENRE;
  payload: { games: GameM[] };
}

export type GameDisplayActionTypes =
  | SetGamesAction
  | SetSelectedGamesAction
  | SetSelectedPgRatingsAction
  | SetSelectedGenresAction
  | SetSelectedGamesByPgRatingAction
  | SetSelectedGamesByGenreAction;

export type ActionTypes = GameDisplayActionTypes;
