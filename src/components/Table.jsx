import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Confirm from "./Confirm";
import Alert from "./Alert";
import Loadinginfo from "./Loadinginfo";

function Table() {
  const { products, fetchProducts, loading } = useContext(ProductContext);

  const [filter, setFilter] = useState({
    category: "",
    search: "",
  });

  const handleChange = (event) => {
    if (event.target.name === "category") {
      setFilter({ ...filter, category: event.target.value });
    } else if (event.target.name === "search") {
      setFilter({ ...filter, search: event.target.value });
    }
  };

  const [filterArr, setFilterArr] = useState([]);

  const handleSearch = () => {
    let productsArr = structuredClone(products);

    if (filter.category !== "") {
      // filter category
      productsArr = productsArr.filter((item) => {
        return item.category.toString() === filter.category;
      });
    }

    if (filter.search !== "") {
      // filter search
      productsArr = productsArr.filter((item) => {
        return item.name.toLowerCase().includes(filter.search.toLowerCase());
      });
    }
    setFilterArr(productsArr);
  };

  const onReset = () => {
    setFilter({
      category: "",
      search: "",
    });
    setFilterArr(products);
  };

  useEffect(() => {
    setFilterArr(products);
  }, [products]);

  const navigate = useNavigate();

  const closeAlertPage = async () => {
    closeAlert();
  };
  const [varAlert, setVarAlert] = useState(false);
  const [varAlertType, setVarAlertType] = useState("Error");
  const [showAlertMessage, setShowAlertMessage] = useState("");

  const closeAlert = () => {
    setVarAlert(false);
  };

  const showAlert = async (message, type) => {
    setVarAlert(true);
    setVarAlertType(type);
    setShowAlertMessage(message);
  };

  const [varConfirm, setVarConfirm] = useState(false);
  const [varConfirmId, setVarConfirmId] = useState("");
  const [showConfirmMessage, setShowConfirmMessage] = useState("");

  const closeConfirm = () => {
    setVarConfirm(false);
  };

  const showConfirm = async (message, id) => {
    setVarConfirm(true);
    setVarConfirmId(id);
    setShowConfirmMessage(message);
  };

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleUpdate = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleBeforeDelete = async (id) => {
    showConfirm(`Are you sure to delete this item with id = ${id} ?`, id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://api-project.amandemy.co.id/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchProducts();
      closeConfirm();
      await showAlert("Item deleted successfully", "Success");
      console.log(`Product with id ${id} deleted`);
    } catch (error) {
      console.log(error);
      await showAlert(`Failed to delete Product with id ${id}`, "Error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="overflow-x-auto m-5 p-5 lg:p-7 bg-white rounded-2xl">
        <div className="flex flex-row justify-between items-center mb-6">
          <div className="font-sans font-bold text-2xl  sm:text-3xl text-[#394F87]">
            Product List
          </div>
          <NavLink
            to="/create"
            className="min-w-fit px-3 py-1 sm:px-4 bg-[#394F87] rounded-full"
          >
            <div className="font-sans font-normal text-base sm:text-xl text-white">
              Create Product
            </div>
          </NavLink>
        </div>
        {loading === true ? (
          <div className="flex justify-center">
            <Loadinginfo />
          </div>
        ) : (
          <>
            <div className="flex flex-row mb-8 gap-4 justify-center">
              <select
                id=""
                className="font-sans font-semibold text-lg sm:text-xl text-slate-700 p-2 ring-1 ring-black rounded-md"
                name="category"
                onChange={handleChange}
                value={filter.category}
              >
                <option value="" className="">
                  -Category-
                </option>
                <option value="teknologi">Teknologi</option>
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
                <option value="hiburan">Hiburan</option>
                <option value="kendaraan">Kendaraan</option>
              </select>
              <input
                type="text"
                name="search"
                onChange={handleChange}
                value={filter.search}
                className="font-sans font-semibold text-lg sm:text-xl text-slate-700 p-2 ring-1 ring-black rounded-md"
                placeholder="Search"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-[#394F87] rounded-lg hover:cursor-pointer font-sans font-semibold text-xl text-white"
              >
                Search
              </button>
              <button
                onClick={onReset}
                className="px-4 py-2 bg-yellow-500 rounded-lg hover:cursor-pointer font-sans font-semibold text-xl text-white"
              >
                Reset
              </button>
            </div>
            <table className="table table-zebra w-full ring-1 ring-[#394F87] rounded-2xl">
              <thead>
                <tr className="[&>*]:bg-[#394F87] [&>*]:text-white">
                  <th className="text-left rounded-tl-2xl">id</th>
                  <th className="text-left w-56">Nama</th>
                  <th className="text-left">Diskon?</th>
                  <th className="text-right">Harga</th>
                  <th className="text-right">Harga Diskon</th>
                  <th className="text-center">Gambar Product</th>
                  <th className="text-left">Kategori</th>
                  <th className="text-left">Dibuat Oleh</th>
                  <th className="text-center rounded-tr-2xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {filterArr.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th className="rounded-l-2xl">{item.id}</th>
                      <td className="whitespace-normal">
                        <div className="flex flex-row justify-between items-center">
                          <div className="w-full">{item.name}&nbsp;</div>
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => handleDetail(item.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                      <td>{item.is_diskon === true ? "Aktif" : "Non Aktif"}</td>
                      <td className="text-right">{item.harga_display}</td>
                      <td className="text-right">
                        {item.is_diskon === true
                          ? item.harga_diskon_display
                          : "Rp. 0"}
                      </td>
                      <td onClick={() => handleDetail(item.id)}>
                        <img
                          className="w-32 h-32 object-cover rounded-xl ring-1 ring-[#394F87]"
                          src={item.image_url}
                          alt={item.name}
                        />
                      </td>
                      <td className="capitalize">{item.category}</td>
                      <td className="capitalize whitespace-normal">
                        {item.user.name}
                      </td>
                      <td className="rounded-r-2xl">
                        <div className="flex flex-row gap-4 justify-center items-center">
                          <div
                            className="px-2 py-1 bg-yellow-500 rounded-md sm:rounded-lg cursor-pointer"
                            onClick={() => handleUpdate(item.id)}
                          >
                            <div className="font-sans font-semibold text-xs sm:text-base text-white">
                              Update
                            </div>
                          </div>
                          <div
                            onClick={() => handleBeforeDelete(item.id)}
                            className="px-2 py-1 bg-red-500 rounded-md sm:rounded-lg cursor-pointer"
                          >
                            <div className="font-sans font-semibold text-xs sm:text-base text-white">
                              Delete
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
      <input
        type="checkbox"
        checked={varConfirm}
        readOnly
        className="modal-toggle"
      />
      <Confirm
        showConfirmMessage={showConfirmMessage}
        closeConfirm={closeConfirm}
        handleDelete={handleDelete.bind(this, varConfirmId)}
      />
      <input
        type="checkbox"
        checked={varAlert}
        readOnly
        className="modal-toggle"
      />
      <Alert
        showAlertMessage={showAlertMessage}
        varAlertType={varAlertType}
        goToPage={closeAlertPage}
        closeAlert={closeAlert}
      />
    </>
  );
}

export default Table;
