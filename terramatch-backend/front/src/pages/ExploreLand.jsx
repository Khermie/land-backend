import { useMemo, useState } from "react";
import LandSearchHero from "../components/sections/LandSearchHero";
import LandMapExplorer from "../components/sections/LandMapExplorer";
import LandTrustFeatures from "../components/sections/LandTrustFeatures";
import ListLandBanner from "../components/sections/ListLandBanner";
import { FEATURED_LANDS, priceMatchesRange } from "../constants/lands";

const RESULTS_SECTION_ID = "land-results";

export default function ExploreLand() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Land");
  const [region, setRegion] = useState("All Regions");
  const [priceRange, setPriceRange] = useState("Any Price");

  const filteredLands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return FEATURED_LANDS.filter((land) => {
      const matchesQuery =
        !normalizedQuery ||
        land.name.toLowerCase().includes(normalizedQuery) ||
        land.location.toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        category === "All Land" || land.category === category;

      const matchesRegion =
        region === "All Regions" || land.region === region;

      const matchesPrice = priceMatchesRange(land.priceValue, priceRange);

      return matchesQuery && matchesCategory && matchesRegion && matchesPrice;
    });
  }, [query, category, region, priceRange]);

  function resetFilters() {
    setQuery("");
    setCategory("All Land");
    setRegion("All Regions");
    setPriceRange("Any Price");
  }

  return (
    <>
      <LandSearchHero
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        region={region}
        onRegionChange={setRegion}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        resultsSectionId={RESULTS_SECTION_ID}
      />
      <LandMapExplorer
        sectionId={RESULTS_SECTION_ID}
        lands={filteredLands}
        onViewAll={resetFilters}
      />
      <LandTrustFeatures />
      <ListLandBanner />
    </>
  );
}
