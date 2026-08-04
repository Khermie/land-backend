import { cn } from "../../utils/cn";

/**
 * Centered section heading with a short underline rule beneath it —
 * reused for "Powerful Features for Smarter Decisions" and
 * "How TerraMatch Works".
 */
export default function SectionHeading({ children, className }) {
  return (
    <div className={cn("text-center", className)}>
      <h2 className="text-3xl sm:text-4xl font-bold text-ink-900">
        {children}
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-forest-600" />
    </div>
  );
}
