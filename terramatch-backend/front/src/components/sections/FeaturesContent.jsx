import { Link } from "react-router-dom";
import Button from "../common/Button";
import Badge from "../common/Badge";
import { cn } from "../../utils/cn";

function ShieldIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function GavelIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M14 5l5 5M11 8l-7 7M16 3l5 5-2.5 2.5-5-5zM4 20h7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M4 5.5h16v10.5H8.5L4 19.5V5.5z" strokeWidth="1.5" strokeLinejoin="round" />
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

function MapPinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-current", className)} aria-hidden="true">
      <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
    </svg>
  );
}

function BulbIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M9 18h6M10 21h4" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

const FEATURES = [
  {
    icon: ShieldIcon,
    title: "Document Verification",
    description: "Land titles, survey plans, and contractor trade licenses are reviewed before a listing ever goes live.",
    to: "/explore-land",
    linkLabel: "See verified listings",
  },
  {
    icon: GavelIcon,
    title: "Transparent Bidding",
    description: "A live countdown, public bid history, and an auto-rising minimum — every bid is visible to everyone.",
    to: "/explore-land",
    linkLabel: "Explore land for sale",
  },
  {
    icon: StarIcon,
    title: "Contractor Ratings & Reviews",
    description: "Real review breakdowns, response-rate stats, and a verified portfolio before you ever request a quote.",
    to: "/find-contractor",
    linkLabel: "Browse contractors",
  },
  {
    icon: ChatIcon,
    title: "Direct Messaging",
    description: "Message a land owner or contractor straight from their profile — no phone tag, no lost emails.",
    to: "/messages",
    linkLabel: "Open Messages",
  },
  {
    icon: MapPinIcon,
    title: "Map & List Exploration",
    description: "Browse listings on an interactive map or a filterable list — by region, price, and category.",
    to: "/explore-land",
    linkLabel: "View the map",
  },
  {
    icon: BulbIcon,
    title: "AI Contractor Recommendations",
    description: "Smart suggestions based on ratings, past project success, and what similar buyers chose.",
    to: "/find-contractor",
    linkLabel: "Find your match",
  },
];

/**
 * Features — no screenshot was supplied for this page. Rather than
 * duplicate the 2-item teaser already on Home (sections/Features.jsx),
 * this expands to the platform's actual built capabilities, each
 * linking to the real page that demonstrates it.
 */
export default function FeaturesContent() {
  return (
    <div>
      <section className="bg-forest-50/60 py-16 sm:py-20">
        <div className="container-page text-center">
          <Badge tone="soft" className="mx-auto w-fit">
            Platform Features
          </Badge>
          <h1 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold text-ink-900 sm:text-4xl">
            Everything you need to buy, sell, and build with confidence
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-700">
            From verified listings to direct messaging, every feature on
            TerraMatch is built around one idea: you shouldn't have to
            guess.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
            <div
              key={feature.title}
              className="flex flex-col rounded-2xl border border-ink-900/10 bg-white p-6 shadow-card"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-base font-bold text-ink-900">{feature.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
                {feature.description}
              </p>
              <Link
                to={feature.to}
                className="mt-4 text-sm font-semibold text-forest-600 hover:text-forest-700"
              >
                {feature.linkLabel} →
              </Link>
            </div>
          );
          })}
        </div>
      </section>

      <section className="bg-forest-600 py-14">
        <div className="container-page flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-2xl font-bold text-white">Ready to see it for yourself?</h2>
            <p className="mt-1.5 text-sm text-white/80">
              Create an account in a few minutes — no credit card required.
            </p>
          </div>
          <Button as={Link} to="/get-started" variant="white" size="lg" className="shrink-0">
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
}
