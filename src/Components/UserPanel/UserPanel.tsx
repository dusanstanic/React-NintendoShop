import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  Route,
  NavLink,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";

import classes from "./UserPanel.module.css";

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
      <div className={classes["userPanel-header"]}>
        <div className={classes["column"]}>
          <img
            src={"http://127.0.0.1:8887/user.png"}
            style={{ verticalAlign: "middle" }}
            alt="user"
          />
          <div style={{ display: "inline-block", verticalAlign: "middle" }}>
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
      <div className={classes["userPanel-body"]}>
        <div className={classes["userPanel-body-options"]}>
          <div className={classes["userPanel-body-option"]}>
            <h2>User Panel</h2>
          </div>
          <div className={classes["userPanel-body-option"]}>
            <NavLink
              to={{ pathname: match.url + "/userPanelInfo" }}
              className={classes["userPanel-body-option__link"]}
              ref={userInfoBtn}
            >
              User information
            </NavLink>
          </div>
          <div className={classes["userPanel-body-option"]}>
            <NavLink
              to={{ pathname: match.url + "/userPanelUpdateInfo" }}
              className={classes["userPanel-body-option__link"]}
            >
              Update information
            </NavLink>
          </div>
          <div className={classes["userPanel-body-option"]}>
            <NavLink
              to={{ pathname: match.url + "/wishList" }}
              className={classes["userPanel-body-option__link"]}
            >
              WishList
            </NavLink>
          </div>
          <div className={classes["userPanel-body-option"]}>
            <NavLink
              to={{ pathname: "/userPanel/wishList" }}
              className={classes["userPanel-body-option__link"]}
            >
              Package Status
            </NavLink>
          </div>
        </div>
        <div className={classes["userPanel-body-info"]}>
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
