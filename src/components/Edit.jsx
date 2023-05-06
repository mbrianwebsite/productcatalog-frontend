import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";

function Edit(productId) {
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

  const { products, fetchProducts, setProducts } = useContext(ProductContext);
  const handleChange = (event) => {
    if (event.target.name === "name") {
      setProducts({ ...products, name: event.target.value });
    } else if (event.target.name === "harga") {
      setProducts({ ...products, harga: event.target.value });
    } else if (event.target.name === "stock") {
      setProducts({ ...products, stock: event.target.value });
    } else if (event.target.name === "image_url") {
      setProducts({ ...products, image_url: event.target.value });
    } else if (event.target.name === "is_diskon") {
      setProducts({ ...products, is_diskon: event.target.checked });
    } else if (event.target.name === "harga_diskon") {
      setProducts({ ...products, harga_diskon: event.target.value });
    } else if (event.target.name === "category") {
      setProducts({ ...products, category: event.target.value });
    } else if (event.target.name === "description") {
      setProducts({ ...products, description: event.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `https://api-project.amandemy.co.id/api/products/${productId.id}`,
        {
          name: products.name,
          harga: products.harga,
          stock: products.stock,
          image_url: products.image_url,
          is_diskon: products.is_diskon,
          harga_diskon: products.harga_diskon,
          category: products.category,
          description: products.description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      fetchProducts(productId.id);
      await showAlert("Update Product Success", "Success");
    } catch (error) {
      await showAlert(error.response.data.info, "Error");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(productId.id);
  }, []);

  return (
    <>
      <div className="flex flex-col p-5 sm:p-7 m-5 bg-white rounded-2xl shadow-xl">
        <div className="font-sans font-bold text-2xl  sm:text-3xl text-[#394F87] mb-6">
          Edit Product
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
              value={products.name || ""}
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
              value={products.stock || ""}
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
              value={products.harga || ""}
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
                checked={products.is_diskon == true ? true : false}
                value={products.is_diskon || false}
                onChange={handleChange}
              />
              <div className="font-sans font-semibold text-lg sm:text-xl text-slate-700 mb-2">
                Discount Price
              </div>
            </div>
            {products.is_diskon == true ? (
              <input
                id="discountValue"
                className="font-sans font-semibold text-lg sm:text-xl text-slate-700 p-2 ring-1 ring-black rounded-md "
                type="number"
                placeholder="12345"
                name="harga_diskon"
                value={products.harga_diskon || ""}
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
              value={products.category || ""}
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
              value={products.image_url || ""}
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
              value={products.description || ""}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-row justify-end gap-4">
          <Link
            to="/table"
            className="px-4 py-2 ring-1 ring-[#394F87] rounded-lg hover:cursor-pointer"
          >
            <div className="font-sans font-semibold text-xl text-[#394F87]">
              Cancel
            </div>
          </Link>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#394F87] rounded-lg"
          >
            <div className="font-sans font-semibold text-xl text-white">
              Update
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

export default Edit;
