import { AxiosError } from "axios";

import { Customer } from "../models/CustomerM";
import { UserInfo } from "../models/UserInfo";
import { customerAxios } from "./axios-customer";

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

  return customerAxios
    .post<authResponse>("login", authData)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      // const errorMessage = error.response?.data;
      throw new Error("Error");
    });
}

function register(customer: Customer) {
  return customerAxios
    .post<Customer>(`register`, customer)
    .then((response) => {
      return response;
    })
    .catch((error: any) => {
      // console.dir(error);
      // const errorMessage = error.response?.data.errorMessage;
      // throw new Error(errorMessage);
      throw new Error(error);
    });
}

function findRoleByUserId(id: number) {
  const tokenStr = "Bearer " + localStorage.getItem("token");

  return customerAxios
    .get<{ role: string }>("role/" + id, {
      headers: { Authorization: tokenStr },
    })
    .then((response) => {
      return response.data.role;
    })
    .catch((error: AxiosError) => {
      throw new Error(error.response?.data);
    });
}

function findUserById(id: number) {
  const tokenStr = "Bearer " + localStorage.getItem("token");

  return customerAxios
    .get<UserInfo>("" + id, {
      headers: { Authorization: tokenStr },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      throw new Error(error.response?.data);
    });
}

function update(game: any) {
  const tokenStr = "Bearer " + localStorage.getItem("token");

  return customerAxios
    .put("/afafs", game, {
      headers: { Authorization: tokenStr },
    })
    .then((response) => {
      // console.dir(response);
      // console.log(response);
      console.log("Non error");
      return response;
    })
    .catch((error: AxiosError) => {
      console.log("Error " + error);
      // throw new Error();
    });
}

function parseImagePath(path: string) {
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
