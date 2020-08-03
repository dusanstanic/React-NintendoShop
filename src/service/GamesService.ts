import axios from "axios";

import GameM from "../models/GamesM";

function parseDate(date: Date) {
  const dateArray = date.toString().split("-");
  const year = +dateArray[0];
  const month = +dateArray[1];
  const day = +dateArray[2];
  return new Date(year, month, day);
}

function getGames(): Promise<GameM[]> {
  return axios
    .get<GameM[]>("http://localhost:8080/games")
    .then((response) => {
      return response.data;
    })
    .then((games) => {
      return games;
    });
}

function getGameById(id: number) {
  return axios
    .get<GameM>("http://localhost:8080/games/" + id)
    .then((response) => {
      return response.data;
    })
    .then((game) => {
      return game;
    });
}

export { getGames, getGameById, parseDate };
