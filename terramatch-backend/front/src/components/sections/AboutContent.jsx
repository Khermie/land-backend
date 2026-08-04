import { Link } from "react-router-dom";
import Button from "../common/Button";
import Badge from "../common/Badge";
import { ImageSkeleton } from "../common/Skeleton";
import { cn } from "../../utils/cn";

function ShieldIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function HandshakeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M2 12.5l4-3 3 2.2 3-2.2 3 2.2 3-2.2 4 3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M9 11.3l2.3 2.9a1.5 1.5 0 002.3.1v0a1.5 1.5 0 00-.1-2.1l-1.8-1.7"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BulbIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M9 18h6M10 21h4" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

const VALUES = [
  {
    icon: ShieldIcon,
    title: "Transparency First",
    description: "Every listing is verified, every document is reviewed, and every transaction is visible to both parties from start to finish.",
  },
  {
    icon: HandshakeIcon,
    title: "Fair Dealing",
    description: "Our bidding process is open and auditable — no hidden fees, no favoritism, just a level playing field for buyers and sellers alike.",
  },
  {
    icon: BulbIcon,
    title: "Built for Ghana",
    description: "We designed TerraMatch around how land and construction actually work here — from Ghana Card verification to local trade licenses.",
  },
];

const STATS = [
  { value: "24+", label: "Verified Land Listings" },
  { value: "128+", label: "Vetted Contractors" },
  { value: "96%", label: "Average Response Rate" },
  { value: "2022", label: "Founded" },
];

/**
 * About Us — no screenshot was supplied for this page, so it was built
 * to a reasonable generic standard matching the site's established
 * visual language (forest-green palette, Badge/Button/SectionHeading
 * conventions) rather than replicating a specific design. Send a
 * screenshot if you'd like this rebuilt to match one exactly.
 */
export default function AboutContent() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-forest-50/60 py-16 sm:py-20">
        <div className="container-page text-center">
          <Badge tone="soft" className="mx-auto w-fit">
            About TerraMatch
          </Badge>
          <h1 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold text-ink-900 sm:text-4xl">
            Making land and construction transparent, for everyone in Ghana
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-700">
            TerraMatch connects verified land owners, serious buyers, and
            trusted contractors on one platform — so finding land and
            building on it doesn't have to mean guesswork.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">Our Story</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-700">
              TerraMatch started with a simple frustration: buying land in
              Ghana too often meant relying on word of mouth, unverified
              documents, and contractors you'd never worked with before.
              We set out to build a platform where every land title is
              checked, every contractor is rated by real clients, and
              every bid is visible — so decisions get easier, not riskier.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-700">
              Today, TerraMatch brings together land owners, buyers, and
              contractors across Greater Accra and beyond, with the same
              principle guiding every feature we ship: transparency should
              be the default, not a premium option.
            </p>
          </div>
          {/* PLACEHOLDER ASSET: team or office photo. Replace with a real photo at /src/assets/images/about-team.jpg */}
          <ImageSkeleton className="aspect-[4/3] w-full rounded-2xl" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink-900 py-14">
        <div className="container-page grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-extrabold text-white sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">What We Stand For</h2>
            <p className="mt-3 text-sm text-ink-700">
              The principles that guide every part of the platform.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="rounded-2xl border border-ink-900/10 bg-white p-6 shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-600 py-14">
        <div className="container-page flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-2xl font-bold text-white">Ready to get started?</h2>
            <p className="mt-1.5 text-sm text-white/80">
              Join as a land owner, contractor, or buyer in a few minutes.
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
