import React from "react";

import classes from "./Backdrop.module.css";

const Backdrop = (props: any) => {
  return props.show ? (
    <div className={classes["backdrop"]} onClick={props.clicked}></div>
  ) : null;
};

export default Backdrop;
