import axios, { AxiosError } from "axios";

import Console from "../models/ConsoleM";

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

function getConsoles() {
  return axios
    .get<Console[]>("http://localhost:8080/consoles")
    .then((response) => {
      return response.data;
    })
    .then((consoles) => {
      return consoles;
    });
}

function findAllConsoleTypes() {
  return axios
    .get<string[]>("http://localhost:8080/consoles/consoleTypes")
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .then((consoles) => {
      return consoles;
    });
}

function save(consolee: Console) {
  const tokenStr = "Bearer " + localStorage.getItem("token");
  return axios
    .post("http://localhost:8080/consoles", consolee, {
      headers: { Authorization: tokenStr },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error: AxiosError) => {
      throw new Error();
    });
}

function deleteById(id: number) {
  const tokenStr = "Bearer " + localStorage.getItem("token");
  return axios
    .delete("http://localhost:8080/consoles/" + id, {
      headers: { Authorization: tokenStr },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error: AxiosError) => {
      throw new Error();
    });
}

export { getConsoles, findAllConsoleTypes, parseImagePath, save, deleteById };
