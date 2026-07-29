import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { PRIMARY_NAV } from "../../constants/navigation";
import Button from "../common/Button";
import Logo from "../common/Logo";
import { ImageSkeleton } from "../common/Skeleton";
import { cn } from "../../utils/cn";

/**
 * `authed` mirrors the two navbar states seen across the source
 * screenshots: the landing page shows Log In / Get Started (guest),
 * while the Find Contractor page shows a notification bell + avatar
 * (signed-in). There's no real auth wired up yet — pages simply pass
 * the prop that matches their screenshot.
 */
export default function Navbar({ authed = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/5 bg-white/95 backdrop-blur">
      <div className="container-page flex h-[68px] items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <Logo className="h-7 w-7" />
          <span className="text-lg font-bold text-ink-900">TerraMatch</span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {PRIMARY_NAV.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "text-[15px] font-medium text-ink-700 transition-colors hover:text-ink-900",
                  isActive && "font-semibold text-forest-600 hover:text-forest-600"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {authed ? (
          <div className="hidden items-center gap-4 lg:flex">
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-mist-100"
              aria-label="Notifications"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" aria-hidden="true">
                <path
                  d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M13.7 21a2 2 0 01-3.4 0" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <Link to="/profile" aria-label="Your profile">
              <ImageSkeleton className="h-9 w-9 rounded-full" />
            </Link>
          </div>
        ) : (
          <div className="hidden items-center gap-3 lg:flex">
            <Button as={Link} to="/login" variant="outline-dark" size="sm">
              Log In
            </Button>
            <Button as={Link} to="/get-started" variant="secondary" size="sm">
              Get Started
            </Button>
          </div>
        )}

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-900 lg:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
            {isMenuOpen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav panel */}
      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-ink-900/5 bg-white transition-[max-height] duration-300 ease-out lg:hidden",
          isMenuOpen ? "max-h-[420px]" : "max-h-0"
        )}
      >
        <nav className="container-page flex flex-col gap-1 py-3" aria-label="Mobile">
          {PRIMARY_NAV.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink-700 hover:bg-mist-100",
                  isActive && "font-semibold text-forest-600"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          {authed ? (
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 flex items-center gap-2 px-2 py-2 text-[15px] font-medium text-ink-700"
            >
              <ImageSkeleton className="h-8 w-8 rounded-full" />
              Your profile
            </Link>
          ) : (
            <div className="mt-2 flex gap-3 px-2">
              <Button
                as={Link}
                to="/login"
                variant="outline-dark"
                size="sm"
                className="flex-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Button>
              <Button
                as={Link}
                to="/get-started"
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
