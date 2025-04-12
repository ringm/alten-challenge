"use client";

import { CartCounter } from "@/components/cart/counter";
import { CartItem } from "@/components/cards/cart-item/cart-item";
import { useCart } from "@/hooks/useCart";
import { useIsClient } from "@/hooks/useIsClient";
import Link from "next/link";

import s from "./page.module.css";

export default function CartPage() {
  const cart = useCart();
  const isClient = useIsClient();
  const cartTotal = cart.items.reduce((total, item) => total + item.basePrice, 0);
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>
        Cart
        <span>
          (<CartCounter />)
        </span>
      </h1>
      {isClient && (
        <>
          <div className={s.cart_list}>
            {cart.items?.map((item, idx) => (
              <CartItem key={`${item.id}-${idx}`} {...item} />
            ))}
          </div>
          <div className={s.cart_footer}>
            <div className={s.cart_total}>
              <p>total</p>
              <p>{cartTotal} EUR</p>
            </div>
            <div className={s.cart_actions}>
              <Link className={s.continue_btn_link} href={{ pathname: "/" }}>
                <button className={s.continue_btn}>continue shopping</button>
              </Link>
              <button className={s.pay_btn}>pay</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
