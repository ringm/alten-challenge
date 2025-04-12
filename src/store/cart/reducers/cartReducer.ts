import { CartState, CartAction } from "@/types/cart";

export const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case "ADD": {
      const itemExists = state.items.some(
        (item) =>
          item.id === action.payload.id &&
          item.color.imageUrl === action.payload.color.imageUrl &&
          item.storage.capacity === action.payload.storage.capacity
      );
      if (itemExists) {
        return state;
      } else {
        return { ...state, items: [...state.items, action.payload] };
      }
    }
    case "REMOVE": {
      const updatedItems = state.items.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.color.imageUrl !== action.payload.color.imageUrl ||
          item.storage.capacity !== action.payload.storage.capacity
      );
      return { ...state, items: updatedItems };
    }
    default:
      return state;
  }
};
