import * as actionTypes from "../actions/ActionTypes/consoleDataActionTypes";
import { ActionTypes } from "../actions/consoleData";
import { updateObject } from "./utility";

import Console from "../../models/ConsoleM";

export interface ConsoleDataState {
  consoles: Console[];
}

const initialState: ConsoleDataState = {
  consoles: [],
};

const reducer = (
  state = initialState,
  action: ActionTypes
): ConsoleDataState => {
  switch (action.type) {
    case actionTypes.SET_CONSOLES:
      return updateObject(state, { consoles: action.payload.consoles });
    default:
      return state;
  }
};

export default reducer;
