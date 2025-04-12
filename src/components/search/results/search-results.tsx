import { ProductCard } from "@/components/product/card/product-card";
import { getProducts } from "@/services/productsService";

import s from "./search-results.module.css";

export const SearchResults: React.FC<{ searchQuery: string }> = async ({ searchQuery }) => {
  const data = await getProducts({ limit: searchQuery ? 0 : 20, search: searchQuery });
  if (!data) {
    return <div>Error fetching products</div>;
  }
  return (
    <section>
      <h2 className={s.title}>{data.length} results</h2>
      {data.length > 0 ? (
        <div className={s.results__wrapper} data-less-than-three={data.length < 3}>
          {data.map((product, i) => (
            <ProductCard key={`${product.id}-${i}`} {...product} />
          ))}
        </div>
      ) : (
        <div>
          No results. Try searching a different brand (&quot;Apple&quot;, &quot;Samsung&quot;, etc) or model
          (&quot;Galaxy&quot;, &quot;iPhone&quot;).
        </div>
      )}
    </section>
  );
};
