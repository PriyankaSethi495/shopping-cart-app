import React from "react";

const CartSummary = ({ totalAmount, voucherApplied, applyVoucher, clearVoucher, discount, finalAmount }) => {
  return (
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
          <h5>${totalAmount}</h5>
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
        <h5>${finalAmount}</h5>
      </div>
    </div>
  );
};

export default CartSummary;
