import StarRating from "../common/StarRating";

const REASONS = [
  "High success rate in similar projects",
  "Best price performance score",
  "Top rated by 95% of clients",
  "Available for project timeline",
];

export default function AIRecommendation() {
  return (
    <section className="container-page py-16">
      <div className="relative overflow-hidden rounded-2xl bg-forest-950 p-8 sm:p-10">
        {/* Ambient circuit-board texture, matches the dark tech panel in the source design */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, rgba(126,198,166,0.6) 0, transparent 2px), radial-gradient(circle at 70% 60%, rgba(126,198,166,0.5) 0, transparent 2px), radial-gradient(circle at 40% 80%, rgba(126,198,166,0.4) 0, transparent 2px)",
            backgroundSize: "140px 140px",
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            AI Recommendation
          </h2>
          <p className="mt-1 text-forest-100/80">
            Based on your project in East Legon Hills
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-forest-500/40 bg-forest-900/60 p-5">
              <p className="text-sm text-forest-100/80">
                Recommended Contractor
              </p>
              <p className="mt-1 text-xl font-bold text-white">
                Kwame Builders Ltd.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <StarRating value={4.9} />
                <span className="text-sm text-white/90">
                  4.9 (128 reviews)
                </span>
                <span className="rounded-full bg-forest-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                  ✓ Verified
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-forest-500/40 bg-forest-900/60 p-5">
              <p className="text-sm font-semibold text-white">
                Why we recommend them:
              </p>
              <ul className="mt-3 space-y-2">
                {REASONS.map((reason) => (
                  <li
                    key={reason}
                    className="flex items-start gap-2 text-sm text-white/85"
                  >
                    <span className="mt-0.5 text-forest-300" aria-hidden="true">
                      ✓
                    </span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
