import React, { FunctionComponent } from "react";

import classes from "./UserPanelInfo.module.css";

import Aux from "../../../hoc/Auxiliary";
import { UserInfo } from "../../../models/UserInfo";
import { useRouteMatch } from "react-router";

interface PropsI {
  userRole: string;
  userInfo: UserInfo;
}

const UserPanelInfo: FunctionComponent<PropsI> = (props) => {
  let userInfo = null;
  // console.log(props.userInfo.firstName);
  if (props.userInfo) {
    userInfo = props.userInfo;
  }

  console.log("userinfo " + userInfo);
  console.log("userinfo " + props.userInfo);

  return (
    <Aux>
      <div className={classes["userPanelInfo-row"]}>
        <h1>Personal Data</h1>
      </div>
      <div className={classes["userPanelInfo-row"]}>
        <div className={classes["userPanelInfo-column"]}>Name</div>
        <div className={classes["userPanelInfo-column"]}>
          <span>{userInfo?.firstName + " " + userInfo?.lastName}</span>
        </div>
      </div>
      <div className={classes["userPanelInfo-row"]}>
        <div className={classes["userPanelInfo-column"]}>Email</div>
        <div className={classes["userPanelInfo-column"]}>
          <span>{userInfo?.email}</span>
        </div>
      </div>
      <div className={classes["userPanelInfo-row"]}>
        <div className={classes["userPanelInfo-column"]}>Phone Number</div>
        <div className={classes["userPanelInfo-column"]}>
          <span>{userInfo?.phone}</span>
        </div>
      </div>
      <div className={classes["userPanelInfo-row"]}>
        <div className={classes["userPanelInfo-column"]}>City</div>
        <div className={classes["userPanelInfo-column"]}>
          <span>{userInfo?.city}</span>
        </div>
      </div>
      <div className={classes["userPanelInfo-row"]}>
        <div className={classes["userPanelInfo-column"]}>Street</div>
        <div className={classes["userPanelInfo-column"]}>
          <span>{userInfo?.street}</span>
        </div>
      </div>
      <div className={classes["userPanelInfo-row"]}>
        <div className={classes["userPanelInfo-column"]}>Street Number</div>
        <div className={classes["userPanelInfo-column"]}>
          <span>{userInfo?.streetNumber}</span>
        </div>
      </div>
    </Aux>
  );
};

export default UserPanelInfo;
