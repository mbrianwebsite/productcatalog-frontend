import React from "react";
import Product from "../Product";
import Navbar from "../Navbar";
import { ProductContextProvider } from "../../context/ProductContext";

function PageProducts() {
  return (
    <div>
      <Navbar />
      <ProductContextProvider>
        <Product start={0} title={"All product"} />
      </ProductContextProvider>
    </div>
  );
}

export default PageProducts;
