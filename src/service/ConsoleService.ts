import axios from "axios";

import Console from "../models/ConsoleM";

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

export { getConsoles };
