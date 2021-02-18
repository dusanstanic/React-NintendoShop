import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  Route,
  NavLink,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";

import classes from "./UserPanel.module.scss";

import * as actionTypes from "../../store/actions/index";

import UserPanelInfo from "./UserPanelInfo/UserPanelInfo";
import { UserInfo } from "../../models/UserInfo";
import UserPanelUpdateInfo from "./UserPanelUpdateInfo/UserPanelUpdateInfo";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { customerAxios } from "../../service/axios-main";
import didMount from "../../shared/customHooks/didMount";

interface PropsI extends RouteComponentProps {
  isAuthenticated: boolean;
  userRole: string;
  userInfo: UserInfo;
  userId: number;
  onAuthUpdate: Function;
}

const UserPanel: FunctionComponent<PropsI> = ({
  userInfo,
  isAuthenticated,
  userRole,
  userId,
  onAuthUpdate,
  match,
}) => {
  const userInfoBtn = useRef<HTMLAnchorElement>(null);
  const [redirect, setRedirect] = useState(<></>);
  const [isMounted, setIsMounted] = didMount();

  useEffect(() => {
    userInfoBtn.current?.click();
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (!isAuthenticated) {
      setRedirect(<Redirect to="/logout" />);
    }
  }, [isAuthenticated]);

  return (
    <div className={classes.userPanel}>
      {redirect}
      <div className={classes["userPanel__header"]}>
        <div className={classes["column"]}>
          <img
            src={"http://127.0.0.1:8887/user.png"}
            alt="user"
            className={classes["column__img"]}
          />
          <div className={classes["column__info--user"]}>
            {userInfo?.firstName + " " + userInfo?.lastName}
          </div>
        </div>
        <div className={classes["column"]}>
          <div>Email</div>
          <div>{userInfo?.email}</div>
        </div>
        <div className={classes["column"]}>
          <div>Telephone</div>
          <div>{userInfo?.phone}</div>
        </div>
        <div className={classes["column"]}>
          <div>Address</div>
          <div>{userInfo?.city}</div>
        </div>
        <div className={classes["column"]}>
          <div>Deactivate</div>
        </div>
      </div>
      <div className={classes["userPanel__body"]}>
        <div className={classes["options"]}>
          <div className={classes["options__opt"]}>
            <h2>User Panel</h2>
          </div>
          <div className={classes["options__opt"]}>
            <NavLink
              to={{ pathname: match.url + "/userPanelInfo" }}
              className={classes["options__link"]}
              ref={userInfoBtn}
            >
              User information
            </NavLink>
          </div>
          <div className={classes["options__opt"]}>
            <NavLink
              to={{ pathname: match.url + "/userPanelUpdateInfo" }}
              className={classes["options__link"]}
            >
              Update information
            </NavLink>
          </div>
          <div className={classes["options__opt"]}>
            <NavLink
              to={{ pathname: match.url + "/wishList" }}
              className={classes["options__link"]}
            >
              WishList
            </NavLink>
          </div>
          <div className={classes["options__opt"]}>
            <NavLink
              to={{ pathname: "/userPanel/wishList" }}
              className={classes["options__link"]}
            >
              Package Status
            </NavLink>
          </div>
        </div>
        <div className={classes["userPanel__body-routes"]}>
          <Route
            path={match.url + "/userPanelInfo"}
            render={() => (
              <UserPanelInfo userRole={userRole} userInfo={userInfo} />
            )}
          />
          <Route
            path={match.url + "/userPanelUpdateInfo"}
            render={() => (
              <UserPanelUpdateInfo
                userRole={userRole}
                userInfo={userInfo}
                userId={userId}
                onAuthUpdate={onAuthUpdate}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAuthUpdate: (userInfo: UserInfo) => dispatch(actionTypes.authUpdate()),
  };
};

const mapStateToProp = (state: any) => {
  return {
    isAuthenticated: state.authentication.token !== "",
    userRole: state.authentication.userRole,
    userInfo: state.authentication.userInfo,
    userId: state.authentication.userId,
  };
};

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(withErrorHandler(UserPanel, customerAxios));
