import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import * as GamsService from "../../service/GamesService";

import RouterProps from "../../models/Route";
import GamesM from "../../models/GamesM";

import Aux from "../../hoc/Auxiliary";
import Games from "../../Components/Games/Games";

class App extends Component<RouterProps, { games: GamesM[] }> {
  state = {
    games: [
      {
        id: 1,
        title: "Luigi's Mansion 3",
        description: "description",
        releaseDate: new Date(),
        price: 8000,
        pgRating: "E",
        image: "",
        genre: { id: 1, type: "Platform" },
      },
    ],
  };

  componentDidMount() {
    GamsService.getGames().then((games: GamesM[]) => {
      this.setState({ games });
    });
  }

  render() {
    return (
      <Aux>
        <Games games={this.state.games} routerProps={this.props} />
      </Aux>
    );
  }
}

export default App;
