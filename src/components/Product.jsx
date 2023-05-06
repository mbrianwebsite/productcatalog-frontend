import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import Card from "./Catalog/Card";
import Loadinginfo from "./Loadinginfo";
import { NavLink } from "react-router-dom";

function Product(props) {
  const { products, fetchProducts, loading } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-5 sm:p-7 m-5 bg-white rounded-2xl">
      <div className="flex flex-row items-center gap-4 mb-5 sm:mb-7">
        <div className="min-w-fit font-sans font-bold text-base sm:text-xl text-[#394F87]">
          {props.title}
        </div>
        <div className="h-1 w-full bg-[#73E5E2]"></div>
        {props.title !== "All product" ? (
          <NavLink
            to="/products"
            className="min-w-fit px-3 py-1 sm:px-4 bg-[#394F87] rounded-full"
          >
            <div className="font-sans font-normal text-base sm:text-xl text-white">
              See More
            </div>
          </NavLink>
        ) : null}
      </div>
      {loading === true ? (
        <div className="flex justify-center">
          <Loadinginfo />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7 lg:gap-8">
          {products.slice(props.start, props.end).map((item, index) => {
            return <Card product={item} key={index} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Product;
