import React, { ChangeEvent, MouseEvent, useState } from "react";
import Aux from "../../hoc/Auxiliary";

import classes from "./Home.module.css";

const images = [
  "http://127.0.0.1:8887/Switch%20Ben%2010%20-%20Power%20trip!.jpeg",
  "http://127.0.0.1:8887/Switch%20Super%20Mario%20Odyssey.webp",
  "http://127.0.0.1:8887/Switch%20The%20Legend%20of%20Zelda%20-%20Link's%20Awakening.jpg",
  "http://127.0.0.1:8887/SwitchLuigi'sMansion3.jpg",
];

const Home = () => {
  const [slideShowOptions, setSlideShowOptions] = useState(images);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const switchSlideShowImage = (option: string) => {
    let currentIndex = currentImageIndex;

    if (option === "left") {
      currentIndex -= 1;
      if (currentIndex === -1) {
        currentIndex = images.length - 1;
      }
    } else {
      currentIndex += 1;
      if (currentIndex === images.length) {
        currentIndex = 0;
      }
    }
    setCurrentImageIndex(currentIndex);
  };

  return (
    <Aux>
      <div className={classes.home}>
        <div className={classes["slideshow"]}>
          <div className={classes["slideshow-image-wrapper"]}>
            <img src={slideShowOptions[currentImageIndex]} />
          </div>
          <button
            onClick={() => switchSlideShowImage("left")}
            className={classes["slideshow-left-btn"]}
          >
            {"<"}
          </button>
          <button
            onClick={() => switchSlideShowImage("right")}
            className={classes["slideshow-right-btn"]}
          >
            {">"}
          </button>
        </div>
        <div className={classes["main"]}>
          <div className={classes["new-games-main"]}>
            <div className={classes["new-games-image-wrapper"]}>
              <img
                src={
                  "http://127.0.0.1:8887/Switch%20Lego%20Marvel%20Super%20Heroes%202.jpg"
                }
              />
              <img
                src={
                  "http://127.0.0.1:8887/Switch%20Lego%20Jurassic%20World.jpg"
                }
              />
              <img src={"http://127.0.0.1:8887/Switch%20Lego%20City.jpg"} />
            </div>
          </div>
          <div className={classes["merchandise-main"]}>
            <div className={classes["merchandise-image-wrapper"]}>
              <img
                src={
                  "http://127.0.0.1:8887/Nintendo%20Switch%20Equipment%20-%20Mario%20Kart%20Live%20Home%20Circuit.jpg"
                }
              />
            </div>
          </div>
        </div>
        <div className={classes["home-column"]}>
          <div className={classes["console-main"]}>
            <div className={classes["console-image-wrapper"]}>
              <img
                src={
                  "http://127.0.0.1:8887/Nintendo%20Switch%20-%20Gray%20Joy-Con%20-%20Home.jpg"
                }
              />
            </div>
          </div>
          <div className={classes["equipment-main"]}>
            <div className={classes["equipment-image-wrapper"]}>
              <img
                src={"http://127.0.0.1:8887/Nintendo%20Switch%20Equipment.webp"}
              />
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default Home;
