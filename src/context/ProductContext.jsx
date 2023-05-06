import axios from "axios";
import { createContext, useState } from "react";

export const ProductContext = createContext();
export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (id) => {
    try {
      setLoading(true);
      if (id == undefined) {
        const response = await axios.get(
          "https://api-project.amandemy.co.id/api/final/products"
        );
        setProducts(response.data.data);
      } else {
        const response = await axios.get(
          `https://api-project.amandemy.co.id/api/final/products/${id}`
        );
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ProductContext.Provider
      value={{
        products: products,
        setProducts: setProducts,
        fetchProducts: fetchProducts,
        loading: loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
