import { CartCounter } from "@/components/cart/counter/counter";
import { CartItemsList } from "@/components/cart/item-list/item-list";
import { CartSummary } from "@/components/cart/summary/cart-summary";
import s from "./page.module.css";

export default function CartPage() {
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>
        Cart
        <span>
          (<CartCounter />)
        </span>
      </h1>
      <CartItemsList />
      <CartSummary />
    </div>
  );
}
