import * as actionTypes from "./ActionTypes/authentication";
import * as CustomerService from "../../service/CustomerService";
import { UserInfo } from "../../models/UserInfo";

export const authCheckState = () => {
  return async (dispatch: any) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      const date = localStorage.getItem("expirationDate");

      if (date && userId) {
        const expirationDate = new Date(date);
        // console.log(expirationDate > new Date());
        if (expirationDate < new Date()) {
          dispatch(logout());
        } else {
          const role = await CustomerService.findRoleByUserId(parseInt(userId));
          const userInfo = await CustomerService.findUserById(parseInt(userId));

          const updatedExpirationDate =
            (expirationDate.getTime() - new Date().getTime()) / 1000;

          dispatch(authSuccess(token, parseInt(userId), role, userInfo));
          dispatch(checkAuthTimeout(updatedExpirationDate));
        }
      }
    }
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime: number) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(authStart());

    try {
      const userData = await CustomerService.login(email, password);
      const expirationDate = new Date(
        new Date().getTime() + userData.expiresIn * 1000
      );

      localStorage.setItem("token", userData.token);
      localStorage.setItem("expirationDate", expirationDate.toString());
      localStorage.setItem("userId", userData.userId.toString());

      const role = await CustomerService.findRoleByUserId(userData.userId);

      const userInfo = await CustomerService.findUserById(userData.userId);

      dispatch(authSuccess(userData.token, userData.userId, role, userInfo));
      dispatch(checkAuthTimeout(userData.expiresIn));
    } catch (error) {
      dispatch(authFail(error.message));
    }
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (
  token: string,
  userId: number,
  userRole: string,
  userInfo: UserInfo
) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    userRole: userRole,
    userInfo: userInfo,
  };
};

export const authFail = (error: any) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authUpdate = () => {
  return async (dispatch: any, getState: any) => {
    // const userId = getState().authentication.userId;
    // const userInfo = await CustomerService.findUserById(userId);

    dispatch({
      type: actionTypes.AUTH_UPDATE,
      userInfo: getState().authentication.userInfo,
    });
  };
};

interface AuthStarted {
  type: typeof actionTypes.AUTH_START;
}

interface AuthSucceeded {
  type: typeof actionTypes.AUTH_SUCCESS;
  idToken: string;
  userId: number;
  userRole: string;
  userInfo: UserInfo;
}

interface AuthFailed {
  type: typeof actionTypes.AUTH_FAIL;
  error: any;
}

interface AuthLogout {
  type: typeof actionTypes.AUTH_LOGOUT;
}

interface AuthUpdate {
  type: typeof actionTypes.AUTH_UPDATE;
  userInfo: UserInfo;
}

export type ActionTypes =
  | AuthStarted
  | AuthSucceeded
  | AuthFailed
  | AuthLogout
  | AuthUpdate;
