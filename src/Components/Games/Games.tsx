import React from "react";
import "./Games.css";
import { Route } from "react-router-dom";

import RouteProps from "../../models/Route";
import GamesM from "../../models/GamesM";

import Aux from "../../hoc/Auxiliary";

import Game from "./Game/Game";
import GameDetails from "../GameDetails/GameDetails";

const Games = (props: { games: GamesM[]; routerProps: RouteProps }) => {
  console.log(props);

  const showGame = (id: number) => {
    console.log(id);
    props.routerProps.history.push({ pathname: "/games/" + id });
  };

  return (
    <Aux>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {props.games.map((game: GamesM, index: number) => {
            return (
              <Game key={index} game={game} showGame={() => showGame(index)} />
            );
          })}
        </tbody>
      </table>
      <div>
        <Route path="/games/:id" component={GameDetails} />
      </div>
    </Aux>
  );
};

export default Games;
