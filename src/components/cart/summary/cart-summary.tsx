"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useIsClient } from "@/hooks/useIsClient";
import s from "./cart-summary.module.css";

interface Props {
  title: string;
  continueBuyingLabel: string;
  payLabel: string;
}

export const CartSummary: React.FC<Props> = ({ title, continueBuyingLabel, payLabel }) => {
  const cart = useCart();
  const isClient = useIsClient();
  const cartTotal = cart.items.reduce((total, item) => total + item.storage.price, 0);
  return (
    <div className={s.cart_summary}>
      <div className={s.cart_total}>
        <p>{title}</p>
        <p>{isClient ? cartTotal : 0} EUR</p>
      </div>
      <div className={s.cart_actions}>
        <Link className={s.continue_btn_link} href={{ pathname: "/" }}>
          <button className={s.continue_btn}>{continueBuyingLabel}</button>
        </Link>
        <button disabled={isClient ? cartTotal === 0 : true} className={s.pay_btn}>
          {payLabel}
        </button>
      </div>
    </div>
  );
};
