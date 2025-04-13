import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartItem } from "@/types/cart";
import "@testing-library/jest-dom";
import { useCart } from "@/hooks/useCart";
import { useIsClient } from "@/hooks/useIsClient";
import { useUpdateQueryParam } from "@/hooks/useUpdateQueryParam";
import { CartContextValue } from "@/context/cart-context";
import { ProductHeader } from "@/components/product/header/product-header";
import { Product } from "@/types/product";

jest.mock("@/hooks/useCart");
const mockUseCart = useCart as jest.Mock<Partial<CartContextValue>, []>;

jest.mock("@/hooks/useIsClient");
const mockUseIsClient = useIsClient as jest.Mock<boolean>;

jest.mock("@/hooks/useUpdateQueryParam");
const mockUseUpdateQueryParams = useUpdateQueryParam as jest.Mock<typeof useUpdateQueryParam, []>;
const mockUpdateQuery = jest.fn();
mockUseUpdateQueryParams.mockReturnValue(mockUpdateQuery);

const mockAddToCartFn = jest.fn();

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
  {
    id: "apple-iphone-15-pro",
    name: "iPhone 15 Pro",
    color: { name: "Natural Titanium", hexCode: "#8A8A83", imageUrl: "/img-natural.jpg" },
    storage: { capacity: "128 GB", price: 1100 },
  },
];

const mockProductBase: Pick<Product, "id" | "name" | "brand" | "storageOptions" | "colorOptions"> = {
  id: "apple-iphone-15-pro",
  name: "iPhone 15 Pro",
  brand: "Apple",
  storageOptions: [
    { capacity: "128 GB", price: 1100 },
    { capacity: "256 GB", price: 1200 },
  ],
  colorOptions: [
    { name: "Natural Titanium", hexCode: "#8A8A83", imageUrl: "/img-natural.jpg" },
    { name: "Blue Titanium", hexCode: "#2E445C", imageUrl: "/img-blue.jpg" },
  ],
};

const defaultTestProps = {
  ...mockProductBase,
  currentStorage: "128 GB",
  currentColor: "Natural Titanium",
  storageLabel: "Storage:",
  colorLabel: "Color:",
  addButtonLabel: "Add to Cart",
  productInCartLabel: "In Cart",
};

describe("ProductHeader Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseIsClient.mockReturnValue(true);
    mockUseCart.mockReturnValue({ items: mockCartItems, addToCart: mockAddToCartFn });
  });

  test("renders essential product details based on selected options", () => {
    render(<ProductHeader {...defaultTestProps} />);

    expect(screen.getByText(defaultTestProps.storageLabel)).toBeInTheDocument();
    expect(screen.getByText(defaultTestProps.colorLabel)).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: defaultTestProps.name })).toBeInTheDocument();
    expect(screen.getByText(defaultTestProps.currentColor)).toBeInTheDocument();

    expect(screen.getByText(mockProductBase.storageOptions[0].price)).toBeInTheDocument();
    expect(screen.getByText("EUR")).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockProductBase.colorOptions[0].imageUrl);
    expect(image).toHaveAttribute("alt", `${defaultTestProps.name} ${defaultTestProps.currentColor} product picture`);
  });

  test("renders storage options and highlights the current selection", () => {
    render(<ProductHeader {...defaultTestProps} />);
    const storage128 = screen.getByText(defaultTestProps.storageOptions[0].capacity);
    const storage256 = screen.getByText(defaultTestProps.storageOptions[1].capacity);

    expect(storage128).toBeInTheDocument();
    expect(storage256).toBeInTheDocument();
    expect(storage128).toHaveAttribute("data-current", "true");
    expect(storage256).toHaveAttribute("data-current", "false");
  });

  test("renders color options and highlights the current selection", () => {
    render(<ProductHeader {...defaultTestProps} />);
    const colorNatural = screen.getByRole("button", { name: "Natural Titanium" });
    const colorBlue = screen.getByRole("button", { name: "Blue Titanium" });

    expect(colorNatural).toBeInTheDocument();
    expect(colorBlue).toBeInTheDocument();
    expect(colorNatural).toHaveAttribute("data-current", "true");
    expect(colorBlue).toHaveAttribute("data-current", "false");
  });

  test("calls updateQuery with correct params when a different storage option is clicked", async () => {
    render(<ProductHeader {...defaultTestProps} />);
    const storage256 = screen.getByRole("button", { name: "256 GB" });

    await userEvent.click(storage256);

    expect(mockUpdateQuery).toHaveBeenCalledTimes(1);
    expect(mockUpdateQuery).toHaveBeenCalledWith("storage", "256 GB");
  });

  test("calls updateQuery with correct params when a different color option is clicked", async () => {
    render(<ProductHeader {...defaultTestProps} />);
    const colorBlue = screen.getByRole("button", { name: "Blue Titanium" });

    await userEvent.click(colorBlue);

    expect(mockUpdateQuery).toHaveBeenCalledTimes(1);
    expect(mockUpdateQuery).toHaveBeenCalledWith("color", "Blue Titanium");
  });

  test('renders "Add to Cart" button disabled initially (isClient=false)', () => {
    mockUseIsClient.mockReturnValue(false);
    render(<ProductHeader {...defaultTestProps} />);

    const addButton = screen.getByRole("button", { name: defaultTestProps.addButtonLabel });
    expect(addButton).toBeDisabled();
  });

  test('renders "Add to Cart" button enabled when client and not in cart', () => {
    mockUseCart.mockReturnValue({ items: [] });
    render(<ProductHeader {...defaultTestProps} />);

    const addButton = screen.getByRole("button", { name: defaultTestProps.addButtonLabel });
    expect(addButton).toBeEnabled();
  });

  test('renders "Add to cart" button disabled when client and item is in cart', async () => {
    render(<ProductHeader {...defaultTestProps} />);

    const addToCartButton = screen.getByRole("button", { name: defaultTestProps.productInCartLabel });
    expect(addToCartButton).toBeInTheDocument();
    expect(addToCartButton).toBeDisabled();
  });
});
