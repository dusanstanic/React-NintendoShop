import axios from "axios";

import { GenreM } from "../models/GenreM";

function getGenres() {
  return axios
    .get<GenreM[]>("http://localhost:8080/genre")
    .then((response) => {
      return response.data;
    })
    .then((genres) => {
      return genres;
    });
}

function getGenreById(id: number) {
  return axios
    .get<GenreM>("http://localhost:8080/genre/" + id)
    .then((response) => {
      return response.data;
    })
    .then((genre) => {
      return genre;
    });
}

export { getGenres, getGenreById };
