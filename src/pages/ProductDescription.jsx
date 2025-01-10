import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/productDescription.css"; 
import ShimmerProductDescription from '../components/ShimmerProductDescription';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Error from '../components/Error';
import QuantityControls from '../components/QuantityControls';

const ProductDescription = () => {
  const { id } = useParams(); 
  const { cartItems, updateCart, addToCart, removeFromCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
        setError(true);
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


  if (error) {
    return (
      <Error/>
    );
  }

  return (
    <>
    <Navbar cartCount={cartCount} goToCart={goToCart} />
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
            {getCartQuantity(product.id) > 0 ? <QuantityControls 
              quantity={getCartQuantity(product.id)}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onDelete={getCartQuantity(product.id) > 0 ? () => removeFromCart(product.id) : null}
            /> : (
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
