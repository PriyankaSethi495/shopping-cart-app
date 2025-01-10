import React, { useState, useEffect } from "react";
import "../styles/cart.css";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/Cart/CartItem"; 
import CartSummary from "../components/Cart/CartSummary"; 

const Cart = () => {
  const { cartItems, updateCart, removeFromCart, calculateTotal, clearCart } = useCart();
  const [voucherApplied, setVoucherApplied] = useState(false);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = calculateTotal();
  const discount = voucherApplied ? (totalAmount * 0.1).toFixed(2) : 0; //Calculating 10% voucher discount
  const finalAmount = (totalAmount - discount).toFixed(2);
  const navigate = useNavigate();

  //Voucher option enable/disable dynamically based on total amount
  useEffect(() => {
    if (totalAmount <= 200 && voucherApplied) {
      setVoucherApplied(false);
    }
  }, [totalAmount, voucherApplied]);

  //Apply voucher
  const applyVoucher = () => {
    if (totalAmount > 200) {
      setVoucherApplied(true);
    }
  };

  //Clear voucher
  const clearVoucher = () => {
    setVoucherApplied(false);
  };
  
  const handleItemClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <Navbar cartCount={cartCount} goToCart={() => {}} />
      <div className="cart-page">
        <h2 className="cart-title">Your Cart</h2>
        {cartItems.length === 0 ? (
          <div>
            <p className="cart-empty">
              Oops, your aisle cart is feeling lonely! How about we fill it with some awesome goodies?
            </p>
            <button className="cart-empty-add" onClick={() => navigate("/")}>Add items to cart</button>
          </div>
        ) : (
          <div className="cart">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item-click" key={item.id} onClick={() => handleItemClick(item.id)}>
                  <CartItem
                    item={item}
                    updateCart={updateCart}
                    removeFromCart={removeFromCart}
                  />
                </div>
              ))}
            </div>
            <div className="add-more-items">
              <button className="cart-empty-add" onClick={() => navigate("/")}>Add more items</button>
            </div>
            <CartSummary
              totalAmount={totalAmount}
              voucherApplied={voucherApplied}
              applyVoucher={applyVoucher}
              clearVoucher={clearVoucher}
              discount={discount}
              finalAmount={finalAmount}
            />
            {cartItems.length > 0 && (
              <div className="checkout">
                <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
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
