import axios, { AxiosResponse, AxiosError } from "axios";

import { Customer } from "../models/CustomerM";

function login(email: string, password: string) {
  return axios
    .get<Customer>(
      `http://localhost:8080/customers/login?password=${password}&email=${email}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      if (error.response?.status === 404) {
        console.log("User with this email or password doesn't exist");
      }
    });
}

export { login };
