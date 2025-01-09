import React, { useEffect, useState } from "react";
import "../styles/products.css";
import Shimmerproducts from "./Shimmerproducts";

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
         console.error("Error:", error);
         setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
      <Shimmerproducts /> 
      ) : (    <div className="products-component">
        {products.map((product) => (
        <div className="product-item" key={product.id}>
          <img src={product.image} className="product-image" alt={product.title} />
          <div className="product-details">
            <h3>{product.title}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
    )} 
    </>
  );
};

export default Products;
