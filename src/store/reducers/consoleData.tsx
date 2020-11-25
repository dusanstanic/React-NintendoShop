import * as actionTypes from "../actions/ActionTypes/consoleDataActionTypes";
import { ActionTypes } from "../actions/consoleData";
import { updateObject } from "./utility";

import Console from "../../models/ConsoleM";

export interface ConsoleDataState {
  consoles: Console[];
  consoleTypes: string[];
}

const initialState: ConsoleDataState = {
  consoles: [],
  consoleTypes: [],
};

const reducer = (
  state = initialState,
  action: ActionTypes
): ConsoleDataState => {
  switch (action.type) {
    case actionTypes.SET_CONSOLES:
      return updateObject(state, { consoles: action.payload.consoles });
    case actionTypes.SET_CONSOLES_TYPES:
      return updateObject(state, { consoleTypes: action.payload.consoleTypes });
    default:
      return state;
  }
};

export default reducer;
