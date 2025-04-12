import { CartState, CartAction } from "@/types/cart";

export const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case "ADD": {
      const itemExists = state.items.some(
        (item) =>
          item.id === action.payload.id &&
          item.imageUrl === action.payload.imageUrl &&
          item.basePrice === action.payload.basePrice
      );
      if (itemExists) {
        return state;
      } else {
        return { ...state, items: [...state.items, action.payload] };
      }
    }
    case "REMOVE": {
      const updatedItems = state.items.filter((item) => item.id !== action.payload);
      return { ...state, items: updatedItems };
    }
    default:
      return state;
  }
};
