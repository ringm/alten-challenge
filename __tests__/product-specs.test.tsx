import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ProductSpecs } from "@/components/product/specs/product-specs";

const mockProductData = {
  title: "Product Details",
  name: "Super Gadget Pro",
  brand: "GadgetCorp",
  description: "The best gadget ever.",
  specs: {
    screen: '6.67" AMOLED',
    resolution: "No especificada",
    processor: "Mediatek Dimensity 9200+ (4 nm)",
    mainCamera:
      "Cámara principal Leica de 50MP + Cámara teleobjetivo Leica de 50MP + Cámara Leica ultra gran angular de 12MP",
    selfieCamera: "3mp",
    battery: "1200 mAh",
    os: "Android",
    screenRefreshRate: "144 Hz",
  },
};

describe("ProductSpecs Component", () => {
  test("renders all provided specifications correctly formatted in the table", () => {
    render(<ProductSpecs {...mockProductData} />);

    const tableValuesToCheck = [
      mockProductData.name,
      mockProductData.brand,
      mockProductData.description,
      ...Object.values(mockProductData.specs),
    ];

    tableValuesToCheck.forEach((value) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  test("renders correctly even with empty specs object", () => {
    render(
      <ProductSpecs
        title="Basic Info"
        name="Simple Device"
        brand="BasicBrand"
        description="Just the basics."
        specs={{}}
      />
    );

    expect(screen.getByText("Basic Info")).toBeInTheDocument();
  });
});
