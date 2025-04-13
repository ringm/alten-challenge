"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useIsClient } from "@/hooks/useIsClient";
import s from "./cart-summary.module.css";

interface Props {
  title: string;
  continueBuyingLabel: string;
  payLabel: string;
  currency: string;
}

export const CartSummary: React.FC<Props> = ({ title, continueBuyingLabel, payLabel, currency }) => {
  const cart = useCart();
  const isClient = useIsClient();
  const cartTotal = cart.items.reduce((total, item) => total + item.storage.price, 0);
  return (
    <section className={s.cart_summary}>
      <div className={s.cart_total}>
        <h2>{title}</h2>
        <p data-testid="cart-total">
          {isClient ? cartTotal : 0} {currency}
        </p>
      </div>
      <div className={s.cart_actions}>
        <Link className={s.continue_btn_link} href={{ pathname: "/" }}>
          <button className={s.continue_btn}>{continueBuyingLabel}</button>
        </Link>
        <button disabled={isClient ? cartTotal === 0 : true} className={s.pay_btn}>
          {payLabel}
        </button>
      </div>
    </section>
  );
};
