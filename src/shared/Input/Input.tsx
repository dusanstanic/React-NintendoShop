import React from "react";

import classes from "./Input.module.css";

const InputCheckBox = (props: {
  name: string;
  value: any;
  click: any;
  text: string;
}) => {
  return (
    <div>
      <input
        name={props.name}
        type="checkbox"
        value={props.value}
        onClick={(event) => props.click(event)}
      ></input>
      <label className={classes.label}>{props.text}</label>
    </div>
  );
};

const InputRadioBox = (props: {
  name: string;
  value: any;
  click: any;
  text: string;
}) => {
  return (
    <div>
      <input
        name={props.name}
        type="radio"
        value={props.value}
        onClick={(event) => props.click(event)}
      ></input>
      <label>{props.value}</label>
    </div>
  );
};

export { InputCheckBox, InputRadioBox };
