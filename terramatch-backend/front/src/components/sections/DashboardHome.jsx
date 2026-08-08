import { Link } from "react-router-dom";
import Button from "../common/Button";
import Badge from "../common/Badge";
import MobileTabBar from "../common/MobileTabBar";
import { unsplashUrl, LAND_PHOTO_IDS, CONTRACTOR_PHOTO_IDS, KWAME_AVATAR_ID } from "../../constants/stockImages";
import { cn } from "../../utils/cn";

function BellIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M6 10a6 6 0 1112 0c0 3.6 1 5.4 1.6 6.3.3.4 0 1-.5 1H4.9c-.5 0-.8-.6-.5-1C5 15.4 6 13.6 6 10z" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 20a2 2 0 004 0" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusCircleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" strokeWidth="1.6" />
      <path d="M12 8v8M8 12h8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MapPinPlusIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12 21s-7-6.5-7-11.5A7 7 0 0119 9.5C19 14.5 12 21 12 21z" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9.5 9.5h5M12 7v5" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const ROLE_CARDS = [
  {
    id: "land-owner",
    badge: "Land Owner",
    title: "Manage your land listings",
    description: "List land, receive bids and close deals.",
    cta: "Go to Dashboard",
    // Kwame already exists as a land owner in this project's data
    // (constants/landOwners.js) — his own profile page doubles as his
    // "dashboard" here, since it already shows his listings and stats.
    to: "/land-owner/kwame-owusu",
    image: unsplashUrl(LAND_PHOTO_IDS.largeAreaOfLand),
  },
  {
    id: "contractor",
    badge: "Contractor",
    title: "Find projects & submit bids",
    description: "Discover projects and grow your business.",
    cta: "Go to Dashboard",
    to: "/find-contractor",
    image: unsplashUrl(CONTRACTOR_PHOTO_IDS.tropicalConstructionSite),
  },
  {
    id: "general-user",
    badge: "General User",
    title: "Explore land & hire trusted contractors",
    description: "Make informed decisions with confidence.",
    cta: "Explore Now",
    to: "/explore-land",
    image: unsplashUrl(LAND_PHOTO_IDS.greenPlainField),
  },
];

/**
 * "In-app" dashboard home — the screen a signed-in user lands on. This
 * page (and Messages.jsx) render without the marketing site's Navbar/
 * Footer (see App.jsx's CHROMELESS_ROUTES); MobileTabBar at the bottom
 * is the only navigation, kept visible at every screen width.
 *
 * There's no real multi-user auth, so "Kwame" is hardcoded to match the
 * existing land owner profile (constants/landOwners.js) — same person,
 * same data, same avatar photo, just viewed from his own home screen
 * instead of a public profile page.
 */
export default function DashboardHome() {
  return (
    <div className="flex min-h-screen flex-col bg-mist-50">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 pt-4 sm:px-6">
          {/* Header card */}
          <div className="rounded-3xl bg-gradient-to-br from-forest-600 to-forest-700 px-6 py-7 text-white shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">Terramatch</span>
              <div className="flex items-center gap-3">
                <Link
                  to="/messages"
                  aria-label="Notifications (3 unread)"
                  className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                >
                  <BellIcon className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
                    3
                  </span>
                </Link>
                <Link to="/profile" aria-label="Your profile">
                  <img
                    src={unsplashUrl(KWAME_AVATAR_ID, { w: 72 })}
                    alt=""
                    className="h-9 w-9 rounded-full border-2 border-white/40 object-cover"
                  />
                </Link>
              </div>
            </div>

            <h1 className="mt-6 text-2xl font-bold">Welcome, Kwame</h1>
            <p className="mt-1 text-sm text-white/80">What would you like to do today?</p>
          </div>

          {/* Quick actions */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button as={Link} to="/post-a-project" variant="primary" size="md" className="justify-center">
              <PlusCircleIcon className="h-4 w-4" />
              Post a Project
            </Button>
            <Button as={Link} to="/list-your-land" variant="outline" size="md" className="justify-center">
              <MapPinPlusIcon className="h-4 w-4" />
              List Your Land
            </Button>
          </div>

          {/* Role cards */}
          <div className="mt-6 grid gap-5 pb-8 sm:grid-cols-3">
            {ROLE_CARDS.map((card) => (
              <div
                key={card.id}
                className="flex flex-col rounded-3xl border border-ink-900/10 bg-white p-5 shadow-card"
              >
                <Badge tone="soft" className="w-fit px-3 py-1 text-[11px] tracking-wide">
                  {card.badge.toUpperCase()}
                </Badge>

                <h2 className="mt-4 text-lg font-bold leading-snug text-ink-900">
                  {card.title}
                </h2>
                <p className="mt-1.5 text-sm text-ink-500">{card.description}</p>

                <img
                  src={card.image}
                  alt=""
                  loading="lazy"
                  className="mt-4 aspect-[4/3] w-full rounded-xl bg-mist-100 object-cover sm:order-first sm:mb-2 sm:mt-0"
                />

                <Button
                  as={Link}
                  to={card.to}
                  variant="outline-dark"
                  size="md"
                  className="mt-5 w-fit"
                >
                  {card.cta}
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MobileTabBar active="home" />
    </div>
  );
}
