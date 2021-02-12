import React, { FunctionComponent, useState } from "react";
import { useStore } from "react-redux";

import classes from "./Input.module.css";

const InputCheckBox = (props: {
  name: string;
  value: any;
  click: any;
  text: string;
  checked?: boolean;
  class?: string;
}) => {
  return (
    <div>
      <input
        name={props.name}
        type="checkbox"
        value={props.value}
        onChange={(event) => props.click(event)}
        checked={props.checked}
        className={props.class}
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

interface PropsInputCheckbox {
  name: string;
  value: any;
  click: any;
  checked?: boolean;
  className?: string;
  isValid?: string;
}

const InputCheckBox1: FunctionComponent<PropsInputCheckbox> = ({
  name,
  className,
  click,
  value,
  checked,
  children,
  isValid,
}) => {
  const cssClasses = [
    className,
    isValid ? classes["valid"] : classes["invalid"],
  ];

  return (
    <input
      name={name}
      type="checkbox"
      value={value}
      onChange={(event) => click(event)}
      checked={checked}
      className={cssClasses.join(" ")}
    ></input>
  );
};

interface PropsIInput {
  type: string;
  name: string;
  placeholder?: string;
  value: any;
  change: any;
  checked?: boolean;
  className?: string;
  validClassName?: string;
  invalidClassName?: string;
  isValid?: boolean;
}

const Input: FunctionComponent<PropsIInput> = ({
  type,
  name,
  placeholder,
  value,
  change,
  className,
  validClassName,
  invalidClassName,
  checked,
  isValid,
}) => {
  const cssClasses = [className, isValid ? validClassName : invalidClassName];

  if (type === "text") {
    return (
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => change(event)}
        className={cssClasses.join(" ")}
      ></input>
    );
  }

  return <div></div>;
};

export { InputCheckBox, InputRadioBox, Input, InputCheckBox1 };
