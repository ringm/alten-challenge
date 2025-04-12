export interface Product {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: {
    screen: string;
    resolution: string;
    processor: string;
    mainCamera: string;
    selfieCamera: string;
    battery: string;
    os: string;
    screenRefreshRate: string;
  };
  colorOptions: {
    name: string;
    hexCode: string;
    imageUrl: string;
  }[];
  storageOptions: {
    capacity: string;
    price: number;
  }[];
  similarProducts: ProductSummary[];
}

export type ProductSummary = Pick<Product, "id" | "brand" | "name" | "basePrice"> & {
  imageUrl: string;
  colorName: string;
  storage: string;
};
