import React from "react";
import { FaTrash } from "react-icons/fa";

const QuantityControls = ({ quantity, onIncrease, onDecrease, onDelete, showDeleteButton }) => {
  return (
    <div className="quantity-controls">
      {showDeleteButton ? (
        <>
          <button className="delete-item-btn" onClick={onDelete}>
            <FaTrash size={20} />
          </button>
          <span>{quantity}</span>
        </>
      ) : (
        <>
          <button onClick={onDecrease}>-</button>
          <span>{quantity}</span>
          <button onClick={onIncrease}>+</button>
        </>
      )}
    </div>
  );
};

export default QuantityControls;
