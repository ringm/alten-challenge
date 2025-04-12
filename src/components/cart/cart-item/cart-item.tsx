"use client";

import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import s from "./cart-item.module.css";
import { CartItem as CartItemProps } from "@/types/cart";

export const CartItem: React.FC<CartItemProps> = ({ id, name, color, storage }) => {
  const cart = useCart();
  return (
    <article className={s.cart_item}>
      <Image className={s.item_image} src={color.imageUrl} alt={`${name} product image`} width={160} height={198} />
      <div className={s.item_info}>
        <p className={s.item_title}>{name}</p>
        <p className={s.item_desc}>
          <span>{storage.capacity}</span> | <span>{color.name}</span>
        </p>
        <p className={s.item_price}>{storage.price} EUR</p>
        <button className={s.delete_btn} onClick={() => cart.removeFromCart({ id, name, storage, color })}>
          Eliminar
        </button>
      </div>
    </article>
  );
};
