import axios, { AxiosError } from "axios";

import GameM from "../models/GameM";

function parseDate(date: Date) {
  const dateArray = date.toString().split("-");
  const year = +dateArray[0];
  const month = +dateArray[1];
  const day = +dateArray[2];
  return new Date(year, month, day);
}

function parseStringToDate(date: string) {
  const releaseDate = date.split("-");
  const year = +releaseDate[0];
  const month = +releaseDate[1];
  const day = +releaseDate[2];
  return new Date(year, month, day);
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

function getGames(): Promise<GameM[]> {
  return axios
    .get<GameM[]>("http://localhost:8080/games")
    .then((response) => {
      return response.data;
    })
    .then((games) => {
      for (const game of games) {
        game.releaseDate = parseDate(game.releaseDate);
      }
      return games;
    })
    .catch((error: AxiosError) => {
      throw new Error();
    });
}

function getGameById(id: number) {
  const tokenStr = "Bearer " + localStorage.getItem("token");
  return axios
    .get<GameM>("http://localhost:8080/games/" + id, {
      headers: { Authorization: tokenStr },
    })
    .then((response) => {
      return response.data;
    })
    .then((game) => {
      return game;
    })
    .catch((error: AxiosError) => {
      throw new Error("Error game doesn't exist with this id");
    });
}

function getGameByPgRatings(pgRatings: String[]) {
  if (pgRatings.length === 0) {
    return getGames();
  }
  return axios
    .get<GameM[]>("http://localhost:8080/games/pgRating/" + pgRatings)
    .then((response) => {
      return response.data;
    })
    .then((game) => {
      return game;
    })
    .catch((error: AxiosError) => {
      throw new Error();
    });
}

function createGame(game: any) {
  return axios
    .post("http://localhost:8080/games", game)
    .then((response) => {
      console.log(response);
    })
    .catch((error: AxiosError) => {
      throw new Error();
    });
}

function update(game: any) {
  return axios
    .put("http://localhost:8080/games", game)
    .then((response) => {
      console.log(response);
    })
    .catch((error: AxiosError) => {
      throw new Error();
    });
}

function deleteById(id: number) {
  return axios
    .delete("http://localhost:8080/games/" + id)
    .then((response) => {
      console.log(response);
    })
    .catch((error: AxiosError) => {
      throw new Error();
    });
}

export {
  getGames,
  getGameById,
  createGame,
  update,
  parseDate,
  parseImagePath,
  parseStringToDate,
  deleteById,
  getGameByPgRatings,
};
