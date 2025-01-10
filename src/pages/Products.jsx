import React, { useEffect, useState } from "react";
import "../styles/products.css";
import Shimmerproducts from "../components/ShimmerUI/Shimmerproducts";
import { useCart } from "../context/CartContext";
import Error from "../components/Error";
import ProductItem from "../components/ProductItem";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { cartItems, updateCart, addToCart, removeFromCart } = useCart();

  //Fetching list of all products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        setError(true);
      });
  }, []);

  //Displaying message on data fetch error
  if (error) {
    return <Error/>;
  }

  return (
    <>
      {loading ? (
        <Shimmerproducts/>
      ) : (
        <div className="products-component">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              cartItems={cartItems}
              addToCart={addToCart}
              updateCart={updateCart}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Products;
