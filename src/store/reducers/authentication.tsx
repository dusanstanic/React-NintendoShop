import * as actionTypes from "../actions/ActionTypes/authentication";
import { ActionTypes } from "../actions/authentication";
import { updateObject } from "./utility";

interface AuthenticationState {
  token: string;
  userId: number;
  error: any;
  loading: boolean;
}

const initialState: AuthenticationState = {
  token: "",
  userId: 0,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
      });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, { token: "", userId: 0 });
    default:
      return state;
  }
};

export default reducer;
