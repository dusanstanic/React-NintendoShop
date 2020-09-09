import Console from "../../models/ConsoleM";

export const SET_SELECTED_CONSOLES = "SET_SELECTED_CONSOLES";
export const SET_SELECTED_TYPES = "SET_SELECTED_TYPES";
export const SET_SELECTED_CONDITION = "SET_SELECTED_CONDITION";
export const SET_SELECTED_PRICE_RANGES = "SET_SELECTED_PRICE_RANGES";
export const SET_SELECTED_CONSOLES_BY_TYPE = "SET_SELECTED_CONSOLES_BY_TYPE";
export const SET_SELECTED_CONSOLES_BY_CONDITION =
  "SET_SELECTED_CONSOLES_BY_CONDITION";
export const SET_SELECTED_CONSOLES_BY_PRICE_RANGES =
  "SET_SELECTED_CONSOLES_BY_PRICE_RANGES";

interface SetSelectedConsolesAction {
  type: typeof SET_SELECTED_CONSOLES;
  payload: { consoles: Console[] };
}

interface SetSelectedTypesAction {
  type: typeof SET_SELECTED_TYPES;
  payload: { types: string[] };
}

interface SetSelectedCondtionAction {
  type: typeof SET_SELECTED_CONDITION;
  payload: { condition: string };
}

interface SetSelectedPriceRangesAction {
  type: typeof SET_SELECTED_PRICE_RANGES;
  payload: { priceRanges: string[] };
}

interface SetSelectedConsolesByTypeAction {
  type: typeof SET_SELECTED_CONSOLES_BY_TYPE;
  payload: { consoles: Console[] };
}

interface SetSelectedConsolesByConditionAction {
  type: typeof SET_SELECTED_CONSOLES_BY_CONDITION;
  payload: { consoles: Console[] };
}

interface SetSelectedConsolesByPriceRangeAction {
  type: typeof SET_SELECTED_CONSOLES_BY_PRICE_RANGES;
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
