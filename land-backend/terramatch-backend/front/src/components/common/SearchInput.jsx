/**
 * Search input with a leading magnifying-glass icon, matching the
 * search bars in the source designs.
 */
export default function SearchInput({ placeholder, value, onChange }) {
  return (
    <label className="relative block flex-1">
      <span className="sr-only">{placeholder}</span>
      <svg
        viewBox="0 0 20 20"
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 fill-none stroke-ink-500"
        aria-hidden="true"
      >
        <circle cx="8.5" cy="8.5" r="6" strokeWidth="1.6" />
        <path d="M17 17l-3.6-3.6" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-ink-900/10 bg-white py-3 pl-10 pr-3 text-[15px] text-ink-900 placeholder:text-ink-500 focus:border-forest-500"
      />
    </label>
  );
}
