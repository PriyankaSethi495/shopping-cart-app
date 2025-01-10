import React from "react";
import { FaTrash } from "react-icons/fa";

const QuantityControls = ({ quantity, onIncrease, onDecrease, onDelete, showDeleteButton }) => {
  return (
    <div className="quantity-controls">
      {/* Conditionally render the delete button */}
      {showDeleteButton ? (
        <>
          <button className="delete-item-btn" onClick={onDelete}>
            <FaTrash size={20} />
          </button>
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
