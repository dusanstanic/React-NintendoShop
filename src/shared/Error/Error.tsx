import React from "react";

import classes from "./Error.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../hoc/Auxiliary";

const Error = (props: any) => {
  return (
    <Aux>
      <Backdrop />
      <div className={classes.Error}>
        <h3 className={classes.title}>Error</h3>
        <p className={classes.description}>Email or password doesn't exist</p>
      </div>
    </Aux>
  );
};

export default Error;
