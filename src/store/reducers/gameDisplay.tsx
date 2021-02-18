import * as actionTypes from "../actions/ActionTypes/gameDisplayActionTypes";
import { GameDisplayActionTypes } from "../actions/gameDisplay";

import Game from "../../shared/models/GameM";
import { updateObject } from "./utility";

export interface GameDisplayState {
  selectedGames: Game[];
  selectedPgRatings: string[];
  selectedGenres: string[];
  selectedGamesByPgRating: Game[];
  selectedGamesByGenre: Game[];
}

const initialState: GameDisplayState = {
  selectedGames: [],
  selectedPgRatings: [],
  selectedGenres: [],
  selectedGamesByPgRating: [],
  selectedGamesByGenre: [],
};

const reducer = (state = initialState, action: GameDisplayActionTypes) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_GAMES:
      return updateObject(state, { selectedGames: action.payload.games });
    case actionTypes.SET_SELECTED_PGRATINGS:
      return updateObject(state, {
        selectedPgRatings: action.payload.pgRatings,
      });
    case actionTypes.SET_SELECTED_GENRES:
      return updateObject(state, { selectedGenres: action.payload.genres });
    case actionTypes.SET_SELECTED_GAMES_BY_PGRATING:
      return updateObject(state, {
        selectedGamesByPgRating: action.payload.games,
      });
    case actionTypes.SET_SELECTED_GAMES_BY_GENRE:
      return updateObject(state, {
        selectedGamesByGenre: action.payload.games,
      });
    default:
      return state;
  }
};

export default reducer;
