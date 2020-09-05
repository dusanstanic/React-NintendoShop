import React from "react";

import classes from "./Error.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../hoc/Auxiliary";

const Error = (props: { errorMessage: string }) => {
  return (
    <Aux>
      <Backdrop />
      <div className={classes.Error}>
        <div className={classes.title}>Error</div>
        <p className={classes.description}>{props.errorMessage}</p>
      </div>
    </Aux>
  );
};

export default Error;
