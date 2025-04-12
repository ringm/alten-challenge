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
  colorOptions: ProductColor[];
  storageOptions: ProductStorage[];
  similarProducts: ProductCard[];
}

export type ProductCard = Pick<Product, "id" | "brand" | "name" | "basePrice"> & {
  imageUrl: string;
  colorName: string;
  storage: string;
};

export type ProductColor = {
  name: string;
  hexCode: string;
  imageUrl: string;
};

export type ProductStorage = {
  capacity: string;
  price: number;
};
