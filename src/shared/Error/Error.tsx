import React from "react";

import classes from "./Error.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../hoc/Auxiliary";

const Error = (props: { errorMessage: string }) => {
  return (
    <Aux>
      <Backdrop />
      <div className={classes.Error}>
        <p className={classes.description}>{props.errorMessage}</p>
      </div>
    </Aux>
  );
};

export default Error;
