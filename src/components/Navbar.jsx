import React from "react";
import "../styles/navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ cartCount, goToCart }) => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  }
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={goToHome}>Burberry Aisle</div>
      <div className="navbar-cart" onClick={goToCart}>
        <FaShoppingCart size={40} />
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </div>
      <div className="cover-text">
        Welcome to Burberry Aisle! <br/> Shop till you drop... <br /> but make it classy!
      </div>
    </nav>
  );
};

export default Navbar;
