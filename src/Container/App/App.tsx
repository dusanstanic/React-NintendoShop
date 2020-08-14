import React, { Component, ChangeEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import "./App.css";

import * as actionTypes from "../../store/actions/gameDisplay";

import * as GamsService from "../../service/GamesService";

import GameM from "../../models/GamesM";

import Aux from "../../hoc/Auxiliary";
import Games from "../../Components/Games/Games";

interface RouteProps extends RouteComponentProps<{}> {
  onIncrementCounter: Function;
  ctr: number;
  setGames: Function;
  setSelectedPgRatings: Function;
  setSelectedGenres: Function;
  setSelectedGames: Function;
  setSelectedGamesByPgRating: Function;
  setSelectedGamesByGenre: Function;
  games: GameM[];
  selectedGames: GameM[];
  selectedPgRatings: string[];
  selectedGenres: string[];
  selectedGamesByPgRating: GameM[];
  selectedGamesByGenre: GameM[];
}

class App extends Component<RouteProps, {}> {
  componentDidMount() {
    GamsService.getGames().then((games: GameM[]) => {
      this.props.setGames(games);
      this.props.setSelectedGames(games);
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

    return selectedOptions;
  };

  updateDisplayedGames = (event: ChangeEvent<HTMLInputElement>) => {
    let selectedGames: GameM[] = this.props.selectedGames;
    let selectedGamesByPgRating: GameM[] = this.props.selectedGamesByPgRating;
    let selectedGamesByGenre: GameM[] = this.props.selectedGamesByGenre;

    if (event.target.name === "pgRating") {
      let selectedPgRating = event.target.value;
      let selectedPgRatings: string[] = [...this.props.selectedPgRatings];
      selectedPgRatings = this.updateSelectedOptions(
        selectedPgRatings,
        selectedPgRating
      );
      this.props.setSelectedPgRatings(selectedPgRatings);

      selectedGamesByPgRating = this.props.games.filter((game: GameM) => {
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
      let selectedGenres: string[] = [...this.props.selectedGenres];
      selectedGenres = this.updateSelectedOptions(
        selectedGenres,
        selectedGenre
      );
      this.props.setSelectedGenres(selectedGenres);

      selectedGamesByGenre = this.props.games.filter((game: GameM) => {
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
      return this.props.games.find((game: GameM) => game.id === id);
    });

    this.props.setSelectedGamesByPgRating(selectedGamesByPgRating);
    this.props.setSelectedGamesByGenre(selectedGamesByGenre);
    if (selectedGames.length === 0) {
      return this.props.setSelectedGames(this.props.games);
    }
    this.props.setSelectedGames(selectedGamesWithoutDuplicates);
  };

  render() {
    /*if (this.state.selectedGames.length === 0) {
      this.setState({ selectedGames: this.state.games });
    }*/
    return (
      <Aux>
        <button
          style={{ marginTop: "5rem" }}
          onClick={() => this.props.onIncrementCounter()}
        >
          <h1>{this.props.ctr}</h1>
        </button>
        <Games
          // games={this.props.selectedGames}
          routerProps={this.props}
          updateDisplayedGames={this.updateDisplayedGames}
        />
      </Aux>
    );
  }
}

const mapStateToProp = (state: any) => {
  return {
    ctr: state.manageGames.counter,
    games: state.gameDisplay.games,
    selectedGames: state.gameDisplay.selectedGames,
    selectedPgRatings: state.gameDisplay.selectedPgRatings,
    selectedGenres: state.gameDisplay.selectedGenres,
    selectedGamesByPgRating: state.gameDisplay.selectedGamesByPgRating,
    selectedGamesByGenre: state.gameDisplay.selectedGamesByGenre,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onIncrementCounter: () => dispatch({ type: "INCREMENT" }),
    setGames: (games: GameM[]) =>
      dispatch({ type: actionTypes.SET_GAMES, games: games }),
    setSelectedPgRatings: (selectedPgRatings: string[]) =>
      dispatch({
        type: actionTypes.SET_SELECTED_PGRATINGS,
        selectedPgRatings: selectedPgRatings,
      }),
    setSelectedGenres: (selectedGenres: string[]) =>
      dispatch({
        type: actionTypes.SET_SELECTED_GENRES,
        selectedGenres: selectedGenres,
      }),
    setSelectedGames: (selectedGames: GameM[]) =>
      dispatch({
        type: actionTypes.SET_SELECTED_GAMES,
        selectedGames: selectedGames,
      }),
    setSelectedGamesByPgRating: (selectedGamesByPgRating: GameM[]) =>
      dispatch({
        type: actionTypes.SET_SELECTED_GAMES_BY_PGRATING,
        selectedGamesByPgRating: selectedGamesByPgRating,
      }),
    setSelectedGamesByGenre: (selectedGamesByGenre: GameM[]) =>
      dispatch({
        type: actionTypes.SET_SELECTED_GAMES_BY_GENRE,
        selectedGamesByGenre: selectedGamesByGenre,
      }),
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(App);
