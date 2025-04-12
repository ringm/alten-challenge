import { ProductCard } from "@/components/product/card/product-card";
import { getProducts } from "@/services/productsService";

import s from "./search-results.module.css";

interface Props {
  title: string;
  searchQuery: string;
  notFoundMessage: string;
}

export const SearchResults: React.FC<Props> = async ({ title, notFoundMessage, searchQuery }) => {
  const data = await getProducts({ limit: searchQuery ? 0 : 20, search: searchQuery });
  if (!data) {
    return <div>Error buscando resultados</div>;
  }
  return (
    <section>
      <h2 className={s.title}>
        {data.length} {title}
      </h2>
      {data.length > 0 ? (
        <div className={s.results__wrapper} data-less-than-three={data.length < 3}>
          {data.map((product, i) => (
            <ProductCard key={`${product.id}-${i}`} {...product} />
          ))}
        </div>
      ) : (
        <div>{notFoundMessage}</div>
      )}
    </section>
  );
};
