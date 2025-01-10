import React from 'react';
import { Link } from 'react-router-dom';
import QuantityControls from './QuantityControls';

const ProductItem = ({ product, cartItems, addToCart, updateCart, removeFromCart }) => {
  const getCartQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleDecrease = (product) => {
    const quantity = getCartQuantity(product.id);
    if (quantity === 1) {
      removeFromCart(product.id);
    } else {
      updateCart(product.id, 'decrease');
    }
  };

  const quantity = getCartQuantity(product.id);

  return (
    <div className="product-item" key={product.id}>
      <Link to={`/product/${product.id}`} className="product-link">
        <img
          src={product.image}
          className="product-image"
          alt={product.title}
        />
        <div className="product-details">
          <h3>{product.title}</h3>
          <p>${product.price.toFixed(2)}</p>
          <div className="product-rating">
            <p>Rating: {product.rating.rate} ({product.rating.count} Reviews)</p>
          </div>
        </div>
      </Link>

      {quantity > 0 ? (
        <QuantityControls 
          quantity={quantity}
          onIncrease={() => updateCart(product.id, 'increase')}
          onDecrease={() => handleDecrease(product)}
        />
      ) : (
        <button
          onClick={() => addToCart(product)}
          className="add-to-cart-btn"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductItem;
