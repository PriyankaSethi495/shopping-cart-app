import React from "react";
import { FaTrash } from "react-icons/fa";
import QuantityControls from "../QuantityControls";

const CartItem = ({ item, updateCart, removeFromCart }) => {
  return (
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
  );
};

export default CartItem;
