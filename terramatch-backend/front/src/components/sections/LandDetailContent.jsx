import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { ImageSkeleton } from "../common/Skeleton";
import NeedHelpCard from "../common/NeedHelpCard";
import PlatformTrustBar from "../common/PlatformTrustBar";
import BuyNowModal from "../common/BuyNowModal";
import SoldBadge from "../common/SoldBadge";
import StarRating from "../common/StarRating";
import { formatGHS } from "../../constants/landDetails";
import { getLandGallery, FEATURED_LANDS } from "../../constants/lands";
import { LAND_OWNERS } from "../../constants/landOwners";
import { unsplashUrl, KWAME_AVATAR_ID } from "../../constants/stockImages";
import { useAuction } from "../../context/AuctionContext";
import { cn } from "../../utils/cn";

/* ================================================================ */
/* Icons — inlined per project convention.                           */
/* ================================================================ */

function ChevronRightIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("h-3.5 w-3.5 fill-none stroke-current", className)} aria-hidden="true">
      <path d="M7.5 4.5l6 5.5-6 5.5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon({ filled, className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4 stroke-current", filled ? "fill-forest-600" : "fill-none", className)} strokeWidth="1.6" aria-hidden="true">
      <path d="M12 20s-7-4.35-9.5-8.5C.87 8.2 2.4 4.5 6 4.5c2 0 3.3 1.1 4 2 .7-.9 2-2 4-2 3.6 0 5.13 3.7 3.5 7-2.5 4.15-9.5 8.5-9.5 8.5z" />
    </svg>
  );
}

function ShareIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4 fill-none stroke-current", className)} aria-hidden="true">
      <circle cx="18" cy="5" r="2.4" strokeWidth="1.6" />
      <circle cx="6" cy="12" r="2.4" strokeWidth="1.6" />
      <circle cx="18" cy="19" r="2.4" strokeWidth="1.6" />
      <path d="M8.1 10.7l7.8-4.4M8.1 13.3l7.8 4.4" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4 fill-none stroke-current", className)} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" strokeWidth="1.6" />
      <path d="M12 7.5V12l3 2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VerifiedIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("h-3 w-3 fill-white", className)} aria-hidden="true">
      <path d="M10 1l2.2 1.3 2.5-.3 1 2.3 2.3 1-.3 2.5L19 10l-1.3 2.2.3 2.5-2.3 1-1 2.3-2.5-.3L10 19l-2.2-1.3-2.5.3-1-2.3-2.3-1 .3-2.5L1 10l1.3-2.2-.3-2.5 2.3-1 1-2.3 2.5.3z" />
      <path d="M6.5 10l2.3 2.3L14 7" fill="none" stroke="#2f6b46" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("h-3.5 w-3.5 fill-none stroke-current", className)} aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" strokeWidth="1.5" />
      <path d="M10 9v5M10 6.5v.01" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("h-3.5 w-3.5 fill-none stroke-current", className)} aria-hidden="true">
      <path d="M4 10.5l3.5 3.5L16 5.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MapPinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-forest-600 drop-shadow", className)} aria-hidden="true">
      <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
    </svg>
  );
}

function DocumentIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M7 3h6l4 4v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13 3v4h4" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 13.5h5M9 16.8h3.2" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PeopleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5 fill-none stroke-current", className)} aria-hidden="true">
      <circle cx="9" cy="8" r="3" strokeWidth="1.6" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 4.2a3 3 0 010 5.8M19.5 20c0-2.5-1.8-4.4-4.2-4.9" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ExpandIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5 fill-none stroke-current", className)} aria-hidden="true">
      <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RulerIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5 fill-none stroke-current", className)} aria-hidden="true">
      <path d="M3 16.5L16.5 3l4.5 4.5L7.5 21z" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 8l2 2M11.5 4.5l2 2M14.5 12.5l2 2" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function RoadIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5 fill-none stroke-current", className)} aria-hidden="true">
      <path d="M9 3L4 21M15 3l5 18" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 5v2M12 10.5v2M12 16v2" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BoltIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5 fill-current", className)} aria-hidden="true">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}

function DropletIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5 fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12 3s6.5 7 6.5 11.5a6.5 6.5 0 01-13 0C5.5 10 12 3 12 3z" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function MountainIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5 fill-none stroke-current", className)} aria-hidden="true">
      <path d="M3 19L9.5 8l4 6L16 10l5 9z" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function WavesIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5 fill-none stroke-current", className)} aria-hidden="true">
      <path d="M2 9c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M2 15c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const SPEC_ICONS = {
  landUse: PeopleIcon,
  plotSize: ExpandIcon,
  totalSize: RulerIcon,
  landStatus: DocumentIcon,
};

const AMENITY_ICONS = {
  road: RoadIcon,
  electricity: BoltIcon,
  water: DropletIcon,
  topography: MountainIcon,
  drainage: WavesIcon,
};

/* ================================================================ */
/* Countdown hook                                                    */
/* ================================================================ */

function pad(n) {
  return String(n).padStart(2, "0");
}

/**
 * Ticks down to a fixed target timestamp (AuctionContext's
 * auctionEndsAt, set once when the auction record is first seeded —
 * see context/AuctionContext.jsx). Reading from a stored target
 * rather than "now + durationMs" means refreshing the page or
 * re-mounting this component doesn't silently push the deadline back
 * — the countdown reflects when the auction actually ends, the same
 * way a real end time would be a fixed value in a database.
 */
function useCountdown(targetTimestamp) {
  const [remaining, setRemaining] = useState(() => Math.max(0, targetTimestamp - Date.now()));

  useEffect(() => {
    setRemaining(Math.max(0, targetTimestamp - Date.now()));
    const id = setInterval(() => {
      setRemaining(Math.max(0, targetTimestamp - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [targetTimestamp]);

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const mins = Math.floor((remaining % 3600000) / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);

  const endDate = new Date(targetTimestamp);
  const endDateLabel = endDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const endTimeLabel = endDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return { days, hours, mins, secs, endDateLabel, endTimeLabel, hasEnded: remaining <= 0 };
}

/* ================================================================ */
/* Breadcrumb + Save/Share                                           */
/* ================================================================ */

function TopBar({ land, detail }) {
  const [saved, setSaved] = useState(false);
  const [shareState, setShareState] = useState("idle"); // idle | copied

  async function handleShare() {
    const shareData = {
      title: land.name,
      text: detail.description,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      // fall through to clipboard fallback
    }
    try {
      await navigator.clipboard.writeText(shareData.url);
      setShareState("copied");
      setTimeout(() => setShareState("idle"), 2000);
    } catch {
      // no-op — clipboard API unavailable, nothing more we can do here
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-ink-500">
        <Link to="/explore-land" className="font-medium hover:text-forest-700">
          Explore Land
        </Link>
        <ChevronRightIcon />
        <span>{detail.breadcrumbRegion}</span>
        <ChevronRightIcon />
        <span className="text-ink-900">{land.name}</span>
      </nav>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          aria-pressed={saved}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/15 bg-white px-3.5 py-1.5 text-sm font-semibold text-ink-700 hover:bg-mist-100"
        >
          <HeartIcon filled={saved} className={saved ? "text-forest-600" : "text-ink-500"} />
          {saved ? "Saved" : "Save"}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/15 bg-white px-3.5 py-1.5 text-sm font-semibold text-ink-700 hover:bg-mist-100"
        >
          <ShareIcon className="text-ink-500" />
          {shareState === "copied" ? "Link copied!" : "Share"}
        </button>
      </div>
    </div>
  );
}

/* ================================================================ */
/* Gallery                                                            */
/* ================================================================ */

function Gallery({ land, detail, sold }) {
  const [active, setActive] = useState(0);
  const stripRef = useRef(null);
  const photos = getLandGallery(land);

  function scrollStrip() {
    stripRef.current?.scrollBy({ left: 160, behavior: "smooth" });
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl">
        <span className="absolute left-4 top-4 z-10 rounded-md bg-forest-600 px-3 py-1 text-xs font-bold text-white">
          {detail.badge}
        </span>
        {sold && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-ink-900/50">
            <SoldBadge className="px-4 py-2 text-sm" />
          </div>
        )}
        <img
          key={photos[active]}
          src={photos[active]}
          alt={`${land.name} — photo ${active + 1} of ${photos.length}`}
          className="aspect-[16/10] w-full bg-mist-100 object-cover"
        />
      </div>

      {photos.length > 1 && (
        <div className="relative mt-3">
          <div ref={stripRef} className="flex gap-2 overflow-x-auto pb-1">
            {photos.map((photo, i) => (
              <button
                key={photo + i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-pressed={active === i}
                className={cn(
                  "h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                  active === i ? "border-forest-600" : "border-transparent"
                )}
              >
                <img
                  src={photo}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
          {photos.length > 4 && (
            <button
              type="button"
              onClick={scrollStrip}
              aria-label="Scroll thumbnails"
              className="absolute right-0 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-ink-900/10 bg-white shadow-sm"
            >
              <ChevronRightIcon className="text-ink-700" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ================================================================ */
/* Title block (top of the right column)                             */
/* ================================================================ */

function TitleBlock({ land, detail }) {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">{land.name}</h1>
      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-500">
        <MapPinIcon className="h-4 w-4 fill-ink-400" />
        {detail.heroLocation}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-700">{detail.description}</p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {detail.specs.map((spec) => {
          const Icon = SPEC_ICONS[spec.icon];
          return (
            <div key={spec.label} className="rounded-xl border border-ink-900/10 bg-white p-3 text-center">
              <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-1.5 text-sm font-bold text-ink-900">{spec.value}</p>
              <p className="text-xs text-ink-500">{spec.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================ */
/* About + amenities                                                 */
/* ================================================================ */

function AboutSection({ detail }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-ink-900">About This Land</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-700">{detail.about}</p>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {detail.amenities.map((item) => {
          const Icon = AMENITY_ICONS[item.icon];
          return (
            <div key={item.label} className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                <Icon />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-900">{item.value}</p>
                <p className="text-xs text-ink-500">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================ */
/* Location + mini map mock                                          */
/* ================================================================ */

function LocationSection({ detail }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${detail.coordinates.lat},${detail.coordinates.lng}`;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-ink-900">Location</h2>
        <Button
          as="a"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline-dark"
          size="sm"
          className="px-3.5 py-1.5 text-xs"
        >
          View on Map
        </Button>
      </div>
      <p className="mt-1.5 text-sm text-ink-500">{detail.locationAddress}</p>

      {/*
        Stylized mini map mock, same illustrative approach used in
        LandMapExplorer.jsx — no real mapping library, just shapes.
      */}
      <div className="relative mt-3 aspect-[16/9] overflow-hidden rounded-xl bg-mist-100">
        <div className="absolute left-[6%] top-[10%] h-[35%] w-[30%] rounded-[35%] bg-forest-100/70" aria-hidden="true" />
        <div className="absolute bottom-[8%] right-[10%] h-[38%] w-[42%] rounded-[30%] bg-forest-100/60" aria-hidden="true" />
        {detail.mapPlaceLabels.map((place) => (
          <span
            key={place.label}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[10px] font-medium shadow-sm",
              place.emphasis ? "font-bold text-ink-900" : "text-ink-500"
            )}
            style={{ top: place.top, left: place.left }}
          >
            {place.label}
          </span>
        ))}
        <MapPinIcon className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-[85%]" />
      </div>
    </div>
  );
}

/* ================================================================ */
/* Documents (shared between the fixed section and the tab)          */
/* ================================================================ */

function DocumentsGrid({ detail }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {detail.documents.map((doc) => (
        <div key={doc.name} className="flex items-center gap-2.5 rounded-lg border border-ink-900/10 bg-white p-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-forest-100 text-forest-700">
            <DocumentIcon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-ink-900">{doc.name}</p>
            <p className="text-[11px] text-ink-500">{doc.meta}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DocumentsSection({ detail }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-ink-900">Documents</h2>
      <p className="mt-1 text-sm text-ink-500">
        All documents are verified and available for review.
      </p>
      <div className="mt-3">
        <DocumentsGrid detail={detail} />
      </div>
    </div>
  );
}

/* ================================================================ */
/* Tabs: Description / Location & Nearby / Documents / Terms         */
/* ================================================================ */

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 text-sm">
      <dt className="text-ink-500">{label}</dt>
      <dd className="font-medium text-ink-900">{value}</dd>
    </div>
  );
}

function DetailsTable({ detail }) {
  return (
    <div className="grid gap-x-10 sm:grid-cols-2">
      <dl className="divide-y divide-ink-900/5">
        {detail.detailsTable.left.map((row) => (
          <DetailRow key={row.label} {...row} />
        ))}
      </dl>
      <dl className="divide-y divide-ink-900/5">
        {detail.detailsTable.right.map((row) => (
          <DetailRow key={row.label} {...row} />
        ))}
      </dl>
    </div>
  );
}

function NearbyList({ detail }) {
  return (
    <ul className="space-y-3">
      {detail.nearbyPlaces.map((place) => (
        <li key={place.label} className="flex items-center justify-between gap-4 rounded-lg border border-ink-900/10 bg-white px-4 py-3 text-sm">
          <span className="flex items-center gap-2 font-medium text-ink-900">
            <MapPinIcon className="h-4 w-4 fill-forest-600" />
            {place.label}
          </span>
          <span className="text-ink-500">{place.distance}</span>
        </li>
      ))}
    </ul>
  );
}

function TermsList({ detail }) {
  return (
    <ul className="space-y-3">
      {detail.termsAndConditions.map((term, i) => (
        <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink-700">
          <CheckIcon className="mt-0.5 shrink-0 text-forest-600" />
          {term}
        </li>
      ))}
    </ul>
  );
}

const TABS = ["Description", "Location & Nearby", "Documents", "Terms & Conditions"];

function TabsSection({ detail }) {
  const [active, setActive] = useState(TABS[0]);

  return (
    <div>
      <div role="tablist" aria-label="Land information" className="flex gap-6 overflow-x-auto border-b border-ink-900/10">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={active === tab}
            onClick={() => setActive(tab)}
            className={cn(
              "-mb-px shrink-0 border-b-2 px-1 pb-3 text-sm font-semibold transition-colors",
              active === tab
                ? "border-forest-600 text-forest-700"
                : "border-transparent text-ink-500 hover:text-ink-700"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="pt-6">
        {active === "Description" && <DetailsTable detail={detail} />}
        {active === "Location & Nearby" && <NearbyList detail={detail} />}
        {active === "Documents" && <DocumentsGrid detail={detail} />}
        {active === "Terms & Conditions" && <TermsList detail={detail} />}
      </div>
    </div>
  );
}

/* ================================================================ */
/* Right sidebar: countdown, bidding, history, help                  */
/* ================================================================ */

function AuctionCountdown({ land, auctionEndsAt, sold, soldVia, expired }) {
  const { days, hours, mins, secs, endDateLabel, endTimeLabel, hasEnded } = useCountdown(auctionEndsAt);
  const { markExpired } = useAuction();

  // The moment the local countdown reaches zero, tell AuctionContext
  // so the record's status durably becomes "expired" — otherwise it
  // would only ever look expired while someone happens to have this
  // page open with a live countdown running.
  useEffect(() => {
    if (hasEnded && !sold && !expired) {
      markExpired(land.slug);
    }
  }, [hasEnded, sold, expired, land.slug, markExpired]);

  if (sold) {
    return (
      <div className="rounded-2xl border border-ink-900/10 bg-ink-900/5 p-5">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-ink-700">
          <ClockIcon />
          Auction Ended
        </p>
        <p className="mt-2 text-sm text-ink-700">
          {soldVia === "buyNow"
            ? "This listing was purchased via Buy Now and is no longer accepting bids."
            : "This auction has closed."}
        </p>
      </div>
    );
  }

  if (expired || hasEnded) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-amber-800">
          <ClockIcon />
          Auction Expired
        </p>
        <p className="mt-2 text-sm text-amber-800">
          Bidding closed without a winning bid or Buy Now purchase. Reach out to the seller directly
          if you're still interested.
        </p>
      </div>
    );
  }

  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Mins", value: mins },
    { label: "Secs", value: secs },
  ];

  return (
    <div className="rounded-2xl border border-forest-100 bg-forest-50/60 p-5">
      <p className="flex items-center gap-1.5 text-sm font-semibold text-forest-700">
        <ClockIcon />
        Auction Ends In
      </p>
      <div className="mt-3 grid grid-cols-4 gap-2 text-center">
        {units.map((unit) => (
          <div key={unit.label}>
            <p className="text-2xl font-extrabold tabular-nums text-ink-900">{pad(unit.value)}</p>
            <p className="text-[11px] text-ink-500">{unit.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-ink-500">
        {endDateLabel} • {endTimeLabel} GMT
      </p>
    </div>
  );
}

function BidPanel({
  land,
  detail,
  currentBid,
  minNextBid,
  bidIncrement,
  onPlaceBid,
  sold,
  soldVia,
  soldAmount,
  expired,
  onOpenBuyNow,
}) {
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState(String(minNextBid));
  const [error, setError] = useState("");

  useEffect(() => {
    setAmount(String(minNextBid));
  }, [minNextBid]);

  function handleSubmit(e) {
    e.preventDefault();
    const value = Number(amount);
    if (!value || value < minNextBid) {
      setError(`Enter at least ${formatGHS(minNextBid)}`);
      return;
    }
    const result = onPlaceBid(value);
    if (!result.ok) {
      if (result.reason === "sold") {
        setError("This item has already been sold and is no longer accepting bids.");
      } else if (result.reason === "expired") {
        setError("This auction has expired and is no longer accepting bids.");
      } else {
        setError(`Enter at least ${formatGHS(minNextBid)}`);
      }
      return;
    }
    setError("");
    setShowForm(false);
  }

  if (expired) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm text-amber-800">Auction Expired</p>
        <p className="mt-1 text-2xl font-extrabold text-ink-900">{formatGHS(currentBid?.amount ?? 0)}</p>
        <p className="mt-1 text-xs text-amber-700">Highest bid reached — no winner declared</p>
        <p className="mt-3 text-sm text-ink-700">
          Time ran out before this listing sold. Bidding and Buy Now are both closed, but you can still
          reach out to the seller directly.
        </p>

        <Button
          as={Link}
          to={`/land-owner/${detail.ownerSlug}`}
          variant="outline-dark"
          size="md"
          className="mt-4 w-full"
        >
          Contact Land Owner
        </Button>
      </div>
    );
  }

  if (sold) {
    return (
      <div className="rounded-2xl border border-ink-900/10 bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-ink-500">{soldVia === "buyNow" ? "Sold via Buy Now" : "Sold"}</p>
          <SoldBadge />
        </div>
        <p className="mt-1 text-2xl font-extrabold text-ink-900">{formatGHS(soldAmount ?? currentBid.amount)}</p>
        <p className="mt-3 text-sm text-ink-700">
          This land is no longer available. Bidding has closed and Buy Now is disabled for this listing.
        </p>

        <Button
          as={Link}
          to={`/land-owner/${detail.ownerSlug}`}
          variant="outline-dark"
          size="md"
          className="mt-4 w-full"
        >
          Contact Land Owner
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white p-5">
      {land.buyNowPrice && (
        <div className="mb-4 rounded-xl border border-forest-200 bg-forest-50/60 p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-forest-700">
            <BoltIcon className="h-3.5 w-3.5" />
            Buy Now Available
          </p>
          <p className="mt-1 text-xl font-extrabold text-forest-700">{formatGHS(land.buyNowPrice)}</p>
          <p className="mt-0.5 text-xs text-ink-500">Skip the auction — purchase this land instantly.</p>
          <Button type="button" variant="primary" size="md" className="mt-3 w-full" onClick={onOpenBuyNow}>
            Buy Now
          </Button>
        </div>
      )}

      <p className="text-sm text-ink-500">Current Highest Bid</p>
      <p className="mt-1 text-2xl font-extrabold text-forest-700">{formatGHS(currentBid.amount)}</p>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-500">
        by {currentBid.bidder}
        {currentBid.verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-forest-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            <VerifiedIcon /> Verified
          </span>
        )}
      </p>

      <div className="my-4 border-t border-ink-900/10" />

      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 text-ink-500">
          Minimum Next Bid
          <InfoIcon className="text-ink-400" />
        </span>
        <span className="font-semibold text-ink-900">{formatGHS(minNextBid)}</span>
      </div>
      <p className="mt-1 text-xs text-ink-500">
        Bids must increase by at least {formatGHS(bidIncrement)} each time.
      </p>

      {showForm ? (
        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
          <label htmlFor="bid-amount" className="sr-only">
            Bid amount in GHS
          </label>
          <input
            id="bid-amount"
            type="number"
            min={minNextBid}
            step="1000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-ink-900/15 px-3 py-2.5 text-sm font-semibold text-ink-900 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <div className="flex gap-2">
            <Button type="submit" variant="primary" size="md" className="flex-1">
              Confirm Bid
            </Button>
            <Button
              type="button"
              variant="outline-dark"
              size="md"
              onClick={() => {
                setShowForm(false);
                setError("");
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <Button
          type="button"
          variant="outline-dark"
          size="md"
          className="mt-4 w-full"
          onClick={() => setShowForm(true)}
        >
          Place Bid
        </Button>
      )}

      <Button
        as={Link}
        to={`/land-owner/${detail.ownerSlug}`}
        variant="outline-dark"
        size="md"
        className="mt-2.5 w-full"
      >
        Contact Land Owner
      </Button>
    </div>
  );
}

function BidHistoryCard({ bidHistory }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? bidHistory : bidHistory.slice(0, 5);

  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-ink-900">Bid History</h3>
        {bidHistory.length > 5 && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="text-xs font-semibold text-forest-700 hover:underline"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        )}
      </div>
      <ul className="mt-3 space-y-3">
        {visible.map((bid, i) => (
          <li key={`${bid.bidder}-${i}`} className="flex items-center gap-2.5">
            <ImageSkeleton className="h-8 w-8 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-ink-900">{bid.bidder}</p>
              <p className="text-[11px] text-ink-500">{bid.dateLabel}</p>
            </div>
            <p className="shrink-0 text-xs font-bold text-ink-900">{formatGHS(bid.amount)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ================================================================ */
/* Seller info                                                       */
/* ================================================================ */

function SellerInfoCard({ detail }) {
  const owner = LAND_OWNERS[detail.ownerSlug];
  if (!owner) return null;

  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white p-5">
      <p className="text-sm font-semibold text-ink-900">Seller Information</p>
      <Link
        to={`/land-owner/${detail.ownerSlug}`}
        className="mt-3 flex items-center gap-3 rounded-xl border border-ink-900/5 bg-mist-50 p-3 hover:bg-mist-100"
      >
        <img
          src={unsplashUrl(KWAME_AVATAR_ID, { w: 96 })}
          alt=""
          className="h-11 w-11 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-ink-900">
            {owner.name}
            {owner.verified && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-forest-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                <VerifiedIcon /> Verified
              </span>
            )}
          </p>
          <div className="mt-0.5 flex items-center gap-1 text-xs text-ink-500">
            <StarRating value={owner.rating} />
            <span>
              {owner.rating} ({owner.reviewCount} reviews)
            </span>
          </div>
        </div>
      </Link>

      <dl className="mt-3 grid grid-cols-2 gap-y-2 text-xs">
        <div>
          <dt className="text-ink-500">Response Time</dt>
          <dd className="font-semibold text-ink-900">
            {owner.performance?.find((p) => p.label === "Avg. Response Time")?.value ?? "—"}
          </dd>
        </div>
        <div>
          <dt className="text-ink-500">Total Listings</dt>
          <dd className="font-semibold text-ink-900">{owner.totalListings}</dd>
        </div>
      </dl>
    </div>
  );
}

/* ================================================================ */
/* Similar listings                                                  */
/* ================================================================ */

function SimilarListings({ currentSlug, category }) {
  const { isSold } = useAuction();

  const matches = FEATURED_LANDS.filter((l) => l.slug !== currentSlug && l.category === category).slice(0, 3);

  // Category can legitimately have no other matches (e.g. a one-off
  // Industrial listing) — fall back to any other listings rather than
  // showing an empty section.
  const fallback = FEATURED_LANDS.filter((l) => l.slug !== currentSlug).slice(0, 3);
  const listings = matches.length > 0 ? matches : fallback;

  if (listings.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-lg font-bold text-ink-900">Similar Listings</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {listings.map((land) => {
          const sold = isSold(land.slug);
          return (
            <Link
              key={land.slug}
              to={`/explore-land/${land.slug}`}
              className="overflow-hidden rounded-xl border border-ink-900/10 bg-white shadow-card transition-shadow hover:shadow-floating"
            >
              <div className="relative">
                <img
                  src={land.image}
                  alt={land.name}
                  loading="lazy"
                  className={cn("aspect-[16/10] w-full bg-mist-100 object-cover", sold && "opacity-70")}
                />
                {sold && (
                  <div className="absolute inset-0 flex items-center justify-center bg-ink-900/40">
                    <SoldBadge />
                  </div>
                )}
              </div>
              <div className="p-3.5">
                <p className="truncate text-sm font-semibold text-ink-900">{land.name}</p>
                <p className="truncate text-xs text-ink-500">{land.location}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <p className="text-sm font-bold text-ink-900">{land.price}</p>
                  {land.buyNowPrice && !sold && (
                    <span className="rounded-full bg-forest-50 px-2 py-0.5 text-[10px] font-semibold text-forest-700">
                      Buy Now
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================ */
/* Page section                                                      */
/* ================================================================ */

export default function LandDetailContent({ land, detail }) {
  const { getRecord, placeBid, isExpired } = useAuction();
  const [buyNowOpen, setBuyNowOpen] = useState(false);

  // AuctionContext is the single source of truth for bid/sold state —
  // reading it here (rather than keeping a local copy, as before)
  // means a Buy Now purchase made from this same page, a listing
  // card, or another tab in this session is reflected immediately,
  // and a bid can never be placed after the item is already sold.
  const record = getRecord(land.slug);
  const sold = record.status === "sold";
  const expired = !sold && isExpired(land.slug);

  function handlePlaceBid(amount) {
    return placeBid(land.slug, amount, "You");
  }

  return (
    <section className="container-page py-8 sm:py-12">
      <TopBar land={land} detail={detail} />

      {sold && (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-ink-900/10 bg-mist-50 px-4 py-3 text-sm text-ink-700">
          <SoldBadge />
          <span>
            {record.soldVia === "buyNow"
              ? "This land was purchased via Buy Now and is no longer available."
              : "This auction has ended and the land is no longer available."}
          </span>
        </div>
      )}
      {expired && (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <ClockIcon />
          <span>This auction has expired without a sale. Bidding and Buy Now are both closed.</span>
        </div>
      )}

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div className="space-y-10">
          <Gallery land={land} detail={detail} sold={sold || expired} />
          <AboutSection detail={detail} />
          <LocationSection detail={detail} />
          <DocumentsSection detail={detail} />
          <TabsSection detail={detail} />
        </div>

        <div className="space-y-6">
          <TitleBlock land={land} detail={detail} />
          <AuctionCountdown
            land={land}
            auctionEndsAt={record.auctionEndsAt}
            sold={sold}
            soldVia={record.soldVia}
            expired={expired}
          />
          <BidPanel
            land={land}
            detail={detail}
            currentBid={record.currentBid}
            minNextBid={record.minNextBid}
            bidIncrement={record.bidIncrement}
            onPlaceBid={handlePlaceBid}
            sold={sold}
            soldVia={record.soldVia}
            soldAmount={record.soldAmount}
            expired={expired}
            onOpenBuyNow={() => setBuyNowOpen(true)}
          />
          <SellerInfoCard detail={detail} />
          <BidHistoryCard bidHistory={record.bidHistory} />
          <NeedHelpCard />
        </div>
      </div>

      <SimilarListings currentSlug={land.slug} category={land.category} />

      <PlatformTrustBar className="mt-4" />

      {land.buyNowPrice && !sold && !expired && (
        <BuyNowModal open={buyNowOpen} onClose={() => setBuyNowOpen(false)} land={land} />
      )}
    </section>
  );
}
