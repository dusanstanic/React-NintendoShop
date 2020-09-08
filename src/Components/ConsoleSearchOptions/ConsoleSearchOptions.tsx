import React, { ChangeEvent } from "react";
import { connect } from "react-redux";

import classes from "./ConsoleSearchOptions.module.css";

import ConsoleM from "../../models/ConsoleM";
import * as consoleDisplayActionTypes from "../../store/actions/consoleDisplay";

import { InputCheckBox } from "../../shared/Input/Input";

interface PropsI {
  setSelectedConsoles: (consoles: ConsoleM[]) => void;
  setSelectedTypes: (types: string[]) => void;
  setSelectedCondition: (condtion: string) => void;
  setSelectedPriceRanges: (priceRanges: string[]) => void;
  consoles: ConsoleM[];
  selectedConsoles: ConsoleM[];
  selectedTypes: string[];
  selectedCondition: string;
  selectedPriceRanges: string[];
}

enum InputName {
  TYPE = "type",
  CONDITION = "condition",
  PRICE_RANGE = "priceRange",
}

const ConsoleSearchOptions = (props: PropsI) => {
  console.log(classes);

  const updateSelectedOptions = (
    selectedOptions: string[],
    currentSelectedOption: string
  ) => {
    const isOptionAlreadySelected = selectedOptions.includes(
      currentSelectedOption
    );

    let updatedSelectedOptions = selectedOptions;
    if (isOptionAlreadySelected) {
      updatedSelectedOptions = updatedSelectedOptions.filter(
        (option: string) => option !== currentSelectedOption
      );
    } else {
      updatedSelectedOptions.push(currentSelectedOption);
    }

    return updatedSelectedOptions;
  };

  const filterConsolesBySelectedOptions = (selectedOptions: string[]) => {
    const selectedConsoles = props.consoles.filter(
      (currentConsole: ConsoleM) => {
        return selectedOptions.includes(currentConsole.type);
      }
    );
    return selectedConsoles;
  };

  const updateDisplayedConsoles = (event: ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const currentSelectedOption = event.target.value;
    let selectedConsolesByTypes: ConsoleM[] = [];

    if (inputName === InputName.TYPE) {
      let selectedTypeOptions = updateSelectedOptions(
        props.selectedTypes,
        currentSelectedOption
      );
      selectedConsolesByTypes = filterConsolesBySelectedOptions(
        selectedTypeOptions
      );
      console.log("TYPE " + selectedTypeOptions);
      props.setSelectedTypes(selectedTypeOptions);
    }
    if (inputName === InputName.CONDITION) {
      console.log("CONDITION " + currentSelectedOption);
    }
    if (inputName === InputName.PRICE_RANGE) {
      console.log("PRICE_RANGE " + currentSelectedOption);
    }

    let selectedConsoles = [...selectedConsolesByTypes];
    if (selectedConsoles.length === 0) {
      props.setSelectedConsoles(props.consoles);
    } else {
      props.setSelectedConsoles(selectedConsoles);
    }
  };

  const consolesTypes = ["3DS", "2DS", "Switch"];
  const consolesTypeOptions = consolesTypes.map((type: string) => {
    return (
      <InputCheckBox
        key={type}
        name={"type"}
        value={type}
        click={updateDisplayedConsoles}
      />
    );
  });

  const priceRange = [
    "1 - 20000 RSD",
    "20000 - 40000 RSD",
    "40000 - 60000 RSD",
    "60000 - 80000 RSD",
  ];
  const priceRangeOptions = priceRange.map((priceRange: string) => {
    return (
      <InputCheckBox
        key={priceRange}
        name={"priceRange"}
        value={priceRange}
        click={updateDisplayedConsoles}
      />
    );
  });

  const conditions = ["New", "Used"];
  const conditonOptions = conditions.map((conditon: string) => {
    return (
      <InputCheckBox
        key={conditon}
        name={"condition"}
        value={conditon}
        click={updateDisplayedConsoles}
      />
    );
  });

  console.log("ConsoleSearchOptions");
  console.log(props);

  return (
    <div className={classes["console-search-options"]}>
      <h4 className={classes["console-search-options-title"]}>TYPE</h4>
      <div className={classes["console-search-options-by-type"]}>
        {consolesTypeOptions}
      </div>
      <h4 className={classes["console-search-options-title"]}>CONDITION</h4>
      <div className={classes["console-search-options-by-condition"]}>
        {conditonOptions}
      </div>
      <h4 className={classes["console-search-options-title"]}>PRICE</h4>
      <div className={classes["console-search-options-by-price"]}>
        {priceRangeOptions}
      </div>
    </div>
  );
};

const mapStateToProp = (state: any) => {
  return {
    consoles: state.consoleData.consoles,
    selectedConsoles: state.consoleDisplay.selectedConsoles,
    selectedTypes: state.consoleDisplay.selectedTypes,
    selectedCondition: state.consoleDisplay.selectedCondition,
    selectedPriceRanges: state.consoleDisplay.selectedPriceRanges,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSelectedConsoles: (consoles: ConsoleM[]) =>
      dispatch({
        type: consoleDisplayActionTypes.SET_SELECTED_CONSOLES,
        payload: { consoles: consoles },
      }),
    setSelectedTypes: (types: string[]) =>
      dispatch({
        type: consoleDisplayActionTypes.SET_SELECTED_TYPES,
        payload: { types: types },
      }),
    setSelectedCondition: (condition: string) =>
      dispatch({
        type: consoleDisplayActionTypes.SET_SELECTED_CONDITION,
        payload: { condition: condition },
      }),
    setSelectedPriceRanges: (priceRanges: string[]) =>
      dispatch({
        type: consoleDisplayActionTypes.SET_SELECTED_PRICE_RANGES,
        payload: { priceRanges: priceRanges },
      }),
  };
};

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(ConsoleSearchOptions);
