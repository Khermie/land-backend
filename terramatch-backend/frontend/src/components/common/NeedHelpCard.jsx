import { Link } from "react-router-dom";
import Button from "./Button";
import { cn } from "../../utils/cn";

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

/**
 * "Need Help?" sidebar card — same structure on the Land Detail and
 * Land Owner Profile pages, with slightly different copy on each, so
 * the description is a prop rather than hardcoded.
 */
export default function NeedHelpCard({
  description = "Our team is here to help you with any questions.",
}) {
  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white p-5">
      <h3 className="text-sm font-bold text-ink-900">Need Help?</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{description}</p>
      <Button as={Link} to="/help-center" variant="outline-dark" size="md" className="mt-3.5 w-full">
        <HeadsetIcon className="h-4 w-4" />
        Chat with Support
      </Button>
    </div>
  );
}
