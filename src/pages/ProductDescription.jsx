import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/productDescription.css"; 
import ShimmerProductDescription from '../components/ShimmerProductDescription';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

const ProductDescription = () => {
  const { id } = useParams(); 
  const { cartItems, updateCart, addToCart, removeFromCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);


  const goToCart = () => {
    navigate("/cart");
  };

  const getCartQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleDecrease = () => {
    const quantity = getCartQuantity(product.id);
    if (quantity === 1) {
      removeFromCart(product.id); 
    } else {
      updateCart(product.id, "decrease");
    }
  };

  const handleIncrease = () => {
    updateCart(product.id, "increase"); 
  };

  return (
    <>
    <Navbar cartCount={cartItems.length} goToCart={goToCart} />
      {loading ? <ShimmerProductDescription /> : (
        <div className="product-description">
          <img src={product.image} alt={product.title} className="product-description-image" />
          <div className="product-description-details">
            <h2>{product.title}</h2>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-description-text">{product.description}</p>
            <p className="product-category"><strong>Category:</strong> {product.category}</p>
            <div className="product-rating">
              <p>Rating: {product.rating.rate} ({product.rating.count} Reviews)</p>
            </div>
            {getCartQuantity(product.id) > 0 ? (
              <div className="quantity-controls">
                <button onClick={handleDecrease}>-</button>
                <span>{getCartQuantity(product.id)}</span>
                <button onClick={handleIncrease}>+</button>
              </div>
            ) : (
              <button onClick={() => addToCart(product)} className="add-to-cart-btn">
                Add to Cart
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDescription;
