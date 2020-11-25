import React from "react";
import classes from "./Spinner.module.css";

const spinner = (props: { showSpinner: boolean }) => {
  if (props.showSpinner) {
    return <div className={classes.loader}></div>;
  } else {
    return <div style={{ display: "none" }}></div>;
  }
};

export default spinner;
