import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Aux from "../../hoc/Auxiliary";

import classes from "./Home.module.css";

interface PropsI extends RouteComponentProps {}

const images = [
  "http://127.0.0.1:8887/SlideShow%20-%20Luigi%20Mansion%203.jpg",
  "http://127.0.0.1:8887/SlideShow%20-%20Lego%20Jurassic%20World.jpg",
  "http://127.0.0.1:8887/SlideShow%20-%20Ben%2010%20Power%20Trip.jpg",
  "http://127.0.0.1:8887/SlideShow%20-%20Lego%20Marvel%20Superheroes%202.jpg",
];

const Home = (props: PropsI) => {
  const [slideShowImgOptions, setSlideShowOptions] = useState(images);

  const items = useRef<HTMLDivElement>(null);
  const wrapperSub = useRef<HTMLDivElement>(null);

  const [slideSize, setSlideSize] = useState(0);
  const [slidesLength, setSlidesLength] = useState(0);

  let posX1 = 0;
  let posX2 = 0;
  let allowShift = true;
  let posInitial = 0;
  let index = 0;

  useEffect(() => {
    handleResize();

    if (!items.current) return;
    const slides: NodeListOf<HTMLImageElement> = items.current.querySelectorAll(
      ".slide"
    );
    const slidesLength = slides.length;

    const firstSlide = slides[0];
    const lastSlide = slides[slidesLength - 1];
    const cloneFirst = firstSlide.cloneNode();
    const cloneLast = lastSlide.cloneNode();

    cloneFirst.addEventListener("mousedown", dragStart);
    cloneLast.addEventListener("mousedown", dragStart);

    items.current.appendChild(cloneFirst);
    items.current.insertBefore(cloneLast, firstSlide);

    setSlidesLength(slidesLength);
  }, []);

  const handleResize = () => {
    if (!items.current || !wrapperSub.current) return;

    const wrapperSubSize = wrapperSub.current.offsetWidth;

    const slides: NodeListOf<HTMLImageElement> = items.current.querySelectorAll(
      ".slide"
    );

    slides.forEach((slide) => (slide.width = wrapperSubSize));
    items.current.style.left = "-" + wrapperSubSize + "px";

    setSlideSize(slides[0].offsetWidth);
  };

  window.addEventListener("resize", handleResize);

  const dragStart = useCallback(
    (e: any) => {
      if (!items.current) return;
      console.log("***********dragStart**************");
      e.preventDefault();

      posInitial = items.current.offsetLeft;
      posX1 = e.clientX;
      console.log("posInitial = " + posInitial);
      console.log("posX1 = " + posX1);

      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    },
    [slideSize]
  );

  const dragAction = (e: MouseEvent) => {
    if (!items.current) return;
    console.log("***********dragAction**************");
    posX2 = posX1 - e.clientX; // when moving right e.client gets bigger than posX1 so posX2 wil be "-" value
    posX1 = e.clientX;

    console.log("posX1 = " + posX1);
    console.log("posX2 = " + posX2); // "-" when moving right

    items.current.style.left = items.current.offsetLeft - posX2 + "px"; // "+" moves left border to right "-" moves to left direction
  };

  const dragEnd = useCallback(
    (e: MouseEvent) => {
      if (!items.current) return;
      let posFinal = items.current.offsetLeft;

      if (posFinal - posInitial < -100) {
        shiftSlide(1, "drag");
      } else if (posFinal - posInitial > 100) {
        shiftSlide(-1, "drag");
      } else {
        items.current.style.left = posInitial + "px";
      }

      document.onmouseup = null;
      document.onmousemove = null;
    },
    [slideSize]
  );

  const shiftSlide = (dir: number, action: string = "") => {
    if (!items.current) return;
    items.current.classList.add(classes["shifting"]);

    if (!allowShift) return;
    if (!action) {
      posInitial = items.current.offsetLeft;
    }

    if (dir === 1) {
      items.current.style.left = posInitial - slideSize + "px";
      index++;
    } else if (dir === -1) {
      items.current.style.left = posInitial + slideSize + "px";
      index--;
    }

    allowShift = false;
  };

  const checkIndex = () => {
    if (!items.current) return;
    items.current.classList.remove(classes["shifting"]);

    if (index === -1) {
      items.current.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index === slidesLength) {
      items.current.style.left = -slideSize + "px";
      index = 0;
    }

    allowShift = true;
  };

  const slideShowImgs = useMemo(
    () =>
      images.map((image, index) => {
        return (
          <img
            key={index}
            src={slideShowImgOptions[index]}
            className="slide"
            alt="slideshowImg"
            onMouseDown={dragStart}
            onTouchStart={dragStart}
          />
        );
      }),
    [dragStart]
  );

  return (
    <Aux>
      <div className={classes.home}>
        <div className={classes["slider"]}>
          <div className={classes["wrapper"]} ref={wrapperSub}>
            <div
              className={classes["slides"]}
              ref={items}
              onTransitionEnd={checkIndex}
            >
              {slideShowImgs}
            </div>
          </div>
          <button
            onClick={() => shiftSlide(-1)}
            className={classes["slideshow-left-btn"]}
          >
            {"<"}
          </button>
          <button
            onClick={() => shiftSlide(1)}
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
                alt="new-game"
              />
              <img
                src={
                  "http://127.0.0.1:8887/Switch%20Lego%20Jurassic%20World.jpg"
                }
                alt="new-game"
              />
              <img
                src={"http://127.0.0.1:8887/Switch%20Lego%20City.jpg"}
                alt="new-game"
              />
            </div>
          </div>
          <div className={classes["merchandise-main"]}>
            <div className={classes["merchandise-image-wrapper"]}>
              <img
                src={
                  "http://127.0.0.1:8887/Nintendo%20Switch%20Equipment%20-%20Mario%20Kart%20Live%20Home%20Circuit.jpg"
                }
                alt="merchandise"
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
                alt="console"
              />
            </div>
          </div>
          <div className={classes["equipment-main"]}>
            <div className={classes["equipment-image-wrapper"]}>
              <img
                src={"http://127.0.0.1:8887/Nintendo%20Switch%20Equipment.webp"}
                alt="equipment"
              />
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default withRouter(Home);
