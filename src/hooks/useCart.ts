import { CartContext, CartContextValue } from "@/context/cart-context";
import { useContext } from "react";

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
