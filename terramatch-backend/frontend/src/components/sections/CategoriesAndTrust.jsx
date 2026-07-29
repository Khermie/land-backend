import {
  CONTRACTOR_CATEGORIES,
  CONTRACTOR_TRUST_FEATURES,
} from "../../constants/contractors";
import { cn } from "../../utils/cn";

/**
 * `category`/`onCategoryChange` are lifted to the parent page so this
 * sidebar and the hero's "All Categories" dropdown always agree on
 * which category is selected, instead of tracking it twice.
 */
export default function CategoriesAndTrust({ category, onCategoryChange }) {
  return (
    <section className="bg-white py-4 sm:py-8">
      <div className="container-page grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* Categories sidebar */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-ink-900">Categories</h2>
          <ul className="space-y-1">
            {CONTRACTOR_CATEGORIES.map((cat) => {
              const isActive = cat.label === category;
              return (
                <li key={cat.label}>
                  <button
                    type="button"
                    onClick={() => onCategoryChange(cat.label)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                      isActive
                        ? "bg-forest-100 text-forest-700"
                        : "text-ink-700 hover:bg-mist-100"
                    )}
                  >
                    <span aria-hidden="true">{cat.icon}</span>
                    {cat.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Why Choose Verified Contractors */}
        <div>
          <h2 className="text-2xl font-bold text-ink-900">
            Why Choose Verified Contractors?
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {CONTRACTOR_TRUST_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl bg-mist-50 p-5"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-100 text-xl"
                  aria-hidden="true"
                >
                  {feature.icon}
                </span>
                <h3 className="mt-4 font-semibold text-ink-900">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
