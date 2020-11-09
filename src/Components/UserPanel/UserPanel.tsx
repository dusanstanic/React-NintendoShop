import React, { FunctionComponent, useEffect, useRef } from "react";
import { Route, NavLink, withRouter, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./UserPanel.module.css";
import UserPanelInfo from "./UserPanelInfo/UserPanelInfo";
import { UserInfo } from "../../models/UserInfo";
import UserPanelUpdateInfo from "./UserPanelUpdateInfo/UserPanelUpdateInfo";

interface PropsI {
  isAuthenticated: boolean;
  userRole: string;
  userInfo: UserInfo;
}

const UserPanel: FunctionComponent<PropsI> = (props) => {
  const userInfoBtn = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    //userInfoBtn.current?.click();
  }, []);

  return (
    <div className={classes.userPanel}>
      <div className={classes["userPanel-header"]}>
        <div className={classes["column"]}>
          <img
            src={"http://127.0.0.1:8887/user.png"}
            style={{ verticalAlign: "middle" }}
          />
          <div style={{ display: "inline-block", verticalAlign: "middle" }}>
            {props.userInfo?.firstName + " " + props.userInfo?.lastName}
          </div>
        </div>
        <div className={classes["column"]}>
          <div>Email</div>
          <div>{props.userInfo?.email}</div>
        </div>
        <div className={classes["column"]}>
          <div>Telephone</div>
          <div>{props.userInfo?.phone}</div>
        </div>
        <div className={classes["column"]}>
          <div>Address</div>
          <div>{props.userInfo?.city}</div>
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
              to={{ pathname: "/userPanel/userPanelInfo" }}
              className={classes["userPanel-body-option__link"]}
              ref={userInfoBtn}
            >
              User information
            </NavLink>
          </div>
          <div className={classes["userPanel-body-option"]}>
            <NavLink
              to={{ pathname: "/userPanel/userPanelUpdateInfo" }}
              className={classes["userPanel-body-option__link"]}
            >
              Update information
            </NavLink>
          </div>
          <div>
            <NavLink
              to={{ pathname: "/userPanel/wishList" }}
              className={classes["userPanel-body-option__link"]}
            >
              WishList
            </NavLink>
          </div>
          <div>
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
            path={"/userPanel/userPanelInfo"}
            render={() => (
              <UserPanelInfo
                userRole={props.userRole}
                userInfo={props.userInfo}
              />
            )}
          />
          <Route
            path={"/userPanel/userPanelUpdateInfo"}
            render={() => (
              <UserPanelUpdateInfo
                userRole={props.userRole}
                userInfo={props.userInfo}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProp = (state: any) => {
  return {
    isAuthenticated: state.authentication.token !== "",
    userRole: state.authentication.userRole,
    userInfo: state.authentication.userInfo,
  };
};

export default connect(mapStateToProp, {})(UserPanel);
