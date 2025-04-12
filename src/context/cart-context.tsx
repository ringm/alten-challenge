"use client";

import React, { createContext, useReducer, useEffect, ReactNode, useMemo } from "react";
import { Product, ProductSummary } from "@/types/product";
import { CartState, CartAction } from "@/types/cart";
import { cartReducer } from "@/store/cart/reducers/cartReducer";
import { useIsClient } from "@/hooks/useIsClient";

export interface CartContextValue extends CartState {
  addToCart: (
    item: Pick<Product, "id" | "name" | "basePrice" | "brand" | "storageOptions" | "colorOptions">,
    colorName: string,
    storageCapacity: string
  ) => void;
  removeFromCart: (itemId: string) => void;
  itemsCount: number;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

const initialState: CartState = {
  items: [],
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isClient = useIsClient();

  const [state, dispatch] = useReducer<{ items: ProductSummary[] }, CartState, [action: CartAction]>(
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

  const addToCart = (
    item: Pick<Product, "id" | "name" | "basePrice" | "brand" | "storageOptions" | "colorOptions">,
    colorName: string,
    storageCapacity: string
  ) => {
    const { storageOptions, colorOptions } = item;
    const productColor = colorOptions.find((color) => color.name === colorName);
    const productStorage = storageOptions.find((storage) => storage.capacity === storageCapacity);
    const newProduct: ProductSummary = {
      ...item,
      basePrice: productStorage?.price || item.basePrice,
      colorName: productColor?.name || colorOptions[0].name,
      imageUrl: productColor?.imageUrl || colorOptions[0].imageUrl,
    };
    dispatch({ type: "ADD", payload: newProduct });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({ type: "REMOVE", payload: itemId });
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
