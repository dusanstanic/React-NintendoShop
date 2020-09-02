import React from "react";

import classes from "./Error.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../hoc/Auxiliary";

const Error = (props: any) => {
  return (
    <Aux>
      <Backdrop />
      <div className={classes.Error}>
        Error: Email or password doesn't exist
      </div>
    </Aux>
  );
};

export default Error;
