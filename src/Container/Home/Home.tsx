import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { RouteComponentProps, useRouteMatch, withRouter } from "react-router";
import Aux from "../../hoc/Auxiliary";

import classes from "./Home.module.css";

interface PropsI extends RouteComponentProps {}

const images = [
  "http://127.0.0.1:8887/SlideShow%20-%20Luigi%20Mansion%203.jpg",
  "http://127.0.0.1:8887/SlideShow%20-%20Lego%20Jurassic%20World.jpg",
  "http://127.0.0.1:8887/SlideShow%20-%20Lego%20Marvel%20Superheroes%202.jpg",
];

const Home = (props: PropsI) => {
  const [slideShowOptions, setSlideShowOptions] = useState(images);
  const slideWrapper = useRef<HTMLDivElement>(null);
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

    slideWrapper.current?.classList.remove(classes["fadeIn"]);
    const addClass = setTimeout(() => {
      slideWrapper.current?.classList.add(classes["fadeIn"]);
      clearTimeout(addClass);
    }, 0)
    setCurrentImageIndex(currentIndex);
  };

  /*useEffect(() => {
    setInterval(() => 
    switchSlideShowImage("right"), 5000)
  }, []);*/

  return (
    <Aux>
      <div className={classes.home}>
        <div className={classes["slideshow"]}>
          <div
            ref={slideWrapper}
            className={
              classes["slideshow-image-wrapper"] + " " + classes["fadeIn"]
            }
          >
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
            <div
              className={classes["console-image-wrapper"]}
              onClick={() => props.history.replace({ pathname: "/consoles" })}
            >
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

export default withRouter(Home);
