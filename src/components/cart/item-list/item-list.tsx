"use client";

import { CartItem } from "@/components/cart/cart-item/cart-item";
import { useCart } from "@/hooks/useCart";
import { useIsClient } from "@/hooks/useIsClient";
import s from "./item.list.module.css";

export const CartItemsList: React.FC = () => {
  const cart = useCart();
  const isClient = useIsClient();
  return (
    <div data-testid="cart-item-list" className={s.cart_list}>
      {isClient &&
        cart.items?.map((item, idx) => (
          <CartItem key={`${item.id}-${idx}`} {...item} currency="EUR" btnLabel="Eliminar" />
        ))}
    </div>
  );
};
