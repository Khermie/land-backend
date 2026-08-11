import { Link } from "react-router-dom";
import Button from "../common/Button";
import Badge from "../common/Badge";
import MobileTabBar from "../common/MobileTabBar";
import { useAuth } from "../../context/AuthContext";
import { unsplashUrl, LAND_PHOTO_IDS, CONTRACTOR_PHOTO_IDS } from "../../constants/stockImages";
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

function ShieldCheckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12 3l7 3v5.5c0 4.6-3 8.4-7 9.5-4-1.1-7-4.9-7-9.5V6l7-3z" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// One card per role, same visual language throughout. `primary: true`
// marks the signed-in user's own role — rendered first and larger so
// "your" area is unmistakable, while the other two stay reachable as
// secondary "also explore" options (this app's Dashboard has always
// been a shared jumping-off point, not three separate walled gardens —
// a land owner can still browse Find Contractor, etc).
const ROLE_CARDS = {
  "land-owner": {
    id: "land-owner",
    badge: "Land Owner",
    title: "Manage your land listings",
    description: "List land, receive bids and close deals.",
    cta: "List Your Land",
    // Points at the real, backend-connected listing flow (POST
    // /api/lands — see pages/ListYourLand.jsx and services/landApi.js).
    // This used to point at the fictional "Kwame Owusu" static profile
    // page (constants/landOwners.js) as a stand-in dashboard — fine
    // when he was the only identity in the app, but wrong for a real
    // signed-in land owner, who isn't him and has no listings on that
    // page. There's no real "view my own listings" screen yet (GET
    // /api/lands returns everyone's listings, not filtered to the
    // caller) — see FRONTEND_INTEGRATION_NOTES.md "Known gaps" — so
    // this points at the one real, working action instead of a fake
    // destination.
    to: "/list-your-land",
    image: unsplashUrl(LAND_PHOTO_IDS.largeAreaOfLand),
  },
  contractor: {
    id: "contractor",
    badge: "Contractor",
    title: "Find projects & submit bids",
    description: "Discover projects and grow your business.",
    cta: "Go to Dashboard",
    to: "/find-contractor",
    image: unsplashUrl(CONTRACTOR_PHOTO_IDS.tropicalConstructionSite),
  },
  "general-user": {
    id: "general-user",
    badge: "General User",
    title: "Explore land & hire trusted contractors",
    description: "Make informed decisions with confidence.",
    cta: "Explore Now",
    to: "/explore-land",
    image: unsplashUrl(LAND_PHOTO_IDS.greenPlainField),
  },
};

function RoleCard({ card, featured = false }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-3xl border bg-white p-5 shadow-card",
        featured ? "border-forest-200 ring-1 ring-forest-600/10 sm:col-span-3" : "border-ink-900/10"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Badge tone="soft" className="w-fit px-3 py-1 text-[11px] tracking-wide">
          {card.badge.toUpperCase()}
        </Badge>
        {featured && (
          <span className="text-[11px] font-semibold uppercase tracking-wide text-forest-600">Your account</span>
        )}
      </div>

      <div className={cn(featured && "sm:flex sm:items-center sm:gap-6")}>
        <div className={cn(featured && "sm:flex-1")}>
          <h2 className="mt-4 text-lg font-bold leading-snug text-ink-900">{card.title}</h2>
          <p className="mt-1.5 text-sm text-ink-500">{card.description}</p>

          <Button as={Link} to={card.to} variant="outline-dark" size="md" className="mt-5 w-fit">
            {card.cta}
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>

        <img
          src={card.image}
          alt=""
          loading="lazy"
          className={cn(
            "mt-4 aspect-[4/3] w-full rounded-xl bg-mist-100 object-cover sm:order-first sm:mb-2 sm:mt-0",
            featured && "sm:mb-0 sm:w-64 sm:shrink-0"
          )}
        />
      </div>
    </div>
  );
}

/**
 * "In-app" dashboard home — the screen a signed-in user lands on. This
 * page (and Messages.jsx) render without the marketing site's Navbar/
 * Footer (see App.jsx's CHROMELESS_ROUTES); MobileTabBar at the bottom
 * is the only navigation, kept visible at every screen width.
 *
 * Role-aware: the signed-in user's own role card (from AuthContext) is
 * shown first and larger — this is "their" dashboard — with the other
 * two roles underneath as smaller, secondary "also explore" options,
 * since browsing land/contractors as a different lens is still useful
 * regardless of account type. A guest with no role recorded yet (edge
 * case — shouldn't normally happen once signed in) falls back to the
 * original all-three-equal layout.
 *
 * Greeting and avatar use the real signed-in user's name (AuthContext's
 * `user.name`, from the backend — see AuthContext.jsx). An earlier
 * version of this hardcoded "Kwame" and his stock photo for every
 * land-owner-role account, back when he was the only identity in the
 * app; that would now show a stranger's name/photo on a real person's
 * own dashboard.
 */
export default function DashboardHome() {
  const { user, role, ghanaCardVerified } = useAuth();
  const primaryCard = ROLE_CARDS[role];
  const secondaryCards = Object.values(ROLE_CARDS).filter((c) => c.id !== role);
  const firstName = user?.name ? user.name.split(" ")[0] : "there";
  const initial = user?.name ? user.name[0].toUpperCase() : "U";
  const requiresGhanaCard = role === "land-owner" || role === "contractor";

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
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-sm font-bold">
                    {initial}
                  </span>
                </Link>
              </div>
            </div>

            <h1 className="mt-6 text-2xl font-bold">Welcome, {firstName}</h1>
            <p className="mt-1 text-sm text-white/80">What would you like to do today?</p>

            {/* Verification nudge — only for roles that need it and only
                until it's done, so a verified user never sees stale
                "please verify" copy on their own home screen. */}
            {requiresGhanaCard && !ghanaCardVerified && (
              <Link
                to={`/get-started/ghana-card?role=${role}`}
                className="mt-4 flex items-center gap-2.5 rounded-xl bg-white/10 px-3.5 py-2.5 text-sm font-medium text-white hover:bg-white/15"
              >
                <ShieldCheckIcon className="h-4 w-4 shrink-0" />
                Verify your Ghana Card to unlock listing and bidding
                <ArrowRightIcon className="ml-auto h-4 w-4 shrink-0" />
              </Link>
            )}
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

          {/* Role cards — your account's card first and featured, the
              other two roles underneath as smaller secondary options */}
          <div className="mt-6 grid gap-5 pb-8 sm:grid-cols-3">
            {primaryCard ? (
              <>
                <RoleCard card={primaryCard} featured />
                {secondaryCards.map((card) => (
                  <RoleCard key={card.id} card={card} />
                ))}
              </>
            ) : (
              Object.values(ROLE_CARDS).map((card) => <RoleCard key={card.id} card={card} />)
            )}
          </div>
        </div>
      </div>

      <MobileTabBar active="home" />
    </div>
  );
}
