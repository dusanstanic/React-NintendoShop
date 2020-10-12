import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Register.module.css";

import { Customer } from ".././../models/CustomerM";
import * as CustomerService from "../../service/CustomerService";
import * as AuthActions from "../../store/actions/index";

import Label from "../../shared/Label/Label";

interface PropsI extends RouteComponentProps {
  closeModal: Function;
  isAuth: Function;
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
  const [serverSideErrorMessage, setServerSideErrorMessage] = useState("");

  const [firstNameInputErrorMessage, setFirstNameInputErrorMessage] = useState(
    ""
  );
  const [lastNameInputErrorMessage, setLastNameInputErrorMessage] = useState(
    ""
  );
  const [emailInputErrorMessage, setEmailInputErrorMessage] = useState("");
  const [
    phoneNumberInputErrorMessage,
    setPhoneNumberInputErrorMessage,
  ] = useState("");
  const [cityInputErrorMessage, setCityInputErrorMessage] = useState("");
  const [postalCodeInputErrorMessage, setPostalCodenputErrorMessage] = useState(
    ""
  );
  const [streetInputErrorMessage, setStreetInputErrorMessage] = useState("");
  const [
    streetNumberInputErrorMessage,
    setStreetNumberInputErrorMessage,
  ] = useState("");
  const [passwordInputErrorMessage, setPasswordInputErrorMessage] = useState(
    ""
  );
  const [
    confirmPasswordInputErrorMessage,
    setConfirmPasswordNumberInputErrorMessage,
  ] = useState("");

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
        console.log("error");
        setServerSideErrorMessage(error.message);
      });
  };

  const registerHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value: inputValue } = event.target;

    const textOnlyRegex = /^[^0-9]{1,}$/;
    const isDigitContainedRegex = /[0-9]/;
    const isTextContainedRegex = /[A-Za-z]/;
    const digitOnlyRegex = /^\d{1,}$/;
    const passwordRegex = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/;
    const errorMessage = [];

    if (inputName === InputName.FIRST_NAME) {
      const isInputValid = !!inputValue.match(textOnlyRegex);
      setIsEnteredFirstNameValid(isInputValid);
      if (inputValue.match(isDigitContainedRegex)) {
        errorMessage.push("Cannot contain a number");
      }
      if (inputValue.length === 0) {
        errorMessage.push("*Field is required");
      }
      setFirstNameInputErrorMessage(errorMessage.join(" "));
      setEnteredFirstName(inputValue);
    }

    if (inputName === InputName.LAST_NAME) {
      const isInputValid = !!inputValue.match(textOnlyRegex);
      setIsEnteredLastNameValid(isInputValid);
      if (inputValue.match(isDigitContainedRegex)) {
        errorMessage.push("Cannot contain a number");
      }
      if (inputValue.length === 0) {
        errorMessage.push("*Field is required");
      }
      setLastNameInputErrorMessage(errorMessage.join(" "));
      setEnteredLastName(inputValue);
    }

    if (inputName === InputName.EMAIL) {
      const emailRegex = /\S+@\S+\.\S+/;
      const isInputValid = !!inputValue.match(emailRegex);
      setIsEnteredEmailValid(isInputValid);
      if (!isInputValid && inputValue.length > 0) {
        errorMessage.push("Email is invalid");
      }
      if (inputValue.length === 0) {
        errorMessage.push("*Field is required");
      }
      setEmailInputErrorMessage(errorMessage.join(" "));
      setEnteredEmail(inputValue);
    }

    if (inputName === InputName.PHONE_NUMBER) {
      const phoneNumberRegex = /^\d{10}$/;
      const isInputValid = !!inputValue.match(phoneNumberRegex);
      setIsEnteredPhoneNumberValid(isInputValid);
      if (!isInputValid && inputValue.length > 0) {
        errorMessage.push("Must contain 10 numbers");
      }
      if (inputValue.match(isTextContainedRegex)) {
        errorMessage.push("Cannot contain text");
      }
      if (inputValue.length === 0) {
        errorMessage.push("*Field is required");
      }
      setPhoneNumberInputErrorMessage(errorMessage.join(" "));
      setEnteredPhoneNumber(inputValue);
    }

    if (inputName === InputName.CITY) {
      const isInputValid = !!inputValue.match(textOnlyRegex);
      setIsEnteredCityValid(isInputValid);
      if (inputValue.match(isDigitContainedRegex)) {
        errorMessage.push("Cannot contain a number");
      }
      if (inputValue.length === 0) {
        errorMessage.push("*Field is required");
      }
      setCityInputErrorMessage(errorMessage.join(" "));
      setEnteredCity(inputValue);
    }

    if (inputName === InputName.POSTAL_CODE) {
      const postalCodeRegex = /^.{5}$/;
      const isInputValid = !!inputValue.match(postalCodeRegex);
      setIsEnteredPostalCodeValid(isInputValid);
      if (!isInputValid && inputValue.length > 0) {
        errorMessage.push("Must contain 5 characters");
      }
      if (inputValue.length === 0) {
        errorMessage.push("*Field is required");
      }
      setPostalCodenputErrorMessage(errorMessage.join(" "));
      setEnteredPostalCode(inputValue);
    }

    if (inputName === InputName.STREET) {
      const isInputValid = !!inputValue.match(textOnlyRegex);
      setIsEnteredStreetValid(isInputValid);
      if (inputValue.match(isDigitContainedRegex)) {
        errorMessage.push("Cannot contain a number");
      }
      if (inputValue.length === 0) {
        errorMessage.push("*Field is required");
      }
      setStreetInputErrorMessage(errorMessage.join(" "));
      setEnteredStreet(inputValue);
    }

    if (inputName === InputName.STREET_NUMBER) {
      const isInputValid = !!inputValue.match(/^[^<>%$@]{1,}$/);
      setIsEnteredStreetNumberValid(isInputValid);
      if (!isInputValid && inputValue.length > 0) {
        errorMessage.push("Invalid character");
      }
      if (inputValue.length === 0) {
        errorMessage.push("*Field is required");
      }
      setStreetNumberInputErrorMessage(errorMessage.join(" "));
      setEnteredStreetNumber(inputValue);
    }

    if (inputName === InputName.PASSWORD) {
      const isInputValid = !!inputValue.match(passwordRegex);
      setIsEnteredPasswordValid(isInputValid);
      if (!isInputValid && inputValue.length > 0) {
        errorMessage.push(
          "Must contain 8 characters and at least one number, upper and lower case"
        );
      }
      if (inputValue.length === 0) {
        errorMessage.push("*Field is required");
      }
      setPasswordInputErrorMessage(errorMessage.join(" "));
      setEnteredPassword(inputValue);
    }

    if (inputName === InputName.CONFIRM_PASSWORD) {
      const isInputValid = inputValue === enteredPassword;
      setIsEnteredConfirmPasswordValid(isInputValid);
      if (!isInputValid && inputValue.length > 0) {
        errorMessage.push("Does not match password");
      }
      if (inputValue.length === 0) {
        errorMessage.push("*Field is required");
      }
      setConfirmPasswordNumberInputErrorMessage(errorMessage.join(" "));
      setEnteredConfirmPassword(inputValue);
    }

    if (inputName === InputName.GENDER) {
      setIsGenderValid(true);
      if (inputValue === "M") {
        setSelectedGender("Male");
      } else {
        setSelectedGender("Female");
      }
    }
  };

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
            <Label text={firstNameInputErrorMessage} />
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
            <Label text={lastNameInputErrorMessage} />
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
            <Label text={emailInputErrorMessage} />
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
            <Label text={phoneNumberInputErrorMessage} />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              name={InputName.CITY}
              onBlur={registerHandler}
              onChange={registerHandler}
              value={enteredCity}
            />
            <Label text={cityInputErrorMessage} />
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
            <Label text={postalCodeInputErrorMessage} />
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
            <Label text={streetInputErrorMessage} />
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
            <Label text={streetNumberInputErrorMessage} />
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
            <Label text={passwordInputErrorMessage} />
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
            <Label text={confirmPasswordInputErrorMessage} />
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
      </form>
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
