import { Link } from "react-router-dom";
import { FOOTER_COLUMNS } from "../../constants/navigation";
import Button from "../common/Button";
import Logo from "../common/Logo";
import { useGetStartedTarget } from "../../context/AuthContext";

export default function Footer() {
  const getStartedTarget = useGetStartedTarget();

  return (
    <footer className="relative overflow-hidden">
      {/*
        PLACEHOLDER ASSET: the source design shows a construction-site
        photograph (crane, workers in hi-vis, rebar) bleeding in from the
        right, under a dark forest-green gradient. Replace
        `/src/assets/images/footer-construction.jpg` with that photo.
        Until then this renders as a flat gradient so layout stays intact.
      */}
      <div
        className="absolute inset-0 bg-cover bg-right"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(14,33,26,0.97) 0%, rgba(23,53,42,0.85) 45%, rgba(23,53,42,0.55) 100%), url(/src/assets/images/footer-construction.jpg)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-forest-900/40" aria-hidden="true" />

      <div className="container-page relative z-10 grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Logo className="h-9 w-9" />
            <span className="text-2xl font-bold text-white">TerraMatch</span>
          </div>
          <p className="mt-1 text-sm font-medium text-forest-100/90">
            Build Smarter. Live Better
          </p>
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/80">
            AI powered platform for contractor recommendation, land analysis
            and transparent bidding.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button as={Link} to={getStartedTarget} variant="white" size="sm">
              Get Started
            </Button>
            <Button as={Link} to="/explore-land" variant="outline" size="sm">
              Explore Platform
            </Button>
          </div>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="text-lg font-semibold text-white">
              {column.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[15px] text-white/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative z-10 border-t border-white/10 bg-black py-5">
        <p className="text-center text-sm text-white/70">
          © {new Date().getFullYear()} TerraMatch. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
