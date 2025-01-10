import { useCart } from '../context/CartContext';

const useCartFunctions = () => {
  const { cartItems, updateCart, addToCart, removeFromCart } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Get current quantity of a product in the cart
  const getCartQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Handle increasing the quantity of a product
  const handleIncrease = (productId) => {
    updateCart(productId, 'increase');
  };

  // Handle decreasing the quantity of a product
  const handleDecrease = (productId) => {
    const quantity = getCartQuantity(productId);
    if (quantity === 1) {
      removeFromCart(productId);
    } else {
      updateCart(productId, 'decrease');
    }
  };

  return { getCartQuantity, handleIncrease, handleDecrease, addToCart, removeFromCart, cartCount };
};

export default useCartFunctions;
