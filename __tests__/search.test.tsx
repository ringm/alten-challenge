import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useUpdateQueryParam } from "@/hooks/useUpdateQueryParam";

import { Search } from "@/components/search/input/search"; // Adjust path as needed

const mockGet = jest.fn((key: string) => key || "");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => "/"),
  useSearchParams: jest.fn(() => ({
    get: mockGet,
  })),
}));

jest.mock("@/hooks/useUpdateQueryParam");
const mockUseUpdateQueryParams = useUpdateQueryParam as jest.Mock<typeof useUpdateQueryParam, []>;
const mockUpdateQuery = jest.fn();
mockUseUpdateQueryParams.mockReturnValue(mockUpdateQuery);

describe("Search Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGet.mockReturnValue("");
  });

  test("renders search input with correct accessible label and placeholder", () => {
    const testLabel = "Search the website";
    const testPlaceholder = "Enter search term...";

    render(<Search label={testLabel} placeholder={testPlaceholder} />);

    const inputElement = screen.getByLabelText(testLabel);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "search");
    expect(inputElement).toHaveAttribute("placeholder", testPlaceholder);
    expect(inputElement).toHaveValue("");
  });

  test("renders search input with defaultValue from search params", () => {
    const testLabel = "Search the website";
    const testPlaceholder = "Enter search term...";
    const initialQuery = "initial value";

    mockGet.mockImplementation((key: string) => {
      if (key === "search") {
        return initialQuery;
      }
      return "";
    });

    render(<Search label={testLabel} placeholder={testPlaceholder} />);
    const inputElement = screen.getByLabelText(testLabel);

    expect(inputElement).toHaveValue(initialQuery);
  });
});
