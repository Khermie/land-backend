import Button from "../common/Button";
import Dropdown from "../common/Dropdown";
import SearchInput from "../common/SearchInput";
import {
  LAND_CATEGORIES,
  LAND_REGIONS,
  LAND_PRICE_RANGE_OPTIONS,
} from "../../constants/lands";
import { cn } from "../../utils/cn";

/**
 * Fully controlled — all filter state lives in the parent
 * (ExploreLand.jsx) page. The category pill row here and the "All
 * Types" dropdown both drive the same `category` value, since they
 * represent the same selection in two places in the source design.
 */
export default function LandSearchHero({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  region,
  onRegionChange,
  priceRange,
  onPriceRangeChange,
  resultsSectionId,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    document
      .getElementById(resultsSectionId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="container-page py-10 sm:py-14">
      <h1 className="text-4xl font-extrabold text-ink-900 sm:text-5xl">
        Explore Land
      </h1>
      <p className="mt-2 text-lg text-ink-700">
        Find the perfect land for your next project.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <SearchInput
          placeholder="Search location, area or keyword..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        <div className="flex flex-wrap items-center gap-3">
          <Dropdown
            label="Region"
            options={LAND_REGIONS}
            value={region}
            onChange={onRegionChange}
          />
          <Dropdown
            label="Land type"
            options={LAND_CATEGORIES}
            value={category}
            onChange={onCategoryChange}
          />
          <Dropdown
            label="Price range"
            options={LAND_PRICE_RANGE_OPTIONS}
            value={priceRange}
            onChange={onPriceRangeChange}
          />
          <Button type="submit" variant="primary" size="md">
            Search
          </Button>
        </div>
      </form>

      <div className="mt-5 flex flex-wrap gap-2.5" role="group" aria-label="Land category filters">
        {LAND_CATEGORIES.map((cat) => {
          const isActive = cat === category;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-forest-500 bg-forest-100 text-forest-700"
                  : "border-ink-900/10 bg-white text-ink-700 hover:bg-mist-100"
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </section>
  );
}
