import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { ProductContextProvider } from "../../context/ProductContext";
import Detail from "../Detail";

function PageDetail() {
  const { id } = useParams();

  return (
    <div>
      <Navbar />
      <ProductContextProvider>
        <Detail id={id} />
      </ProductContextProvider>
    </div>
  );
}

export default PageDetail;
