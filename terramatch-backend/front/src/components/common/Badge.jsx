import { cn } from "../../utils/cn";

/**
 * Small pill badge — used for the "Empowering Smarter Construction" eyebrow
 * and the "Verified" / "Map View" style tags throughout the page.
 */
export default function Badge({ children, tone = "solid", className }) {
  const tones = {
    solid: "bg-forest-600 text-white",
    soft: "bg-forest-100 text-forest-700",
    outline: "border border-ink-900/15 text-ink-700 bg-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
