import { cn } from "../../utils/cn";

/**
 * Renders a 5-star rating row. `value` may be fractional (e.g. 4.6);
 * stars render as fully filled up to the nearest whole star, matching
 * the flat gold-star style used on contractor cards.
 */
export default function StarRating({ value = 0, className }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(value));

  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Rated ${value} out of 5`}
    >
      {stars.map((filled, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={cn("h-4 w-4", filled ? "fill-amber-400" : "fill-ink-900/15")}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />
        </svg>
      ))}
    </span>
  );
}
