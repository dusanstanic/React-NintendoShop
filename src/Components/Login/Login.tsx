import React, { Component, ChangeEvent, FormEvent } from "react";
import { withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Login.module.css";

import { Customer } from "../../models/CustomerM";
import * as CustomerService from "../../service/CustomerService";
import * as AuthActions from "../../store/actions/index";

import Spinner from "../../shared/Spinner/Spinner";
import Error from "../../shared/Error/Error";
import Modal from "../../shared/Modal/Modal";
import thunk from "redux-thunk";

interface PropsI extends RouteComponentProps<{}> {
  closeModal: Function;
  showRegisterForm: Function;
  onAuth: Function;
  error: any;
  loading: boolean;
  isAuthenticated: boolean;
}

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

class Login extends Component<PropsI, StateI> {
  state: StateI = {
    email: "",
    password: "",
    isValid: false,
    isEmailValid: false,
    isPasswordValid: false,
  };

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.closeModal();
    }
  }

  login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onAuth(this.state.email, this.state.password);

    /*
    this.setState({ showSpinner: true });
    const login = setTimeout(() => {
      const { email, password } = this.state;
      CustomerService.login(email, password).then(
        (customer: Customer | void) => {
          if (customer) {
            localStorage.setItem("customer", JSON.stringify(customer));
            // this.props.history.push({ pathname: "/CustomerPanel" });
            // props.history.replace({ pathname: "/CustomerPanel" });
          } else {
            console.log("Customer not found");
            this.setState({ showModal: true });
          }
          this.setState({ showSpinner: false });
        }
      );
    }, 1000);
    */
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
      const passwordRegex = /(?=.*?[a-z]).{8,}/;
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

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/home" />;
    }

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
        <div className={classes["login-title"]}>
          <h1>Login</h1>
        </div>
        <Spinner showSpinner={this.props.loading} />
        <form onSubmit={this.login}>
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
            type="submit"
            disabled={!this.state.isValid}
            className={classes["login-submit-btn"]}
          >
            Login
          </button>
          <Error errorMessage={this.props.error} />
          <div style={{ marginBottom: "0px", paddingBottom: "1rem" }}>
            <label htmlFor="newUser">New User ?</label>
            <button
              className={classes["login-register-btn"]}
              onClick={() => this.props.showRegisterForm()}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProp = (state: any) => {
  return {
    loading: state.authentication.loading,
    error: state.authentication.error,
    isAuthenticated: state.authentication.token !== "",
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAuth: (email: string, password: string) =>
      dispatch(AuthActions.auth(email, password)),
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(withRouter(Login));
