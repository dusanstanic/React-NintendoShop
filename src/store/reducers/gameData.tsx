import * as actionTypes from "../actions/ActionTypes/gameDataActionTypes";
import { ActionTypes } from "../actions/gameData";
import { updateObject } from "./utility";

import Game from "../../models/GameM";
import { GenreM } from "../../models/GenreM";

export interface GameDataState {
  games: Game[];
  genres: GenreM[];
  pgRatings: string[];
  error: boolean;
}

const initialState: GameDataState = {
  games: [],
  genres: [],
  pgRatings: [],
  error: false,
};

const reducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case actionTypes.SET_GAMES:
      return updateObject(state, { games: action.payload.games, error: false });
    case actionTypes.SET_GENRES:
      return updateObject(state, { genres: action.payload.genres });
    case actionTypes.SET_PEGIRATINGS:
      return updateObject(state, { pgRatings: action.payload.pgRatings });
    case actionTypes.FETCH_GAMES_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;
