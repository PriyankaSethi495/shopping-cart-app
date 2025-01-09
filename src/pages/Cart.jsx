import React, { useState, useEffect } from "react";
import "../styles/cart.css";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const { cartItems, updateCart, removeFromCart, calculateTotal, clearCart } = useCart();
  const [voucherApplied, setVoucherApplied] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = calculateTotal();
  const discount = voucherApplied ? (totalAmount * 0.1).toFixed(2) : 0;
  const finalAmount = (totalAmount - discount).toFixed(2);

  useEffect(() => {
    if (totalAmount <= 200 && voucherApplied) {
      setVoucherApplied(false);
    }
  }, [totalAmount, voucherApplied]);

  const applyVoucher = () => {
    if (totalAmount > 200) {
      setVoucherApplied(true);
    }
  };

  const clearVoucher = () => {
    setVoucherApplied(false);
  };

  {cartItems.length > 0 && (
    <button onClick={clearCart} className="clear-cart-btn">
      Clear Cart
    </button>
  )}

  return (
    <>
      <Navbar cartCount={cartCount} goToCart={() => {}} />
      <div className="cart-page">
        <h2 className="cart-title">Your Cart</h2>
        {cartItems.length === 0 ? (
            <p className="cart-empty">Your cart is empty, let's go add some interesting items to your cart! </p>
          ) : (
        <div className="cart">
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

          <div className="cart-total">
            {totalAmount > 200 && !voucherApplied && (
              <div className="voucher-section">
                <p>Congratulations! You are eligible for a 10% discount voucher.</p>
                <button onClick={applyVoucher} className="apply-voucher-btn">
                  Apply Voucher
                </button>
              </div>
            )}

            {voucherApplied && (
              <div className="voucher-section">
                <p>Voucher applied! Enjoy your discount.</p>
                <button onClick={clearVoucher} className="clear-voucher-btn">
                  Remove Voucher
                </button>
              </div>
            )}

            {discount > 0 && (
              <div className="cart-finalamount">
                <h5>Total Amount: </h5>
                <h5> ${totalAmount}</h5>
              </div>
            )}
            {discount > 0 && (
              <div className="cart-finalamount">
                <h5>Discount: </h5>
                <h5>-${discount}</h5>
              </div>
            )}
            <div className="cart-finalamount">
              <h5>Final Amount: </h5>
              <h5> ${finalAmount}</h5>
            </div>
          </div>
          {cartItems.length > 0 && (
            <button onClick={clearCart} className="clear-cart-btn">
              Clear Cart
            </button>
          )}
        </div>
        )}
      </div>
    </>
  );
};

export default Cart;
