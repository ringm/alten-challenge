import { render, screen } from "@testing-library/react";
import { CartSummary } from "@/components/cart/summary/cart-summary";
import { useCart } from "@/hooks/useCart";
import { useIsClient } from "@/hooks/useIsClient";
import { CartContextValue } from "@/context/cart-context";
import { CartItem } from "@/types/cart";

jest.mock("@/hooks/useCart");
const mockUseCart = useCart as jest.Mock<Partial<CartContextValue>, []>;

jest.mock("@/hooks/useIsClient");
const mockUseIsClient = useIsClient as jest.Mock<boolean>;

const mockCartItems: CartItem[] = [
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

const cartTotal = mockCartItems.reduce((total, item) => total + item.storage.price, 0);

const defaultProps = {
  currency: "EUR",
  title: "cart",
  continueBuyingLabel: "Continue buying",
  payLabel: "pay",
};

describe("Cart Summary", () => {
  beforeEach(() => {
    mockUseIsClient.mockReturnValue(true);
    mockUseCart.mockReturnValue({ items: mockCartItems });
  });

  test("should calculate cart total based on cart items", () => {
    render(<CartSummary {...defaultProps} />);
    const total = screen.getByTestId("cart-total");
    expect(total).toBeInTheDocument();
    expect(total.textContent).toBe(`${cartTotal} ${defaultProps.currency}`);
  });

  test("cart total should be zero when not in client", () => {
    mockUseIsClient.mockReturnValue(false);
    render(<CartSummary {...defaultProps} />);
    const total = screen.getByTestId("cart-total");
    expect(total).toBeInTheDocument();
    expect(total.textContent).toBe(`0 ${defaultProps.currency}`);
  });

  test("pay button should be enabled when in client", () => {
    render(<CartSummary {...defaultProps} />);
    const payButton = screen.getByText(defaultProps.payLabel);
    expect(payButton).toBeInTheDocument();
    expect(payButton).toBeEnabled();
  });

  test("pay button should be enabled when cart is not empty", () => {
    render(<CartSummary {...defaultProps} />);
    const payButton = screen.getByText(defaultProps.payLabel);
    expect(payButton).toBeInTheDocument();
    expect(payButton).toBeEnabled();
  });

  test("pay button should be disabled when cart is empty", () => {
    mockUseCart.mockReturnValue({ items: [] });
    render(<CartSummary {...defaultProps} />);
    const payButton = screen.getByText(defaultProps.payLabel);
    expect(payButton).toBeInTheDocument();
    expect(payButton).toBeDisabled();
  });

  test("pay button should be disabled when cart is not in client", () => {
    mockUseIsClient.mockReturnValue(false);
    render(<CartSummary {...defaultProps} />);
    const payButton = screen.getByText(defaultProps.payLabel);
    expect(payButton).toBeInTheDocument();
    expect(payButton).toBeDisabled();
  });
});
