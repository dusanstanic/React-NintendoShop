import React from "react";

import classes from "./Error.module.css";
import Aux from "../../../hoc/Auxiliary";

const Error = (props: { errorMessage: string }) => {
  if (props.errorMessage) {
    return (
      <Aux>
        <div className={classes.Error}>
          <p className={classes.description}>{props.errorMessage}</p>
        </div>
      </Aux>
    );
  }
  return null;
};

export default Error;
