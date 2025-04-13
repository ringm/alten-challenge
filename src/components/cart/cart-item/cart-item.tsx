"use client";

import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import s from "./cart-item.module.css";
import { CartItem as CartItemProps } from "@/types/cart";

export const CartItem: React.FC<CartItemProps & { currency: "EUR"; btnLabel: string }> = ({
  id,
  name,
  color,
  storage,
  currency,
  btnLabel,
}) => {
  const cart = useCart();
  return (
    <article data-testid="cart-item" className={s.cart_item}>
      <div className={s.img_wrapper}>
        <Image
          className={s.img}
          src={color.imageUrl}
          alt={`${name} product image`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw"
          priority
        />
      </div>
      <div className={s.info}>
        <p className={s.title}>{name}</p>
        <p className={s.desc}>
          <span>{storage.capacity}</span> | <span>{color.name}</span>
        </p>
        <p className={s.price}>
          {storage.price} {currency}
        </p>
        <button className={s.delete_btn} onClick={() => cart.removeFromCart({ id, name, storage, color })}>
          {btnLabel}
        </button>
      </div>
    </article>
  );
};
