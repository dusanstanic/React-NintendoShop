import React, { useState, useEffect } from "react";

import classes from "./GameSearchOptions.module.css";

import { GenreM } from "../../models/GenreM";

import * as GenreService from "../../service/GenreService";

import Aux from "../../hoc/Auxiliary";
import { InputCheckBox } from "../../shared/Input";

const GameSearchOptions = (props: any) => {
  const [genres, setGenreData] = useState<GenreM[]>();

  useEffect(() => {
    GenreService.getGenres().then((genres) => {
      setGenreData(genres);
    });
  }, []);

  const pgRatingOptions = ["3", "7", "12", "16", "18"].map((pgRating) => {
    return (
      <InputCheckBox
        key={pgRating}
        name={"pgRating"}
        value={pgRating}
        updateDisplayedGames={props.updateDisplayedGames}
      />
    );
  });

  const genreOptions = genres?.map((genre) => {
    return (
      <InputCheckBox
        key={genre.id}
        name={"genre"}
        value={genre.type}
        updateDisplayedGames={props.updateDisplayedGames}
      />
    );
  });

  return (
    <Aux>
      <div className={props.class}>
        <div className={classes["game-search-option-by-pgRating"]}>
          <h4 className={classes["game-search-option-title"]}>PEGI RATING</h4>
          {pgRatingOptions}
        </div>
        <div className={classes["game-search-option-by-genre"]}>
          <h4 className={classes["game-search-option-title"]}>GENRE</h4>
          {genreOptions}
        </div>
        <div className={classes["game-search-option-by-price"]}>
          <h4 className={classes["game-search-option-title"]}>PRICE</h4>
        </div>
      </div>
    </Aux>
  );
};

export default GameSearchOptions;
