import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";

import classes from "./UserPanelUpdateInfo.module.css";

import Aux from "../../../hoc/Auxiliary";
import { UserInfo } from "../../../models/UserInfo";

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

interface PropsI {
  userRole: string;
  userInfo: UserInfo;
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

  const updateInfoHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value: inputValue } = event.target;
  };

  return (
    <Aux>
      <div className={classes["userPanelUpdateInfo-title-wrapper"]}>
        <h2 className={classes["userPanelUpdateInfo-title"]}>
          Update Information
        </h2>
      </div>
      <form className={classes["userPanelUpdateInfo"]}>
        <div className={classes["row"]}>
          <input
            type="radio"
            name={InputName.GENDER}
            value="M"
            onChange={updateInfoHandler}
          />
          <label>M</label>
          <input
            type="radio"
            name={InputName.GENDER}
            value="F"
            onChange={updateInfoHandler}
          />
          <label>F</label>
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
              <input type="text" />
            </div>
          </div>
          <div className={classes["column"]}>
            <div className={classes["form-group"]}>
              <label>Phone Number</label>
              <input type="text" />
            </div>
          </div>
        </div>
        <div className={classes["row"]}>
          <div className={classes["column"]}>
            <div className={classes["form-group"]}>
              <label>City</label>
              <input type="text" />
            </div>
          </div>
          <div className={classes["column"]}>
            <div className={classes["form-group"]}>
              <label>Postal Code</label>
              <input type="text" />
            </div>
          </div>
        </div>
        <div className={classes["row"]}>
          <div className={classes["column"]}>
            <div className={classes["form-group"]}>
              <label>Street</label>
              <input type="text" />
            </div>
          </div>
          <div className={classes["column"]}>
            <div className={classes["form-group"]}>
              <label>Street Number</label>
              <input type="text" />
            </div>
          </div>
        </div>
      </form>
    </Aux>
  );
};

export default UserPanelUpdateInfo;
