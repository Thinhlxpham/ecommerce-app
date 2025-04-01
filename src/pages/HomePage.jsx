import React from "react";
import Headers from "../components/Headers";
import Products from "../components/Products";
import Banner1 from "../components/Banner1";
import TrendingProducts from "../components/TrendingProducts";
import Banner2 from "../components/Banner2";

const HomePage = () => {
  return (
    <>
      <Headers />
      <Products />
      <Banner1 />
      <TrendingProducts />
      <Banner2 />
    </>
  );
};

export default HomePage;
