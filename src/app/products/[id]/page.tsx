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
      <h1 className="visually-hidden">Detalles del producto: {product.name}</h1>
      <ProductHeader
        id={product.id}
        name={product.name}
        brand={product.brand}
        colorOptions={product.colorOptions}
        storageOptions={product.storageOptions}
        currentStorage={storage}
        currentColor={color}
        storageLabel="espacio ¿cuánto necesitas?"
        colorLabel="color: elige el que más que gusta"
        addButtonLabel="añadir"
        productInCartLabel="éste producto ya se encuentra en el carrito"
      />
      <ProductSpecs
        title="especificaciones"
        name={product.name}
        brand={product.brand}
        description={product.description}
        specs={product.specs}
      />
      <SimilarProducts title="productos similares" similarProducts={product.similarProducts} />
    </>
  );
}
