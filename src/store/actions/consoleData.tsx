import * as actionTypes from "./ActionTypes/consoleDataActionTypes";

import ConsoleM from "../../shared/models/ConsoleM";

export const set_consoles = (consoles: ConsoleM[]) => {
  return {
    type: actionTypes.SET_CONSOLES,
    payload: { consoles: consoles },
  };
};

export const set_console_types = (consoleTypes: string[]) => {
  return {
    type: actionTypes.SET_CONSOLES_TYPES,
    payload: { consoleTypes: consoleTypes },
  };
};

interface SetConsolesAction {
  type: typeof actionTypes.SET_CONSOLES;
  payload: { consoles: ConsoleM[] };
}

interface SetConsolesTypesAction {
  type: typeof actionTypes.SET_CONSOLES_TYPES;
  payload: { consoleTypes: string[] };
}

export type ActionTypes = SetConsolesAction | SetConsolesTypesAction;
