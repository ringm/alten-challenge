import { Product, ProductColor, ProductStorage } from "@/types/product";

export interface CartState {
  items: CartItem[];
}

interface AddToCartAction {
  type: "ADD";
  payload: CartItem;
}

interface RemoveFromCartAction {
  type: "REMOVE";
  payload: CartItem;
}

export type CartAction = AddToCartAction | RemoveFromCartAction;

export type CartItem = Pick<Product, "id" | "name"> & { color: ProductColor } & { storage: ProductStorage };
