import { useMemo, useState } from "react";
import ContractorHero from "../components/sections/ContractorHero";
import TopContractors from "../components/sections/TopContractors";
import CategoriesAndTrust from "../components/sections/CategoriesAndTrust";
import CustomProjectBanner from "../components/sections/CustomProjectBanner";
import { CONTRACTORS, ratingOptionToMin } from "../constants/contractors";

const RESULTS_SECTION_ID = "contractor-results";

export default function FindContractor() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("All Locations");
  const [ratingLabel, setRatingLabel] = useState("Any rating");

  const filteredContractors = useMemo(() => {
    const minRating = ratingOptionToMin(ratingLabel);
    const normalizedQuery = query.trim().toLowerCase();

    return CONTRACTORS.filter((c) => {
      const matchesQuery =
        !normalizedQuery ||
        c.name.toLowerCase().includes(normalizedQuery) ||
        c.specialties.toLowerCase().includes(normalizedQuery) ||
        c.location.toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        category === "All Categories" ||
        category === "Others" ||
        c.category === category;

      const matchesLocation =
        location === "All Locations" ||
        c.location.startsWith(location);

      const matchesRating = c.rating >= minRating;

      return matchesQuery && matchesCategory && matchesLocation && matchesRating;
    });
  }, [query, category, location, ratingLabel]);

  function resetFilters() {
    setQuery("");
    setCategory("All Categories");
    setLocation("All Locations");
    setRatingLabel("Any rating");
  }

  return (
    <>
      <ContractorHero
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        location={location}
        onLocationChange={setLocation}
        ratingLabel={ratingLabel}
        onRatingChange={setRatingLabel}
        resultsSectionId={RESULTS_SECTION_ID}
      />
      <TopContractors
        sectionId={RESULTS_SECTION_ID}
        subtitle="Browse highly rated and verified professionals."
        reviewsLabel="Reviews"
        contractors={filteredContractors}
        onViewAll={resetFilters}
      />
      <CategoriesAndTrust category={category} onCategoryChange={setCategory} />
      <CustomProjectBanner />
    </>
  );
}
