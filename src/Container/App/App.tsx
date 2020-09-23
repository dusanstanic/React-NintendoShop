import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import "./App.css";

import * as gameDataActionCreators from "../../store/actions/index";
import * as gameDisplayActionCreators from "../../store/actions/index";

import GameM from "../../models/GameM";

import Aux from "../../hoc/Auxiliary";
import Games from "../../Components/Games/Games";

import { GameDisplayState } from "../../store/reducers/gameDisplay";
import { GameDataState } from "../../store/reducers/gameData";

interface PropsI
  extends RouteComponentProps<{}>,
    GameDisplayState,
    GameDataState {
  setGames: (games: GameM[]) => void;
  setSelectedPgRatings: (pgRatings: string[]) => void;
  setSelectedGenres: (genres: string[]) => void;
  setSelectedGames: (games: GameM[]) => void;
  setSelectedGamesByPgRating: (games: GameM[]) => void;
  setSelectedGamesByGenre: (games: GameM[]) => void;
}

class App extends Component<PropsI, {}> {
  render() {
    console.log("Render App");
    return (
      <Aux>
        <Games {...this.props} />
      </Aux>
    );
  }
}

const mapStateToProp = (state: any) => {
  return {
    games: state.gameData.games,
    genres: state.gameData.genres,
    pgRatings: state.gameData.pgRatings,
    selectedGames: state.gameDisplay.selectedGames,
    selectedPgRatings: state.gameDisplay.selectedPgRatings,
    selectedGenres: state.gameDisplay.selectedGenres,
    selectedGamesByPgRating: state.gameDisplay.selectedGamesByPgRating,
    selectedGamesByGenre: state.gameDisplay.selectedGamesByGenre,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setGames: (games: GameM[]) =>
      dispatch(gameDataActionCreators.set_games(games)),
    setSelectedPgRatings: (pgRatings: string[]) =>
      dispatch(gameDisplayActionCreators.set_selected_pgRatings(pgRatings)),
    setSelectedGenres: (genres: string[]) =>
      dispatch(gameDisplayActionCreators.set_selected_genres(genres)),
    setSelectedGames: (games: GameM[]) =>
      dispatch(gameDisplayActionCreators.set_selected_games(games)),
    setSelectedGamesByPgRating: (games: GameM[]) =>
      dispatch(gameDisplayActionCreators.set_selected_games_by_pgRating(games)),
    setSelectedGamesByGenre: (games: GameM[]) =>
      dispatch(gameDisplayActionCreators.set_selected_games_by_genre(games)),
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(App);
