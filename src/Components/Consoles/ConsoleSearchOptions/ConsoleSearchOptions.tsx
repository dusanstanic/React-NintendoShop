import React, { ChangeEvent, MouseEvent } from "react";
import { connect } from "react-redux";

import classes from "./ConsoleSearchOptions.module.css";

import ConsoleM from "../../../models/ConsoleM";
import * as consoleDisplayActions from "../../../store/actions/index";

import { InputCheckBox } from "../../../shared/Input/Input";
import Aux from "../../../hoc/Auxiliary";

interface PropsI {
  setSelectedConsoles: (consoles: (ConsoleM | undefined)[]) => void;
  setSelectedTypes: (types: string[]) => void;
  setSelectedCondition: (condtion: string) => void;
  setSelectedPriceRanges: (priceRanges: string[]) => void;
  setSelectedConsolesByType: (consoles: ConsoleM[]) => void;
  setSelectedConsolesByCondition: (consoles: ConsoleM[]) => void;
  setSelectedConsolesByPriceRange: (consoles: ConsoleM[]) => void;
  consoles: ConsoleM[];
  selectedConsoles: ConsoleM[];
  selectedTypes: string[];
  selectedCondition: string;
  selectedPriceRanges: string[];
  selectedConsolesByType: ConsoleM[];
  selectedConsolesByCondition: ConsoleM[];
  selectedConsolesByPriceRange: ConsoleM[];
}

enum InputName {
  TYPE = "type",
  CONDITION = "condition",
  PRICE_RANGE = "priceRange",
}

const ConsoleSearchOptions = (props: PropsI) => {
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

  const filterConsolesBySelectedOptions = (
    selectedOptions: string[],
    property: InputName
  ) => {
    const selectedConsoles = props.consoles.filter(
      (currentConsole: ConsoleM) => {
        if (property === InputName.TYPE || property === InputName.CONDITION)
          return selectedOptions.includes(currentConsole[property]);
      }
    );
    return selectedConsoles;
  };

  const updateDisplayedConsoles = (event: ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const currentSelectedOption = event.target.value;
    let selectedConsolesByTypes: ConsoleM[] = props.selectedConsolesByType;
    let selectedConsolesByCondition: ConsoleM[] =
      props.selectedConsolesByCondition;
    let selectedConsolesByPriceRange: ConsoleM[] =
      props.selectedConsolesByPriceRange;

    if (inputName === InputName.TYPE) {
      let selectedTypeOptions = updateSelectedOptions(
        props.selectedTypes,
        currentSelectedOption
      );

      selectedConsolesByTypes = filterConsolesBySelectedOptions(
        selectedTypeOptions,
        InputName.TYPE
      );

      props.setSelectedTypes(selectedTypeOptions);
      props.setSelectedConsolesByType(selectedConsolesByTypes);
    }

    if (inputName === InputName.CONDITION) {
      selectedConsolesByCondition = filterConsolesBySelectedOptions(
        [currentSelectedOption],
        InputName.CONDITION
      );

      props.setSelectedConsolesByCondition(selectedConsolesByCondition);
    }

    if (inputName === InputName.PRICE_RANGE) {
      let selectedPriceRangeOptions = updateSelectedOptions(
        props.selectedPriceRanges,
        currentSelectedOption
      );

      selectedConsolesByPriceRange = props.consoles.filter((console) => {
        const isInPriceRange = selectedPriceRangeOptions.find((price) => {
          const priceMax = +price;
          const priceMin = priceMax - 20000;
          return priceMin <= console.price && console.price <= priceMax;
        });
        return isInPriceRange;
      });

      props.setSelectedConsolesByPriceRange(selectedConsolesByPriceRange);
      props.setSelectedPriceRanges(selectedPriceRangeOptions);
    }

    let selectedConsoles = [
      ...selectedConsolesByTypes,
      ...selectedConsolesByCondition,
      ...selectedConsolesByPriceRange,
    ];

    let consoleIDS = selectedConsoles.map((console: ConsoleM) => {
      return console.id;
    });

    let consoleIDSWithoutDuplicates = consoleIDS.filter((id, index, array) => {
      return array.indexOf(id) === index;
    });

    let selectedConsolesWithoutDuplicates = consoleIDSWithoutDuplicates.map(
      (id) => {
        return props.consoles.find((console) => console.id === id);
      }
    );

    if (selectedConsolesWithoutDuplicates.length === 0) {
      props.setSelectedConsoles(props.consoles);
    } else {
      props.setSelectedConsoles(selectedConsolesWithoutDuplicates);
    }
  };

  const consolesTypes = ["3DS", "2DS", "Switch"];
  const consolesTypeOptions = consolesTypes.map((type: string) => {
    return (
      <InputCheckBox
        key={type}
        name={"type"}
        value={type}
        text={type}
        click={updateDisplayedConsoles}
      />
    );
  });

  const priceRange = [
    { text: "1 - 20000 RSD", price: 20000 },
    { text: "20000 - 40000 RSD", price: 40000 },
    { text: "40000 - 60000 RSD", price: 60000 },
    { text: "60000 - 80000 RSD", price: 80000 },
  ];
  const priceRangeOptions = priceRange.map(
    (priceRange: { text: string; price: number }) => {
      return (
        <InputCheckBox
          key={priceRange.price}
          name={"priceRange"}
          value={priceRange.price}
          text={priceRange.text}
          click={updateDisplayedConsoles}
        />
      );
    }
  );

  const conditions = ["new", "used"];
  const conditonOptions = conditions.map((condition: string) => {
    return (
      <Aux key={condition}>
        <div>
          <input
            type="radio"
            name={"condition"}
            value={condition}
            onChange={updateDisplayedConsoles}
          />
          <label>{condition}</label>
        </div>
      </Aux>
    );
  });

  console.log("Render ConsoleSearchOptions");

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
    selectedConsolesByType: state.consoleDisplay.selectedConsolesByType,
    selectedConsolesByCondition:
      state.consoleDisplay.selectedConsolesByCondition,
    selectedConsolesByPriceRange:
      state.consoleDisplay.selectedConsolesByPriceRange,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSelectedConsoles: (consoles: (ConsoleM | undefined)[]) =>
      dispatch(consoleDisplayActions.set_selected_consoles(consoles)),
    setSelectedTypes: (types: string[]) =>
      dispatch(consoleDisplayActions.set_selected_types(types)),
    setSelectedCondition: (condition: string) =>
      dispatch(consoleDisplayActions.set_selected_condition(condition)),
    setSelectedPriceRanges: (priceRanges: string[]) =>
      dispatch(consoleDisplayActions.set_selected_price_ranges(priceRanges)),
    setSelectedConsolesByType: (consoles: ConsoleM[]) =>
      consoleDisplayActions.set_selected_consoles_by_type(consoles),
    setSelectedConsolesByCondition: (consoles: ConsoleM[]) =>
      dispatch(
        consoleDisplayActions.set_selected_consoles_by_condition(consoles)
      ),
    setSelectedConsolesByPriceRange: (consoles: ConsoleM[]) =>
      dispatch(
        consoleDisplayActions.set_selected_consoles_by_price_ranges(consoles)
      ),
  };
};

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(ConsoleSearchOptions);
