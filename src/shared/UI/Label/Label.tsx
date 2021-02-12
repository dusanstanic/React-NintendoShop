import React, { FunctionComponent } from "react";

import classes from "./Label.module.css";

interface PropsI {
  errorMessages: string[];
}

const Label: FunctionComponent<PropsI> = ({ errorMessages }) => {
  const labelClasses = [classes["hideLabel"]];

  if (errorMessages.length) {
    labelClasses.push(classes["showLabel"]);
  }

  return (
    <div className={labelClasses.join(" ")}>
      {renderErrorMessages(errorMessages)}
    </div>
  );
};

const renderErrorMessages = (errorMessages: string[]) => {
  const errorMessagesJSX = errorMessages.map((errorMessage, index) => {
    return (
      <div key={index} className={classes["errorMessage"]}>
        {errorMessage}
      </div>
    );
  });

  return errorMessagesJSX;
};

interface LabelInputProps {
  text: string;
  htmlFor?: string;
  className?: string;
}

const LabelInput: FunctionComponent<LabelInputProps> = ({
  text,
  className,
  htmlFor,
}) => {
  return (
    <label className={className} htmlFor={htmlFor}>
      {text}
    </label>
  );
};

export default Label;
export { LabelInput };
