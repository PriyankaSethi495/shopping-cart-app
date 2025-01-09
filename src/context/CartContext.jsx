import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage
  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Add product to cart
  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
      saveCartToLocalStorage(updatedCart);
    } else {
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCart);
      saveCartToLocalStorage(updatedCart);
    }
  };

  // Update product quantity
  const updateCart = (id, action) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: action === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
      // Remove items with quantity 0
    .filter((item) => item.quantity > 0); 
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  // Dynamically calculate the total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  // Clear Cart function
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  // Sync cart items with localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateCart, removeFromCart, calculateTotal, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
