import { forwardRef } from "react";
import { cn } from "../../utils/cn";

/**
 * Reusable Button.
 * Variants map 1:1 to the button styles present in the source screenshots:
 *  - primary   -> solid forest green ("Explore Interactive Map", "View Profile")
 *  - secondary -> solid navy ("Find Verified Contractors")
 *  - white     -> solid white on dark ("Get Started" in footer)
 *  - outline   -> outlined ("Explore Platform", "Log In")
 *  - ghost     -> text-only, tab-style ("List View")
 */
const VARIANTS = {
  primary:
    "bg-forest-600 text-white hover:bg-forest-700 shadow-sm",
  secondary:
    "bg-navy-800 text-white hover:bg-navy-900 shadow-sm",
  white:
    "bg-white text-ink-900 hover:bg-mist-100",
  outline:
    "bg-transparent text-white border border-white/70 hover:bg-white/10",
  "outline-dark":
    "bg-white text-ink-900 border border-ink-900/15 hover:bg-mist-100",
  ghost:
    "bg-mist-100 text-ink-700 hover:bg-mist-200",
};

const SIZES = {
  sm: "text-sm px-4 py-2",
  md: "text-[15px] px-5 py-3",
  lg: "text-base px-6 py-3.5",
};

const Button = forwardRef(
  (
    {
      as: Component = "button",
      variant = "primary",
      size = "md",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-semibold",
          "transition-all duration-200 ease-out active:scale-[0.98]",
          VARIANTS[variant],
          SIZES[size],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";
export default Button;
