import { cn } from "../../utils/cn";

function PeopleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <circle cx="9" cy="8" r="3" strokeWidth="1.6" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 4.2a3 3 0 010 5.8M19.5 20c0-2.5-1.8-4.4-4.2-4.9" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" strokeWidth="1.6" />
      <path d="M8 11V7a4 4 0 018 0v4" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function GavelIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M14 5l5 5M11 8l-7 7M16 3l5 5-2.5 2.5-5-5zM4 20h7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeadsetIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M4 13v-1a8 8 0 0116 0v1" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" strokeWidth="1.6" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" strokeWidth="1.6" />
      <path d="M19 19v1a3 3 0 01-3 3h-2" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const TRUST_ITEMS = [
  { icon: PeopleIcon, title: "Verified Lands", description: "All lands are verified for authenticity." },
  { icon: LockIcon, title: "Secure Transactions", description: "Safe and secure payments through our platform." },
  { icon: GavelIcon, title: "Transparent Process", description: "Bidding process is fair, transparent and open." },
  { icon: HeadsetIcon, title: "24/7 Support", description: "Our team is here to help you anytime." },
];

/**
 * The 4-item trust row shown at the bottom of both the Land Detail page
 * and the Land Owner Profile page — identical on both screenshots, so
 * it's shared here instead of duplicated.
 */
export default function PlatformTrustBar({ className }) {
  return (
    <div className={cn("grid grid-cols-1 gap-6 border-t border-ink-900/10 pt-8 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {TRUST_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.title} className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-700">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-ink-900">{item.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-ink-500">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
