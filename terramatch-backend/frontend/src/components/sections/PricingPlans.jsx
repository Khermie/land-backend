import { useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import Button from "../common/Button";
import {
  PRICING_PLANS,
  YEARLY_DISCOUNT,
  priceForCycle,
} from "../../constants/pricing";
import { cn } from "../../utils/cn";

function CheckIcon({ className }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={cn("h-4 w-4 shrink-0 fill-none stroke-forest-600", className)}
      aria-hidden="true"
    >
      <path
        d="M4 10.5l3.5 3.5L16 5.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5 shrink-0", className)} aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldCheckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5 shrink-0", className)} aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Curved connector from the "Save more" note down to the billing toggle. */
function AnnotationArrow() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 stroke-forest-600" aria-hidden="true">
      <path
        d="M34 6C30 20 20 28 8 32"
        fill="none"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14 30l-6 2 1-6"
        fill="none"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlanFeature({ feature }) {
  const isObject = typeof feature === "object";
  const label = isObject ? feature.label : feature;
  const sparkle = isObject && feature.sparkle;

  return (
    <li className="flex items-start gap-2.5">
      <CheckIcon className="mt-0.5" />
      <span className="text-sm text-ink-700">
        {label}
        {sparkle && (
          <span aria-hidden="true" className="ml-1">
            ✨
          </span>
        )}
      </span>
    </li>
  );
}

function PricingCard({ plan, cycle }) {
  const price = priceForCycle(plan.priceMonthly, cycle);
  const isCustom = plan.priceMonthly === null;

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border transition-transform duration-300",
        plan.highlight
          ? "border-forest-600 bg-forest-50/60 shadow-card lg:-translate-y-2"
          : "border-ink-900/10 bg-white"
      )}
    >
      {plan.highlight && (
        <div className="bg-forest-600 px-6 py-2 text-center text-xs font-bold uppercase tracking-wide text-white">
          {plan.badge}
        </div>
      )}

      <div className="flex flex-1 flex-col p-8">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-ink-900">{plan.name}</h3>
          {!plan.highlight && plan.badge && (
            <Badge tone="soft" className="px-2.5 py-0.5 text-xs">
              {plan.badge}
            </Badge>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          {plan.tagline}
        </p>

        <div className="mt-6 flex items-baseline gap-1.5">
          {isCustom ? (
            <span className="text-3xl font-extrabold text-ink-900">Custom</span>
          ) : (
            <>
              <span className="text-3xl font-extrabold text-ink-900">
                GHS {price}
              </span>
              <span className="text-sm font-medium text-ink-500">/ month</span>
            </>
          )}
        </div>

        <Button
          as={Link}
          to={plan.ctaTo}
          variant={plan.ctaVariant}
          size="md"
          className="mt-6 w-full"
        >
          {plan.cta}
        </Button>

        <div className="mt-8 border-t border-ink-900/10 pt-6">
          {plan.featuresIntro && (
            <p className="mb-3 text-sm text-ink-700">
              <span className="font-bold text-ink-900">
                {plan.featuresIntro.split(", ")[0]}
              </span>
              , {plan.featuresIntro.split(", ")[1]}
            </p>
          )}
          <ul className="space-y-3">
            {plan.features.map((feature) => (
              <PlanFeature
                key={typeof feature === "object" ? feature.label : feature}
                feature={feature}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function PricingPlans() {
  const [cycle, setCycle] = useState("yearly");

  return (
    <section className="container-page py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Badge tone="soft">PRICING</Badge>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-700 sm:text-lg">
          Choose the perfect plan to buy land, find contractors, and build
          with confidence.
        </p>
      </div>

      <div className="relative mt-10 flex justify-center">
        <div
          role="radiogroup"
          aria-label="Billing cycle"
          className="inline-flex rounded-full bg-mist-100 p-1"
        >
          <button
            type="button"
            role="radio"
            aria-checked={cycle === "monthly"}
            onClick={() => setCycle("monthly")}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
              cycle === "monthly"
                ? "bg-white text-ink-900 shadow-sm"
                : "text-ink-500 hover:text-ink-700"
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={cycle === "yearly"}
            onClick={() => setCycle("yearly")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition-colors",
              cycle === "yearly"
                ? "bg-white text-forest-700 shadow-sm"
                : "text-ink-500 hover:text-ink-700"
            )}
          >
            Yearly
            <span
              className={cn(
                "text-xs font-semibold",
                cycle === "yearly" ? "text-forest-600" : "text-ink-400"
              )}
            >
              (Save {YEARLY_DISCOUNT * 100}%)
            </span>
          </button>
        </div>

        {/* Decorative annotation — mirrors the source screenshot, hidden on
            small screens where there's no room for it beside the toggle. */}
        <div className="pointer-events-none absolute left-full top-1/2 hidden -translate-y-1/2 pl-3 lg:flex lg:flex-col lg:items-start">
          <span className="rotate-[-4deg] whitespace-nowrap text-sm font-semibold italic text-forest-600">
            Save more with yearly billing!
          </span>
          <AnnotationArrow />
        </div>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-4 lg:items-start">
        {PRICING_PLANS.map((plan) => (
          <PricingCard key={plan.id} plan={plan} cycle={cycle} />
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-ink-900/10 bg-mist-50 px-6 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5 text-ink-700">
          <ShieldIcon className="text-ink-500" />
          <span>
            All plans include secure payments, verified listings, and our
            money-back guarantee.
          </span>
        </div>
        <div className="flex items-center gap-2 font-semibold text-forest-700">
          <ShieldCheckIcon />
          <span>30-day money back guarantee</span>
        </div>
      </div>
    </section>
  );
}
