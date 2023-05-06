import React from "react";
import Banner from "../Banner";
import { ProductContextProvider } from "../../context/ProductContext";
import Navbar from "../Navbar";
import Product from "../Product";

function PageIndex() {
  return (
    <div>
      <Navbar />
      <Banner />
      <ProductContextProvider>
        <Product start={0} end={4} title={"New product"} />
      </ProductContextProvider>
    </div>
  );
}

export default PageIndex;
