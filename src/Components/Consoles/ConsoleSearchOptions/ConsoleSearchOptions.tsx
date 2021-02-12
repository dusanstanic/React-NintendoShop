import React, { ChangeEvent, useMemo } from "react";
import { connect } from "react-redux";

import classes from "./ConsoleSearchOptions.module.scss";

import ConsoleM from "../../../models/ConsoleM";
import * as consoleDisplayActions from "../../../store/actions/index";

import { InputCheckBox1 as InputCheckBox } from "../../../shared/UI/Input/Input";
import { LabelInput as Label } from "../../../shared/UI/Label/Label";
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

const ConsoleSearchOptions = ({
  consoles,
  selectedCondition,
  selectedConsoles,
  selectedConsolesByCondition,
  selectedConsolesByPriceRange,
  selectedConsolesByType,
  selectedPriceRanges,
  selectedTypes,
  setSelectedCondition,
  setSelectedConsoles,
  setSelectedConsolesByCondition,
  setSelectedConsolesByPriceRange,
  setSelectedConsolesByType,
  setSelectedPriceRanges,
  setSelectedTypes,
}: PropsI) => {
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
    const selectedConsoles = consoles.filter((currentConsole: ConsoleM) => {
      if (property === InputName.TYPE || property === InputName.CONDITION)
        return selectedOptions.includes(currentConsole[property]);
    });
    return selectedConsoles;
  };

  const updateDisplayedConsoles = (event: ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const currentSelectedOption = event.target.value;

    let selectedProductsByTypes = selectedConsolesByType;
    let selectedProductsByCondition = selectedConsolesByCondition;
    let selectedProductsByPriceRange = selectedConsolesByPriceRange;

    if (inputName === InputName.TYPE) {
      let selectedTypeOptions = updateSelectedOptions(
        selectedTypes,
        currentSelectedOption
      );

      selectedProductsByTypes = filterConsolesBySelectedOptions(
        selectedTypeOptions,
        InputName.TYPE
      );

      setSelectedTypes(selectedTypeOptions);
      setSelectedConsolesByType(selectedProductsByTypes);
    }

    if (inputName === InputName.CONDITION) {
      selectedProductsByCondition = filterConsolesBySelectedOptions(
        [currentSelectedOption],
        InputName.CONDITION
      );

      setSelectedCondition(currentSelectedOption);
      setSelectedConsolesByCondition(selectedProductsByCondition);
    }

    if (inputName === InputName.PRICE_RANGE) {
      let selectedPriceRangeOptions = updateSelectedOptions(
        selectedPriceRanges,
        currentSelectedOption
      );

      selectedProductsByPriceRange = consoles.filter((console) => {
        const isInPriceRange = selectedPriceRangeOptions.find(
          (price) => console.price <= +price
        );
        return isInPriceRange;
      });

      setSelectedPriceRanges(selectedPriceRangeOptions);
      setSelectedConsolesByPriceRange(selectedProductsByPriceRange);
    }

    let selectedConsoles = [
      ...selectedProductsByTypes,
      ...selectedProductsByCondition,
      ...selectedProductsByPriceRange,
    ];

    let consoleIDS = selectedConsoles.map((console: ConsoleM) => {
      return console.id;
    });

    let consoleIDSWithoutDuplicates = consoleIDS.filter((id, index, array) => {
      return array.indexOf(id) === index;
    });

    let selectedConsolesWithoutDuplicates = consoleIDSWithoutDuplicates.map(
      (id) => {
        return consoles.find((console) => console.id === id);
      }
    );

    if (selectedConsolesWithoutDuplicates.length === 0) {
      setSelectedConsoles(consoles);
    } else {
      setSelectedConsoles(selectedConsolesWithoutDuplicates);
    }
  };

  const types = ["3DS", "2DS", "Switch"];
  const typeOpts = useMemo(() => {
    return types.map((type) => {
      let isChecked = !!selectedTypes.find(
        (selectedType) => selectedType === type
      );

      return (
        <div key={type}>
          <InputCheckBox
            name={"type"}
            value={type}
            click={updateDisplayedConsoles}
            checked={isChecked}
            className={classes["options__input"]}
          />
          <Label text={type} className={classes["options__label"]} />
        </div>
      );
    });
  }, [updateDisplayedConsoles]);

  const conditions = ["new", "used"];
  const conditionOpts = conditions.map((condition) => {
    let isChecked = selectedCondition === condition;

    return (
      <div key={condition}>
        <input
          type="radio"
          name={"condition"}
          value={condition}
          onChange={updateDisplayedConsoles}
          checked={isChecked}
          className={classes["options__input"]}
        />
        <Label text={condition} className={classes["options__label"]} />
      </div>
    );
  });

  const priceRange = [
    { text: "1 - 20000 RSD", price: 20000 },
    { text: "20000 - 40000 RSD", price: 40000 },
    { text: "40000 - 60000 RSD", price: 60000 },
    { text: "60000 - 80000 RSD", price: 80000 },
  ];
  const priceRangeOpts = priceRange.map(({ price, text }) => {
    let isChecked = !!selectedPriceRanges.find(
      (priceRange) => +priceRange === price
    );

    return (
      <div key={price}>
        <InputCheckBox
          key={price}
          name={"priceRange"}
          value={price}
          click={updateDisplayedConsoles}
          checked={isChecked}
          className={classes["options__input"]}
        />
        <Label text={text} className={classes["options__label"]} />
      </div>
    );
  });

  return (
    <div className={classes["options"]}>
      <div>
        <h4 className={classes["options__title"]}>Type</h4>
        <div className={classes["options__options"]}>{typeOpts}</div>
      </div>
      <div>
        <h4 className={classes["options__title"]}>Condition</h4>
        <div className={classes["options__options"]}>{conditionOpts}</div>
      </div>
      <div>
        <h4 className={classes["options__title"]}>Price</h4>
        <div className={classes["options__options"]}>{priceRangeOpts}</div>
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
