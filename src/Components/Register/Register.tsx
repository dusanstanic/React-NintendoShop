import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Register.module.scss";

import checkValidation, {
  validationOptions,
} from "../../shared/Validation/Validation";
import { Customer } from ".././../models/CustomerM";
import * as CustomerService from "../../service/CustomerService";
import * as AuthActions from "../../store/actions/index";

import Label from "../../shared/UI/Label/Label";

interface PropsI extends RouteComponentProps {
  closeModal: Function;
  isAuth: Function;
  showLoginForm: Function;
}

enum InputName {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  EMAIL = "email",
  PHONE_NUMBER = "phoneNumber",
  CITY = "city",
  POSTAL_CODE = "postalCode",
  STREET = "street",
  STREET_NUMBER = "streetNumber",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
  GENDER = "gender",
}

const Register: FunctionComponent<PropsI> = (props) => {
  const [isRegistrationsuccessFull, setIsRegistrationsuccessFull] = useState(
    false
  );
  const [cityOptions, setCityOptions] = useState<JSX.Element[]>([]);

  const [serverSideErrorMessage, setServerSideErrorMessage] = useState<
    string[]
  >([""]);

  const [firstNameInputErrorMessage, setFirstNameInputErrorMessage] = useState<
    string[]
  >([""]);
  const [lastNameInputErrorMessage, setLastNameInputErrorMessage] = useState<
    string[]
  >([""]);
  const [emailInputErrorMessage, setEmailInputErrorMessage] = useState<
    string[]
  >([""]);
  const [
    phoneNumberInputErrorMessage,
    setPhoneNumberInputErrorMessage,
  ] = useState<string[]>([""]);
  const [cityInputErrorMessage, setCityInputErrorMessage] = useState<string[]>([
    "",
  ]);
  const [postalCodeInputErrorMessage, setPostalCodenputErrorMessage] = useState<
    string[]
  >([""]);
  const [streetInputErrorMessage, setStreetInputErrorMessage] = useState<
    string[]
  >([""]);
  const [
    streetNumberInputErrorMessage,
    setStreetNumberInputErrorMessage,
  ] = useState<string[]>([""]);
  const [passwordInputErrorMessage, setPasswordInputErrorMessage] = useState<
    string[]
  >([""]);
  const [
    confirmPasswordInputErrorMessage,
    setConfirmPasswordNumberInputErrorMessage,
  ] = useState<string[]>([""]);

  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredPostalCode, setEnteredPostalCode] = useState("");
  const [enteredStreet, setEnteredStreet] = useState("");
  const [enteredStreetNumber, setEnteredStreetNumber] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [isEnteredFirstNameValid, setIsEnteredFirstNameValid] = useState(false);
  const [isEnteredLastNameValid, setIsEnteredLastNameValid] = useState(false);
  const [isEnteredEmailValid, setIsEnteredEmailValid] = useState(false);
  const [isEnteredPhoneNumberValid, setIsEnteredPhoneNumberValid] = useState(
    false
  );
  const [isEnteredCityValid, setIsEnteredCityValid] = useState(false);
  const [isEnteredPostalCodeValid, setIsEnteredPostalCodeValid] = useState(
    false
  );
  const [isEnteredStreetValid, setIsEnteredStreetValid] = useState(false);
  const [isEnteredStreetNumberValid, setIsEnteredStreetNumberValid] = useState(
    false
  );
  const [isEnteredPasswordValid, setIsEnteredPasswordValid] = useState(false);
  const [
    isEnteredConfirmPasswordValid,
    setIsEnteredConfirmPasswordValid,
  ] = useState(false);
  const [isGenderValid, setIsGenderValid] = useState(false);

  const isRegistrationValid = () => {
    if (
      isEnteredFirstNameValid &&
      isEnteredLastNameValid &&
      isEnteredEmailValid &&
      isEnteredPhoneNumberValid &&
      isEnteredCityValid &&
      isEnteredPostalCodeValid &&
      isEnteredStreetValid &&
      isEnteredStreetNumberValid &&
      isEnteredPasswordValid &&
      isEnteredConfirmPasswordValid &&
      isGenderValid
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    CustomerService.getCities().then((names: string[]) => {
      let cities: JSX.Element[] = [];
      names.push("Novi Sad");
      names.push("Beograd");

      cities = names.map((name, index) => {
        return (
          <option key={index} value={name}>
            {name}
          </option>
        );
      });

      cities.unshift(
        <option key={"select type"} hidden={true} value={"select city"}>
          -- Select City --
        </option>
        // <option value={"Novi Sad"}>Novi Sad</option>,
        // <option value={"Beograd"}>Beograd</option>
      );

      setCityOptions(cities);
    });
  }, []);

  useEffect(() => {
    isRegistrationValid();
  }, [
    enteredFirstName,
    enteredLastName,
    enteredEmail,
    enteredPhoneNumber,
    enteredCity,
    enteredPostalCode,
    enteredStreet,
    enteredStreetNumber,
    enteredPassword,
    enteredConfirmPassword,
    selectedGender,
  ]);

  const register = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const customer: Customer = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      gender: selectedGender,
      phone: enteredPhoneNumber,
      city: enteredCity,
      postalCode: +enteredPostalCode,
      street: enteredStreet,
      streetNumber: enteredStreetNumber,
      password: enteredPassword,
    };

    CustomerService.register(customer)
      .then((response) => {
        console.log(response);
        // props.closeModal();
        // props.history.replace({ pathname: "/CustomerPanel" });
        // setIsRegistrationsuccessFull(true);
      })
      .catch((error: Error) => {
        console.dir(error);
        // setServerSideErrorMessage(error.message);
      });
  };

  const registerHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name: inputName, value: inputValue } = event.target;
    let isInputValid;
    let validation;

    switch (inputName) {
      case InputName.FIRST_NAME:
        validation = checkValidation(
          [
            validationOptions.REQUIRED,
            validationOptions.TEXT,
            validationOptions.NO_NUMBER,
          ],
          inputValue
        );

        setFirstNameInputErrorMessage(validation.errorMessage);
        setIsEnteredFirstNameValid(validation.isInputValid);
        setEnteredFirstName(inputValue);
        break;
      case InputName.LAST_NAME:
        validation = checkValidation(
          [
            validationOptions.REQUIRED,
            validationOptions.TEXT,
            validationOptions.NO_NUMBER,
          ],
          inputValue
        );

        setLastNameInputErrorMessage(validation.errorMessage);
        setIsEnteredLastNameValid(validation.isInputValid);
        setEnteredLastName(inputValue);
        break;
      case InputName.EMAIL:
        validation = checkValidation(
          [validationOptions.REQUIRED, validationOptions.EMAIL],
          inputValue
        );

        setIsEnteredEmailValid(validation.isInputValid);
        setEmailInputErrorMessage(validation.errorMessage);
        setEnteredEmail(inputValue);
        break;
      case InputName.PHONE_NUMBER:
        validation = checkValidation(
          [
            validationOptions.REQUIRED,
            validationOptions.NO_TEXT,
            validationOptions.NO_SPECIAL_CHARACTER,
            validationOptions.PHONE_NUMBER,
          ],
          inputValue
        );

        console.log(validation);

        const phoneNumberRegex = /^\d{10}$/;
        isInputValid = !!inputValue.match(phoneNumberRegex);

        setPhoneNumberInputErrorMessage(validation.errorMessage);
        setIsEnteredPhoneNumberValid(validation.isInputValid);
        setEnteredPhoneNumber(inputValue);
        break;
      case InputName.CITY:
        if (inputValue === "select city") {
          setCityInputErrorMessage(["* Select city"]);
          return;
        }

        setCityInputErrorMessage([""]);
        setEnteredCity(inputValue);
        break;
      case InputName.POSTAL_CODE:
        validation = checkValidation(
          [validationOptions.REQUIRED, validationOptions.POSTAL_CODE],
          inputValue
        );

        setPostalCodenputErrorMessage(validation.errorMessage);
        setIsEnteredPostalCodeValid(validation.isInputValid);
        setEnteredPostalCode(inputValue);
        break;
      case InputName.STREET:
        validation = checkValidation(
          [
            validationOptions.REQUIRED,
            validationOptions.TEXT,
            validationOptions.NO_NUMBER,
          ],
          inputValue
        );

        setStreetInputErrorMessage(validation.errorMessage);
        setIsEnteredStreetValid(validation.isInputValid);
        setEnteredStreet(inputValue);
        break;
      case InputName.STREET_NUMBER:
        validation = checkValidation(
          [validationOptions.REQUIRED, validationOptions.NO_SPECIAL_CHARACTER],
          inputValue
        );

        setStreetNumberInputErrorMessage(validation.errorMessage);
        setIsEnteredStreetNumberValid(validation.isInputValid);
        setEnteredStreetNumber(inputValue);
        break;
      case InputName.PASSWORD:
        validation = checkValidation(
          [validationOptions.REQUIRED, validationOptions.PASSWORD],
          inputValue
        );

        setPasswordInputErrorMessage(validation.errorMessage);
        setIsEnteredPasswordValid(validation.isInputValid);
        setEnteredPassword(inputValue);
        break;
      case InputName.CONFIRM_PASSWORD:
        validation = checkValidation([validationOptions.REQUIRED], inputValue);
        isInputValid = inputValue === enteredPassword;

        if (validation.isInputValid && !isInputValid) {
          validation.errorMessage = validation.errorMessage.concat(
            "Does not match password"
          );
        }

        setConfirmPasswordNumberInputErrorMessage(validation.errorMessage);
        setIsEnteredConfirmPasswordValid(validation.isInputValid);
        setEnteredConfirmPassword(inputValue);
        break;
      case InputName.GENDER:
        setIsGenderValid(true);
        if (inputValue === "M") {
          setSelectedGender("Male");
        } else {
          setSelectedGender("Female");
        }
        break;
    }
  };

  // const re = (event: MouseEvent<HTMLSelectElement>) => {
  //   console.dir(event.target);
  //   setCityInputErrorMessage("* Select a city");
  // };

  // if (isRegistrationsuccessFull) {
  //   return <Redirect to="/CustomerPanel" />;
  // }

  return (
    <div className={classes["register"]}>
      <div className={classes["header"]}>
        <h4>Registration</h4>
        <button onClick={() => props.closeModal()}> X</button>
      </div>
      <form onSubmit={register}>
        <div className={classes["row"]}>
          <div className={classes["column"]}>
            <div className={classes["form-group"]}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name={InputName.FIRST_NAME}
                onBlur={registerHandler}
                onChange={registerHandler}
                value={enteredFirstName}
              />
              <Label errorMessages={firstNameInputErrorMessage} />
            </div>
          </div>
          <div className={classes["column"]}>
            <div className={classes["form-group"]}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name={InputName.LAST_NAME}
                onBlur={registerHandler}
                onChange={registerHandler}
                value={enteredLastName}
              />
              <Label errorMessages={lastNameInputErrorMessage} />
            </div>
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name={InputName.EMAIL}
              onBlur={registerHandler}
              onChange={registerHandler}
              value={enteredEmail}
            />
            <Label errorMessages={emailInputErrorMessage} />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              name={InputName.PHONE_NUMBER}
              onBlur={registerHandler}
              onChange={registerHandler}
              value={enteredPhoneNumber}
            />
            <Label errorMessages={phoneNumberInputErrorMessage} />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="city">City</label>
            {/* <input
              type="text"
              name={InputName.CITY}
              onBlur={registerHandler}
              onChange={registerHandler}
              value={enteredCity}
            /> */}
            <select
              name={InputName.CITY}
              onChange={registerHandler}
              onFocus={registerHandler}
            >
              {cityOptions}
            </select>
            <Label errorMessages={cityInputErrorMessage} />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              name={InputName.POSTAL_CODE}
              onBlur={registerHandler}
              onChange={registerHandler}
              value={enteredPostalCode}
            />
            <Label errorMessages={postalCodeInputErrorMessage} />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="street">Street</label>
            <input
              type="text"
              name={InputName.STREET}
              onBlur={registerHandler}
              onChange={registerHandler}
              value={enteredStreet}
            />
            <Label errorMessages={streetInputErrorMessage} />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="streetNumber">Street Number</label>
            <input
              type="text"
              name={InputName.STREET_NUMBER}
              onBlur={registerHandler}
              onChange={registerHandler}
              value={enteredStreetNumber}
            />
            <Label errorMessages={streetNumberInputErrorMessage} />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name={InputName.PASSWORD}
              onBlur={registerHandler}
              onChange={registerHandler}
              value={enteredPassword}
            />
            <Label errorMessages={passwordInputErrorMessage} />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name={InputName.CONFIRM_PASSWORD}
              onBlur={registerHandler}
              onChange={registerHandler}
              value={enteredConfirmPassword}
            />
            <Label errorMessages={confirmPasswordInputErrorMessage} />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="gender">Gender</label>
            <input
              type="radio"
              value="M"
              name={InputName.GENDER}
              onChange={registerHandler}
            />
            <label htmlFor="genderType">Male</label>
            <input
              type="radio"
              value="F"
              name={InputName.GENDER}
              onChange={registerHandler}
            />
            <label htmlFor="genderType">Female</label>
          </div>
        </div>
        <div className={classes["submit"]}>
          <button type="submit" disabled={!isValid}>
            Register
          </button>
        </div>
        <div className={classes["error-message"]}>{serverSideErrorMessage}</div>
        <div className={classes["login"]}>
          <button onClick={() => props.showLoginForm()}>Login</button>
        </div>
      </form>
      <div className={classes["charmander"]}>We hope you a Merry Christmas</div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    isAuth: (email: string, password: string) =>
      dispatch(AuthActions.auth(email, password)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Register));
