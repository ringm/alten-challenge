"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useIsClient } from "@/hooks/useIsClient";
import s from "./cart-summary.module.css";

export const CartSummary: React.FC = () => {
  const cart = useCart();
  const isClient = useIsClient();
  const cartTotal = cart.items.reduce((total, item) => total + item.storage.price, 0);
  return (
    <div className={s.cart_summary}>
      <div className={s.cart_total}>
        <p>total</p>
        <p>{isClient ? cartTotal : 0} EUR</p>
      </div>
      <div className={s.cart_actions}>
        <Link className={s.continue_btn_link} href={{ pathname: "/" }}>
          <button className={s.continue_btn}>seguir comprando</button>
        </Link>
        <button disabled={isClient ? cartTotal === 0 : true} className={s.pay_btn}>
          pagar
        </button>
      </div>
    </div>
  );
};
