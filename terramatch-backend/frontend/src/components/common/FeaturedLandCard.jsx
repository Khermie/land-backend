import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { ImageSkeleton } from "./Skeleton";
import { cn } from "../../utils/cn";

/**
 * PLACEHOLDER ASSET: aerial land photo per listing. Replace the
 * ImageSkeleton with a real <img> at
 * /src/assets/images/land/<slug>.jpg
 */
export default function FeaturedLandCard({ land }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { name, location, price, bids } = land;

  return (
    <div className="flex gap-4 rounded-xl border border-ink-900/5 bg-white p-3 shadow-card">
      <ImageSkeleton className="h-24 w-28 shrink-0 rounded-lg" />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate font-semibold text-ink-900">{name}</h3>
          <button
            type="button"
            onClick={() => setIsFavorited((v) => !v)}
            aria-pressed={isFavorited}
            aria-label={
              isFavorited ? `Remove ${name} from favorites` : `Save ${name} to favorites`
            }
            className="shrink-0 text-forest-600"
          >
            <svg
              viewBox="0 0 24 24"
              className={cn("h-5 w-5", isFavorited ? "fill-forest-600" : "fill-none")}
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M12 20s-7-4.35-9.5-8.5C.87 8.2 2.4 4.5 6 4.5c2 0 3.3 1.1 4 2 .7-.9 2-2 4-2 3.6 0 5.13 3.7 3.5 7-2.5 4.15-9.5 8.5-9.5 8.5z" />
            </svg>
          </button>
        </div>

        <p className="mt-0.5 flex items-center gap-1 text-sm text-ink-500">
          <span aria-hidden="true">📍</span> {location}
        </p>
        <p className="mt-1.5 text-sm font-bold text-ink-900">{price}</p>

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-xs text-ink-500">{bids} Bids</span>
          <Button
            as={Link}
            to={`/explore-land/${land.slug}`}
            variant="outline-dark"
            size="sm"
            className="px-3 py-1.5 text-xs"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
