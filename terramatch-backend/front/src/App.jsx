import { useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./context/AuthContext";

// Pages whose source screenshot shows a signed-in navbar (bell + avatar)
// even for a first-time visitor who hasn't gone through the login flow
// in this session — this just reproduces what each screenshot shows.
// Combined with the real `isAuthed` state below (from AuthContext) via
// OR, so these routes still look right on a fresh visit *and* the
// whole site correctly shows the signed-in navbar once someone has
// actually logged in — previously it was only ever route-based, so
// logging in and then navigating to, say, Home or About would flip
// straight back to the guest navbar, which read as being logged out.
// Matched by prefix, not exact string, so sub-routes (e.g.
// /find-contractor/:slug) inherit the same state as their parent page.
const AUTHED_ROUTE_PREFIXES = ["/find-contractor", "/explore-land", "/land-owner", "/pricing"];

// Routes that render without the marketing site's Navbar/Footer, each
// managing its own full-screen layout instead:
//  - the auth flow (signup's 3 steps + login) — every one of these
//    screenshots shows just a "← Back" link, no site chrome at all
//  - the "in-app" screens (Dashboard, Messages) — their own header +
//    MobileTabBar bottom nav (components/common/MobileTabBar.jsx)
const CHROMELESS_ROUTES = [
  "/get-started",
  "/get-started/form",
  "/get-started/verify",
  "/login",
  "/dashboard",
  "/messages",
  "/post-a-project",
  "/list-your-land",
];

// Routes that only make sense for a signed-out visitor. Every "Post a
// Project" / "List Your Land" / "Get Started" / "Log In" CTA across
// the site (CustomProjectBanner, ListLandBanner, pricing cards, the
// navbar, etc.) points here, same as before login existed. The bug
// this fixes: none of those links checked whether the visitor was
// already signed in, so a logged-in land owner or contractor clicking
// "Post a Project" — from the bidding pages, a listing, anywhere —
// got dropped into the signup wizard instead of actually doing the
// thing they clicked. AuthContext's isAuthed never changed (they were
// never logged out), but landing back on a signup/login screen reads
// exactly like being signed out.
//
// Fixing every individual link is unnecessary and easy to miss one of
// — this guard catches all of them (and any future ones) in one
// place: if someone who is already authed reaches any of these
// routes, send them to Dashboard instead of rendering the auth flow.
const AUTH_ONLY_ROUTES = ["/get-started", "/get-started/form", "/get-started/verify", "/login"];

// The reverse case: these pages are authenticated actions (posting a
// project, listing land, messaging) and assume a signed-in identity —
// /messages in particular is where Buy Now always ends up now (see
// BuyNowModal.jsx), and a conversation genuinely needs to know who
// "you" are. A signed-out visitor reaching any of these (bookmark,
// shared link, back button) gets sent to Login instead of a screen
// that doesn't make sense for a guest.
const REQUIRES_AUTH_ROUTES = ["/post-a-project", "/list-your-land", "/messages"];

export default function App() {
  const { pathname } = useLocation();
  const { isAuthed } = useAuth();
  const matchesAuthedRoute = AUTHED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
  const authed = isAuthed || matchesAuthedRoute;
  const isChromeless = CHROMELESS_ROUTES.includes(pathname);

  if (isAuthed && AUTH_ONLY_ROUTES.includes(pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!isAuthed && REQUIRES_AUTH_ROUTES.includes(pathname)) {
    return <Navigate to="/login" state={{ from: pathname }} replace />;
  }

  if (isChromeless) {
    return <AppRoutes />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar authed={authed} />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
