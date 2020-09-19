import React, { useEffect, useState } from "react";
import classes from "./GameDetails.module.css";

import * as GameService from "../../service/GamesService";

import GameM from "../../models/GameM";

import Aux from "../../hoc/Auxiliary";
import Modal from "../../shared/Modal/ModalGame/Modal";
import Backdrop from "../../shared/Backdrop/Backdrop";

const GameDetails = (props: any) => {
  const [game, setGameData] = useState<GameM>();
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
    props.history.push({ pathname: "/games" });
  };

  useEffect(() => {
    const gameId: number = props.match.params.id;
    GameService.getGameById(gameId).then((game) => {
      setGameData(game);
    });
  }, [props.match.params.id]);

  if (game) {
    return (
      <Aux>
        <Backdrop show={showModal} clicked={closeModal} />
        <section className={classes["main-game"]}>
          <div className={classes["main-game-info"]}>
            <h4 className={classes["main-game-type"]}>
              Nintendo {game.consoles ? game.consoles[0].type : ""}
            </h4>
            <h2 className={classes["main-game-title"]}>{game.title}</h2>
            <img
              src="http://127.0.0.1:8887/pegi7.png"
              className={classes["main-game-pegiRating"]}
              alt="PEGI RATING"
            />
            <p className={classes["main-game-description"]}>
              {game.description}
            </p>
            <hr />
            <div className={classes["price-item"]}>
              <div className={classes["price-content"]}>
                <div className={classes["price-content-status"]}>
                  {game.status}
                </div>
                <div className={classes["price-content-current-price"]}>
                  {game.price} ,00 RSD
                </div>
                <button className={classes["add-to-cart-btn"]}></button>
              </div>
            </div>
          </div>
          <div className={classes["main-game-image-wrapper"]}>
            <img
              src={game.image}
              className={classes["main-game-image"]}
              alt="Nintendo Switch Game"
            />
            <img
              src={game.consoles ? game.consoles[0].logo : ""}
              className={classes["main-game-logo"]}
              alt="Nintendo Switch Game"
            />
          </div>
        </section>
      </Aux>
    );
  } else {
    return <div>No Game Found !</div>;
  }
};

export default GameDetails;
