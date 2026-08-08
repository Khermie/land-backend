import { useEffect } from "react";
import { cn } from "../../utils/cn";

function CloseIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("h-4 w-4 fill-none stroke-current", className)} aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Lightweight, dependency-free modal dialog. Used by the Buy Now
 * purchase flow (BuyNowModal in LandDetailContent.jsx / listing
 * cards) but generic enough to reuse elsewhere. Follows the same
 * visual language as the rest of the app's cards (rounded-2xl white
 * surface, ink-900/10 borders, shadow-card/floating).
 */
export default function Modal({ open, onClose, title, children, className }) {
  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-900/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "relative z-10 w-full max-w-md rounded-2xl border border-ink-900/10 bg-white p-6 shadow-floating animate-fadeUp",
          className
        )}
      >
        <div className="flex items-start justify-between gap-4">
          {title && <h2 className="text-lg font-bold text-ink-900">{title}</h2>}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-500 hover:bg-mist-100 hover:text-ink-900"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
