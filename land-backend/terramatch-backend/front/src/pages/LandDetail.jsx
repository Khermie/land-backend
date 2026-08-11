import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import SoldBadge from "../components/common/SoldBadge";
import BuyNowModal from "../components/common/BuyNowModal";
import LandDetailContent from "../components/sections/LandDetailContent";
import { FEATURED_LANDS } from "../constants/lands";
import { LAND_DETAILS } from "../constants/landDetails";
import { useAuction } from "../context/AuctionContext";

/**
 * Full auction detail data currently only exists for "east-legon-hills"
 * (the one land the source screenshot covered). Building the same
 * depth for the other 5 lands (specs, amenities, documents, bid
 * history, terms) is effectively a whole extra page each — deliberately
 * out of scope for now. Instead of a dead end, the fallback below
 * shows the listing's real photo/price/details and a working "Message
 * the Owner" button (all lands in this project's data belong to Kwame
 * Owusu — see constants/landOwners.js — so it deep-links to the same
 * Messages flow used everywhere else).
 */
export default function LandDetail() {
  const { slug } = useParams();
  const land = FEATURED_LANDS.find((l) => l.slug === slug);
  const detail = slug ? LAND_DETAILS[slug] : undefined;

  if (!land) {
    return (
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="rounded-full bg-forest-100 px-4 py-1.5 text-sm font-semibold text-forest-700">
          Not found
        </span>
        <h1 className="mt-5 text-3xl font-bold text-ink-900 sm:text-4xl">
          Land Not Found
        </h1>
        <p className="mt-3 max-w-md text-ink-700">
          We couldn't find a listing at this address. It may have been
          removed, or the link might be incorrect.
        </p>
        <Button as={Link} to="/explore-land" variant="primary" className="mt-8">
          Back to Explore Land
        </Button>
      </section>
    );
  }

  if (!detail) {
    return <SimpleLandFallback land={land} />;
  }

  return <LandDetailContent land={land} detail={detail} />;
}

/**
 * Fallback shown for listings without full auction detail data (see
 * note above). Still needs to respect Buy Now / sold state since
 * AuctionContext tracks every listing by slug regardless of which
 * detail view renders it.
 */
function SimpleLandFallback({ land }) {
  const [buyNowOpen, setBuyNowOpen] = useState(false);
  const { isSold, isExpired, getRecord } = useAuction();
  const sold = isSold(land.slug);
  const expired = !sold && isExpired(land.slug);
  const record = getRecord(land.slug);

  return (
    <section className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-card">
        <div className="relative">
          <img
            src={land.image}
            alt={land.name}
            className={`aspect-[16/9] w-full bg-mist-100 object-cover ${sold || expired ? "opacity-70" : ""}`}
          />
          {sold && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink-900/40">
              <SoldBadge className="px-4 py-2 text-sm" />
            </div>
          )}
          {expired && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink-900/40">
              <span className="rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-white">Expired</span>
            </div>
          )}
        </div>
        <div className="p-6 text-center">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              expired ? "bg-amber-100 text-amber-800" : "bg-forest-100 text-forest-700"
            }`}
          >
            {sold ? "Sold" : expired ? "Expired" : "Full listing coming soon"}
          </span>
          <h1 className="mt-4 text-2xl font-bold text-ink-900">{land.name}</h1>
          <p className="mt-1 text-sm text-ink-500">{land.location}</p>

          <div className="mt-4 flex items-center justify-center gap-6 border-y border-ink-900/10 py-4">
            <div>
              <p className="text-lg font-bold text-ink-900">
                {sold ? formatSoldAmount(record.soldAmount, land.price) : land.price}
              </p>
              <p className="text-xs text-ink-500">{sold ? "Sold Price" : "Asking Price"}</p>
            </div>
            <div>
              <p className="text-lg font-bold text-ink-900">{sold || expired ? "Closed" : land.bids}</p>
              <p className="text-xs text-ink-500">{sold || expired ? "Auction Status" : "Bids So Far"}</p>
            </div>
            <div>
              <p className="text-lg font-bold text-ink-900">{land.category}</p>
              <p className="text-xs text-ink-500">Category</p>
            </div>
          </div>

          {sold ? (
            <p className="mt-4 text-sm text-ink-700">
              {record.soldVia === "buyNow"
                ? "This land was purchased via Buy Now and is no longer available."
                : "This listing is no longer available."}
            </p>
          ) : expired ? (
            <p className="mt-4 text-sm text-ink-700">
              This auction has expired without a sale. You can still reach out to the owner directly if
              you're interested.
            </p>
          ) : (
            <p className="mt-4 text-sm text-ink-700">
              Bidding isn't open on this listing yet, but you can reach
              the owner directly to ask about it or express interest.
            </p>
          )}

          {!sold && !expired && land.buyNowPrice && (
            <div className="mt-5 rounded-xl border border-forest-200 bg-forest-50/60 p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-wide text-forest-700">
                Buy Now Available
              </p>
              <p className="mt-1 text-xl font-extrabold text-forest-700">
                {formatSoldAmount(land.buyNowPrice)}
              </p>
              <Button
                type="button"
                variant="primary"
                className="mt-3 w-full"
                onClick={() => setBuyNowOpen(true)}
              >
                Buy Now
              </Button>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              as={Link}
              to="/messages?contact=kwame-owusu"
              variant={sold || expired ? "outline-dark" : "primary"}
              className="flex-1"
            >
              Message the Owner
            </Button>
            <Button as={Link} to="/explore-land" variant="outline-dark" className="flex-1">
              Back to Explore Land
            </Button>
          </div>
        </div>
      </div>

      {land.buyNowPrice && !sold && !expired && (
        <BuyNowModal open={buyNowOpen} onClose={() => setBuyNowOpen(false)} land={land} />
      )}
    </section>
  );
}

function formatSoldAmount(amount, fallback) {
  if (!amount) return fallback ?? "";
  return `GHS ${amount.toLocaleString("en-US")}`;
}
