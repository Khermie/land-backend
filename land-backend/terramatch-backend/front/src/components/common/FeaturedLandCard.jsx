import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import SoldBadge from "./SoldBadge";
import BuyNowModal from "./BuyNowModal";
import { cn } from "../../utils/cn";
import { LocationIcon } from "./Icons";
import { useAuction } from "../../context/AuctionContext";

export default function FeaturedLandCard({ land }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [buyNowOpen, setBuyNowOpen] = useState(false);
  const { isSold, isExpired } = useAuction();
  const { name, location, price, bids, image } = land;
  const sold = isSold(land.slug);
  const expired = !sold && isExpired(land.slug);

  return (
    <div className="flex gap-4 rounded-xl border border-ink-900/5 bg-white p-3 shadow-card">
      <div className="relative shrink-0">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className={cn("h-24 w-28 rounded-lg bg-mist-100 object-cover", (sold || expired) && "opacity-70")}
        />
        {sold && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-ink-900/50">
            <SoldBadge className="px-2 py-0.5 text-[10px]" />
          </div>
        )}
        {expired && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-ink-900/50">
            <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
              Expired
            </span>
          </div>
        )}
      </div>

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

        <div className="mt-0.5 flex items-center gap-1 text-sm text-ink-500">
          <LocationIcon className="h-3.5 w-3.5 text-ink-400" />
          <span>{location}</span>
        </div>
        <p className="mt-1.5 text-sm font-bold text-ink-900">{price}</p>

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-xs text-ink-500">
            {sold ? "Sold" : expired ? "Expired" : `${bids} Bids`}
          </span>
          <div className="flex shrink-0 gap-1.5">
            {!sold && !expired && land.buyNowPrice && (
              <Button
                type="button"
                variant="primary"
                size="sm"
                className="px-3 py-1.5 text-xs"
                onClick={() => setBuyNowOpen(true)}
              >
                Buy Now
              </Button>
            )}
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

      {land.buyNowPrice && !sold && !expired && (
        <BuyNowModal open={buyNowOpen} onClose={() => setBuyNowOpen(false)} land={land} />
      )}
    </div>
  );
}
