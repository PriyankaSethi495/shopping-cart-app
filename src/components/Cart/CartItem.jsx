import React from "react";
import { FaTrash } from "react-icons/fa";
import QuantityControls from "../QuantityControls";

const CartItem = ({ item, updateCart, removeFromCart }) => {
  // Prevent navigation and remove item when delete is clicked
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    removeFromCart(item.id);
  };

  // Prevent navigation when quantity controls are clicked
  const handleQuantityChange = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="cart-item" key={item.id} onClick={() => handleItemClick(item.id)}>
      <img src={item.image} alt={item.title} className="item-image" />
      <div className="item-details">
        <h3>{item.title}</h3>
        <p>Price: ${item.price.toFixed(2)}</p>
        <div className="quantity-control-main">
          <QuantityControls
            quantity={item.quantity}
            onIncrease={(e) => {
              handleQuantityChange(e);
              updateCart(item.id, "increase");
            }}
            onDecrease={(e) => {
              handleQuantityChange(e);
              updateCart(item.id, "decrease");
            }}
            onDelete={handleDeleteClick}
          />
          <button
            className="delete-item-btn"
            onClick={handleDeleteClick}
          >
            <FaTrash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
