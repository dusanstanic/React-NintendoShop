import * as actionTypes from "./ActionTypes/gameDisplayActionTypes";

import GameM from "../../shared/models/GameM";

export const set_selected_pgRatings = (selectedPgRatings: string[]) => {
  return {
    type: actionTypes.SET_SELECTED_PGRATINGS,
    payload: { pgRatings: selectedPgRatings },
  };
};

export const set_selected_genres = (selectedGenres: string[]) => {
  return {
    type: actionTypes.SET_SELECTED_GENRES,
    payload: { genres: selectedGenres },
  };
};

const saveSelectedGames = (selectedGames: GameM[]) => {
  return {
    type: actionTypes.SET_SELECTED_GAMES,
    payload: { games: selectedGames },
  };
};

export const set_selected_games = (selectedGames: GameM[]) => {
  return (dispatch: any, getState: any) => {
    // console.log(getState().gameDisplay);
    setTimeout(() => {
      dispatch(saveSelectedGames(selectedGames));
    }, 500);
  };
};

export const set_selected_games_by_pgRating = (
  selectedGamesByPgRating: GameM[]
) => {
  return {
    type: actionTypes.SET_SELECTED_GAMES_BY_PGRATING,
    payload: { games: selectedGamesByPgRating },
  };
};

export const set_selected_games_by_genre = (selectedGamesByGenre: GameM[]) => {
  return {
    type: actionTypes.SET_SELECTED_GAMES_BY_GENRE,
    payload: { games: selectedGamesByGenre },
  };
};

export interface SetSelectedGamesAction {
  type: typeof actionTypes.SET_SELECTED_GAMES;
  payload: { games: GameM[] };
}

export interface SetSelectedPgRatingsAction {
  type: typeof actionTypes.SET_SELECTED_PGRATINGS;
  payload: { pgRatings: string[] };
}

export interface SetSelectedGenresAction {
  type: typeof actionTypes.SET_SELECTED_GENRES;
  payload: { genres: string[] };
}

export interface SetSelectedGamesByPgRatingAction {
  type: typeof actionTypes.SET_SELECTED_GAMES_BY_PGRATING;
  payload: { games: GameM[] };
}

export interface SetSelectedGamesByGenreAction {
  type: typeof actionTypes.SET_SELECTED_GAMES_BY_GENRE;
  payload: { games: GameM[] };
}

export type GameDisplayActionTypes =
  | SetSelectedGamesAction
  | SetSelectedPgRatingsAction
  | SetSelectedGenresAction
  | SetSelectedGamesByPgRatingAction
  | SetSelectedGamesByGenreAction;

export type ActionTypes = GameDisplayActionTypes;
