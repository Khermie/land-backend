import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import FindContractor from "../pages/FindContractor";
import ExploreLand from "../pages/ExploreLand";
import Pricing from "../pages/Pricing";
import HowItWorks from "../pages/HowItWorks";
import LandDetail from "../pages/LandDetail";
import LandOwner from "../pages/LandOwner";
import PlaceholderPage from "../pages/PlaceholderPage";

// Placeholder routes for pages referenced in the nav/footer whose
// screenshots haven't been supplied yet — keeps navigation unbroken.
const PLACEHOLDER_ROUTES = [
  { path: "/features", title: "Features" },
  { path: "/login", title: "Log In" },
  { path: "/get-started", title: "Get Started" },
  { path: "/about", title: "About Us" },
  { path: "/blog", title: "Blog" },
  { path: "/contact", title: "Contact Us" },
  { path: "/privacy-policy", title: "Privacy Policy" },
  { path: "/help-center", title: "Help Center" },
  { path: "/profile", title: "Your Profile" },
];

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/find-contractor" element={<FindContractor />} />
      <Route path="/explore-land" element={<ExploreLand />} />
      <Route path="/explore-land/:slug" element={<LandDetail />} />
      <Route path="/land-owner/:slug" element={<LandOwner />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      {PLACEHOLDER_ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PlaceholderPage title={route.title} />}
        />
      ))}
      <Route
        path="*"
        element={<PlaceholderPage title="Page Not Found" />}
      />
    </Routes>
  );
}
