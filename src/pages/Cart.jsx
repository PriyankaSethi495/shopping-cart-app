import React, { useState, useEffect } from "react";
import "../styles/cart.css";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import QuantityControls from "../components/QuantityControls";

const Cart = () => {
  const { cartItems, updateCart, removeFromCart, calculateTotal, clearCart } = useCart();
  const [voucherApplied, setVoucherApplied] = useState(false);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = calculateTotal();
  const discount = voucherApplied ? (totalAmount * 0.1).toFixed(2) : 0;
  const finalAmount = (totalAmount - discount).toFixed(2);
  const navigate = useNavigate();

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
          <div>
            <p className="cart-empty">Oops, your aisle cart is feeling lonely! How about we fill it with some awesome goodies? </p>
            <button className="cart-empty-add" onClick={() => navigate("/")}>Add items to cart</button>
          </div>  
          ) : (
        <div className="cart">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.title} className="item-image" />
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <div className="quantity-control-main">
                    <QuantityControls
                      quantity={item.quantity}
                      onIncrease={() => updateCart(item.id, "increase")}
                      onDecrease={() => updateCart(item.id, "decrease")}
                      onDelete={() => removeFromCart(item.id)}
                    />
                    <button
                    className="delete-item-btn"
                    onClick={() => removeFromCart(item.id)}
                    >
                    <FaTrash size={20} />
                  </button>
                  </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="add-more-items">
            <button className="cart-empty-add" onClick={() => navigate("/")}>Add more items</button></div>
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
              <h5>To Pay: </h5>
              <h5> ${finalAmount}</h5>
            </div>
          </div>
          {cartItems.length > 0 && (
            <div className="checkout"><button onClick={clearCart} className="clear-cart-btn">
              Clear Cart
            </button>
            <button className="clear-cart-btn">Proceed to Pay</button>
            </div>
          )}
        </div>
        )}
      </div>
    </>
  );
};

export default Cart;
