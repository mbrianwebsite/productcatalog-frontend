import React from "react";
import Navbar from "../Navbar";
import { ProductContextProvider } from "../../context/ProductContext";
import Table from "../Table";

function PageTable() {
  return (
    <div>
      <Navbar />
      <ProductContextProvider>
        <Table />
      </ProductContextProvider>
    </div>
  );
}

export default PageTable;
