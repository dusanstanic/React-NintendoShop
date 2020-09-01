import React, { Component, ChangeEvent } from "react";

import classes from "./Login.module.css";

import * as CustomerService from "../../service/CustomerService";
import { Customer } from "../../models/CustomerM";

interface StateI {
  email: string;
  password: string;
  isValid: boolean;
  isEmailValid: boolean;
  isPasswordValid: boolean;
}

enum InputName {
  EMAIL = "email",
  PASSWORD = "password",
}

class Login extends Component<{}, StateI> {
  state: StateI = {
    email: "",
    password: "",
    isValid: false,
    isEmailValid: false,
    isPasswordValid: false,
  };

  login = () => {
    const { email, password } = this.state;
    CustomerService.login(email, password).then((customer: Customer | void) => {
      localStorage.setItem("customer", JSON.stringify(customer));
    });
    const user = this.state;
    localStorage.setItem("user", JSON.stringify(user));
  };

  loginHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      name: inputName,
      value: inputValue,
      validity: { valid: isInputValid },
    } = event.target;
    if (inputName === InputName.EMAIL) {
      this.setState({ isEmailValid: isInputValid });
      this.setState({ email: inputValue }, () => {
        console.log(this.state);
        this.isValid();
      });
    }
    if (inputName === InputName.PASSWORD) {
      this.setState({ isPasswordValid: true });
      this.setState({ password: inputValue }, () => {
        this.isValid();
      });
    }
  };

  isValid = () => {
    if (this.state.isEmailValid && this.state.isPasswordValid) {
      this.setState({ isValid: true });
    } else {
      this.setState({ isValid: false });
    }
  };

  render() {
    // console.log("Rendering Login");
    // console.log(this.state);

    let inputClasses;
    if (this.state.email) {
      inputClasses = classes["valid-input"];
    }

    // console.log(classes);

    return (
      <div className={classes["login"]}>
        <h1 className={classes["login-title"]}>Login</h1>
        <form>
          <div className={classes["login-form-group"]}>
            <label htmlFor="username">Email</label>
            <input
              className={inputClasses}
              type="email"
              placeholder="Email"
              name={InputName.EMAIL}
              value={this.state.email}
              onChange={this.loginHandler}
            />
          </div>
          <div className={classes["login-form-group"]}>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              placeholder="Password"
              name={InputName.PASSWORD}
              value={this.state.password}
              onChange={this.loginHandler}
            />
          </div>
          <button
            type="button"
            disabled={!this.state.isValid}
            className={classes["login-submit-btn"]}
            onClick={this.login}
          >
            Login
          </button>
          <label htmlFor="newUser">New User ?</label>
          <button className={classes["login-register-btn"]}>Register</button>
        </form>
      </div>
    );
  }
}

export default Login;
