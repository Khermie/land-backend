import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

function ChevronLeftIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12.5 4.5l-6 5.5 6 5.5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Gradient header card for one-level-deep "in-app" pages reached from
 * Dashboard (Post a Project, List Your Land) — same forest gradient
 * card and rounded-3xl shape as DashboardHome's own header, with a
 * back button + page title in place of the "Welcome, Kwame" greeting,
 * so these pages read as part of the same in-app shell rather than a
 * separately-styled section bolted on.
 */
export default function InAppPageHeader({ title, subtitle, backTo = "/dashboard" }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl bg-gradient-to-br from-forest-600 to-forest-700 px-6 py-7 text-white shadow-card">
      <button
        type="button"
        onClick={() => navigate(backTo)}
        className="flex items-center gap-1 text-sm font-medium text-white/85 hover:text-white"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Back to Dashboard
      </button>
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-white/80">{subtitle}</p>}
    </div>
  );
}
