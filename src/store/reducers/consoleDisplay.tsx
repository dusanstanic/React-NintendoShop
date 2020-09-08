import * as actionTypes from "../actions/consoleDisplay";
import { ConsoleDisplayActions } from "../actions/consoleDisplay";

import Console from "./../../models/ConsoleM";

export interface ConsoleDisplayState {
  selectedConsoles: Console[];
  selectedTypes: string[];
  selectedCondition: string;
  selectedPriceRanges: string[];
}

const initialState: ConsoleDisplayState = {
  selectedConsoles: [],
  selectedTypes: [],
  selectedCondition: "",
  selectedPriceRanges: [],
};

const reducer = (state = initialState, action: ConsoleDisplayActions) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_CONSOLES:
      return { ...state, selectedConsoles: action.payload.consoles };
    case actionTypes.SET_SELECTED_TYPES:
      return { ...state, selectedTypes: action.payload.types };
    case actionTypes.SET_SELECTED_CONDITION:
      return { ...state, selectedCondition: action.payload.condition };
    case actionTypes.SET_SELECTED_PRICE_RANGES:
      return {
        ...state,
        selectedPriceRanges: action.payload.priceRanges,
      };
    default:
      return state;
  }
};

export default reducer;
