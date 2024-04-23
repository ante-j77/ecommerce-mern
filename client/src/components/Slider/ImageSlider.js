import React, { useState, useEffect } from "react";
import { sliderData } from "./sliderData";
import {
  MdOutlineArrowForwardIos,
  MdArrowForwardIos,
  MdArrowBackIosNew,
} from "react-icons/md";
import "./ImageSlider.css";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [automatic, setAutomatic] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [change, setChange] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // automatska promjena slajdova
  useEffect(() => {
    if (automatic && isPaused === false) {
      var index = current;
      const interval = setInterval(() => {
        if (!isPaused) {
          setCurrent(index);
          index++;
          if (index >= length) index = 0;
          if (index < 0) index = length - 1;
        }
      }, 10000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isPaused, change]);

  /* provjeravamo niz u slučaju da elementi ne postoje */
  if (!Array.isArray(slides) || length <= 0) {
    return null;
  }

  return (
    <div className="slider">
      {sliderData.map((slide, index) => (
        <div
          key={index}
          className={index === current ? "slide active" : "slide"}
        >
          {index === current && (
            <img
              src={slide.image}
              alt={`slide-${index}`}
              className="slide_image"
            />
          )}
        </div>
      ))}
      <div className="slider_buttons">
        <button className="left_arrow " onClick={prevSlide}>
          <MdArrowBackIosNew />
        </button>
        <button className="right_arrow" onClick={nextSlide}>
          <MdOutlineArrowForwardIos />
        </button>
      </div>
      <div className="line"></div>
    </div>
  );
};

export default ImageSlider;
