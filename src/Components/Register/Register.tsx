import React, { ChangeEvent } from "react";

import classes from "./Register.module.css";

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
  CONFIRMPASWORD = "confirmPassword",
}

const Register = () => {
  const registerHandler = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name);
  };

  return (
    <div className={classes["register"]}>
      <div className={classes["header"]}>
        <h4>Registration</h4>
        <button>X</button>
      </div>
      <form>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name={InputName.FIRST_NAME}
              onChange={registerHandler}
            />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name={InputName.LAST_NAME}
              onChange={registerHandler}
            />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" onChange={registerHandler} />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="text" name="phoneNumber" onChange={registerHandler} />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="city">City</label>
            <input type="text" name="city" />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="postalCode">Postal Code</label>
            <input type="text" name="postalCode" onChange={registerHandler} />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="street">Street</label>
            <input type="text" name="street" onChange={registerHandler} />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="streetNumber">Street Number</label>
            <input type="text" name="streetNumber" onChange={registerHandler} />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={registerHandler} />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={registerHandler}
            />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="gender">Gender</label>
            <input
              type="radio"
              value="male"
              name="gender"
              onChange={registerHandler}
            />
            <label htmlFor="genderType">Male</label>
            <input
              type="radio"
              value="female"
              name="gender"
              onChange={registerHandler}
            />
            <label htmlFor="genderType">Female</label>
          </div>
        </div>
        <div className={classes["submit"]}>
          <button>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
