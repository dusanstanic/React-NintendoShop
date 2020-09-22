import axios, { AxiosError } from "axios";

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
      console.log(error);
      console.log(error.response);
      if (error.response?.status === 404) {
        console.log("User with this email or password doesn't exist");
      }
    });
}

function register(customer: Customer) {
  return axios
    .post<Customer>(`http://localhost:8080/customers/register`, customer)
    .then((response) => {
      console.log(response);
    })
    .catch((error: AxiosError) => {
      throw new Error(error.response?.data);
    });
}

export { login, register };
