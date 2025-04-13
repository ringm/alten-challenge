import { Suspense } from "react";
import { Search } from "@/components/search/input/search";
import { SearchResults } from "@/components/search/results/search-results";

export default async function Home({ searchParams }: { searchParams?: Promise<{ search: string }> }) {
  const searchQuery = (await searchParams)?.search;
  return (
    <>
      <h1 className="visually-hidden">Página principal</h1>
      <Search placeholder="Busca por marca o modelo" label="Busca por marca o modelo" />
      <Suspense fallback={<p style={{ marginTop: "5rem" }}>Cargando resultados...</p>}>
        <SearchResults
          searchQuery={searchQuery || ""}
          title="resultados"
          notFoundMessage='No encontramos resultados para tu búsqueda. Intenta con otra marca ("Apple", "Samsung",
          etc) o modelo ("Galaxy", "iPhone", etc).'
        />
      </Suspense>
    </>
  );
}
