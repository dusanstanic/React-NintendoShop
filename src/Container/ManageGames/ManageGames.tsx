import React, { Component } from "react";

import classes from "./ManageGames.module.css";

import RouterProps from "../../models/Route";
import GameM from "../../models/GamesM";

import * as GameService from "../../service/GamesService";

import Aux from "../../hoc/Auxiliary";
import GameForm from "../../Components/GameForm/GameForm";

class ManageGames extends Component<
  RouterProps,
  {
    games: GameM[];
    showAddForm: boolean;
    showUpdateForm: boolean;
    gameToUpdate?: GameM;
  }
> {
  state: {
    games: GameM[];
    showAddForm: boolean;
    showUpdateForm: boolean;
    gameToUpdate?: GameM;
  } = {
    games: [],
    showAddForm: false,
    showUpdateForm: false,
  };

  componentDidMount() {
    GameService.getGames().then((games) => {
      this.setState({ games });
    });
  }

  toggleAddForm = () => {
    this.setState({ showAddForm: !this.state.showAddForm });
  };

  toggleUpdateForm = (id: number | undefined) => {
    if (id) {
      GameService.getGameById(id).then((game) => {
        this.setState({ gameToUpdate: game });
      });
    }
    this.setState({ showUpdateForm: !this.state.showUpdateForm });
  };

  addGame = (newGame: GameM, consoleIds: number[]) => {
    console.log(consoleIds);
    GameService.createGame(newGame).then(() => {
      GameService.getGames().then((games) => {
        this.setState({ games });
      });
    });
  };

  updateGame = (updatedGame: GameM) => {
    if (this.state.gameToUpdate) {
      GameService.update({
        ...updatedGame,
        id: this.state.gameToUpdate.id,
      }).then(() => {
        GameService.getGames().then((games) => {
          this.setState({ games });
        });
      });
    }
  };

  deleteGame = (id: number | undefined) => {
    if (id) {
      GameService.deleteById(id).then(() => {
        GameService.getGames().then((games) => {
          this.setState({ games });
        });
      });
    }
  };

  render() {
    console.log(this.props);
    let gamesList = null;
    if (this.state) {
      gamesList = this.state.games.map((game) => {
        return (
          <tr key={game.id}>
            <td>{game.title}</td>
            <td>{game.price}din</td>
            <td>{game.releaseDate.toLocaleDateString()}</td>
            <td>
              <img
                src={game.image}
                alt="game"
                className={classes["game-list__image"]}
              ></img>
            </td>
            <td>{game.genre.type}</td>
            <td>
              <button
                className={classes["game-update-btn"]}
                onClick={() => this.toggleUpdateForm(game.id)}
              >
                Update
              </button>
            </td>
            <td>
              <button
                className={classes["game-delete-btn"]}
                onClick={() => this.deleteGame(game.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }

    return (
      <Aux>
        <div className={classes["add-game"]}>
          <button
            onClick={this.toggleAddForm}
            className={classes["add-game-button"]}
          >
            Add
          </button>
        </div>

        <table className={classes["game-list"]}>
          <thead className={classes["game-list__thead"]}>
            <tr className={classes["game-list__tr"]}>
              <th>Title</th>
              <th>Price/RSD</th>
              <th>Release Date</th>
              <th>Image</th>
              <th>Genre</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className={classes["game-list__tbody"]}>{gamesList}</tbody>
        </table>
        <div>
          {this.state.showAddForm ? <GameForm submit={this.addGame} /> : null}
          {this.state.showUpdateForm ? (
            <GameForm submit={this.updateGame} game={this.state.gameToUpdate} />
          ) : null}
        </div>
      </Aux>
    );
  }
}

export default ManageGames;
