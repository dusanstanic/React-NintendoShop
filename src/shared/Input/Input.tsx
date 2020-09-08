import React from "react";

const InputCheckBox = (props: { name: string; value: any; click: any }) => {
  return (
    <div>
      <input
        name={props.name}
        type="checkbox"
        value={props.value}
        onClick={(event) => props.click(event)}
      ></input>
      <label>{props.value}</label>
    </div>
  );
};

export { InputCheckBox };
