const digitContained = /[0-9]/;
const textContained = /[A-Za-z]/;
const specialCharacterContained = /[`~,.<>;':"\/\[\]\|{}()=_+-]/;

const textOnly = /^[A-Za-z]*$/;
const email = /\S+@\S+\.\S+/;
const phoneNumber = /^\d{10}$/;
const postalCode = /^.{5}$/;
const password = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/;

const checkValidation = (requierments: string[], inputValue: string) => {
  let isInputValid = false;
  const errorMessage: string[] = [];

  if (requierments.includes(validationOptions.REQUIRED)) {
    if (inputValue.length === 0) {
      errorMessage.push("*Field is required");
      return { isInputValid, errorMessage };
    }
  }

  if (requierments.includes(validationOptions.TEXT)) {
    if (!inputValue.match(textOnly)) {
      errorMessage.push("Must contain only text");
    }
  }

  if (requierments.includes(validationOptions.NO_TEXT)) {
    if (inputValue.match(textContained)) {
      errorMessage.push("Cannot contain text");
    }
  }

  if (requierments.includes(validationOptions.NO_SPECIAL_CHARACTER)) {
    if (inputValue.match(specialCharacterContained)) {
      errorMessage.push("Cannot contain special characters");
    }
  }

  if (requierments.includes(validationOptions.NO_NUMBER)) {
    if (inputValue.match(digitContained)) {
      errorMessage.push("Cannot contain a number");
    }
  }

  if (requierments.includes(validationOptions.EMAIL)) {
    if (!inputValue.match(email)) {
      errorMessage.push("Email is invalid");
    }
  }

  if (requierments.includes(validationOptions.PHONE_NUMBER)) {
    if (!inputValue.match(phoneNumber)) {
      errorMessage.push("Must contain 10 numbers");
    }
  }

  if (requierments.includes(validationOptions.POSTAL_CODE)) {
    if (!inputValue.match(postalCode)) {
      errorMessage.push("Must contain 5 characters");
    }
  }

  if (requierments.includes(validationOptions.PASSWORD)) {
    if (!inputValue.match(password)) {
      errorMessage.push(
        "Must contain 8 characters and at least one number, upper and lower case"
      );
    }
  }

  isInputValid = errorMessage.length > 0 ? false : true;

  return { isInputValid, errorMessage };
};

export enum validationOptions {
  TEXT = "text",
  NO_TEXT = "noText",
  NO_SPECIAL_CHARACTER = "noSpecialCharactes",
  NO_NUMBER = "noNumber",
  REQUIRED = "required",
  EMAIL = "email",
  PHONE_NUMBER = "phoneNumber",
  POSTAL_CODE = "postalCode",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirm_password",
}

export default checkValidation;
