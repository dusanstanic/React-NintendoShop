import React from "react";
import classes from "./Games.module.css";
import { Route } from "react-router-dom";

import RouteProps from "../../models/Route";
import GamesM from "../../models/GamesM";

import Aux from "../../hoc/Auxiliary";

import Game from "./Game/Game";
import GameDetails from "../GameDetails/GameDetails";

const Games = (props: { games: GamesM[]; routerProps: RouteProps }) => {
  const showGame = (id: number | undefined) => {
    props.routerProps.history.push({ pathname: "/games/" + id });
  };

  console.log(classes);

  return (
    <Aux>
      <table className={classes.table}>
        <thead className={classes.thead}>
          <tr className={classes.tr}>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody className={classes.tbody}>
          {props.games.map((game: GamesM, index: number) => {
            return (
              <Game
                key={index}
                game={game}
                showGame={() => showGame(game.id)}
              />
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
