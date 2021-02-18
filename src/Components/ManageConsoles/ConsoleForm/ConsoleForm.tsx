import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { RouteComponentProps } from "react-router-dom";

import classes from "./ConsoleForm.module.css";

import Aux from "../../../hoc/Auxiliary";

import validation, {
  validationOptions,
} from "../../../shared/Validation/Validation";

import Console from "../../../shared/models/ConsoleM";
import * as ConsoleService from "../../../shared/service/ConsoleService";
import checkValidation from "../../../shared/Validation/Validation";
import Label from "../../../shared/UI/Label/Label";

enum InputName {
  TITLE = "title",
  DESCRIPTION = "description",
  RELEASEDATE = "releaseDate",
  PRICE = "price",
  TYPE = "type",
  CONDITION = "condition",
  IMAGE = "image",
  LOGO = "logo",
}

// enum Option {
//   ADD = "add",
//   UPDATE = "update",
// }

interface IProps extends RouteComponentProps {
  match: {
    isExact: boolean;
    params: { type: string };
    path: string;
    url: string;
  };
  updateTable: Function;
}

function parseQueryStirng(queryString: string) {
  let parsedQueryStirng = queryString.split("?").pop()?.split("&");
  let parsedQueryStirngValues = parsedQueryStirng?.map((query) => {
    return query.split("=")[1];
  });
  return parsedQueryStirngValues;
}

const ConsoleForm: FunctionComponent<IProps> = (props) => {
  const [id, setId] = useState(0);
  const [option, setOption] = useState("");
  const [consoleTypes, setConsoleTypes] = useState<string[]>();

  const [enteredTitle, setEnteredTitle] = useState<string>("");
  const [enteredDescription, setEnteredDescription] = useState<string>("");
  const [enteredReleaseDate, setEnteredReleaseDate] = useState<Date>(
    new Date()
  );
  const [enteredPrice, setEnteredPrice] = useState<string>("1000");
  const [enteredType, setEnteredType] = useState<string>("");
  const [enteredCondition, setEnteredCondition] = useState<string>("");
  const [enteredImage, setEnteredImage] = useState<string>("");
  const [enteredLogo, setEnteredLogo] = useState<string>("");

  const [isValid, setIsValid] = useState(false);
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const [isReleaseDateValid, setIsReleaseDateValid] = useState(false);
  const [isPriceValid, setIsPriceValid] = useState(true);
  const [isTypeValid, setIsTypeValid] = useState(false);
  const [isConditionValid, setIsConditionValid] = useState(false);
  const [isImageValid, setIsImageValid] = useState(false);
  const [isLogoImageValid, setIsLogoImageValid] = useState(false);

  const [titleInputErrorMessages, setTitleErrorMessages] = useState<string[]>(
    []
  );
  const [descriptionInputErrorMessages, setDescriptionErrorMessages] = useState<
    string[]
  >([]);
  const [dateErrorMessages, setDateErrorMessages] = useState<string[]>([]);
  const [priceInputErrorMessages, setPriceErrorMessages] = useState<string[]>(
    []
  );

  useEffect(() => {
    const queryValues = parseQueryStirng(props.location.search);
    let type;
    let id;
    if (queryValues) {
      type = queryValues[0];
      id = parseInt(queryValues[1]);
      setId(id);
      setOption(type);
    }
    // const id = props.match.params.id;

    ConsoleService.findAllConsoleTypes().then((consoleTypes) => {
      setConsoleTypes(consoleTypes);
    });
  }, []);

  useEffect(() => {
    isFormValid();
  }, [
    enteredTitle,
    enteredDescription,
    enteredReleaseDate,
    enteredPrice,
    enteredType,
    enteredCondition,
    enteredImage,
    enteredLogo,
  ]);

  const isFormValid = () => {
    if (
      isTitleValid &&
      isDescriptionValid &&
      isReleaseDateValid &&
      isPriceValid &&
      isTypeValid &&
      isConditionValid &&
      isImageValid &&
      isLogoImageValid
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const console: Console = {
      title: enteredTitle,
      description: enteredDescription,
      releaseDate: enteredReleaseDate,
      price: +enteredPrice,
      type: enteredType,
      condition: enteredCondition,
      image: enteredImage,
      logo: enteredLogo,
    };

    if (option === "add") {
      const success = await addConsole(console);
    } else {
    }

    props.updateTable();
  };

  const addConsole = async (console: Console) => {
    const success = await ConsoleService.save(console);
    return success;
  };

  const formHandler = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name: inputName, value: inputValue } = event.target;
    let validation;

    switch (inputName) {
      case InputName.TITLE:
        validation = checkValidation(
          [validationOptions.REQUIRED, validationOptions.ALL_CASE],
          inputValue
        );

        setTitleErrorMessages(validation.errorMessage);
        setIsTitleValid(validation.isInputValid);
        setEnteredTitle(inputValue);
        break;
      case InputName.DESCRIPTION:
        validation = checkValidation([validationOptions.REQUIRED], inputValue);

        setDescriptionErrorMessages(validation.errorMessage);
        setIsDescriptionValid(validation.isInputValid);
        setEnteredDescription(inputValue);
        break;
      case InputName.RELEASEDATE:
        validation = checkValidation([validationOptions.REQUIRED], inputValue);
        console.log(validation);
        const dateValues = inputValue.split("-");
        const year = parseInt(dateValues[0]);
        const month = parseInt(dateValues[1]);
        const day = parseInt(dateValues[2]);
        const date = new Date(year, month, day);

        setDateErrorMessages(validation.errorMessage);
        setIsReleaseDateValid(validation.isInputValid);
        setEnteredReleaseDate(date);
        break;
      case InputName.PRICE:
        validation = checkValidation(
          [validationOptions.REQUIRED, validationOptions.NUMBERS],
          inputValue
        );

        setPriceErrorMessages(validation.errorMessage);
        setIsPriceValid(validation.isInputValid);
        setEnteredPrice(inputValue);
        break;
      case InputName.TYPE:
        setIsTypeValid(true);
        setEnteredType(inputValue);
        break;
      case InputName.CONDITION:
        setIsConditionValid(true);
        setEnteredCondition(inputValue);
        break;
      case InputName.IMAGE:
        setIsImageValid(true);
        setEnteredImage(ConsoleService.parseImagePath(inputValue));
        break;
      case InputName.LOGO:
        setIsLogoImageValid(true);
        setEnteredLogo(ConsoleService.parseImagePath(inputValue));
    }
  };

  const consoleOptions = useMemo(() => {
    let consoleTypeOptions: JSX.Element[] = [];

    if (consoleTypes) {
      consoleTypeOptions = consoleTypes.map((consoleType) => {
        return (
          <option key={consoleType} value={consoleType}>
            {consoleType}
          </option>
        );
      });

      consoleTypeOptions.unshift(
        <option key={"select type"} hidden={true}>
          -- Select Type --
        </option>
      );
    }

    return consoleTypeOptions;
  }, [consoleTypes]);

  const consoleConditions = useMemo(() => {
    let consoleConditions = ["new", "used"].map((condition) => {
      return (
        <Aux key={condition}>
          <input
            name={InputName.CONDITION}
            type="radio"
            value={condition}
            onChange={formHandler}
          />
          <label htmlFor="condition">{condition}</label>
        </Aux>
      );
    });

    return consoleConditions;
  }, []);

  return (
    <Aux>
      <form onSubmit={submitForm} className={classes["console-form"]}>
        <div className={classes["row"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name={InputName.TITLE}
              placeholder="title"
              value={enteredTitle}
              onChange={formHandler}
              onBlur={formHandler}
            />
          </div>
          <Label errorMessages={titleInputErrorMessages} />
        </div>
        <div className={classes["row"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="description">Description</label>
            <textarea
              name={InputName.DESCRIPTION}
              placeholder="description"
              onChange={formHandler}
              onBlur={formHandler}
            />
          </div>
          <Label errorMessages={descriptionInputErrorMessages} />
        </div>
        <div className={classes["row"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="releaseDate">Release Date</label>
            <input
              name={InputName.RELEASEDATE}
              type="date"
              // value={"2020-10-07"}
              onChange={formHandler}
              onBlur={formHandler}
            />
          </div>
          <Label errorMessages={dateErrorMessages} />
        </div>
        <div className={classes["row"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="price">Price</label>
            <input
              name={InputName.PRICE}
              type="text"
              placeholder="price"
              value={enteredPrice}
              onChange={formHandler}
            />
          </div>
          <Label errorMessages={priceInputErrorMessages} />
        </div>
        <div className={classes["row"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="type">Type</label>
            <select
              value={enteredType}
              name={InputName.TYPE}
              onChange={formHandler}
            >
              {consoleOptions}
            </select>
          </div>
        </div>
        <div className={classes["row"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="conditon">Conditon</label>
            {consoleConditions}
          </div>
        </div>
        <div className={classes["row"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="image">Image</label>
            <input type="file" name={InputName.IMAGE} onChange={formHandler} />
          </div>
        </div>
        <div className={classes["row"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="logo">Logo</label>
            <input type="file" name={InputName.LOGO} onChange={formHandler} />
          </div>
        </div>
        <div className={classes["submit-btn-wrapper"]}>
          <button disabled={!isValid} className={classes["submit-btn"]}>
            {option}
          </button>
        </div>
      </form>
    </Aux>
  );
};

export default ConsoleForm;
