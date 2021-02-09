import React, { ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";

import classes from "./GameSearchOptions.module.scss";

import GameM from "../../../models/GameM";

import Aux from "../../../hoc/Auxiliary";
import { InputCheckBox } from "../../../shared/UI/Input/Input";

import { GameDisplayState } from "../../../store/reducers/gameDisplay";
import { GameDataState } from "../../../store/reducers/gameData";

interface PropsI
  extends RouteComponentProps<{}>,
    GameDisplayState,
    GameDataState {
  setSelectedPgRatings: Function;
  setSelectedGenres: Function;
  setSelectedGames: Function;
  setSelectedGamesByPgRating: Function;
  setSelectedGamesByGenre: Function;
}

const GameSearchOptions = (props: { routerProps: PropsI; class: string }) => {
  const updateSelectedOptions = (
    selectedOptions: string[],
    selectedOption: string
  ) => {
    const selectedOptionsExists = selectedOptions.find((option) => {
      return option === selectedOption;
    });

    if (selectedOptionsExists) {
      selectedOptions = selectedOptions.filter((option) => {
        return option !== selectedOption;
      });
    } else {
      selectedOptions.push(selectedOption);
    }

    return selectedOptions;
  };

  const updateDisplayedGames = (event: ChangeEvent<HTMLInputElement>) => {
    let selectedGames: GameM[] = props.routerProps.selectedGames;
    let selectedGamesByPgRating: GameM[] =
      props.routerProps.selectedGamesByPgRating;
    let selectedGamesByGenre: GameM[] = props.routerProps.selectedGamesByGenre;

    if (event.target.name === "pgRating") {
      let selectedPgRating = event.target.value;
      let selectedPgRatings: string[] = [
        ...props.routerProps.selectedPgRatings,
      ];
      selectedPgRatings = updateSelectedOptions(
        selectedPgRatings,
        selectedPgRating
      );
      props.routerProps.setSelectedPgRatings(selectedPgRatings);

      selectedGamesByPgRating = props.routerProps.games.filter(
        (game: GameM) => {
          let found = false;
          for (const pgRating of selectedPgRatings) {
            if (game.pgRating === pgRating) {
              found = true;
            }
          }
          return found;
        }
      );
    }

    if (event.target.name === "genre") {
      let selectedGenre: string = event.target.value;
      let selectedGenres: string[] = [...props.routerProps.selectedGenres];
      selectedGenres = updateSelectedOptions(selectedGenres, selectedGenre);
      props.routerProps.setSelectedGenres(selectedGenres);

      selectedGamesByGenre = props.routerProps.games.filter((game: GameM) => {
        let found = false;
        for (const genre of selectedGenres) {
          if (game.genre.type === genre) {
            found = true;
          }
        }
        return found;
      });
    }

    selectedGames = [...selectedGamesByPgRating, ...selectedGamesByGenre];

    let selectedGamesId = selectedGames
      .map((game: GameM) => {
        return game.id;
      })
      .filter((id, index, array) => {
        return array.indexOf(id) === index;
      });

    let selectedGamesWithoutDuplicates: (
      | GameM
      | undefined
    )[] = selectedGamesId.map((id) => {
      return props.routerProps.games.find((game: GameM) => game.id === id);
    });

    props.routerProps.setSelectedGamesByPgRating(selectedGamesByPgRating);
    props.routerProps.setSelectedGamesByGenre(selectedGamesByGenre);
    if (selectedGames.length === 0) {
      return props.routerProps.setSelectedGames(props.routerProps.games);
    }
    props.routerProps.setSelectedGames(selectedGamesWithoutDuplicates);
  };

  const pgRatingOptions = props.routerProps.pgRatings.map((pgRating) => {
    return (
      <div key={pgRating} className={classes["options__wrapper"]}>
        <InputCheckBox
          key={pgRating}
          name={"pgRating"}
          value={pgRating}
          text={pgRating}
          click={updateDisplayedGames}
        />
      </div>
    );
  });

  const genreOptions = props.routerProps.genres.map((genre) => {
    return (
      <div key={genre.type} className={classes["options__wrapper"]}>
        <InputCheckBox
          key={genre.id}
          name={"genre"}
          value={genre.type}
          text={genre.type}
          click={updateDisplayedGames}
        />
      </div>
    );
  });

  const priceRange = [
    { text: "1 - 20000 RSD", price: 20000 },
    { text: "20000 - 40000 RSD", price: 40000 },
    { text: "40000 - 60000 RSD", price: 60000 },
    { text: "60000 - 80000 RSD", price: 80000 },
  ];

  const priceRangeOptions = priceRange.map(({ price, text }) => {
    return (
      <div key={price} className={classes["options__wrapper"]}>
        <InputCheckBox
          key={price}
          name={"priceRange"}
          value={price}
          text={text}
          click={updateDisplayedGames}
        />
      </div>
    );
  });

  return (
    <Aux>
      <div className={props.class}>
        <div className={classes["options"]}>
          <h4 className={classes["options__title"]}>PEGI Rating</h4>
          {pgRatingOptions}
        </div>
        <div className={`${classes["options"]}`}>
          <h4 className={classes["options__title"]}>Genre</h4>
          {genreOptions}
        </div>
        <div className={`${classes["options"]}`}>
          <h4 className={classes["options__title"]}>Price</h4>
          {priceRangeOptions}
        </div>
      </div>
    </Aux>
  );
};

export default GameSearchOptions;
