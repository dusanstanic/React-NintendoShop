import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import Aux from "../../hoc/Auxiliary";

import classes from "./Home.module.css";
import classes1 from "./Home.module.scss";

interface PropsI extends RouteComponentProps {}

const images = [
  "http://127.0.0.1:8887/SlideShow%20-%20Luigi%20Mansion%203.jpg",
  "http://127.0.0.1:8887/SlideShow%20-%20Lego%20Jurassic%20World.jpg",
  "http://127.0.0.1:8887/SlideShow%20-%20Ben%2010%20Power%20Trip.jpg",
  "http://127.0.0.1:8887/SlideShow%20-%20Lego%20Marvel%20Superheroes%202.jpg",
  "http://127.0.0.1:8887/SlideShow%20-%20Super%20Mario%20Odyssey.jpg",
  "http://127.0.0.1:8887/SlideShow%20-%20Lego%20City.jpg",
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

      e.preventDefault();

      posInitial = items.current.offsetLeft;
      posX1 = e.clientX;

      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    },
    [slideSize]
  );

  const dragAction = (e: MouseEvent) => {
    if (!items.current) return;

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
    items.current.classList.add(classes1["shifting"]);

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
    items.current.classList.remove(classes1["shifting"]);

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

  const handleResize1 = () => {
    if (!slider.current || !wrapper.current) return;

    console.log("offsetLeft: " + slider.current.offsetLeft);
    console.log("left: " + slider.current.getClientRects()[0].left);

    const wrapperWidth = wrapper.current.offsetWidth;
    const slides = slider.current.children;
    const slideWidth = wrapperWidth / showSlides;

    slider.current.style.width = slides.length * slideWidth + "px";

    const slidesArray: HTMLElement[] = Array.prototype.slice.call(slides);
    for (const slide of slidesArray) {
      slide.style.width = slideWidth + "px";
    }
    slider.current.style.left = `-${slideWidth}px`;
    setSlideSize1(slideWidth);
  };

  useEffect(() => {
    if (!slider.current) return;

    const slides = slider.current.children;
    const slidesLength = slides.length;

    const firstSlide = slides[0];
    const lastSlide = slides[slidesLength - 1];
    const cloneFirst = firstSlide.cloneNode();
    const cloneLast = lastSlide.cloneNode();

    cloneFirst.addEventListener("mousedown", dragStart1);
    cloneLast.addEventListener("mousedown", dragStart1);

    slider.current.appendChild(cloneFirst);
    slider.current.insertBefore(cloneLast, firstSlide);

    setSlidesLength1(slidesLength - showSlides + 1);

    handleResize1();
  }, []);

  window.addEventListener("resize", handleResize1);

  const wrapper = useRef<HTMLImageElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  let [showSlides, setShowSlides] = useState<number>(4);
  let posInitial1 = 0;
  let posX11 = 0;
  let posX22 = 0;
  let index1 = 0;
  let allowShift1 = true;
  const [slideSize1, setSlideSize1] = useState(0);
  const [slidesLength1, setSlidesLength1] = useState(0);

  const dragStart1 = (event: any) => {
    event.preventDefault();
    if (!slider.current) return;

    posInitial1 = slider.current.offsetLeft;
    posX11 = event.clientX;

    document.onmousemove = dragAction1;
    document.onmouseup = dragEnd1;
  };

  const dragAction1 = (event: MouseEvent) => {
    if (!slider.current) return;

    posX22 = event.clientX - posX11;
    posX11 = event.clientX;

    slider.current.style.left = `${slider.current.offsetLeft + posX22}px`;
  };

  const dragEnd1 = (event: MouseEvent) => {
    if (!slider.current) return;
    let distanceMoved = posInitial1 - slider.current.offsetLeft;

    if (distanceMoved > 80) {
      shiftSlide1("left", "drag");
    } else if (distanceMoved < -80) {
      shiftSlide1("right", "drag");
    } else {
      slider.current.style.left = `${posInitial1}px`;
    }

    document.onmouseup = null;
    document.onmousemove = null;
  };

  const shiftSlide1 = (dir: string, action: string = "") => {
    if (!slider.current) return;
    slider.current.classList.add(classes1.transition);

    if (!allowShift1) return;
    if (!action) {
      posInitial1 = slider.current.offsetLeft;
    }

    if (dir === "left") {
      slider.current.style.left = posInitial1 - slideSize1 + "px";
      index1++;
    } else {
      slider.current.style.left = posInitial1 + slideSize1 + "px";
      index1--;
    }
  };

  const checkIndex1 = () => {
    if (!slider.current) return;
    slider.current.classList.remove(classes1.transition);

    if (index1 === -1) {
      slider.current.style.left = -(slideSize1 * slidesLength1) + "px";
      index1 = slidesLength1 - 1;
    }

    if (index1 === slidesLength1) {
      slider.current.style.left = -slideSize1 + "px";
      index1 = 0;
    }

    allowShift1 = true;
  };

  const sliderImgs = images.map((image, index) => {
    return (
      <img
        key={index}
        className={"gameSlide"}
        src={slideShowImgOptions[index]}
        alt="slideshowImg"
        onMouseDown={dragStart1}
        onTouchStart={dragStart1}
      />
    );
  });

  return (
    <Aux>
      <section className={classes1["features"]}>
        <div className={classes1["u-center-text"]}>
          <h2 className={classes1["features__heading"]}>Nintendo Shop</h2>
          <p className={classes1["features__quote"]}>
            &quot;A delayed game is eventually good, but a rushed game is
            forever bad."
            <span className={classes1["features__author"]}>
              - Shigeru Miyamoto
            </span>
          </p>
          <a
            href="#section-home"
            className={`${classes["btn"]} ${classes["btn-white"]}`}
          >
            Shop Now
          </a>
        </div>
      </section>
      <section className={classes1.home} id="section-home">
        <div className={classes1["slideshow"]}>
          <div className={classes1["slideshow__wrapper"]} ref={wrapperSub}>
            <div
              className={classes1["slideshow__slider"]}
              ref={items}
              onTransitionEnd={checkIndex}
            >
              {slideShowImgs}
            </div>
          </div>
          <button
            onClick={() => shiftSlide(-1)}
            className={`${classes1["slideshow__btn"]} ${classes1["slideshow__btn--left"]}`}
          >
            &larr;
          </button>
          <button
            onClick={() => shiftSlide(1)}
            className={`${classes1["slideshow__btn"]} ${classes1["slideshow__btn--right"]}`}
          >
            &rarr;
          </button>
        </div>
        <div className={classes1["main"]}>
          <div className={classes1["main__items"]}>
            <div className={classes1["main__wrapper"]}>
              <img
                src={
                  "http://127.0.0.1:8887/Switch%20Lego%20Marvel%20Super%20Heroes%202.jpg"
                }
                alt="New Game"
                className={classes1["main__img"]}
              />
              <img
                src={
                  "http://127.0.0.1:8887/Switch%20Lego%20Jurassic%20World.jpg"
                }
                alt="New Game"
                className={classes1["main__img"]}
              />
              <img
                src={"http://127.0.0.1:8887/Switch%20Lego%20City.jpg"}
                alt="New Game"
                className={classes1["main__img"]}
              />
            </div>
          </div>
          <div
            className={`${classes1["main__items"]} ${classes1["main__items--merch"]}`}
          >
            <div className={`${classes1["main__wrapper--merch"]}`}>
              <img
                src={
                  "http://127.0.0.1:8887/Nintendo%20Switch%20Equipment%20-%20Mario%20Kart%20Live%20Home%20Circuit.jpg"
                }
                alt="Merchandise"
                className={classes1["main__img--merch"]}
              />
            </div>
          </div>
        </div>
        <div className={classes1["column"]}>
          <div className={classes1["category"]}>
            <div
              className={classes1["category__wrapper"]}
              onClick={() => props.history.replace({ pathname: "/consoles" })}
            >
              <img
                src={
                  "http://127.0.0.1:8887/Nintendo%20Switch%20-%20Gray%20Joy-Con%20-%20Home.jpg"
                }
                alt="console"
                className={classes1["category__img"]}
              />
            </div>
          </div>
          <div className={classes1["category"]}>
            <div className={classes1["category__wrapper"]}>
              <img
                src={"http://127.0.0.1:8887/Nintendo%20Switch%20Equipment.webp"}
                alt="Equipment"
                className={classes1["category__img"]}
              />
            </div>
          </div>
        </div>
        <div className={classes1["game-slider__wrapper"]} ref={wrapper}>
          <div
            ref={slider}
            onTransitionEnd={checkIndex1}
            className={classes1["game-slider"]}
          >
            {sliderImgs}
          </div>
        </div>
      </section>
    </Aux>
  );
};

export default withRouter(Home);

// if (!gamesSlides.current || !imageRef.current) return;
// console.log(gamesSlides.current.getClientRects());
// console.log(imageRef.current.getClientRects());
// console.dir(imageRef.current?.width);

// if (!gamesSlides.current || !imageRef.current) return;

// const images = gamesSlides.current.children[0];
// console.dir(images.getClientRects());

// console.log("YOOOOOOO");
// const imageSize = imageRef.current.getClientRects()[0].width;
