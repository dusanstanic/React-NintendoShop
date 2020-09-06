import * as actionTypes from "../actions/consoleData";
import { ActionTypes } from "../actions/consoleData";

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
      return { ...state, consoles: action.payload.consoles };
    default:
      return state;
  }
};

export default reducer;
