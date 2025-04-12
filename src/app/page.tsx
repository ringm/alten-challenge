import { Suspense } from "react";
import { Search } from "@/components/search/input/search";
import { SearchResults } from "@/components/search/results/search-results";

export default async function Home({ searchParams }: { searchParams: Promise<{ search: string }> }) {
  const searchQuery = (await searchParams).search;
  return (
    <>
      <Search />
      <Suspense fallback={<p style={{ marginTop: "5rem" }}>Cargando resultados...</p>}>
        <SearchResults searchQuery={searchQuery} />
      </Suspense>
    </>
  );
}
