import Button from "../common/Button";
import Dropdown from "../common/Dropdown";
import SearchInput from "../common/SearchInput";
import { ImageSkeleton } from "../common/Skeleton";
import {
  CONTRACTOR_CATEGORY_OPTIONS,
  CONTRACTOR_LOCATIONS,
  CONTRACTOR_RATING_OPTIONS,
} from "../../constants/contractors";

/**
 * Fully controlled — all filter state lives in the parent
 * (FindContractor.jsx) page so the hero's search/filters and the
 * results grid below stay in sync.
 */
export default function ContractorHero({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  location,
  onLocationChange,
  ratingLabel,
  onRatingChange,
  resultsSectionId,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    document
      .getElementById(resultsSectionId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="relative overflow-hidden">
      {/*
        PLACEHOLDER ASSET: photo of two contractors on a construction
        site (hi-vis vests, hard hats) per the source design. Replace
        the ImageSkeleton below with a real <img> pointing at
        /src/assets/images/find-contractor-hero.jpg
      */}
      <ImageSkeleton className="absolute inset-0 h-full w-full rounded-none" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent"
        aria-hidden="true"
      />

      <div className="container-page relative py-14 sm:py-20">
        <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">
          Find the Right Contractor
        </h1>
        <p className="mt-2 max-w-md text-lg text-ink-700">
          Contactors verified. Reviews you can trust.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 max-w-2xl rounded-2xl bg-white/95 p-5 shadow-floating backdrop-blur"
        >
          <SearchInput
            placeholder="Search by name, service or keyword..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Dropdown
              label="Category"
              options={CONTRACTOR_CATEGORY_OPTIONS}
              value={category}
              onChange={onCategoryChange}
            />
            <Dropdown
              label="Location"
              options={CONTRACTOR_LOCATIONS}
              value={location}
              onChange={onLocationChange}
            />
            <Dropdown
              label="Minimum rating"
              options={CONTRACTOR_RATING_OPTIONS}
              value={ratingLabel}
              onChange={onRatingChange}
            />
            <Button type="submit" variant="primary" size="md" className="ml-auto">
              Search
            </Button>
          </div>
        </form>

        {/* Floating stat card, echoing the "1,500+" callout in the source design */}
        <div className="mt-10 inline-block rounded-xl bg-white px-6 py-4 shadow-floating sm:absolute sm:right-8 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2">
          <p className="text-3xl font-extrabold text-ink-900">1,500+</p>
          <p className="mt-1 text-sm font-medium text-ink-700">
            Verified Contractors
            <br />
            Across Ghana
          </p>
        </div>
      </div>
    </section>
  );
}
