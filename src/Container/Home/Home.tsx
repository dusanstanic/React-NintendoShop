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
    }, 0);
    setCurrentImageIndex(currentIndex);
  };

  // useEffect(() => {
  //   setInterval(() => switchSlideShowImage("right"), 5000);
  // }, []);

  // const sliderItems: NodeListOf<HTMLImageElement> = document.querySelectorAll(
  //   ".slide"
  // );

  const wrapper = useRef<HTMLDivElement>(null);
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
    handleResize("");

    const slides:
      | NodeListOf<HTMLImageElement>
      | undefined = items.current?.querySelectorAll(".slide");

    if (slides) {
      const slidesLength = slides.length;
      setSlidesLength(slidesLength);

      const firstSlide = slides[0];
      const lastSlide = slides[slidesLength - 1];
      const cloneFirst = firstSlide.cloneNode();
      const cloneLast = lastSlide.cloneNode();
      cloneFirst.addEventListener("mousedown", dragStart);
      cloneLast.addEventListener("mousedown", dragStart);

      if (items.current) {
        items.current.appendChild(cloneFirst);
        items.current.insertBefore(cloneLast, firstSlide);
      }
    }
  }, []);

  useEffect(() => {
    console.log("slidesize");
    console.log(slideSize);
  }, [slideSize]);

  const handleResize = (e: any) => {
    let wrapperSubSize = 0;

    if (wrapperSub.current) {
      wrapperSubSize = wrapperSub.current.offsetWidth;
    }

    const slides:
      | NodeListOf<HTMLImageElement>
      | undefined = items.current?.querySelectorAll(".slide");

    if (slides) {
      slides.forEach((slide, index) => {
        slide.width = wrapperSubSize;
      });

      if (items.current) {
        items.current.style.left = "-" + wrapperSubSize + "px";
      }

      setSlideSize(slides[0].offsetWidth);
    }
  };

  window.addEventListener("resize", handleResize);
  //console.log(slideSize);
  const dragStart = (e: any) => {
    console.log("dragStart");
    console.log(slideSize);
    e.preventDefault();

    if (items.current) {
      posInitial = items.current.offsetLeft;
    }
    posX1 = e.clientX;

    document.onmouseup = dragEnd;
    document.onmousemove = dragAction;
  };

  const dragAction = (e: MouseEvent) => {
    console.log("dragAction");
    posX2 = posX1 - e.clientX;
    posX1 = e.clientX;

    if (items.current) {
      items.current?.addEventListener("transitionend", checkIndex);
      items.current.style.left = items.current.offsetLeft - posX2 + "px";
    }
  };

  const dragEnd = useCallback(
    (e: MouseEvent) => {
      console.log("dragEnd");
      let posFinal = items.current?.offsetLeft ? items.current?.offsetLeft : 0;

      if (posFinal - posInitial < -100) {
        shiftSlide(1, "drag");
      } else if (posFinal - posInitial > 100) {
        shiftSlide(-1, "drag");
      } else {
        if (items.current) {
          items.current.style.left = posInitial + "px";
        }
      }

      document.onmouseup = null;
      document.onmousemove = null;
    },
    [slideSize]
  );

  const shiftSlide = useCallback(
    (dir: number, action: string) => {
      console.log("shiftSlide");
      if (items.current) {
        items.current.classList.add(classes["shifting"]);
        if (allowShift) {
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
        }
      }

      allowShift = false;
    },
    [slideSize]
  );

  const checkIndex = () => {
    console.log("checkIndex " + index);
    if (index === -1 && items.current) {
      console.log("Slide size " + slideSize);
      items.current.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
      console.dir(items.current);
    }

    if (index === slidesLength && items.current) {
      items.current.style.left = -slideSize + "px";
      index = 0;
    }

    if (items.current) {
      items.current.classList.remove(classes["shifting"]);
    }

    allowShift = true;
  };

  const photos = useMemo(
    () =>
      images.map((image, index) => {
        return (
          <img
            key={index}
            src={slideShowOptions[index]}
            className="slide"
            alt="slideshow"
            onMouseDown={dragStart}
          />
        );
      }),
    [dragStart]
  );

  console.log("Render");
  return (
    <Aux>
      <div className={classes.home}>
        <div className={classes["slider"]} ref={wrapper}>
          <div className={classes["wrapper"]} ref={wrapperSub}>
            <div className={classes["slides"]} ref={items}>
              {photos}
            </div>
          </div>
          <button
            onClick={() => shiftSlide(-1, "")}
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
