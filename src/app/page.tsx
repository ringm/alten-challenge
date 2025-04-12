import styles from "./page.module.css";
import { getProducts } from "@/services/productsService";
import { ProductCard } from "@/components/cards/product/product";

export default async function Home() {
  const data = await getProducts({ limit: 20 });
  if (!data) {
    return <div>Error fetching products</div>;
  }
  return (
    <>
      <div className={styles.results__wrapper}>
        {data.map((product, i) => (
          <ProductCard key={`${product.id}-${i}`} {...product} />
        ))}
      </div>
    </>
  );
}
