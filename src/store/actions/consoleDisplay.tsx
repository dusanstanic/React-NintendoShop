import * as actionTypes from "./ActionTypes/consoleDisplayActionTypes";

import Console from "../../shared/models/ConsoleM";

export const set_selected_consoles = (consoles: (Console | undefined)[]) => {
  return {
    type: actionTypes.SET_SELECTED_CONSOLES,
    payload: { consoles: consoles },
  };
};

export const set_selected_types = (types: string[]) => {
  return {
    type: actionTypes.SET_SELECTED_TYPES,
    payload: { types: types },
  };
};

export const set_selected_condition = (condition: string) => {
  return {
    type: actionTypes.SET_SELECTED_CONDITION,
    payload: { condition: condition },
  };
};

export const set_selected_price_ranges = (priceRanges: string[]) => {
  return {
    type: actionTypes.SET_SELECTED_PRICE_RANGES,
    payload: { priceRanges: priceRanges },
  };
};

export const set_selected_consoles_by_type = (consoles: Console[]) => {
  return {
    type: actionTypes.SET_SELECTED_CONSOLES_BY_TYPE,
    payload: { consoles: consoles },
  };
};

export const set_selected_consoles_by_condition = (consoles: Console[]) => {
  return {
    type: actionTypes.SET_SELECTED_CONSOLES_BY_CONDITION,
    payload: { consoles: consoles },
  };
};

export const set_selected_consoles_by_price_ranges = (consoles: Console[]) => {
  return {
    type: actionTypes.SET_SELECTED_CONSOLES_BY_PRICE_RANGES,
    payload: { consoles: consoles },
  };
};

interface SetSelectedConsolesAction {
  type: typeof actionTypes.SET_SELECTED_CONSOLES;
  payload: { consoles: Console[] };
}

interface SetSelectedTypesAction {
  type: typeof actionTypes.SET_SELECTED_TYPES;
  payload: { types: string[] };
}

interface SetSelectedCondtionAction {
  type: typeof actionTypes.SET_SELECTED_CONDITION;
  payload: { condition: string };
}

interface SetSelectedPriceRangesAction {
  type: typeof actionTypes.SET_SELECTED_PRICE_RANGES;
  payload: { priceRanges: string[] };
}

interface SetSelectedConsolesByTypeAction {
  type: typeof actionTypes.SET_SELECTED_CONSOLES_BY_TYPE;
  payload: { consoles: Console[] };
}

interface SetSelectedConsolesByConditionAction {
  type: typeof actionTypes.SET_SELECTED_CONSOLES_BY_CONDITION;
  payload: { consoles: Console[] };
}

interface SetSelectedConsolesByPriceRangeAction {
  type: typeof actionTypes.SET_SELECTED_CONSOLES_BY_PRICE_RANGES;
  payload: { consoles: Console[] };
}

export type ConsoleDisplayActions =
  | SetSelectedConsolesAction
  | SetSelectedTypesAction
  | SetSelectedCondtionAction
  | SetSelectedPriceRangesAction
  | SetSelectedConsolesByTypeAction
  | SetSelectedConsolesByConditionAction
  | SetSelectedConsolesByPriceRangeAction;
