import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import "./App.css";

import * as actionTypes from "../../store/actions/gameDisplay";

import GameM from "../../models/GameM";

import Aux from "../../hoc/Auxiliary";
import Games from "../../Components/Games/Games";
import { GameDisplayActionTypes } from "../../store/actions/gameDisplay";
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

const mapDispatchToProps = (dispatch: (a: GameDisplayActionTypes) => void) => {
  return {
    setGames: (games: GameM[]) =>
      dispatch({ type: actionTypes.SET_GAMES, payload: { games: games } }),
    setSelectedPgRatings: (selectedPgRatings: string[]) =>
      dispatch({
        type: actionTypes.SET_SELECTED_PGRATINGS,
        payload: { pgRatings: selectedPgRatings },
      }),
    setSelectedGenres: (selectedGenres: string[]) =>
      dispatch({
        type: actionTypes.SET_SELECTED_GENRES,
        payload: { genres: selectedGenres },
      }),
    setSelectedGames: (selectedGames: GameM[]) =>
      dispatch({
        type: actionTypes.SET_SELECTED_GAMES,
        payload: { games: selectedGames },
      }),
    setSelectedGamesByPgRating: (selectedGamesByPgRating: GameM[]) =>
      dispatch({
        type: actionTypes.SET_SELECTED_GAMES_BY_PGRATING,
        payload: { games: selectedGamesByPgRating },
      }),
    setSelectedGamesByGenre: (selectedGamesByGenre: GameM[]) =>
      dispatch({
        type: actionTypes.SET_SELECTED_GAMES_BY_GENRE,
        payload: { games: selectedGamesByGenre },
      }),
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(App);
