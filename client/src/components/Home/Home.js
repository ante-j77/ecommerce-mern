import React from "react";
import "./Home.css";
import ProductList from "../ProductList/ProductList";
import ImageSlider from "../Slider/ImageSlider";
import { sliderData } from "../Slider/sliderData";

const Home = () => {
  return (
    <>
      <ImageSlider slides={sliderData} />
      <div className="home">
        <div className="home_container">
          <ProductList />
        </div>
      </div>
    </>
  );
};

export default Home;
