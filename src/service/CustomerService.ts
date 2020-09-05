import axios, { AxiosError } from "axios";

import { Customer } from "../models/CustomerM";

async function login(email: string, password: string) {
  const response = await axios
    .get<Customer>(
      `http://localhost:8080/customers/login?password=${password}&email=${email}`
    )
    .catch((error: AxiosError) => {
      if (error.response?.status === 404) {
        console.log("User with this email or password doesn't exist");
      }
      return error;
    });

  if (!(response! instanceof Error)) {
    return response.data;
  } else {
    return response;
  }
}

export { login };
