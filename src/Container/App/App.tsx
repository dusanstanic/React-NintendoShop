import React, { Component, ChangeEvent } from "react";
import "./App.css";

import * as GamsService from "../../service/GamesService";

import RouterProps from "../../models/Route";
import GamesM from "../../models/GamesM";

import Aux from "../../hoc/Auxiliary";
import Games from "../../Components/Games/Games";

class App extends Component<
  RouterProps,
  {
    games: GamesM[];
    selectedGames: (GamesM | undefined)[];
    selectedPgRatings: string[];
    selectedGenres: string[];
    selectedGamesByPgRating: GamesM[];
    selectedGamesByGenre: GamesM[];
  }
> {
  state = {
    games: [],
    selectedGames: [],
    selectedPgRatings: [],
    selectedGenres: [],
    selectedGamesByPgRating: [],
    selectedGamesByGenre: [],
  };

  componentDidMount() {
    GamsService.getGames().then((games: GamesM[]) => {
      this.setState({ games });
      this.setState({ selectedGames: games });
    });
  }

  updateSelectedOptions = (
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

    console.log(selectedOptions);
    return selectedOptions;
  };

  updateDisplayedGames = (event: ChangeEvent<HTMLInputElement>) => {
    let selectedGames: GamesM[] = this.state.selectedGames;
    let selectedGamesByPgRating: GamesM[] = this.state.selectedGamesByPgRating;
    let selectedGamesByGenre: GamesM[] = this.state.selectedGamesByGenre;

    if (event.target.name === "pgRating") {
      let selectedPgRating = event.target.value; // selectedOptions
      let selectedPgRatings: string[] = [...this.state.selectedPgRatings];
      selectedPgRatings = this.updateSelectedOptions(
        selectedPgRatings,
        selectedPgRating
      );
      this.setState({ selectedPgRatings });

      selectedGamesByPgRating = this.state.games.filter((game: GamesM) => {
        let found = false;
        for (const pgRating of selectedPgRatings) {
          if (game.pgRating === pgRating) {
            found = true;
          }
        }
        return found;
      });
    }

    if (event.target.name === "genre") {
      let selectedGenre: string = event.target.value;
      let selectedGenres: string[] = [...this.state.selectedGenres];
      selectedGenres = this.updateSelectedOptions(
        selectedGenres,
        selectedGenre
      );
      this.setState({ selectedGenres });

      selectedGamesByGenre = this.state.games.filter((game: GamesM) => {
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
      .map((game: GamesM) => {
        return game.id;
      })
      .filter((id, index, array) => {
        return array.indexOf(id) === index;
      });

    let selectedGamesWithoutDuplicates: (
      | GamesM
      | undefined
    )[] = selectedGamesId.map((id) => {
      return this.state.games.find((game: GamesM) => game.id === id);
    });

    console.log(selectedGamesWithoutDuplicates);

    if (selectedGames.length === 0) {
      console.log("No game exists");
      return this.setState({ selectedGames: this.state.games });
    }
    this.setState({ selectedGames: selectedGamesWithoutDuplicates });
    this.setState({ selectedGamesByPgRating: selectedGamesByPgRating });
    this.setState({ selectedGamesByGenre: selectedGamesByGenre });
  };

  render() {
    /*if (this.state.selectedGames.length === 0) {
      this.setState({ selectedGames: this.state.games });
    }*/
    return (
      <Aux>
        <Games
          games={this.state.selectedGames}
          routerProps={this.props}
          updateDisplayedGames={this.updateDisplayedGames}
        />
      </Aux>
    );
  }
}

export default App;
