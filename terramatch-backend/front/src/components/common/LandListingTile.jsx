import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { cn } from "../../utils/cn";
import { LocationIcon } from "./Icons";

/**
 * Vertical listing card (top image, details below) — used on the Land
 * Owner Profile page's "Listings" row. Different layout from
 * FeaturedLandCard.jsx (a horizontal row card used in the Explore Land
 * map sidebar) since the two source screenshots show different card
 * treatments for the same underlying FEATURED_LANDS data.
 */
export default function LandListingTile({ land }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { name, location, price, bids, image } = land;

  return (
    <div className="w-56 shrink-0 overflow-hidden rounded-xl border border-ink-900/10 bg-white shadow-card">
      <div className="relative">
        <span className="absolute left-2 top-2 rounded-md bg-forest-600 px-2 py-1 text-[10px] font-bold text-white">
          For Sale
        </span>
        <button
          type="button"
          onClick={() => setIsFavorited((v) => !v)}
          aria-pressed={isFavorited}
          aria-label={isFavorited ? `Remove ${name} from favorites` : `Save ${name} to favorites`}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-forest-600"
        >
          <svg
            viewBox="0 0 24 24"
            className={cn("h-4 w-4", isFavorited ? "fill-forest-600" : "fill-none")}
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M12 20s-7-4.35-9.5-8.5C.87 8.2 2.4 4.5 6 4.5c2 0 3.3 1.1 4 2 .7-.9 2-2 4-2 3.6 0 5.13 3.7 3.5 7-2.5 4.15-9.5 8.5-9.5 8.5z" />
          </svg>
        </button>
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="aspect-[4/3] w-full bg-mist-100 object-cover"
        />
      </div>

      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-ink-900">{name}</h3>
        <div className="mt-0.5 flex items-center gap-1 text-xs text-ink-500">
          <LocationIcon className="h-3 w-3 text-ink-400" />
          <span>{location}</span>
        </div>
        <p className="mt-1.5 text-sm font-bold text-ink-900">{price}</p>
        <p className="mt-0.5 text-xs text-ink-500">{bids} Bids</p>
        <Button
          as={Link}
          to={`/explore-land/${land.slug}`}
          variant="outline-dark"
          size="sm"
          className="mt-2.5 w-full px-3 py-1.5 text-xs"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}
