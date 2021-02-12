import React, { Component, ChangeEvent, FormEvent } from "react";
import { withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Login.module.scss";

import * as AuthActions from "../../store/actions/index";

import checkValidation, {
  validationOptions,
} from "../../shared/Validation/Validation";

import Spinner from "../../shared/UI/Spinner/Spinner";
import Error from "../../shared/UI/Error/Error";
import { Input } from "../../shared/UI/Input/Input";

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
    const { name: inputName, value: inputValue } = event.target;
    let validation;

    if (inputName === InputName.EMAIL) {
      validation = checkValidation(
        [validationOptions.REQUIRED, validationOptions.TEXT],
        inputValue
      );

      this.setState(
        { isEmailValid: validation.isInputValid, email: inputValue },
        () => {
          this.isValid();
        }
      );
    }

    if (inputName === InputName.PASSWORD) {
      validation = checkValidation(
        [validationOptions.REQUIRED, validationOptions.PASSWORD],
        inputValue
      );

      this.setState(
        { isPasswordValid: validation.isInputValid, password: inputValue },
        () => {
          this.isValid();
        }
      );
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
    console.log(this.state.isEmailValid);

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
        <div className={classes["login__heading"]}>
          <h3 className={classes["login__title"]}>Login</h3>
          <button
            onClick={() => this.props.closeModal()}
            className={classes["login__exit"]}
          >
            X
          </button>
        </div>

        <Spinner showSpinner={this.props.loading} />

        <form className={classes["form"]} onSubmit={this.login}>
          <div className={classes["form__group"]}>
            <label className={classes["form__label"]} htmlFor="email">
              Email
            </label>
            <Input
              className={classes["form__input"]}
              placeholder="Email"
              type="text"
              name={InputName.EMAIL}
              value={this.state.email}
              change={this.loginHandler}
              isValid={this.state.isEmailValid}
              validClassName={classes["valid"]}
              invalidClassName={classes["invalid"]}
            />
          </div>
          <div className={classes["form__group"]}>
            <label className={classes["form__label"]} htmlFor="password">
              Password
            </label>
            <Input
              className={classes["form__input"]}
              type="text"
              placeholder="Password"
              name={InputName.PASSWORD}
              value={this.state.password}
              change={this.loginHandler}
              isValid={this.state.isPasswordValid}
              validClassName={classes["valid"]}
              invalidClassName={classes["invalid"]}
            />
          </div>

          <label htmlFor="forgotPassword">Forgot Password ?</label>

          <button
            type="submit"
            disabled={!this.state.isValid}
            className={classes["form__submit"]}
          >
            Login
          </button>

          <Error errorMessage={this.props.error} />
          <div className={classes["register"]}>
            <label htmlFor="newUser" className={classes["register__label"]}>
              New User ?
            </label>
            <button
              className={classes["register__btn"]}
              onClick={() => this.props.showRegisterForm()}
            >
              Register &rarr;
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
