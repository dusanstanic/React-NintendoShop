import { UserInfo } from "../../shared/models/UserInfo";
import * as actionTypes from "../actions/ActionTypes/authentication";
import { ActionTypes } from "../actions/authentication";
import { updateObject } from "./utility";

interface AuthenticationState {
  token: string;
  userId: number;
  userRole: string;
  userInfo?: UserInfo;
  error: any;
  loading: boolean;
}

const initialState: AuthenticationState = {
  token: "",
  userId: 0,
  userRole: "",
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
        userRole: action.userRole,
        userInfo: action.userInfo,
        error: null,
        loading: false,
      });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, { token: "", userId: 0 });
    case actionTypes.AUTH_UPDATE:
      return updateObject(state, { userInfo: action.userInfo });
    default:
      return state;
  }
};

export default reducer;
