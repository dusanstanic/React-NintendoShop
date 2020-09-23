import * as actionTypes from "./ActionTypes/consoleDataActionTypes";

import ConsoleM from "../../models/ConsoleM";

export const set_consoles = (consoles: ConsoleM[]) => {
  return {
    type: actionTypes.SET_CONSOLES,
    payload: { consoles: consoles },
  };
};

interface SetConsolesAction {
  type: typeof actionTypes.SET_CONSOLES;
  payload: { consoles: ConsoleM[] };
}

export type ActionTypes = SetConsolesAction;
