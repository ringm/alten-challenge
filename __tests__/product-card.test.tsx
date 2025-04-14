import React from "react";
import { render, screen } from "@testing-library/react";

import { ProductCard as ProductCardProps } from "@/types/product";
import { ProductCard } from "@/components/product/card/product-card";

const mockProduct: ProductCardProps = {
  id: "apple-iphone-15",
  brand: "Apple",
  name: "iPhone 15",
  basePrice: 959,
  imageUrl: "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/OPP-A60-midnight-purple.webp",
};

describe("ProductCard Component", () => {
  test("renders product image with correct src and alt text", () => {
    render(<ProductCard {...mockProduct} currency="EUR" />);

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", `${mockProduct.name} product image`);
    expect(image).toHaveAttribute("src", mockProduct.imageUrl);
  });

  test("renders product brand", () => {
    render(<ProductCard {...mockProduct} currency="EUR" />);

    expect(screen.getByText(mockProduct.brand)).toBeInTheDocument();
  });

  test("renders product price with currency", () => {
    render(<ProductCard {...mockProduct} currency="EUR" />);

    const priceElement = screen.getByText((content, element) => {
      const hasPrice = content.includes(mockProduct.basePrice.toString());
      const hasCurrency = element?.querySelector("span")?.textContent === "EUR";
      return hasPrice && hasCurrency;
    });
    expect(priceElement).toBeInTheDocument();
  });

  test("renders as a link pointing to the correct product URL", () => {
    render(<ProductCard {...mockProduct} currency="EUR" />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", `/products/${mockProduct.id}`);
  });

  test("renders article element for semantics", () => {
    render(<ProductCard {...mockProduct} currency="EUR" />);

    const articleElement = screen.getByRole("article");
    expect(articleElement).toBeInTheDocument();
  });
});
