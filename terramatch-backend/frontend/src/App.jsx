import { useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";

// Pages whose source screenshot shows a signed-in navbar (bell + avatar)
// rather than the guest Log In / Get Started buttons. There's no real
// auth yet — this just reproduces what each screenshot shows.
const AUTHED_ROUTES = ["/find-contractor", "/explore-land", "/pricing"];

export default function App() {
  const { pathname } = useLocation();
  const authed = AUTHED_ROUTES.includes(pathname);

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
