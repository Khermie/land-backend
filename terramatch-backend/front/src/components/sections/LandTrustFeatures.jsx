import { LAND_TRUST_FEATURES } from "../../constants/lands";

export default function LandTrustFeatures() {
  return (
    <section className="bg-mist-50 py-8">
      <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-2 sm:divide-x sm:divide-ink-900/10 lg:grid-cols-4">
        {LAND_TRUST_FEATURES.map((feature) => (
          <div key={feature.title} className="flex items-start gap-3 sm:pl-6 sm:first:pl-0">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-100 text-xl"
              aria-hidden="true"
            >
              {feature.icon}
            </span>
            <div>
              <h3 className="font-semibold text-ink-900">{feature.title}</h3>
              <p className="mt-0.5 text-sm text-ink-700">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
