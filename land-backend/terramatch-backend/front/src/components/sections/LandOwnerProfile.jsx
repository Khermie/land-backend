import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { ImageSkeleton } from "../common/Skeleton";
import NeedHelpCard from "../common/NeedHelpCard";
import PlatformTrustBar from "../common/PlatformTrustBar";
import LandListingTile from "../common/LandListingTile";
import StarRating from "../common/StarRating";
import { FEATURED_LANDS } from "../../constants/lands";
import { unsplashUrl, KWAME_AVATAR_ID } from "../../constants/stockImages";
import { cn } from "../../utils/cn";

/* ================================================================ */
/* Icons — inlined per project convention. No default size is baked  */
/* in; every call site passes its own className size explicitly.    */
/* ================================================================ */

function ChevronRightIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M7.5 4.5l6 5.5-6 5.5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MapPinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-current", className)} aria-hidden="true">
      <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M4 10.5l3.5 3.5L16 5.5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
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

function ClipboardIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <rect x="6" y="4" width="12" height="17" rx="1.5" strokeWidth="1.6" />
      <path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 11h6M9 15h6" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path
        d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a1.5 1.5 0 01-1.6 1.5A17 17 0 015 5.1 1.5 1.5 0 016.5 3.5z"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" strokeWidth="1.6" />
      <path d="M12 7.5V12l3 2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldCheckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PersonIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" strokeWidth="1.6" />
      <path d="M4.5 20c0-4 3.5-6.5 7.5-6.5s7.5 2.5 7.5 6.5" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.6" />
      <path d="M3.5 6.5l8.5 6 8.5-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M4 5h16v11H8l-4 3.5V5z" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("fill-current", className)} aria-hidden="true">
      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />
    </svg>
  );
}

function TrophyIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M8 4h8v5a4 4 0 01-8 0V4z" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 5H5v2a3 3 0 003 3M16 5h3v2a3 3 0 01-3 3" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 13v3M9 20h6M10 17h4v3h-4v-3z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BoltIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-current", className)} aria-hidden="true">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}

function HandshakeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M2 12.5l4-3 3 2.2 3-2.2 3 2.2 3-2.2 4 3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M9 11.3l2.3 2.9a1.5 1.5 0 002.3.1v0a1.5 1.5 0 00-.1-2.1l-1.8-1.7"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const STAT_ICONS = {
  document: DocumentIcon,
  listings: ClipboardIcon,
  sales: DocumentIcon,
  phone: PhoneIcon,
  clock: ClockIcon,
};

const BADGE_ICONS = {
  trophy: TrophyIcon,
  shield: ShieldIcon,
  bolt: BoltIcon,
  star: StarIcon,
  handshake: HandshakeIcon,
};

/* ================================================================ */
/* Breadcrumb                                                         */
/* ================================================================ */

function Breadcrumb({ owner }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
      {owner.breadcrumb.map((crumb) => (
        <span key={crumb.label} className="flex items-center gap-1.5">
          <Link to={crumb.to} className="font-medium hover:text-forest-700">
            {crumb.label}
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
        </span>
      ))}
      <span className="text-ink-900">{owner.shortName}</span>
    </nav>
  );
}

/* ================================================================ */
/* Profile header (left column, top)                                 */
/* ================================================================ */

function ProfileHeader({ owner }) {
  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <img
            src={unsplashUrl(KWAME_AVATAR_ID, { w: 160 })}
            alt=""
            className="h-20 w-20 rounded-full object-cover"
          />
          {owner.verified && (
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-forest-600 ring-2 ring-white">
              <CheckIcon className="h-3.5 w-3.5 text-white" />
            </span>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-extrabold text-ink-900 sm:text-2xl">{owner.name}</h1>
            {owner.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-forest-600 px-2 py-0.5 text-[11px] font-semibold text-white">
                <CheckIcon className="h-3 w-3" /> Verified
              </span>
            )}
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
            <MapPinIcon className="h-4 w-4" />
            {owner.location}
          </p>
          <span className="mt-2 inline-block rounded-full border border-ink-900/15 px-3 py-1 text-xs font-semibold text-ink-700">
            {owner.role}
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-700">{owner.bio}</p>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-ink-900/10 pt-5 sm:grid-cols-5">
        {owner.stats.map((stat) => {
          const Icon = STAT_ICONS[stat.icon];
          return (
            <div key={stat.label} className="flex items-start gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-ink-900">{stat.value}</p>
                <p className="text-[11px] leading-tight text-ink-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================ */
/* Verification status (right column, top)                           */
/* ================================================================ */

function VerificationCard({ owner }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-forest-100 bg-forest-50/60 p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-600 text-white">
          <ShieldCheckIcon className="h-5 w-5" />
        </span>
        <p className="text-sm font-bold text-ink-900">Verification Status</p>
      </div>
      <p className="mt-3 text-sm font-semibold text-ink-900">This user is fully verified</p>
      <p className="mt-1 text-xs text-ink-500">All documents have been verified and approved.</p>
      <ul className="mt-4 space-y-2">
        {owner.verificationChecklist.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-ink-700">
            <CheckIcon className="h-4 w-4 shrink-0 text-forest-600" />
            {item}
          </li>
        ))}
      </ul>

      {expanded && (
        <dl className="mt-4 space-y-2 border-t border-forest-600/10 pt-4">
          {owner.verificationDetails.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 text-sm">
              <dt className="text-ink-500">{row.label}</dt>
              <dd className="font-medium text-ink-900">{row.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <Button
        type="button"
        variant="outline-dark"
        size="md"
        className="mt-4 w-full"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? "Hide Verification Details" : "View Verification Details"}
      </Button>
    </div>
  );
}

/* ================================================================ */
/* About                                                              */
/* ================================================================ */

function AboutSection({ owner }) {
  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
      <h2 className="flex items-center gap-2 text-lg font-bold text-ink-900">
        <PersonIcon className="h-5 w-5 text-ink-500" />
        About {owner.name}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-700">{owner.about}</p>

      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <p className="text-sm font-bold text-ink-900">Areas of Operation</p>
          <ul className="mt-2 space-y-1.5">
            {owner.areasOfOperation.map((area) => (
              <li key={area} className="flex items-center gap-2 text-sm text-ink-700">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-forest-600" aria-hidden="true" />
                {area}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-ink-900">Specialization</p>
          <ul className="mt-2 space-y-1.5">
            {owner.specialization.map((spec) => (
              <li key={spec} className="flex items-center gap-2 text-sm text-ink-700">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-forest-600" aria-hidden="true" />
                {spec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ================================================================ */
/* Contact (right column)                                            */
/* ================================================================ */

function ContactCard({ owner, slug }) {
  const firstName = owner.name.split(" ")[0];
  const telHref = `tel:${owner.phone.replace(/[^+\d]/g, "")}`;
  const mailHref = `mailto:${owner.email}`;
  const messageHref = `/messages?contact=${slug}`;

  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white p-5">
      <h3 className="text-sm font-bold text-ink-900">Contact {firstName}</h3>
      <p className="mt-1 text-xs text-ink-500">Feel free to reach out for inquiries.</p>

      <a href={telHref} className="-mx-2 mt-4 flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-mist-100">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-700">
          <PhoneIcon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink-900">{owner.phone}</p>
          <p className="text-xs text-ink-500">Phone</p>
        </div>
      </a>

      <a href={mailHref} className="-mx-2 mt-1 flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-mist-100">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-700">
          <MailIcon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink-900">{owner.email}</p>
          <p className="text-xs text-ink-500">Email</p>
        </div>
      </a>

      <Link
        to={messageHref}
        className="-mx-2 mt-1 flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-mist-100"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-700">
          <ChatIcon className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink-900">Start a Conversation</p>
          <p className="text-xs text-ink-500">Quick response</p>
        </div>
      </Link>

      <Button as={Link} to={messageHref} variant="primary" size="md" className="mt-4 w-full">
        Message Now
      </Button>
    </div>
  );
}

/* ================================================================ */
/* Listings                                                           */
/* ================================================================ */

function ListingsSection({ owner, lands }) {
  const stripRef = useRef(null);

  function scrollStrip() {
    stripRef.current?.scrollBy({ left: 240, behavior: "smooth" });
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-ink-900">Listings ({owner.totalListings})</h2>
        <Button as={Link} to="/explore-land" variant="outline-dark" size="sm" className="px-3.5 py-1.5 text-xs">
          View All Listings
        </Button>
      </div>

      <div className="relative mt-4">
        <div ref={stripRef} className="flex gap-4 overflow-x-auto pb-1">
          {lands.map((land) => (
            <LandListingTile key={land.slug} land={land} />
          ))}
        </div>
        {lands.length > 3 && (
          <button
            type="button"
            onClick={scrollStrip}
            aria-label="Scroll listings"
            className="absolute right-0 top-1/3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-ink-900/10 bg-white shadow-sm"
          >
            <ChevronRightIcon className="h-4 w-4 text-ink-700" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ================================================================ */
/* Performance summary (right column)                                */
/* ================================================================ */

function PerformanceCard({ owner }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white p-5">
      <h3 className="text-sm font-bold text-ink-900">Performance Summary</h3>
      <dl className="mt-2 divide-y divide-ink-900/5">
        {owner.performance.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 py-2 text-sm">
            <dt className="text-ink-500">{row.label}</dt>
            <dd className="font-semibold text-ink-900">{row.value}</dd>
          </div>
        ))}
        {expanded &&
          owner.performanceDetails.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 py-2 text-sm">
              <dt className="text-ink-500">{row.label}</dt>
              <dd className="font-semibold text-ink-900">{row.value}</dd>
            </div>
          ))}
      </dl>
      <Button
        type="button"
        variant="outline-dark"
        size="md"
        className="mt-3 w-full"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? "Hide Performance Details" : "View Performance Details"}
      </Button>
    </div>
  );
}

/* ================================================================ */
/* Reviews & ratings                                                 */
/* ================================================================ */

function ReviewsSection({ owner }) {
  const [showAll, setShowAll] = useState(false);
  const total = owner.ratingBreakdown.reduce((sum, row) => sum + row.count, 0) || 1;
  const visibleReviews = showAll ? owner.reviews : owner.reviews.slice(0, 3);
  const hasMore = owner.reviews.length > 3;

  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
      <h2 className="flex items-center gap-2 text-lg font-bold text-ink-900">
        <StarIcon className="h-5 w-5 text-amber-400" />
        Reviews & Ratings
      </h2>

      <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="text-center sm:w-32 sm:shrink-0">
          <p className="text-4xl font-extrabold text-ink-900">{owner.rating}</p>
          <StarRating value={owner.rating} className="mt-1 justify-center" />
          <p className="mt-1 text-xs text-ink-500">({owner.reviewCount} Reviews)</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {owner.ratingBreakdown.map((row) => (
            <div key={row.stars} className="flex items-center gap-2 text-xs text-ink-500">
              <span className="w-12 shrink-0">{row.stars} Stars</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-900/10">
                <div
                  className="h-full rounded-full bg-forest-600"
                  style={{ width: `${(row.count / total) * 100}%` }}
                />
              </div>
              <span className="w-4 shrink-0 text-right">{row.count}</span>
            </div>
          ))}
        </div>
      </div>

      <ul className="mt-6 space-y-4 border-t border-ink-900/10 pt-5">
        {visibleReviews.map((review) => (
          <li key={review.name} className="flex gap-3">
            <ImageSkeleton className="h-9 w-9 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-ink-900">{review.name}</p>
                <span className="text-xs text-ink-400">{review.dateLabel}</span>
              </div>
              <StarRating value={review.rating} className="mt-0.5" />
              <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{review.comment}</p>
            </div>
          </li>
        ))}
      </ul>

      {hasMore && (
        <Button
          type="button"
          variant="outline-dark"
          size="md"
          className="mt-5 w-full"
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll ? "Show Fewer Reviews" : "View All Reviews"}
        </Button>
      )}
    </div>
  );
}

/* ================================================================ */
/* Badges & achievements (right column)                              */
/* ================================================================ */

function BadgesCard({ owner }) {
  const [showAll, setShowAll] = useState(false);
  const visibleBadges = showAll ? owner.badges : owner.badges.slice(0, 3);
  const hasMore = owner.badges.length > 3;

  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white p-5">
      <h3 className="text-sm font-bold text-ink-900">Badges & Achievements</h3>
      <ul className="mt-3 space-y-3">
        {visibleBadges.map((badge) => {
          const Icon = BADGE_ICONS[badge.icon];
          return (
            <li key={badge.title} className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-900">{badge.title}</p>
                <p className="text-xs text-ink-500">{badge.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {hasMore && (
        <Button
          type="button"
          variant="outline-dark"
          size="md"
          className="mt-4 w-full"
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll ? "Show Fewer Badges" : "View All Badges"}
        </Button>
      )}
    </div>
  );
}

/* ================================================================ */
/* Page section                                                      */
/* ================================================================ */

export default function LandOwnerProfile({ owner, slug }) {
  const lands = owner.listingSlugs
    .map((slug) => FEATURED_LANDS.find((l) => l.slug === slug))
    .filter(Boolean);

  return (
    <section className="container-page py-8 sm:py-12">
      <Breadcrumb owner={owner} />

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div className="space-y-8">
          <ProfileHeader owner={owner} />
          <AboutSection owner={owner} />
          <ListingsSection owner={owner} lands={lands} />
          <ReviewsSection owner={owner} />
        </div>

        <div className="space-y-6">
          <VerificationCard owner={owner} />
          <ContactCard owner={owner} slug={slug} />
          <PerformanceCard owner={owner} />
          <BadgesCard owner={owner} />
          <NeedHelpCard description="Our team is here to help you with any questions or concerns." />
        </div>
      </div>

      <PlatformTrustBar className="mt-10" />
    </section>
  );
}
