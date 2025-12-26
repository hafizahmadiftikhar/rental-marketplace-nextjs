import { Suspense } from "react";
import SearchPageClient from "../../components/SearchPageClient";

function SearchPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading search results...</div>}>
      <SearchPageClient />
    </Suspense>
  );
}

export default SearchPage;