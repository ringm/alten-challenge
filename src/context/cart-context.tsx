"use client";

import React, { createContext, useReducer, useEffect, ReactNode, useMemo } from "react";
import { CartItem } from "@/types/cart";
import { CartState, CartAction } from "@/types/cart";
import { cartReducer } from "@/store/cart/reducers/cartReducer";
import { useIsClient } from "@/hooks/useIsClient";

export interface CartContextValue extends CartState {
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  itemsCount: number;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

const initialState: CartState = {
  items: [],
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isClient = useIsClient();

  const [state, dispatch] = useReducer<{ items: CartItem[] }, CartState, [action: CartAction]>(
    cartReducer,
    initialState,
    (initial) => {
      if (typeof window === "undefined") {
        return initial;
      }
      try {
        const storedCart = localStorage.getItem("cartItems");
        return storedCart ? { items: JSON.parse(storedCart) } : initial;
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        return initial;
      }
    }
  );

  useEffect(() => {
    if (!isClient) {
      return;
    }
    try {
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [state.items, isClient]);

  const addToCart = (item: CartItem) => {
    // const { storageOptions, colorOptions } = item;
    // const productColor = colorOptions.find((color) => color.name === selectedColor);
    // const productStorage = storageOptions.find((storage) => storage.capacity === selectedStorage);
    // const newProduct: CartItem = {
    //   ...item,
    //   storage: productStorage || storageOptions[0],
    //   color: productColor || colorOptions[0],
    // };
    dispatch({ type: "ADD", payload: item });
  };

  const removeFromCart = (product: CartItem) => {
    dispatch({ type: "REMOVE", payload: product });
  };

  const contextValue = useMemo(
    () => ({
      items: state.items,
      itemsCount: state.items.length,
      addToCart,
      removeFromCart,
    }),
    [state.items]
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
