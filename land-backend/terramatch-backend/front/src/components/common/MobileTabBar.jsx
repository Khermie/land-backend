import { Link } from "react-router-dom";
import { useMessages } from "../../context/MessagesContext";
import { cn } from "../../utils/cn";

function HomeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M4 10.5L12 4l8 6.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 9.5V19a1 1 0 001 1h11a1 1 0 001-1V9.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 20v-5.5h5V20" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LandIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M4.5 4.5v14l4.5-1.5 6 1.5 4.5-1.5v-14L15 4l-6-1.5z" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 3v14M15 4.5v14" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ProjectsIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <rect x="3" y="7" width="18" height="12.5" rx="2" strokeWidth="1.6" />
      <path d="M8.5 7V5.3a1.8 1.8 0 011.8-1.8h3.4a1.8 1.8 0 011.8 1.8V7" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 12h18" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MessagesIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M4 5.5h16v10.5H8.5L4 19.5V5.5z" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function ProfileIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <circle cx="12" cy="8.3" r="3.3" strokeWidth="1.6" />
      <path d="M4.5 20c0-3.7 3.4-6 7.5-6s7.5 2.3 7.5 6" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const TABS = [
  { id: "home", label: "Home", to: "/dashboard", Icon: HomeIcon },
  { id: "land", label: "Land", to: "/explore-land", Icon: LandIcon },
  { id: "projects", label: "Projects", to: "/find-contractor", Icon: ProjectsIcon },
  { id: "messages", label: "Messages", to: "/messages", Icon: MessagesIcon },
  { id: "profile", label: "Profile", to: "/profile", Icon: ProfileIcon },
];

/**
 * Bottom tab bar shared by the "in-app" screens (Dashboard, Messages,
 * Post a Project, List Your Land — see App.jsx's CHROMELESS_ROUTES).
 * These pages render without the site's usual Navbar/Footer, so this
 * bar is their only navigation — kept visible at every screen width
 * rather than hidden above mobile, since there'd otherwise be no way
 * to navigate away on a desktop browser. "Land" and "Projects" hand
 * off to the existing Explore Land / Find Contractor pages (which
 * bring back the normal site chrome), matching how the Dashboard's
 * own cards are wired.
 *
 * The Messages tab shows a live unread badge sourced from
 * MessagesContext — this is what a buyer's own Buy Now request badges
 * as unread for the owner side of the same shared inbox (this mockup
 * has a single signed-in identity, so "the owner's notification" and
 * "this badge" are necessarily the same inbox — see the note in
 * MessagesContext.jsx on startBuyNowRequest).
 */
export default function MobileTabBar({ active }) {
  const { totalUnread } = useMessages();

  return (
    <nav
      aria-label="Primary"
      className="sticky bottom-0 z-20 border-t border-ink-900/10 bg-white/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-3xl items-stretch justify-between px-2">
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          const showBadge = tab.id === "messages" && totalUnread > 0;
          return (
            <Link
              key={tab.id}
              to={tab.to}
              aria-current={isActive ? "page" : undefined}
              className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium"
            >
              <span className="relative">
                <tab.Icon
                  className={cn("h-5 w-5", isActive ? "text-forest-600" : "text-ink-400")}
                />
                {showBadge && (
                  <span
                    aria-label={`${totalUnread} unread message${totalUnread === 1 ? "" : "s"}`}
                    className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-forest-600 px-1 text-[9px] font-bold text-white"
                  >
                    {totalUnread > 9 ? "9+" : totalUnread}
                  </span>
                )}
              </span>
              <span className={isActive ? "text-forest-600" : "text-ink-500"}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
