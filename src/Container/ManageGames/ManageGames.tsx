import React, { Component } from "react";
import { Route, NavLink, withRouter } from "react-router-dom";

import classes from "./ManageGames.module.css";

import RouterProps from "../../shared/models/Route";
import GameM from "../../shared/models/GameM";

import * as GameService from "../../shared/service/GamesService";

import Aux from "../../hoc/Auxiliary";
import GameForm from "../../Components/GameForm/GameForm";

interface StateI {
  games: GameM[];
  gameToUpdate?: GameM;
  isUserPanelOpened: boolean;
}

class ManageGames extends Component<RouterProps, StateI> {
  state: {
    games: GameM[];
    gameToUpdate?: GameM;
    isUserPanelOpened: boolean;
  } = {
    games: [],
    isUserPanelOpened: true,
  };

  componentDidMount() {
    GameService.getGames().then((games) => {
      this.setState({ games });
    });
  }

  toggleUpdateForm = (id: number | undefined) => {
    if (id) {
      GameService.getGameById(id).then((game) => {
        this.setState({ gameToUpdate: game });
      });
    }
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

  toggleUserPanel = () => {
    const isUserPanelOpened = this.state.isUserPanelOpened;
    this.setState({ isUserPanelOpened: !isUserPanelOpened });
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
                alt="Game"
                src={game.image}
                className={classes["game-list__image"]}
              ></img>
            </td>
            <td>{game.genre.type}</td>
            <td>
              <NavLink
                to={{
                  pathname: this.props.match.url + "/updateGameForm",
                }}
              >
                <button
                  className={classes["game-update-btn"]}
                  onClick={() => this.toggleUpdateForm(game.id)}
                >
                  Update
                </button>
              </NavLink>
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

    let isUserPanelOpened = this.state.isUserPanelOpened;
    let closeClass = "";
    let resize = "";
    if (!isUserPanelOpened) {
      closeClass = classes["close"];
      resize = classes["resize"];
    }

    return (
      <Aux>
        <div className={classes["background"]}></div>
        <div className={classes["manage-games-panel-main"]}>
          <div
            className={classes["manage-games-panel-user"] + " " + closeClass}
          >
            <button
              className={classes["toggle-panel-user-btn"]}
              onClick={this.toggleUserPanel}
            >
              {isUserPanelOpened ? "<" : ">"}
            </button>
            <div className={classes["manage-games-panel-user-row"]}>
              <div className={classes["manage-games-panel-user-name"]}>
                Dusan
              </div>
              <div className={classes["manage-games-panel-user-image-wrapper"]}>
                <img alt="User" src={"http://127.0.0.1:8887/user.png"} />
              </div>
            </div>
          </div>
          <div className={classes["manage-games-panel"] + " " + resize}>
            <div>
              <h1 className={classes["manage-games-title"]}>Games</h1>
            </div>
            <div className={classes["add-game"]}>
              <NavLink
                to={{
                  pathname: this.props.match.url + "/addGameForm",
                }}
              >
                <button className={classes["add-game-btn"]}>+ Add</button>
              </NavLink>
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
          </div>
        </div>
        <div className={classes["game-form"]}>
          <Route
            path={this.props.match.url + "/addGameForm"}
            render={() => <GameForm submit={this.addGame} />}
          />
          <Route
            path={this.props.match.url + "/updateGameForm"}
            render={() => (
              <GameForm
                submit={this.updateGame}
                game={this.state.gameToUpdate}
              />
            )}
          />
        </div>
      </Aux>
    );
  }
}

export default withRouter(ManageGames);
