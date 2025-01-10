import React from 'react';
import { Link } from 'react-router-dom';
import QuantityControls from './QuantityControls';

const ProductItem = ({ product, cartItems, addToCart, updateCart, removeFromCart }) => {

  //Get current quantity of product in cart  
  const getCartQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  //Handle decreasing the quantity to 0 using quantity controls
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

      {/* Conditionally rendering quantity controls if the product is in the cart or show add to cart button */}
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
