import React, { useEffect, useState, ChangeEvent } from "react";

import "./GameForm.css";

import Aux from "../../hoc/Auxiliary";

import { GenreM } from "../../models/GenreM";
import GameM from "../../models/GameM";
import ConsoleM from "../../models/ConsoleM";

import * as GenreService from "../../service/GenreService";
import * as GameService from "../../service/GamesService";
import * as ConsoleService from "../../service/ConsoleService";

import Modal from "../../shared/UI/Modal/Modal";
import PostGameSummary from "../PostGameSummary/PostGameSummary";

const GameForm = (props: any) => {
  const closeModal = () => {
    setModal(
      <Modal show={false} closeModal={closeModal}>
        <PostGameSummary />
      </Modal>
    );
  };

  const [showModal, setModal] = useState<JSX.Element>(
    <Modal show={false} closeModal={closeModal}>
      <PostGameSummary />
    </Modal>
  );

  const [isValid, setIsValid] = useState<boolean>(false);
  const [genres, setGenreData] = useState<GenreM[]>();
  const [consoles, setConsoleData] = useState<ConsoleM[]>();

  const [enteredTitle, setEnteredTitle] = useState<string>("");
  const [enteredDescription, setEnteredDescription] = useState<string>("");
  const [enteredReleaseDate, setEnteredReleaseDate] = useState<string>("");
  const [enteredPrice, setEnteredPrice] = useState<string>("1000");
  const [enteredPegiRating, setPegeRating] = useState<string>("");
  const [enteredImage, setEnteredImage] = useState<string>("");
  const [enteredGenre, setEntereGenre] = useState<number>(1);
  const [enteredConsoles, setEnteredConsoles] = useState<number[]>([]);
  //const [enteredImages, setEnteredImages] = useState<string[]>([]);

  useEffect(() => {
    GenreService.getGenres().then((genres) => {
      setGenreData(genres);
    });
    ConsoleService.getConsoles().then((consoles) => {
      setConsoleData(consoles);
    });
  }, []);

  useEffect(() => {
    if (props.game) {
      console.log(props.game);
      const game = props.game;
      setEnteredTitle(game.title);
      setEnteredDescription(game.description);
      setEnteredReleaseDate(game.releaseDate);
      setEnteredPrice(game.price.toString());
      setEnteredImage(game.image);
      setEntereGenre(game.genre.id);
      if (game.consoles) {
        for (const console of game.consoles) {
          enteredConsoles.push(console.id);
        }
        setEnteredConsoles(enteredConsoles);
      }
    }
  }, [props.game]);

  useEffect(() => {
    isFormValid();
  }, [
    enteredTitle,
    enteredImage,
    enteredPrice,
    enteredReleaseDate,
    enteredPegiRating,
    enteredConsoles,
  ]);

  const isFormValid = () => {
    console.log(enteredConsoles);
    if (
      enteredTitle.length > 0 &&
      enteredImage.length > 0 &&
      enteredPrice.length > 0 &&
      enteredPegiRating.length > 0 &&
      enteredReleaseDate.length > 0 &&
      enteredConsoles.length > 0
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const submit = () => {
    let genre = genres?.find((genre) => {
      return genre.id === enteredGenre;
    });

    /*
    let selectedConsoles = [];
    selectedConsoles = enteredConsoles.map((idSelectedConsole: number) => {
      return consoles?.find((console) => {
        return console.id === idSelectedConsole;
      });
    });
    */

    let selectedConsoles = consoles?.filter((console: ConsoleM) => {
      return enteredConsoles.find((selectedId: number) => {
        return console.id === selectedId;
      });
    });

    const releaseDate = GameService.parseStringToDate(enteredReleaseDate);
    if (genre) {
      const game: GameM = {
        title: enteredTitle,
        description: enteredDescription,
        releaseDate: releaseDate,
        price: +enteredPrice,
        pgRating: enteredPegiRating,
        image: enteredImage,
        genre: genre,
        status: "",
        consoles: selectedConsoles,
      };
      // setModal(true);
      /*
      setModal(
        <Modal show={true} closeModal={closeModal}>
          <PostGameSummary game={game} />
        </Modal>
      );*/

      props.submit(game, enteredConsoles);
    }
  };

  enum InputName {
    TITLE = "title",
    DESCRIPTION = "description",
    RELEASEDATE = "releaseDate",
    PRICE = "price",
    RATING = "rating",
    IMAGE = "image",
    GENRE = "genre",
    CONSOLE = "console",
    IMAGES = "images",
  }

  const addGameHandler = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === InputName.TITLE) {
      setEnteredTitle(inputValue);
    }

    if (inputName === InputName.DESCRIPTION) {
      setEnteredDescription(inputValue);
    }

    if (inputName === InputName.RELEASEDATE) setEnteredReleaseDate(inputValue);

    if (inputName === InputName.PRICE) {
      const price = inputValue;
      const priceValid = "^\\d*$";
      if (price.match(priceValid)) {
        setEnteredPrice(inputValue);
      }
    }

    if (inputName === InputName.RATING) setPegeRating(inputValue);

    if (inputName === InputName.IMAGE)
      setEnteredImage(GameService.parseImagePath(inputValue));

    if (inputName === InputName.GENRE) setEntereGenre(+inputValue);

    if (inputName === InputName.CONSOLE) {
      const selectedConsoleId = +inputValue;
      let consoleAlreadyExists = enteredConsoles.find((id) => {
        return id === selectedConsoleId;
      });
      if (consoleAlreadyExists) {
        const newEnteredConsoles = enteredConsoles.filter((id: number) => {
          return id !== selectedConsoleId;
        });
        return setEnteredConsoles(newEnteredConsoles);
      }
      setEnteredConsoles([...enteredConsoles, selectedConsoleId]);
    }

    if (
      inputName === InputName.IMAGES &&
      event.target instanceof HTMLInputElement &&
      event.target.files !== null
    ) {
      /*console.log(event.target.files);
      let selectedFiles = event.target.files;
      let selectedImages = enteredImages;
      for (let i = 0; i < selectedFiles.length; i++) {}*/
    }
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

  let consoleOptions;
  if (consoles) {
    consoleOptions = consoles.map((consolee) => {
      let consoleFound = enteredConsoles.find((id) => {
        return consolee.id === id;
      });

      let checked = false;
      if (consoleFound) {
        checked = true;
      }

      return (
        <Aux key={consolee.id}>
          <div>
            <input
              type="checkbox"
              name={InputName.CONSOLE}
              value={consolee.id}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                addGameHandler(event)
              }
              checked={checked}
            ></input>
            <label>{consolee.title}</label>
          </div>
        </Aux>
      );
    });
  }

  let pgRatingOptions;
  pgRatingOptions = ["3", "7", "12", "16", "18"].map((pgRating) => {
    return (
      <Aux key={pgRating}>
        <label htmlFor="rating">{pgRating}:</label>
        <input
          type="radio"
          value={pgRating}
          name={InputName.RATING}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            addGameHandler(event)
          }
        ></input>
      </Aux>
    );
  });

  return (
    <Aux>
      {showModal}
      <form className="add-game-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title"
            name={InputName.TITLE}
            value={enteredTitle}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              addGameHandler(event)
            }
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="Description"
            name={InputName.DESCRIPTION}
            value={enteredDescription}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              addGameHandler(event)
            }
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="releaseDate">Release Date</label>
          <input
            type="date"
            name={InputName.RELEASEDATE}
            value={enteredReleaseDate}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              addGameHandler(event)
            }
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            placeholder="Price"
            name={InputName.PRICE}
            value={enteredPrice}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              addGameHandler(event)
            }
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="pegiRating">PEGI Rating</label>
          <div className="form-group-pegiRating">{pgRatingOptions}</div>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            placeholder="Image"
            name={InputName.IMAGE}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              addGameHandler(event)
            }
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <select
            name={InputName.GENRE}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              addGameHandler(event)
            }
          >
            {genreOptions}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="console">Console</label>
          <div className="form-group-console">{consoleOptions}</div>
        </div>
        <div className="form-group">
          <label htmlFor="files">Select files:</label>
          <input
            type="file"
            name={InputName.IMAGES}
            multiple
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              addGameHandler(event)
            }
          />
        </div>
        <button
          disabled={!isValid}
          type="button"
          className="add-game-submit-btn"
          onClick={submit}
        >
          Add
        </button>
      </form>
    </Aux>
  );
};

export default GameForm;
