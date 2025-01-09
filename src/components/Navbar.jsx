import React from "react";
import "../styles/navbar.css";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = ({ cartCount, goToCart }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Burberry Aisle</div>
      <div className="navbar-cart" onClick={goToCart}>
        <FaShoppingCart size={40} />
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </div>
    </nav>
  );
};

export default Navbar;
