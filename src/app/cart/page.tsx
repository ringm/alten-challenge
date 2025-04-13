import { CartCounter } from "@/components/cart/counter/counter";
import { CartItemsList } from "@/components/cart/item-list/item-list";
import { CartSummary } from "@/components/cart/summary/cart-summary";

export default function CartPage() {
  return (
    <>
      <h1 className="main-heading">
        Carrito{" "}
        <span>
          (<CartCounter />)
        </span>
      </h1>
      <CartItemsList />
      <CartSummary title="total" continueBuyingLabel="seguir comprando" payLabel="pagar" currency="EUR" />
    </>
  );
}
