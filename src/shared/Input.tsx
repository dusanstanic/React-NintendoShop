import React from "react";

const InputCheckBox = (props: any) => {
  return (
    <div>
      <input
        name={props.name}
        type="checkbox"
        value={props.value}
        onClick={(event) => props.updateDisplayedGames(event)}
      ></input>
      <label>{props.value}</label>
    </div>
  );
};

export { InputCheckBox };
