// Plan data for the Pricing page. Feature items are plain strings unless
// the source screenshot shows a sparkle "AI-powered" marker next to them,
// in which case they're { label, sparkle: true } instead.
export const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    tagline: "Get started and explore TerraMatch AI",
    priceMonthly: 0,
    cta: "Get Started",
    ctaVariant: "outline-dark",
    ctaTo: "/get-started",
    featuresIntro: null,
    features: [
      "Browse available lands",
      "View basic land details",
      "Explore contractors",
      "Create free account",
      "Community support",
    ],
  },
  {
    id: "basic",
    name: "Basic",
    badge: "Popular",
    tagline: "Everything you need to find and connect",
    priceMonthly: 49,
    cta: "Choose Basic",
    ctaVariant: "outline-dark",
    ctaTo: "/get-started",
    featuresIntro: "Everything in Free, plus:",
    features: [
      "Advanced land search",
      "Contact land owners",
      "Save favorite lands",
      "Message contractors",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    badge: "Best Value",
    highlight: true,
    tagline: "For serious buyers and building projects",
    priceMonthly: 99,
    cta: "Choose Pro",
    ctaVariant: "primary",
    ctaTo: "/get-started",
    featuresIntro: "Everything in Basic, plus:",
    features: [
      { label: "AI land recommendations", sparkle: true },
      { label: "Verified contractor matching", sparkle: true },
      "Project bidding access",
      "Priority support",
      "Detailed land analytics",
      "Price history & insights",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For companies and large scale projects",
    priceMonthly: null, // "Custom" — no numeric price shown
    cta: "Contact Sales",
    ctaVariant: "outline-dark",
    ctaTo: "/contact",
    featuresIntro: "Everything in Pro, plus:",
    features: [
      "Dedicated account manager",
      "Custom integrations",
      "Bulk land & project access",
      "Advanced analytics",
      "Priority phone support",
      "SLA & premium service",
    ],
  },
];

// Matches the "(Save 20%)" label on the Yearly toggle.
export const YEARLY_DISCOUNT = 0.2;

/**
 * Resolves the price to display for a plan under the current billing
 * cycle. Free stays 0, Enterprise stays null ("Custom") regardless of
 * cycle; every other plan drops by YEARLY_DISCOUNT when yearly billing
 * is selected, rounded to a whole GHS amount.
 */
export function priceForCycle(priceMonthly, cycle) {
  if (priceMonthly === null || priceMonthly === 0) return priceMonthly;
  if (cycle === "yearly") {
    return Math.round(priceMonthly * (1 - YEARLY_DISCOUNT));
  }
  return priceMonthly;
}
