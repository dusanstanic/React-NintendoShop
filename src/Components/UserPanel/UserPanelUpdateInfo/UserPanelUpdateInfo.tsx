import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";

import classes from "./UserPanelUpdateInfo.module.css";

import * as CustomerService from "../../../shared/service/CustomerService";

import Aux from "../../../hoc/Auxiliary";
import { UserInfo } from "../../../shared/models/UserInfo";
import { User } from "../../../shared/models/User";

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
  IMAGE = "image",
}

interface PropsI {
  userRole: string;
  userInfo: UserInfo;
  userId: number;
  onAuthUpdate: Function;
}

const UserPanelUpdateInfo: FunctionComponent<PropsI> = (props) => {
  const userInfo = props.userInfo;

  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredPostalCode, setEnteredPostalCode] = useState("");
  const [enteredStreet, setEnteredStreet] = useState("");
  const [enteredStreetNumber, setEnteredStreetNumber] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const [isValid, setIsVaild] = useState(false);

  const [isEnteredFirstNameValid, setIsEnteredFirstNameValid] = useState(true);
  const [isEnteredLastNameValid, setIsEnteredLastNameValid] = useState(true);
  const [isEnteredEmailValid, setIsEnteredEmailValid] = useState(true);
  const [isEnteredPhoneNumberValid, setIsEnteredPhoneNumberValid] = useState(
    true
  );
  const [isEnteredCityValid, setIsEnteredCityValid] = useState(true);
  const [isEnteredPostalCodeValid, setIsEnteredPostalCodeValid] = useState(
    true
  );
  const [isEnteredStreetValid, setIsEnteredStreetValid] = useState(true);
  const [isEnteredStreetNumberValid, setIsEnteredStreetNumberValid] = useState(
    true
  );
  const [isGenderValid, setIsGenderValid] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setEnteredFirstName(userInfo.firstName);
      setEnteredLastName(userInfo.lastName);
      setEnteredEmail(userInfo.email);
      setEnteredPhoneNumber(userInfo.phone);
      setEnteredCity(userInfo.city);
      setEnteredPostalCode(userInfo.postalCode.toString());
      setEnteredStreet(userInfo.street);
      setEnteredStreetNumber(userInfo.streetNumber);
    }
  }, [userInfo]);

  const isUpdateInfoValid = () => {
    if (
      isEnteredFirstNameValid &&
      isEnteredLastNameValid &&
      isEnteredEmailValid &&
      isEnteredPhoneNumberValid &&
      isEnteredCityValid &&
      isEnteredPostalCodeValid &&
      isEnteredStreetValid &&
      isEnteredStreetNumberValid &&
      isGenderValid
    ) {
      setIsVaild(true);
    } else {
      setIsVaild(false);
    }
  };

  useEffect(() => {
    isUpdateInfoValid();
  }, [
    enteredFirstName,
    enteredLastName,
    enteredEmail,
    enteredPhoneNumber,
    enteredCity,
    enteredPostalCode,
    enteredStreet,
    enteredStreetNumber,
    selectedGender,
  ]);

  const updateInfo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    const user: User = {
      id: props.userId,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      phone: enteredPhoneNumber,
      city: enteredCity,
      postalCode: +enteredPostalCode,
      street: enteredStreet,
      streetNumber: enteredStreetNumber,
      image: selectedImage,
      gender: selectedGender,
    };

    await CustomerService.update(user);

    props.onAuthUpdate();
  };

  const updateInfoHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value: inputValue } = event.target;
    let isInputValid = false;

    const textOnlyRegex = /^[^0-9]{1,}$/;
    const emailRegex = /^(?![.,])(?!.*[.,]@)([A-Za-z0-9!#$%&*+=?^_`{|}.,~-])+@([a-zA-Z0-9][a-zA-Z0-9-]{1,61})\.([A-Za-z0-9]{2,50})$/;
    const numberOnlyRegex = /^[0-9]{1,}$/;
    const postalCodeRegex = /^.{5}$/;
    const streetNumberRegex = /^[A-Za-z0-9]{1,}$/;

    switch (inputName) {
      case InputName.FIRST_NAME:
        isInputValid = !!inputValue.match(textOnlyRegex);

        setEnteredFirstName(inputValue);
        setIsEnteredFirstNameValid(isInputValid);
        break;
      case InputName.LAST_NAME:
        isInputValid = !!inputValue.match(textOnlyRegex);

        setIsEnteredLastNameValid(isInputValid);
        setEnteredLastName(inputValue);
        break;
      case InputName.EMAIL:
        isInputValid = !!inputValue.match(emailRegex);

        setEnteredEmail(inputValue);
        setIsEnteredEmailValid(isInputValid);
        break;
      case InputName.PHONE_NUMBER:
        isInputValid = !!inputValue.match(numberOnlyRegex);

        setEnteredPhoneNumber(inputValue);
        setIsEnteredPhoneNumberValid(isInputValid);
        break;
      case InputName.CITY:
        isInputValid = !!inputValue.match(textOnlyRegex);

        setIsEnteredCityValid(isInputValid);
        setEnteredCity(inputValue);
        break;
      case InputName.POSTAL_CODE:
        isInputValid = !!inputValue.match(postalCodeRegex);

        setIsEnteredPostalCodeValid(isInputValid);
        setEnteredPostalCode(inputValue);
        break;
      case InputName.STREET:
        isInputValid = !!inputValue.match(textOnlyRegex);

        setIsEnteredStreetValid(isInputValid);
        setEnteredStreet(inputValue);
        break;
      case InputName.STREET_NUMBER:
        isInputValid = !!inputValue.match(streetNumberRegex);

        setIsEnteredStreetNumberValid(isInputValid);
        setEnteredStreetNumber(inputValue);
        break;
      case InputName.GENDER:
        setSelectedGender(inputValue);
        setIsGenderValid(true);
        break;
      case InputName.IMAGE:
        setSelectedImage(CustomerService.parseImagePath(inputValue));
        break;
    }
  };

  return (
    <Aux>
      <div className={classes["userPanelUpdateInfo-title-wrapper"]}>
        <h2 className={classes["userPanelUpdateInfo-title"]}>
          Update Information
        </h2>
      </div>
      <form onSubmit={updateInfo} className={classes["userPanelUpdateInfo"]}>
        <div className={classes["row"]}>
          <input
            type="radio"
            name={InputName.GENDER}
            value="Male"
            onChange={updateInfoHandler}
          />
          <label htmlFor="gender">M</label>
          <input
            type="radio"
            name={InputName.GENDER}
            value="Female"
            onChange={updateInfoHandler}
          />
          <label htmlFor="gender">F</label>
        </div>
        <div className={classes["row"]}>
          <div className={classes["column"]}>
            <div className={classes["form-group"]}>
              <label>First Name</label>
              <input
                type="text"
                name={InputName.FIRST_NAME}
                value={enteredFirstName}
                onChange={updateInfoHandler}
              />
            </div>
          </div>
          <div className={classes["column"]}>
            <div className={classes["form-group"]}>
              <label>Last Name</label>
              <input
                type="text"
                name={InputName.LAST_NAME}
                value={enteredLastName}
                onChange={updateInfoHandler}
              />
            </div>
          </div>
        </div>
        <div className={classes["row"]}>
          <div className={classes["column"]}>
            <div className={classes["form-group"]}>
              <label>Email</label>
              <input
                type="text"
                name={InputName.EMAIL}
                value={enteredEmail}
                onChange={updateInfoHandler}
              />
            </div>
          </div>
          <div className={classes["column"]}>
            <div className={classes["form-group"]}>
              <label>Phone Number</label>
              <input
                type="text"
                name={InputName.PHONE_NUMBER}
                value={enteredPhoneNumber}
                onChange={updateInfoHandler}
              />
            </div>
          </div>
        </div>
        <div className={classes["row"]}>
          <div className={classes["column"]}>
            <div className={classes["form-group"]}>
              <label>City</label>
              <input
                type="text"
                name={InputName.CITY}
                value={enteredCity}
                onChange={updateInfoHandler}
              />
            </div>
          </div>
          <div className={classes["column"]}>
            <div className={classes["form-group"]}>
              <label>Postal Code</label>
              <input
                type="text"
                name={InputName.POSTAL_CODE}
                value={enteredPostalCode}
                onChange={updateInfoHandler}
              />
            </div>
          </div>
        </div>
        <div className={classes["row"]}>
          <div className={classes["column"]}>
            <div className={classes["form-group"]}>
              <label>Street</label>
              <input
                type="text"
                name={InputName.STREET}
                value={enteredStreet}
                onChange={updateInfoHandler}
              />
            </div>
          </div>
          <div className={classes["column"]}>
            <div className={classes["form-group"]}>
              <label>Street Number</label>
              <input
                type="text"
                name={InputName.STREET_NUMBER}
                value={enteredStreetNumber}
                onChange={updateInfoHandler}
              />
            </div>
          </div>
        </div>
        <div className={classes["row"]}>
          <div className={classes["column"]}>
            <div className={classes["form-group"]}>
              <label>Image</label>
              <input
                type="file"
                name={InputName.IMAGE}
                onChange={updateInfoHandler}
              />
            </div>
          </div>
        </div>
        <div className={classes["row"]}>
          <button disabled={!isValid}>Update</button>
        </div>
      </form>
    </Aux>
  );
};

export default UserPanelUpdateInfo;
