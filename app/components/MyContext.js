"use client";

import { useState, useEffect, createContext } from "react";
import React from "react";

export const MyContext = React.createContext();

export function Provider({ children }) {
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = sessionStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  const [account, setAccount] = useState(() => {
    if (typeof window !== "undefined") {
      const storedAccount = sessionStorage.getItem("account");
      return storedAccount ? JSON.parse(storedAccount) : null;
    }
    return null;
  });

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (account) {
      sessionStorage.setItem("account", JSON.stringify(account));
    } else {
      sessionStorage.removeItem("account");
    }
  }, [account]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
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

  const login = (user) => {
    setAccount(user);
  };

  const logout = () => {
    setAccount(null);
    clearCart();
  };

  const hasRole = (role) => {
    return account?.role === role;
  };

  return (
    <MyContext.Provider
      value={{
        cart,
        addToCart,
        updateCartQuantity,
        clearCart,
        account,
        login,
        logout,
        hasRole,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}