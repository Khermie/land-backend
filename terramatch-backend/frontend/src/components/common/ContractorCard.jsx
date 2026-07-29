import { Link } from "react-router-dom";
import Button from "./Button";
import StarRating from "./StarRating";
import { ImageSkeleton } from "./Skeleton";

/**
 * PLACEHOLDER ASSET: contractor headshot (hi-vis vest, hard hat,
 * construction site background) per source design. Replace with a real
 * photo at /src/assets/images/contractors/<slug>.jpg and swap the
 * ImageSkeleton below for an <img>.
 */
export default function ContractorCard({ contractor, reviewsLabel = "" }) {
  const { name, rating, reviews, projects, specialties, location } =
    contractor;

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-900/5 bg-white shadow-card">
      <ImageSkeleton className="aspect-[4/3] w-full rounded-none" />

      <div className="p-4">
        <h3 className="font-bold text-ink-900">{name}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm font-medium text-forest-600">
          <span aria-hidden="true">✓</span> Verified
        </p>

        <div className="mt-2 flex items-center gap-1.5">
          <StarRating value={rating} />
          <span className="text-sm font-semibold text-ink-900">{rating}</span>
          <span className="text-sm text-ink-500">
            ({reviews}
            {reviewsLabel ? ` ${reviewsLabel}` : ""})
          </span>
        </div>

        <p className="mt-2 text-sm text-ink-700">
          {projects} Projects Completed
        </p>
        <p className="mt-1 text-sm text-ink-700">{specialties}</p>
        <p className="mt-1 flex items-center gap-1 text-sm text-ink-500">
          <span aria-hidden="true">📍</span> {location}
        </p>

        <Button
          as={Link}
          to="/find-contractor"
          variant="primary"
          size="sm"
          className="mt-4 w-full"
        >
          View Profile
        </Button>
      </div>
    </div>
  );
}
