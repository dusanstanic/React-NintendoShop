import React from "react";

import classes from "./PostGameSummary.module.css";

import GameM from "../../shared/models/GameM";

const PostGameSummary = (props: { game?: GameM }) => {
  let game: GameM | undefined = props.game;
  return game ? (
    <div className={classes["postGameSummary"]}>
      <h3 className={classes["postGameSummary-title"]}>Game</h3>
      <ul>
        <li>{game.title}</li>
        <li>{game.releaseDate.toLocaleString()}</li>
        <li>{game.price} din</li>
        <li>{game.pgRating}</li>
        <li>{game.genre.type}</li>
      </ul>
      <div style={{ textAlign: "center" }}>
        <button className={classes["postGameSummary-post-btn"]}>Post</button>
        <button className={classes["postGameSummary-cancel-btn"]}>
          Cancel
        </button>
      </div>
    </div>
  ) : null;
};

export default PostGameSummary;
