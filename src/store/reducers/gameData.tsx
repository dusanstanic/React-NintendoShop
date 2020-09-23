import * as actionTypes from "../actions/ActionTypes/gameDataActionTypes";
import { ActionTypes } from "../actions/gameData";

import Game from "../../models/GameM";
import { GenreM } from "../../models/GenreM";

export interface GameDataState {
  games: Game[];
  genres: GenreM[];
  pgRatings: string[];
}

const initialState: GameDataState = {
  games: [],
  genres: [],
  pgRatings: [],
};

const reducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case actionTypes.SET_GAMES:
      return { ...state, games: action.payload.games };
    case actionTypes.SET_GENRES:
      return { ...state, genres: action.payload.genres };
    case actionTypes.SET_PEGIRATINGS:
      return { ...state, pgRatings: action.payload.pgRatings };
    default:
      return state;
  }
};

export default reducer;
