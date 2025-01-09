import React from "react";
import { useNavigate } from "react-router-dom";
import Products from "../components/Products";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

const HomePage = () => {
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();

  const goToCart = () => navigate("/cart");

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <Navbar cartCount={cartCount} goToCart={goToCart} />
      <Products addToCart={addToCart} />
    </div>
  );
};

export default HomePage;
