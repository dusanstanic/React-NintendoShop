import React, { FunctionComponent, useEffect } from "react";

import classes from "./Label.module.css";

interface PropsI {
  text: string;
}

const Label: FunctionComponent<PropsI> = (props) => {
  let labelClasses: string[] = [classes["hideLabel"]];
  if (props.text.length > 0) {
    labelClasses.push(classes["showLabel"]);
  }
  return <label className={labelClasses.join(" ")}>{props.text}</label>;
};

export default Label;
