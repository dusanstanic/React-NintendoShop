import axios, { AxiosError } from "axios";

import { Customer } from "../models/CustomerM";
import { UserInfo } from "../models/UserInfo";

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
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.log("error");
      const errorMessage = error.response?.data;
      throw new Error("Error");
      // throw new Error(errorMessage);
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

function findRoleByUserId(id: number) {
  const tokenStr = "Bearer " + localStorage.getItem("token");
  console.log(tokenStr);
  return axios
    .get<{ role: string }>("http://localhost:8080/customers/role/" + id, {
      headers: { Authorization: tokenStr },
    })
    .then((response) => {
      // console.log(response);
      return response.data.role;
    })
    .catch((error: AxiosError) => {
      throw new Error(error.response?.data);
    });
}

function findUserById(id: number) {
  const tokenStr = "Bearer " + localStorage.getItem("token");
  return axios
    .get<UserInfo>("http://localhost:8080/customers/" + id, {
      headers: { Authorization: tokenStr },
    })
    .then((response) => {
      // console.log(response);
      return response.data;
    })
    .catch((error: AxiosError) => {
      throw new Error(error.response?.data);
    });
}

function update(game: any) {
  const tokenStr = "Bearer " + localStorage.getItem("token");
  return axios
    .put("http://localhost:8080/customers", game, {
      headers: { Authorization: tokenStr },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error: AxiosError) => {
      throw new Error();
    });
}

function parseImagePath(path: string) {
  console.log(path.split("\\"));
  return (
    "http://127.0.0.1:8887/" +
    path
      .split("\\")[2]
      .split("")
      .map((letter) => {
        if (letter === " ") {
          letter = "%20";
        }
        return letter;
      })
      .join("")
  );
}

export {
  login,
  register,
  findRoleByUserId,
  findUserById,
  update,
  parseImagePath,
};
