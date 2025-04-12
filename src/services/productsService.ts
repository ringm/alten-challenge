import { SearchParams } from "@/types/api";
import { Product, ProductSummary } from "@/types/product";
import { customFetch } from "@/utils/api";

export const getProducts = async (params: SearchParams): Promise<ProductSummary[] | null> => {
  try {
    const definedParams: Record<string, string> = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        definedParams[key] = String(value);
      }
    });

    const searchParams = new URLSearchParams(definedParams);
    const data = await customFetch<ProductSummary[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/products?${searchParams.toString()}`
    );

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};
export const getProductById = async (id: string) => {
  try {
    const data = await customFetch<Product>(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};
