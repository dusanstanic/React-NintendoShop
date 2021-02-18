import * as actionTypes from "../actions/ActionTypes/consoleDisplayActionTypes";
import { ConsoleDisplayActions } from "../actions/consoleDisplay";
import { updateObject } from "./utility";

import Console from "../../shared/models/ConsoleM";

export interface ConsoleDisplayState {
  selectedConsoles: Console[];
  selectedTypes: string[];
  selectedCondition: string;
  selectedPriceRanges: string[];
  selectedConsolesByType: Console[];
  selectedConsolesByCondition: Console[];
  selectedConsolesByPriceRange: Console[];
}

const initialState: ConsoleDisplayState = {
  selectedConsoles: [],
  selectedTypes: [],
  selectedCondition: "",
  selectedPriceRanges: [],
  selectedConsolesByType: [],
  selectedConsolesByCondition: [],
  selectedConsolesByPriceRange: [],
};

const reducer = (state = initialState, action: ConsoleDisplayActions) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_CONSOLES:
      return updateObject(state, { selectedConsoles: action.payload.consoles });
    case actionTypes.SET_SELECTED_TYPES:
      return updateObject(state, { selectedTypes: action.payload.types });
    case actionTypes.SET_SELECTED_CONDITION:
      return updateObject(state, {
        selectedCondition: action.payload.condition,
      });
    case actionTypes.SET_SELECTED_PRICE_RANGES:
      return updateObject(state, {
        selectedPriceRanges: action.payload.priceRanges,
      });
    case actionTypes.SET_SELECTED_CONSOLES_BY_TYPE:
      return updateObject(state, {
        selectedConsolesByType: action.payload.consoles,
      });
    case actionTypes.SET_SELECTED_CONSOLES_BY_CONDITION:
      return updateObject(state, {
        selectedConsolesByCondition: action.payload.consoles,
      });
    case actionTypes.SET_SELECTED_CONSOLES_BY_PRICE_RANGES:
      return updateObject(state, {
        selectedConsolesByPriceRange: action.payload.consoles,
      });
    default:
      return state;
  }
};

export default reducer;
