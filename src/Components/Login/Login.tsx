import React, { Component, ChangeEvent } from "react";

import classes from "./Login.module.css";

import * as CustomerService from "../../service/CustomerService";
import { Customer } from "../../models/CustomerM";

import Spinner from "../../shared/Spinner/Spinner";
import Error from "../../shared/Error/Error";
import Modal from "../../shared/Modal/Modal";

interface PropsI {}

interface StateI {
  email: string;
  password: string;
  isValid: boolean;
  isEmailValid: boolean;
  isPasswordValid: boolean;
  showSpinner: boolean;
  showModal: boolean;
}

enum InputName {
  EMAIL = "email",
  PASSWORD = "password",
}

class Login extends Component<PropsI, StateI> {
  state: StateI = {
    email: "",
    password: "",
    isValid: false,
    isEmailValid: false,
    isPasswordValid: false,
    showSpinner: false,
    showModal: false,
  };

  login = () => {
    this.setState({ showSpinner: true });
    const login = setTimeout(() => {
      const { email, password } = this.state;
      CustomerService.login(email, password).then(
        (customer: Customer | void) => {
          if (customer) {
            localStorage.setItem("customer", JSON.stringify(customer));
            // this.props.history.push({ pathname: "/games" });
          } else {
            console.log("Customer not found");
            this.setState({ showModal: true });
          }
          this.setState({ showSpinner: false });
        }
      );
    }, 1000);
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
        this.isValid();
      });
    }
    if (inputName === InputName.PASSWORD) {
      const passwordRegex = /(?=.*?[A-Z])(?=.*?[a-z]).{8,}/;
      if (inputValue.match(passwordRegex)) {
        this.setState({ isPasswordValid: true });
      } else {
        this.setState({ isPasswordValid: false });
      }
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

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    let emailValid = "";
    let passwordValid = "";
    if (this.state.isEmailValid) {
      emailValid = classes["valid-input"];
    }
    if (this.state.isPasswordValid) {
      passwordValid = classes["valid-input"];
    }
    return (
      <div className={classes["login"]}>
        <Modal show={this.state.showModal} closeModal={this.closeModal}>
          <Error errorMessage={"Email or password is incorrect"} />
        </Modal>
        <div className={classes["login-title"]}>
          <h1>Login</h1>
        </div>
        <Spinner showSpinner={this.state.showSpinner} />
        <form>
          <div className={classes["login-form-group"]}>
            <label htmlFor="username">Email</label>
            <input
              className={emailValid}
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
              className={passwordValid}
              type="text"
              placeholder="Password"
              name={InputName.PASSWORD}
              value={this.state.password}
              onChange={this.loginHandler}
            />
          </div>
          <label htmlFor="forgotPassword">Forgot Password ?</label>
          <button
            type="button"
            disabled={!this.state.isValid}
            className={classes["login-submit-btn"]}
            onClick={this.login}
          >
            Login
          </button>
          <div style={{ marginBottom: "0px", paddingBottom: "1rem" }}>
            <label htmlFor="newUser">New User ?</label>
            <button className={classes["login-register-btn"]}>Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
