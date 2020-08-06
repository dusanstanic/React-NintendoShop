import React, { Component } from "react";
import "./App.css";

import * as GamsService from "../../service/GamesService";

import RouterProps from "../../models/Route";
import GamesM from "../../models/GamesM";

import Aux from "../../hoc/Auxiliary";
import Games from "../../Components/Games/Games";

class App extends Component<RouterProps, { games: GamesM[] }> {
  state = {
    games: [],
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
