import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { NavLink } from "react-router-dom";
import Loadinginfo from "./Loadinginfo";
function Detail(id) {
  const { products, fetchProducts, loading } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts(id.id);
  }, []);

  return (
    <div className="flex flex-col p-5 sm:p-7 m-5 bg-white rounded-2xl shadow-xl">
      <div className="flex flex-row gap-2 my-5">
        <NavLink
          to="/"
          className="font-sans font-semibold text-md md:text-lg lg:text-2xl text-[#394F87]"
        >
          Home
        </NavLink>
        <div className="font-sans font-semibold text-md md:text-lg lg:text-2xl text-[#394F87]">
          /
        </div>
        <NavLink
          to="/products"
          className="font-sans font-semibold text-md md:text-lg lg:text-2xl text-[#394F87]"
        >
          Products
        </NavLink>
        <div className="font-sans font-semibold text-md md:text-lg lg:text-2xl text-[#394F87]">
          /
        </div>
        <div className="font-sans font-bold text-md md:text-lg lg:text-2xl text-[#394F87]">
          Detail
        </div>
      </div>
      {loading === true ? (
        <div className="flex justify-center">
          <Loadinginfo />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row py-5 gap-10">
          <img
            className="object-cover aspect-square rounded-2xl sm:max-w-[50%] h-fit  ring-4 ring-[#394F87]"
            src={products.image_url}
            alt={products.name}
          />
          <div className="flex flex-col">
            <div className="font-sans font-bold text-xl  sm:text-2xl text-[#394F87] mb-1 sm:mb-2">
              {products.name}
            </div>
            <div className="font-sans font-semibold text-xs  sm:text-base text-[#696969] mb-6 sm:mb-10">
              {products.category}
            </div>
            <div className="font-sans font-normal text-base  sm:text-lg text-slate-700 leading-6 sm:leading-8 mb-6 sm:mb-10 h-full">
              {products.description}
            </div>
            <div className="font-sans font-bold text-xl  sm:text-4xl text-red-500 line-through h-7 sm:h-[40px]">
              {products.is_diskon ? products.harga_display : null}
            </div>
            <div className="font-sans font-bold text-xl  sm:text-4xl text-[#394F87] mb-4 sm:mb-8">
              {products.is_diskon
                ? products.harga_diskon_display
                : products.harga_display}
            </div>
            <div className="font-sans font-bold text-xs  sm:text-base text-[#696969] ">
              Stok : {products.stock}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
