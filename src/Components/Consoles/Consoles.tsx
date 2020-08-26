import React, { Component } from "react";
import { connect } from "react-redux";

class Consoles extends Component {
  render() {
    return (
      <div>
        <h1>Consoles</h1>
      </div>
    );
  }
}

const mapStateToProp = (state: any) => {
  return {
    games: state.gameDisplay.games,
  };
};

export default connect(mapStateToProp, null)(Consoles);
