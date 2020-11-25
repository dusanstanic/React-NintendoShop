import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { RouteComponentProps } from "react-router-dom";
import classes from "./ConsoleForm.module.css";
import Aux from "../../hoc/Auxiliary";
import Console from "../../models/ConsoleM";
import * as ConsoleService from "../../service/ConsoleService";

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
    params: { id: string };
    path: string;
    url: string;
  };
  submit: Function;
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
  const [isPriceValid, setIsPriceValid] = useState(false);
  const [isTypeValid, setIsTypeValid] = useState(false);
  const [isConditionValid, setIsConditionValid] = useState(false);
  const [isImageValid, setIsImageValid] = useState(false);
  const [isLogoImageValid, setIsLogoImageValid] = useState(false);

  const [titleInputErrorMessages, setTitleErrorMessages] = useState<string>("");
  const [
    descriptionInputErrorMessages,
    setDescriptionErrorMessages,
  ] = useState<string>("");
  const [priceInputErrorMessages, setPriceErrorMessages] = useState<string>("");

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

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
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

    props.submit(console);
  };

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

  const formHandler = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name: inputName, value: inputValue } = event.target;
    let isInputValid = false;
    const errorMessage = [];
    // const textOnlyRegex = /^[^0-9]{1,}$/;
    const digitOnlyRegex = /^\d*$/;

    if (inputValue.length === 0) {
      errorMessage.push("*Field is required");
    }

    if (InputName.TITLE === inputName) {
      const titleRegex = /(?=.*?[A-Z])(?=.*?[a-z])/;
      isInputValid = !!inputValue.match(titleRegex);

      if (!isInputValid && inputValue.length > 0) {
        errorMessage.push("Must contain an uppercase and lowercase letter");
      }

      setIsTitleValid(isInputValid);
      setTitleErrorMessages(errorMessage.join(" "));
      setEnteredTitle(inputValue);
    }

    if (InputName.DESCRIPTION === inputName) {
      isInputValid = inputValue.length > 0;

      setIsDescriptionValid(isInputValid);
      setDescriptionErrorMessages(errorMessage.join(" "));
      setEnteredDescription(inputValue);
    }

    if (InputName.RELEASEDATE === inputName) {
      const dateValues = inputValue.split("-");
      const year = parseInt(dateValues[0]);
      const month = parseInt(dateValues[1]);
      const day = parseInt(dateValues[2]);
      const date = new Date(year, month, day);

      setIsReleaseDateValid(true);
      setEnteredReleaseDate(date);
    }

    if (InputName.PRICE === inputName) {
      console.log(inputValue);
      isInputValid =
        !!inputValue.match(digitOnlyRegex) && inputValue.length > 0;

      if (!inputValue.match(digitOnlyRegex)) {
        errorMessage.push("Must contain only numbers");
      }

      setIsPriceValid(isInputValid);
      setPriceErrorMessages(errorMessage.join(" "));
      setEnteredPrice(inputValue);
    }

    if (InputName.TYPE === inputName) {
      setIsTypeValid(true);
      setEnteredType(inputValue);
    }

    if (InputName.CONDITION === inputName) {
      setIsConditionValid(true);
      setEnteredCondition(inputValue);
    }

    if (InputName.IMAGE === inputName) {
      setIsImageValid(true);
      setEnteredImage(ConsoleService.parseImagePath(inputValue));
    }

    if (InputName.LOGO == inputName) {
      setIsLogoImageValid(true);
      setEnteredLogo(ConsoleService.parseImagePath(inputValue));
    }
  };

  let consoleTypeOptions = null;
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

  let consoleConditions = ["new", "used"].map((condition) => {
    return (
      <Aux>
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
            />
          </div>
          <label htmlFor="errorMessage">{titleInputErrorMessages}</label>
        </div>
        <div className={classes["row"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="description">Description</label>
            <textarea
              name={InputName.DESCRIPTION}
              placeholder="description"
              onChange={formHandler}
            />
          </div>
          <label htmlFor="errorMessage">{descriptionInputErrorMessages}</label>
        </div>
        <div className={classes["row"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="releaseDate">Release Date</label>
            <input
              name={InputName.RELEASEDATE}
              type="date"
              // value={"2020-10-07"}
              onChange={formHandler}
            />
          </div>
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
          <label htmlFor="errorMessage">{priceInputErrorMessages}</label>
        </div>
        <div className={classes["row"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="type">Type</label>
            <select
              value={enteredType}
              name={InputName.TYPE}
              onChange={formHandler}
            >
              {consoleTypeOptions}
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
