import { CartItem } from "@/components/cart/cart-item/cart-item";
import { render, screen } from "@testing-library/react";
import { useCart } from "@/hooks/useCart";
import { CartItem as CartItemProps } from "@/types/cart";
import userEvent from "@testing-library/user-event";
import { CartContextValue } from "@/context/cart-context";

jest.mock("@/hooks/useCart");

const mockedUseCart = useCart as jest.Mock<Partial<CartContextValue>, []>;

const mockCartItem: CartItemProps = {
  id: "asp-234",
  name: "Iphone 16",
  color: {
    name: "Space gray",
    hexCode: "#123456",
    imageUrl: "/iphone-space-gray",
  },
  storage: {
    capacity: "256 GB",
    price: 1200,
  },
};

describe("Cart Item", () => {
  const cartTestId = "cart-item";
  let cartItem: HTMLElement;
  const currency = "EUR";
  const btnLabel = "Eliminar";
  const mockRemoveFromCartFn: jest.Mock = jest.fn();
  mockedUseCart.mockReturnValue({
    removeFromCart: mockRemoveFromCartFn,
  });
  test("renders cart with props", () => {
    render(<CartItem {...mockCartItem} currency={currency} btnLabel={btnLabel} />);

    cartItem = screen.getByTestId(cartTestId);
    expect(cartItem).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockCartItem.color.imageUrl);
    expect(img).toHaveAttribute("alt", `${mockCartItem.name} product image`);

    const name = screen.getByText(mockCartItem.name);
    expect(name).toBeInTheDocument();

    const storage = screen.getByText(mockCartItem.storage.capacity);
    expect(storage).toBeInTheDocument();

    const color = screen.getByText(mockCartItem.color.name);
    expect(color).toBeInTheDocument();

    const priceAndCurrency = screen.getByText(`${mockCartItem.storage.price} ${currency}`);
    expect(priceAndCurrency).toBeInTheDocument();

    const btn = screen.getByText(btnLabel);
    expect(btn).toBeInTheDocument();
  });

  test("remove from cart is called when delete button is clicked", async () => {
    render(<CartItem {...mockCartItem} currency={currency} btnLabel={btnLabel} />);

    const btn = screen.getByText(btnLabel);
    await userEvent.click(btn);

    expect(mockRemoveFromCartFn).toHaveBeenCalledTimes(1);
    expect(mockRemoveFromCartFn).toHaveBeenCalledWith({
      id: mockCartItem.id,
      name: mockCartItem.name,
      storage: mockCartItem.storage,
      color: mockCartItem.color,
    });
  });
});
