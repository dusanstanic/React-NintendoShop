import * as actionTypes from "../actions/gameDisplay";
import { GameDisplayActionTypes } from "../actions/gameDisplay";

import Game from "../../models/GamesM";

export interface GameDisplayState {
  games: Game[];
  selectedGames: Game[];
  selectedPgRatings: string[];
  selectedGenres: string[];
  selectedGamesByPgRating: Game[];
  selectedGamesByGenre: Game[];
}

const initialState: GameDisplayState = {
  games: [],
  selectedGames: [],
  selectedPgRatings: [],
  selectedGenres: [],
  selectedGamesByPgRating: [],
  selectedGamesByGenre: [],
};

const reducer = (state = initialState, action: GameDisplayActionTypes) => {
  // console.log(action);
  switch (action.type) {
    case actionTypes.SET_GAMES:
      return { ...state, games: action.payload.games };
    case actionTypes.SET_SELECTED_GAMES:
      return { ...state, selectedGames: action.payload.games };
    case actionTypes.SET_SELECTED_PGRATINGS:
      return { ...state, selectedPgRatings: action.payload.pgRatings };
    case actionTypes.SET_SELECTED_GENRES:
      return { ...state, selectedGenres: action.payload.genres };
    case actionTypes.SET_SELECTED_GAMES_BY_PGRATING:
      return {
        ...state,
        selectedGamesByPgRating: action.payload.games,
      };
    case actionTypes.SET_SELECTED_GAMES_BY_GENRE:
      return {
        ...state,
        selectedGamesByGenre: action.payload.games,
      };
    default:
      return state;
  }
};

export default reducer;
