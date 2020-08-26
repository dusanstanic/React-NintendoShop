import axios from "axios";

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
    });
}

function createGame(game: any) {
  return axios.post("http://localhost:8080/games", game).then((response) => {
    console.log(response);
  });
}

function update(game: any) {
  return axios.put("http://localhost:8080/games", game).then((response) => {
    console.log(response);
  });
}

function deleteById(id: number) {
  return axios.delete("http://localhost:8080/games/" + id).then((response) => {
    console.log(response);
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
