import ConsoleM from "../../models/ConsoleM";

export const SET_CONSOLES = "SET_CONSOLES";

interface SetConsolesAction {
  type: typeof SET_CONSOLES;
  payload: { consoles: ConsoleM[] };
}

export type ActionTypes = SetConsolesAction;
