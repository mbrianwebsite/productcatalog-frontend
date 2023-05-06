import React from "react";
import Navbar from "../Navbar";
import { ProductContextProvider } from "../../context/ProductContext";
import Create from "../Create";

function PageCreate() {
  return (
    <div>
      <Navbar />
      <ProductContextProvider>
        <Create />
      </ProductContextProvider>
    </div>
  );
}

export default PageCreate;
