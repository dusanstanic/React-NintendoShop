import Console from "../../models/ConsoleM";

export const SET_SELECTED_CONSOLES = "SET_SELECTED_CONSOLES";
export const SET_SELECTED_TYPES = "SET_SELECTED_TYPES";
export const SET_SELECTED_CONDITION = "SET_SELECTED_CONDITION";
export const SET_SELECTED_PRICE_RANGES = "SET_SELECTED_PRICE_RANGES";

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

export type ConsoleDisplayActions =
  | SetSelectedConsolesAction
  | SetSelectedTypesAction
  | SetSelectedCondtionAction
  | SetSelectedPriceRangesAction;
