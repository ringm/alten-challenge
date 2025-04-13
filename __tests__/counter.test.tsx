import { CartCounter } from "@/components/cart/counter/counter";
import { render, screen } from "@testing-library/react";
import { useCart } from "@/hooks/useCart";
import { useIsClient } from "@/hooks/useIsClient";

jest.mock("@/hooks/useCart");
jest.mock("@/hooks/useIsClient");

const mockedUseCart = useCart as jest.Mock;
const mockedUseIsClient = useIsClient as jest.Mock;

describe("Cart counter", () => {
  const testId = "cart-counter";
  let counter: HTMLElement;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders component", () => {
    render(<CartCounter />);
    counter = screen.getByTestId(testId);
    expect(counter).toBeInTheDocument();
  });

  test("renders component with cart items count", () => {
    const testItemCount = 5;
    mockedUseIsClient.mockReturnValue(true);
    mockedUseCart.mockReturnValue({ itemsCount: testItemCount });
    render(<CartCounter />);
    counter = screen.getByTestId(testId);
    expect(counter.textContent).toBe("5");
  });

  test("renders component with cart items count equal to zero when is not client", () => {
    mockedUseIsClient.mockReturnValue(false);
    render(<CartCounter />);
    counter = screen.getByTestId(testId);
    expect(counter.textContent).toBe("0");
  });

  test("element should be hidden when is not in client", () => {
    mockedUseIsClient.mockReturnValue(false);
    render(<CartCounter />);
    counter = screen.getByTestId(testId);
    expect(counter).toBeInTheDocument();
    expect(counter.getAttribute("data-visible")).toBe("false");
  });

  test("element should be visible when is in client", () => {
    mockedUseIsClient.mockReturnValue(true);
    render(<CartCounter />);
    counter = screen.getByTestId(testId);
    expect(counter).toBeInTheDocument();
    expect(counter.getAttribute("data-visible")).toBe("true");
  });
});
