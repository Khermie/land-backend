import Badge from "../common/Badge";
import { ImageSkeleton } from "../common/Skeleton";
import { cn } from "../../utils/cn";

/* ---------------------------------------------------------------- */
/* Icons — inlined per project convention (see Dropdown/Navbar).     */
/* ---------------------------------------------------------------- */

function SearchIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-6 w-6 fill-none stroke-current", className)} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" strokeWidth="1.7" />
      <path d="M20 20l-4.3-4.3" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ChipIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="2" strokeWidth="1.7" />
      <text x="12" y="14.5" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="currentColor" stroke="none">
        AI
      </text>
      <path
        d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" aria-hidden="true">
      <path d="M2 12.5l4-3 3 2.2 3-2.2 3 2.2 3-2.2 4 3" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M9 11.3l2.3 2.9a1.5 1.5 0 002.3.1v0a1.5 1.5 0 00-.1-2.1l-1.8-1.7"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocumentPlusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" aria-hidden="true">
      <path d="M7 3h6l4 4v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M13 3v4h4" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 13.5h5M9 16.8h3.2" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="17" cy="17.5" r="3" fill="white" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 16.2v2.6M15.7 17.5h2.6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HouseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" aria-hidden="true">
      <path d="M4 11l8-7 8 7" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v9a1 1 0 001 1h10a1 1 0 001-1v-9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 20v-5h4v5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-forest-600 drop-shadow" aria-hidden="true">
      <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
    </svg>
  );
}

function LockIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5 fill-none stroke-current", className)} aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" strokeWidth="1.7" />
      <path d="M8 11V7a4 4 0 018 0v4" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5 fill-none stroke-current", className)} aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeadsetIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5 fill-none stroke-current", className)} aria-hidden="true">
      <path d="M4 13v-1a8 8 0 0116 0v1" strokeWidth="1.7" strokeLinecap="round" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" strokeWidth="1.7" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" strokeWidth="1.7" />
      <path d="M19 19v1a3 3 0 01-3 3h-2" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function TrophyIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5 fill-none stroke-current", className)} aria-hidden="true">
      <path d="M8 4h8v5a4 4 0 01-8 0V4z" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8 5H5v2a3 3 0 003 3M16 5h3v2a3 3 0 01-3 3" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 13v3M9 20h6M10 17h4v3h-4v-3z" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Per-step decorative visuals                                       */
/* ---------------------------------------------------------------- */

function ExploreVisual() {
  return (
    <div className="mt-5 space-y-2.5">
      <div className="flex items-center gap-2 rounded-lg border border-ink-900/10 bg-white px-3 py-2">
        <SearchIcon className="h-3.5 w-3.5 shrink-0 text-ink-500" />
        <span className="truncate text-xs font-medium text-ink-700">
          Accra, Greater Accra
        </span>
      </div>
      {/*
        Stylized mini map mock, same illustrative approach as the map in
        LandMapExplorer.jsx — no real mapping library, just shapes.
      */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-forest-50">
        <div className="absolute left-[8%] top-[12%] h-[38%] w-[46%] rounded-[45%] bg-forest-200/70" aria-hidden="true" />
        <div className="absolute bottom-[8%] right-[6%] h-[42%] w-[52%] rounded-[38%] bg-forest-200/50" aria-hidden="true" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[85%]">
          <MapPinIcon />
        </div>
      </div>
    </div>
  );
}

/**
 * PLACEHOLDER ASSET: aerial/orthographic land photo shown as the "best
 * match" thumbnail in the "Get AI Recommendations" step. Replace with a
 * real photo at /src/assets/images/how-it-works/best-match-thumbnail.jpg
 * and swap the ImageSkeleton below for an <img>.
 */
function RecommendationVisual() {
  return (
    <div className="mt-5">
      <p className="mb-1.5 text-xs font-bold text-ink-900">Best Match for You</p>
      <div className="relative">
        <ImageSkeleton className="aspect-[4/3] w-full" />
        <span className="absolute bottom-2 right-2 rounded-full bg-forest-600 px-2 py-0.5 text-[10px] font-bold text-white">
          92% Match
        </span>
      </div>
      <div className="mt-2.5 space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-ink-900/10" aria-hidden="true" />
        <div className="h-1.5 w-2/3 rounded-full bg-ink-900/10" aria-hidden="true" />
      </div>
    </div>
  );
}

/**
 * PLACEHOLDER ASSET: two headshots representing the land owner and
 * contractor in this negotiation preview. Replace with real photos at
 * /src/assets/images/how-it-works/negotiate-avatar-1.jpg and -2.jpg and
 * swap each ImageSkeleton below for an <img>.
 */
function NegotiateVisual() {
  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center gap-2">
        <ImageSkeleton className="h-8 w-8 shrink-0 rounded-full" />
        <div className="h-1.5 flex-1 rounded-full bg-ink-900/10" aria-hidden="true" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-ink-900/10" aria-hidden="true" />
        <ImageSkeleton className="h-8 w-8 shrink-0 rounded-full" />
      </div>
    </div>
  );
}

function SecurePayVisual() {
  return (
    <div className="mt-5">
      <p className="mb-1.5 text-xs font-bold text-ink-900">Secure Payment</p>
      <div className="relative flex items-center gap-3 rounded-lg border border-ink-900/10 bg-white p-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-forest-100 text-forest-700">
          <LockIcon className="h-4 w-4" />
        </span>
        <div className="flex-1 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-ink-900/10" aria-hidden="true" />
          <div className="h-1.5 w-2/3 rounded-full bg-ink-900/10" aria-hidden="true" />
        </div>
        <span
          className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-forest-600 text-white ring-2 ring-white"
          aria-hidden="true"
        >
          <svg viewBox="0 0 20 20" className="h-3 w-3 fill-none stroke-white">
            <path d="M4 10.5l3.5 3.5L16 5.5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/**
 * PLACEHOLDER ASSET: finished-home render shown in the "Close & Build"
 * step. Replace with a real photo at
 * /src/assets/images/how-it-works/close-and-build-house.jpg and swap the
 * ImageSkeleton below for an <img>.
 */
function CloseBuildVisual() {
  return <ImageSkeleton className="mt-5 aspect-[4/3] w-full" />;
}

/* ---------------------------------------------------------------- */
/* Data                                                               */
/* ---------------------------------------------------------------- */

const STEPS = [
  {
    number: 1,
    icon: SearchIcon,
    title: "Explore & Search",
    description:
      "Search for land based on location, price, size, and other preferences.",
    Visual: ExploreVisual,
  },
  {
    number: 2,
    icon: ChipIcon,
    title: "Get AI Recommendations",
    description:
      "Our AI analyzes data to recommend the best lands and verified contractors for you.",
    Visual: RecommendationVisual,
  },
  {
    number: 3,
    icon: HandshakeIcon,
    title: "Connect & Negotiate",
    description:
      "Contact land owners or contractors directly and negotiate the best terms.",
    Visual: NegotiateVisual,
  },
  {
    number: 4,
    icon: DocumentPlusIcon,
    title: "Secure & Pay",
    description:
      "Make secure payments through our platform with full transparency.",
    Visual: SecurePayVisual,
  },
  {
    number: 5,
    icon: HouseIcon,
    title: "Close & Build",
    description:
      "Complete the transaction and start your construction journey with confidence.",
    Visual: CloseBuildVisual,
  },
];

const TRUST_ITEMS = [
  {
    icon: ShieldIcon,
    tone: "amber",
    title: "100% Verified",
    description: "All lands and contractors are verified for your safety.",
  },
  {
    icon: LockIcon,
    tone: "forest",
    title: "Secure Payments",
    description: "Your payments are protected with bank-grade security.",
  },
  {
    icon: HeadsetIcon,
    tone: "forest",
    title: "24/7 Support",
    description: "Our team is here to help you every step of the way.",
  },
  {
    icon: TrophyIcon,
    tone: "forest",
    title: "Best Value",
    description: "Get the best deals and build smart with TerraMatch AI.",
  },
];

/* ---------------------------------------------------------------- */
/* Sub-components                                                    */
/* ---------------------------------------------------------------- */

function StepCard({ step }) {
  const Icon = step.icon;
  const Visual = step.Visual;

  return (
    <div className="flex flex-col rounded-2xl border border-ink-900/10 bg-white p-6 shadow-card">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-100 text-forest-700">
          <Icon />
        </span>
        <span className="-mt-3 flex h-6 w-6 items-center justify-center rounded-full bg-forest-600 text-xs font-bold text-white ring-2 ring-white">
          {step.number}
        </span>
        <h3 className="mt-3 text-base font-bold text-ink-900">{step.title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-ink-500">
          {step.description}
        </p>
      </div>
      <Visual />
    </div>
  );
}

function TrustItem({ item }) {
  const Icon = item.icon;
  return (
    <div className="flex items-start gap-3 px-5 py-4">
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
          item.tone === "amber"
            ? "bg-amber-100 text-amber-700"
            : "bg-forest-100 text-forest-700"
        )}
      >
        <Icon />
      </span>
      <div>
        <p className="text-sm font-bold text-ink-900">{item.title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-ink-500">
          {item.description}
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Section                                                            */
/* ---------------------------------------------------------------- */

export default function HowItWorksSteps() {
  return (
    <section className="container-page py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Badge tone="soft">HOW IT WORKS</Badge>
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          From Search to Settlement in 5 Simple Steps
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-700">
          TerraMatch AI makes land buying and construction easier, faster,
          and safer.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((step) => (
          <StepCard key={step.number} step={step} />
        ))}
      </div>

      <div className="mt-10 divide-y divide-ink-900/10 rounded-2xl border border-ink-900/10 bg-white lg:grid lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {TRUST_ITEMS.map((item) => (
          <TrustItem key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
