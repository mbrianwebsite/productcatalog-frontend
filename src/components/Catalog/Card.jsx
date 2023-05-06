import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Card({ product }) {
  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="relative flex flex-col rounded-b-lg shadow-lg z-0">
      <img
        className="object-cover rounded-t-lg h-60 hover:cursor-pointer"
        src={product.image_url}
        alt={product.name}
        onClick={() => handleDetail(product.id)}
      />
      <div className="flex flex-col p-2 sm:p-4 ">
        <div className="font-sans font-bold text-base  sm:text-lg text-[#394F87]">
          {product.name}
        </div>
        <div className="font-sans font-bold text-md  sm:text-xl text-red-500 line-through h-[24px]">
          {product.is_diskon ? product.harga_display : null}
        </div>
        <div className="font-sans font-bold text-md  sm:text-xl text-green-900">
          {product.is_diskon
            ? product.harga_diskon_display
            : product.harga_display}
        </div>
        <div className="font-sans font-normal text-xs  sm:text-base text-[#696969]">
          Stok : {product.stock}
        </div>
      </div>
      <Link
        to={`/detail/${product.id}`}
        className="hidden sm:block absolute bottom-2 right-2  sm:bottom-4 sm:right-4 px-2 py-1 bg-[#394F87] rounded-md sm:rounded-lg"
      >
        <div className="font-sans font-semibold text-xs sm:text-base text-white">
          Detail
        </div>
      </Link>
      <Link
        to={`/detail/${product.id}`}
        className="sm:hidden px-2 py-1 m-2 bg-[#394F87] rounded-md"
      >
        <div className="font-sans font-semibold text-base text-white text-center">
          Detail
        </div>
      </Link>
    </div>
  );
}

export default Card;
