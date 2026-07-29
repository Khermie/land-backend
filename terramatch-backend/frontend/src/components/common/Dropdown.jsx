import { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

/**
 * A real select-style dropdown (not decorative). Opens a listbox of
 * `options`, reports the chosen value via `onChange`, and closes on
 * selection, outside click, or Escape.
 */
export default function Dropdown({ label, options, value, onChange, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handlePointerDown(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
        className="flex w-full items-center gap-1.5 rounded-lg border border-ink-900/10 bg-white px-3.5 py-2.5 text-sm font-medium text-ink-700 hover:bg-mist-100"
      >
        <span className="truncate">{value}</span>
        <svg
          viewBox="0 0 20 20"
          className={cn(
            "ml-auto h-4 w-4 shrink-0 fill-none stroke-ink-500 transition-transform",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        >
          <path d="M5.5 7.5l4.5 4.5 4.5-4.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute left-0 top-[calc(100%+6px)] z-20 max-h-64 w-56 overflow-auto rounded-lg border border-ink-900/10 bg-white py-1.5 shadow-floating"
        >
          {options.map((option) => {
            const isSelected = option === value;
            return (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between px-3.5 py-2 text-left text-sm hover:bg-mist-100",
                    isSelected
                      ? "bg-forest-50 font-semibold text-forest-700"
                      : "text-ink-700"
                  )}
                >
                  {option}
                  {isSelected && <span aria-hidden="true">✓</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
