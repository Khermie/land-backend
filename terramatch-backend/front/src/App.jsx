import { useLocation } from "react-router-dom";
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
];

export default function App() {
  const { pathname } = useLocation();
  const { isAuthed } = useAuth();
  const matchesAuthedRoute = AUTHED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
  const authed = isAuthed || matchesAuthedRoute;
  const isChromeless = CHROMELESS_ROUTES.includes(pathname);

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
