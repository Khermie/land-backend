import { cn } from "../../utils/cn";

/**
 * Consistent "Sold" indicator used everywhere a listing's sale state
 * needs to show — listing cards, tiles, and the detail page. Kept as
 * one component so the styling only has to be decided once.
 */
export default function SoldBadge({ className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-ink-900 px-3 py-1 text-xs font-bold text-white",
        className
      )}
    >
      Sold
    </span>
  );
}
