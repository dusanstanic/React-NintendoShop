import React, { Component } from "react";

import "./ManageGames.css";

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

  addGame = (newGame: GameM) => {
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
    let gamesList = null;
    if (this.state) {
      gamesList = this.state.games.map((game) => {
        return (
          <tr key={game.id}>
            <td>{game.title}</td>
            <td>{game.price}</td>
            <td>{game.releaseDate.toLocaleDateString()}</td>
            <td>
              <img
                src={game.image}
                alt="game"
                className="game-list__image"
              ></img>
            </td>
            <td>{game.genre.type}</td>
            <td>
              <button onClick={() => this.toggleUpdateForm(game.id)}>
                Update
              </button>
            </td>
            <td>
              <button onClick={() => this.deleteGame(game.id)}>Delete</button>
            </td>
          </tr>
        );
      });
    }

    return (
      <Aux>
        <div className="add-game">
          <button onClick={this.toggleAddForm} className="add-game-button">
            Add
          </button>
        </div>

        <table className="game-list">
          <thead>
            <tr className="game-list__header">
              <th>Title</th>
              <th>Price</th>
              <th>Release Date</th>
              <th>Image</th>
              <th>Genre</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{gamesList}</tbody>
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
