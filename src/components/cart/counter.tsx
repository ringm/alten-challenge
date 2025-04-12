"use client";

import { useCart } from "@/hooks/useCart";
import { useIsClient } from "@/hooks/useIsClient";
import s from "./counter.module.css";

export const CartCounter: React.FC = () => {
  const cart = useCart();
  const isClient = useIsClient();

  return (
    <span className={s.label} data-visible={isClient}>
      {isClient ? cart.itemsCount : 0}
    </span>
  );
};
