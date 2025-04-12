"use client";

import { ProductSummary } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import s from "./cart-item.module.css";

export const CartItem: React.FC<ProductSummary> = ({ id, name, basePrice, colorName, storage, imageUrl }) => {
  const cart = useCart();
  return (
    <article className={s.cart_item}>
      <Image className={s.item_image} src={imageUrl} alt={`${name} product image`} width={160} height={198} />
      <div className={s.item_info}>
        <p className={s.item_title}>{name}</p>
        <p className={s.item_desc}>
          <span>{storage}</span> | <span>{colorName}</span>
        </p>
        <p className={s.item_price}>{basePrice} EUR</p>
        <button className={s.delete_btn} onClick={() => cart.removeFromCart(id)}>
          Eliminar
        </button>
      </div>
    </article>
  );
};
