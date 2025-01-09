import React from "react";
import "../styles/cart.css";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const { cartItems, updateCart, removeFromCart, calculateTotal } = useCart();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = calculateTotal();

  return (
    <>
      <Navbar cartCount={cartCount} goToCart={() => {}} />
      <div className="cart-page">
        <h2 className="cart-title">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="cart-empty">Your cart is empty, add items.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} className="item-image" />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateCart(item.id, "decrease")}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCart(item.id, "increase")}>+</button>
                  </div>
                </div>
                <button
                  className="delete-item-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FaTrash size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="cart-total">
          <h3>Total Amount: ${totalAmount}</h3>
        </div>
      </div>
    </>
  );
};

export default Cart;
