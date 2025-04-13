import { render, screen } from "@testing-library/react";
import { CartItemsList } from "@/components/cart/item-list/item-list";
import { useCart } from "@/hooks/useCart";
import { useIsClient } from "@/hooks/useIsClient";
import { CartContextValue } from "@/context/cart-context";
import { CartItem as CartItemProps } from "@/types/cart";

jest.mock("@/hooks/useCart");
jest.mock("@/hooks/useIsClient");

const mockedUseCart = useCart as jest.Mock<Partial<CartContextValue>, []>;
const mockedUseIsClient = useIsClient as jest.Mock<boolean>;

const mockCartItemList: CartItemProps[] = [
  {
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
  },
  {
    id: "asp-236",
    name: "Iphone 13",
    color: {
      name: "Space gray",
      hexCode: "#123456",
      imageUrl: "/iphone-13-space-gray",
    },
    storage: {
      capacity: "128 GB",
      price: 950,
    },
  },
];

describe("Cart Item List", () => {
  beforeEach(() => {
    mockedUseIsClient.mockReturnValue(true);
    mockedUseCart.mockReturnValue({ items: mockCartItemList });
  });
  test("render all list items", () => {
    render(<CartItemsList />);
    const cartItems = screen.getAllByTestId("cart-item");
    expect(cartItems.length).toBe(2);
  });

  test("render list items only in client", () => {
    mockedUseIsClient.mockReturnValue(false);
    render(<CartItemsList />);
    const cartItemList = screen.getByTestId("cart-item-list");
    expect(cartItemList.innerHTML).toBe("");
  });

  test("each cart item should recieve item props", () => {
    render(<CartItemsList />);
    const firstCartItemName = screen.getByText(mockCartItemList[0].name);
    expect(firstCartItemName).toBeInTheDocument();
    const secondCardItemName = screen.getByText(mockCartItemList[1].name);
    expect(secondCardItemName).toBeInTheDocument();
  });
});
