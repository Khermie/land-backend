import { cn } from "../../utils/cn";

/**
 * Labeled form field wrapper matching the input styling already
 * established in SignupForm.jsx (border/focus-ring/error treatment) —
 * pulled out here so Post a Project and List Your Land don't each
 * reimplement the same input chrome and error-state classes.
 */
export default function FormField({
  id,
  label,
  error,
  hint,
  required,
  as = "input",
  className,
  children,
  ...inputProps
}) {
  const fieldClasses = cn(
    "w-full rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-ink-900 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-500/20",
    error ? "border-red-300 focus:border-red-500" : "border-ink-900/15 focus:border-forest-500"
  );

  const Field = as;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-1 text-sm font-semibold text-ink-900">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children ?? (
        <Field id={id} className={cn(fieldClasses, as === "textarea" && "resize-none")} {...inputProps} />
      )}
      {error ? (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-ink-500">{hint}</p>
      ) : null}
    </div>
  );
}
