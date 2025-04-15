"use client";

import { useState, useEffect, createContext } from "react";
import React from "react";

export const MyContext = React.createContext();

export function Provider({ children }) {
  const [cart, setCart] = useState(() => {
    // Initialize the cart from sessionStorage
    if (typeof window !== "undefined") {
      const storedCart = sessionStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  // Update sessionStorage whenever the cart changes
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        const updatedCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        return updatedCart;
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <MyContext.Provider value={{ cart, addToCart, updateCartQuantity, clearCart }}>
      {children}
    </MyContext.Provider>
  );
}