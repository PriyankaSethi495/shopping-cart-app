import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/productDescription.css"; 
import ShimmerProductDescription from '../components/ShimmerUI/ShimmerProductDescription';
import Navbar from '../components/Navbar';
import Error from '../components/Error';
import QuantityControls from '../components/QuantityControls';
import useCartFunctions from '../hooks/useCartFunctions';

const ProductDescription = () => {
  const { id } = useParams(); 
  const { getCartQuantity, handleIncrease, handleDecrease, addToCart, removeFromCart, cartCount } = useCartFunctions(); //Custom Hook
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

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

  if (error) {
    return <Error />;
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
              onIncrease={() => handleIncrease(product.id)}
              onDecrease={() => handleDecrease(product.id)}
              onDelete={() => removeFromCart(product.id)}
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
