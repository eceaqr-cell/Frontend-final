"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type CartContextType = {
  cartCount: number;
  cartIds: Set<string>; // បន្ថែម cartIds ទីនេះ
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartIds, setCartIds] = useState<Set<string>>(new Set());

  const cartCount = cartIds.size;

  const addToCart = (id: string) => {
    setCartIds((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  const removeFromCart = (id: string) => {
    setCartIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  return (
    <CartContext.Provider value={{ cartCount, cartIds, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};