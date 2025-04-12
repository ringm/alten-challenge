import { getProductById } from "@/services/productsService";
import { ProductHeader } from "@/components/product/header/product-header";
import { ProductSpecs } from "@/components/product/specs/product-specs";
import { SimilarProducts } from "@/components/product/similar/similar-products";

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ storage: string; color: string }>;
}) {
  const { id } = await params;
  const { storage, color } = await searchParams;
  const product = await getProductById(id);
  if (!product) {
    return <div>Producto no econtrado</div>;
  }
  return (
    <>
      <ProductHeader
        id={product.id}
        name={product.name}
        brand={product.brand}
        colorOptions={product.colorOptions}
        storageOptions={product.storageOptions}
        currentStorage={storage}
        currentColor={color}
      />
      <ProductSpecs name={product.name} brand={product.brand} description={product.description} specs={product.specs} />
      <SimilarProducts similarProducts={product.similarProducts} />
    </>
  );
}
