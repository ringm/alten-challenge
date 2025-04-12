import { ProductSummary } from "@/types/product";

export interface CartState {
  items: ProductSummary[];
}

interface AddToCartAction {
  type: "ADD";
  payload: ProductSummary;
}

interface RemoveFromCartAction {
  type: "REMOVE";
  payload: ProductSummary["id"];
}

export type CartAction = AddToCartAction | RemoveFromCartAction;
