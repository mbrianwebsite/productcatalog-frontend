import React from "react";
import Navbar from "../Navbar";
import { ProductContextProvider } from "../../context/ProductContext";
import Edit from "../Edit";
import { useParams } from "react-router-dom";

function PageEdit() {
  const { id } = useParams();
  return (
    <div>
      <Navbar />
      <ProductContextProvider>
        <Edit id={id} />
      </ProductContextProvider>
    </div>
  );
}

export default PageEdit;
