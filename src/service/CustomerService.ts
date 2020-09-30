import axios, { AxiosError } from "axios";

import { Customer } from "../models/CustomerM";

interface authData {
  email: string;
  password: string;
}

interface authResponse {
  expiresIn: number;
  token: string;
  userId: number;
}

function login(email: string, password: string) {
  const authData: authData = { email: email, password: password };
  return axios
    .post<authResponse>(`http://localhost:8080/customers/login`, authData)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error: AxiosError) => {
      const errorMessage = error.response?.data;
      throw new Error(errorMessage);
    });
}

function register(customer: Customer) {
  return axios
    .post<Customer>(`http://localhost:8080/customers/register`, customer)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error: AxiosError) => {
      console.log(error.response);
      const errorMessage = error.response?.data.errorMessage;
      throw new Error(errorMessage);
    });
}

export { login, register };
