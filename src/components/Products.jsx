import React, { useEffect, useState } from "react";
import "../styles/products.css";
import Shimmerproducts from "./Shimmerproducts";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import Error from "./Error";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { cartItems, updateCart, addToCart, removeFromCart } = useCart();

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

  const getCartQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleDecrease = (product) => {
    const quantity = getCartQuantity(product.id);
    if (quantity === 1) {
      removeFromCart(product.id);
    } else {
      updateCart(product.id, "decrease");
    }
  };

  if (error) {
    return (
      <Error/>
    );
  }

  return (
    <>
      {loading ? (
        <Shimmerproducts />
      ) : (
        <div className="products-component">
          {products.map((product) => {
            const quantity = getCartQuantity(product.id);

            return (
              <div className="product-item" key={product.id}>
                <Link to={`/product/${product.id}`} className="product-link">
                  <img
                    src={product.image}
                    className="product-image"
                    alt={product.title}
                  />
                  <div className="product-details">
                    <h3>{product.title}</h3>
                    <p>${product.price.toFixed(2)}</p>
                    <div className="product-rating">
                      <p>Rating: {product.rating.rate} ({product.rating.count} Reviews)</p>
                    </div>
                  </div>
                </Link>

                {quantity > 0 ? (
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrease(product)}>-</button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => updateCart(product.id, "increase")}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="add-to-cart-btn"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Products;
