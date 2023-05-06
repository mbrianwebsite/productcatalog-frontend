import { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

function Create() {
  const { fetchProducts } = useContext(ProductContext);

  const [showInput, setShowInput] = useState(false);
  const [checkedValue, setCheckedValue] = useState(false);

  const [formInput, setFormInput] = useState({
    name: "",
    harga: "",
    stock: "",
    image_url: "",
    is_diskon: false,
    harga_diskon: "",
    category: "",
    description: "",
  });

  const clearInput = () => {
    setFormInput({
      name: "",
      harga: "",
      stock: "",
      image_url: "",
      is_diskon: false,
      harga_diskon: "",
      category: "",
      description: "",
    });
    setCheckedValue(false);
    setShowInput(false);
  };

  const navigate = useNavigate();

  const goToTable = async () => {
    navigate("/table");
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

  const handleChange = (event) => {
    if (event.target.name === "name") {
      setFormInput({ ...formInput, name: event.target.value });
    } else if (event.target.name === "harga") {
      setFormInput({ ...formInput, harga: event.target.value });
    } else if (event.target.name === "stock") {
      setFormInput({ ...formInput, stock: event.target.value });
    } else if (event.target.name === "image_url") {
      setFormInput({ ...formInput, image_url: event.target.value });
    } else if (event.target.name === "is_diskon") {
      setFormInput({ ...formInput, is_diskon: event.target.checked });
      setShowInput(!showInput);
      setCheckedValue(!checkedValue);
    } else if (event.target.name === "harga_diskon") {
      setFormInput({ ...formInput, harga_diskon: event.target.value });
    } else if (event.target.name === "category") {
      setFormInput({ ...formInput, category: event.target.value });
    } else if (event.target.name === "description") {
      setFormInput({ ...formInput, description: event.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://api-project.amandemy.co.id/api/final/products",
        {
          name: formInput.name,
          harga: formInput.harga,
          stock: formInput.stock,
          image_url: formInput.image_url,
          is_diskon: formInput.is_diskon,
          harga_diskon: formInput.harga_diskon,
          category: formInput.category,
          description: formInput.description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      fetchProducts();
      clearInput();
      await showAlert("Create Product Success", "Success");
    } catch (error) {
      await showAlert(error.response.data.info, "Error");
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col p-5 sm:p-7 m-5 bg-white rounded-2xl shadow-xl">
        <div className="font-sans font-bold text-2xl  sm:text-3xl text-[#394F87] mb-6">
          Create Product
        </div>
        <div className="grid grid-rows-1 sm:grid-cols-5 gap-5 mb-5">
          <div className="flex flex-col  sm:col-span-3">
            <div className="font-sans font-semibold text-lg sm:text-xl text-slate-700 mb-2">
              Product Name
            </div>
            <input
              required
              className="font-sans font-semibold text-lg sm:text-xl text-slate-700 p-2 ring-1 ring-black rounded-md "
              type="text"
              placeholder="Hape Masa Kini"
              name="name"
              value={formInput.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col sm:col-span-2">
            <div className="font-sans font-semibold text-lg sm:text-xl text-slate-700 mb-2">
              Product Stock
            </div>
            <input
              required
              className="font-sans font-semibold text-lg sm:text-xl text-slate-700 p-2 ring-1 ring-black rounded-md "
              type="number"
              placeholder="12345"
              name="stock"
              value={formInput.stock}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-rows-1 sm:grid-cols-6 gap-5 mb-5 items-end">
          <div className="flex flex-col  sm:col-span-3">
            <div className="font-sans font-semibold text-lg sm:text-xl text-slate-700 mb-2">
              Regular Price
            </div>
            <input
              required
              className="font-sans font-semibold text-lg sm:text-xl text-slate-700 p-2 ring-1 ring-black rounded-md "
              type="number"
              placeholder="12345"
              name="harga"
              value={formInput.harga}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col sm:col-span-3">
            <div className="flex flex-row gap-1">
              <input
                id="discountCheck"
                className="w-7 h-7"
                type="checkbox"
                name="is_diskon"
                checked={checkedValue}
                value={formInput.is_diskon}
                onChange={handleChange}
              />
              <div className="font-sans font-semibold text-lg sm:text-xl text-slate-700 mb-2">
                Discount Price
              </div>
            </div>
            {showInput ? (
              <input
                id="discountValue"
                className="font-sans font-semibold text-lg sm:text-xl text-slate-700 p-2 ring-1 ring-black rounded-md "
                type="number"
                placeholder="12345"
                name="harga_diskon"
                value={formInput.harga_diskon}
                onChange={handleChange}
              />
            ) : null}
          </div>
        </div>
        <div className="grid grid-rows-1 sm:grid-cols-5 gap-5 mb-5">
          <div className="flex flex-col  sm:col-span-2">
            <div className="font-sans font-semibold text-lg sm:text-xl text-slate-700 mb-2">
              Categories
            </div>
            <select
              required
              className="font-sans font-semibold text-lg sm:text-xl text-slate-700 p-2 ring-1 ring-black rounded-md"
              name="category"
              value={formInput.category}
              onChange={handleChange}
            >
              <option value="">---Select Categories---</option>
              <option value="teknologi">Teknologi</option>
              <option value="makanan">Makanan</option>
              <option value="minuman">Minuman</option>
              <option value="hiburan">Hiburan</option>
              <option value="kendaraan">Kendaraan</option>
            </select>
          </div>
          <div className="flex flex-col sm:col-span-3">
            <div className="font-sans font-semibold text-lg sm:text-xl text-slate-700 mb-2">
              Image Url
            </div>
            <input
              required
              className="font-sans font-semibold text-lg sm:text-xl text-slate-700 p-2 ring-1 ring-black rounded-md "
              type="text"
              placeholder="https://images.com/url"
              name="image_url"
              value={formInput.image_url}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-rows-1 sm:grid-cols-5 gap-5 mb-5">
          <div className="flex flex-col  sm:col-span-5">
            <div className="font-sans font-semibold text-lg sm:text-xl text-slate-700 mb-2">
              Description
            </div>
            <textarea
              required
              className="font-sans font-semibold text-lg sm:text-xl text-slate-700 p-2 ring-1 ring-black rounded-md"
              placeholder="Product Description Here"
              rows="10"
              name="description"
              value={formInput.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-row justify-end gap-4">
          <div
            onClick={clearInput}
            className="px-4 py-2 ring-1 ring-[#394F87] rounded-lg hover:cursor-pointer"
          >
            <div className="font-sans font-semibold text-xl text-[#394F87]">
              Cancel
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#394F87] rounded-lg"
          >
            <div className="font-sans font-semibold text-xl text-white">
              Save
            </div>
          </button>
        </div>
      </div>
      <input
        type="checkbox"
        checked={varAlert}
        readOnly
        className="modal-toggle"
      />
      <Alert
        showAlertMessage={showAlertMessage}
        varAlertType={varAlertType}
        goToPage={goToTable}
        closeAlert={closeAlert}
      />
    </>
  );
}

export default Create;
