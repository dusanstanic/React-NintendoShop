import React, { useEffect, useState, ChangeEvent } from "react";

import "./GameForm.css";

import { GenreM } from "../../models/GenreM";
import GameM from "../../models/GamesM";

import * as GenreService from "../../service/GenreService";
import * as GameService from "../../service/GamesService";

const GameForm = (props: any) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [genres, setGenreData] = useState<GenreM[]>();
  const [enteredTitle, setEnteredTitle] = useState<string>("");
  const [enteredDescription, setEnteredDescription] = useState<string>("");
  const [enteredReleaseDate, setEnteredReleaseDate] = useState<string>("");
  const [enteredPrice, setEnteredPrice] = useState<string>("");
  const [enteredPegiRating, setPegeRating] = useState<string>("E");
  const [enteredImage, setEnteredImage] = useState<string>("");
  const [enteredGenre, setEntereGenre] = useState<number>(1);

  useEffect(() => {
    GenreService.getGenres().then((genres) => {
      setGenreData(genres);
    });
  }, []);

  useEffect(() => {
    if (props.game) {
      const game = props.game;
      setEnteredTitle(game.title);
      setEnteredDescription(game.description);
      setEnteredReleaseDate(game.releaseDate);
      setEnteredPrice(game.price.toString());
      setEnteredImage(game.image);
      setEntereGenre(game.genre.id);
    }
  }, [props.game]);

  useEffect(() => {
    if (
      enteredTitle.length > 0 &&
      enteredImage.length > 0 &&
      enteredPrice.length > 0 &&
      enteredReleaseDate.length > 0
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [enteredTitle, enteredImage, enteredPrice, enteredReleaseDate]);

  const submit = () => {
    let genre = genres?.find((genre) => {
      return genre.id === enteredGenre;
    });
    const releaseDate = GameService.parseStringToDate(enteredReleaseDate);
    if (genre) {
      const newGame: GameM = {
        title: enteredTitle,
        description: enteredDescription,
        releaseDate: releaseDate,
        price: +enteredPrice,
        pgRating: enteredPegiRating,
        image: enteredImage,
        genre: genre,
      };
      props.submit(newGame);
    }
  };

  const addGameHandler = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    console.log(event.target.id);
    console.log(event.target.value);
    if (event.target.id === "title") setEnteredTitle(event.target.value);
    if (event.target.id === "description") {
      setEnteredDescription(event.target.value);
    }
    if (event.target.id === "releaseDate")
      setEnteredReleaseDate(event.target.value);
    if (event.target.id === "price") {
      const price = event.target.value;
      const priceValid = "^\\d*$";
      if (price.match(priceValid)) {
        setEnteredPrice(event.target.value);
      }
    }
    if (event.target.id === "rating") setPegeRating(event.target.value);
    if (event.target.id === "image")
      setEnteredImage(GameService.parseImagePath(event.target.value));
    if (event.target.id === "genre") setEntereGenre(+event.target.value);
  };

  let genreOptions;
  if (genres) {
    genreOptions = genres.map((genre) => {
      return (
        <option key={genre.id} value={genre.id}>
          {genre.type}
        </option>
      );
    });
  }

  return (
    <form className="add-game-form">
      <label htmlFor="Title">Title</label>
      <input
        type="text"
        placeholder="Title"
        id="title"
        value={enteredTitle}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          addGameHandler(event)
        }
      ></input>
      <label htmlFor="Description">Description</label>
      <textarea
        placeholder="Description"
        id="description"
        value={enteredDescription}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          addGameHandler(event)
        }
      ></textarea>
      <label htmlFor="ReleaseDate">Release Date</label>
      <input
        type="date"
        id="releaseDate"
        value={enteredReleaseDate}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          addGameHandler(event)
        }
      ></input>
      <label htmlFor="Price">Price</label>
      <input
        type="text"
        placeholder="Price"
        id="price"
        value={enteredPrice}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          addGameHandler(event)
        }
      ></input>
      <div className="form-group-pegiRating">
        <label htmlFor="PegiRating">Pegi Rating</label>
        <label htmlFor="rating">E</label>
        <input
          checked
          type="radio"
          value="E"
          name="pgRating"
          id="rating"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            addGameHandler(event)
          }
        ></input>
        <label htmlFor="rating">T</label>
        <input
          type="radio"
          value="T"
          name="pgRating"
          id="rating"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            addGameHandler(event)
          }
        ></input>
        <label htmlFor="rating">M</label>
        <input
          type="radio"
          value="M"
          name="pgRating"
          id="rating"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            addGameHandler(event)
          }
        ></input>
      </div>
      <div className="form-group-image">
        <label htmlFor="Image">Image</label>
        <input
          type="file"
          placeholder="Image"
          id="image"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            addGameHandler(event)
          }
        ></input>
      </div>
      <label htmlFor="Genre">Genre</label>
      <select
        id="genre"
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          addGameHandler(event)
        }
      >
        {genreOptions}
      </select>
      <button
        disabled={!isValid}
        type="button"
        className="add-game-submit-btn"
        onClick={submit}
      >
        Add
      </button>
    </form>
  );
};

export default GameForm;
