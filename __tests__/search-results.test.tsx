import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/types/product";
import { SearchResults } from "@/components/search/results/search-results";

jest.mock("@/services/productsService", () => ({
  getProducts: jest.fn(),
}));

import { getProducts } from "@/services/productsService";

const mockProducts: ProductCard[] = [
  {
    id: "OPP-R12FS",
    brand: "OPPO",
    name: "Reno 12 FS 4G",
    basePrice: 299,
    imageUrl: "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/OPP-R12FS-amber-orange.webp",
  },
  {
    id: "RLM-NOTE50",
    brand: "realme",
    name: "Note 50",
    basePrice: 99,
    imageUrl: "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/RLM-NOTE50-midnight-black.webp",
  },
];

const mockedGetProducts = getProducts as jest.Mock<Promise<ProductCard[] | null>>;

const defaultProps = {
  title: "Products Found",
  searchQuery: "test",
  notFoundMessage: "No products match your search.",
};

describe("SearchResults Component", () => {
  beforeEach(() => {
    mockedGetProducts.mockReset();
  });

  test("should display products when getProducts returns data", async () => {
    mockedGetProducts.mockResolvedValue(mockProducts);

    const resolvedJsx = await SearchResults(defaultProps);
    render(resolvedJsx);

    expect(mockedGetProducts).toHaveBeenCalledTimes(1);
    expect(mockedGetProducts).toHaveBeenCalledWith({ limit: 0, search: defaultProps.searchQuery });

    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(mockProducts.length);
  });

  test('should display "not found" message when getProducts returns empty array', async () => {
    mockedGetProducts.mockResolvedValue([]);

    const resolvedJsx = await SearchResults(defaultProps);
    render(resolvedJsx);

    const title = screen.getByRole("heading", { name: /0 Products Found/i });
    expect(title).toBeInTheDocument();

    const notFound = screen.getByText(defaultProps.notFoundMessage);
    expect(notFound).toBeInTheDocument();
  });

  test("should pass correct props to getProducts based on searchQuery", async () => {
    const propsNoQuery = { ...defaultProps, searchQuery: "" };
    mockedGetProducts.mockResolvedValue([]);

    const withSearchQuery = await SearchResults(propsNoQuery);
    render(withSearchQuery);

    expect(mockedGetProducts).toHaveBeenCalledTimes(1);
    expect(mockedGetProducts).toHaveBeenCalledWith({ limit: 20, search: "" });
  });
});
