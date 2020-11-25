import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import "./App.css";

import * as gameDataActions from "../../store/actions/index";
import * as gameDisplayActions from "../../store/actions/index";

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
    setSelectedGames: (games: GameM[]) =>
      dispatch(gameDisplayActions.set_selected_games(games)),
    setSelectedPgRatings: (pgRatings: string[]) =>
      dispatch(gameDisplayActions.set_selected_pgRatings(pgRatings)),
    setSelectedGenres: (genres: string[]) =>
      dispatch(gameDisplayActions.set_selected_genres(genres)),
    setSelectedGamesByPgRating: (games: GameM[]) =>
      dispatch(gameDisplayActions.set_selected_games_by_pgRating(games)),
    setSelectedGamesByGenre: (games: GameM[]) =>
      dispatch(gameDisplayActions.set_selected_games_by_genre(games)),
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(App);
