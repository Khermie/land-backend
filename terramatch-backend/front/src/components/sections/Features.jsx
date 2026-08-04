import SectionHeading from "../common/SectionHeading";
import { BrainIcon, ScaleIcon } from "../common/Icons";

const FEATURES = [
  {
    icon: BrainIcon,
    title: "AI Contractor Recommendation",
    description:
      "Smart suggestions based on ratings, project success and user reviews.",
  },
  {
    icon: ScaleIcon,
    title: "Transparent Land Bidding",
    description: "Bid, compare and choose the best offers with full transparency.",
  },
];

export default function Features() {
  return (
    <section className="bg-forest-600 py-16 sm:py-20">
      <SectionHeading className="[&_h2]:text-white [&_div]:bg-white">
        Powerful Features for Smarter Decisions
      </SectionHeading>

      <div className="container-page mt-10 grid gap-6 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl bg-gradient-to-b from-forest-100/90 to-forest-400/90 backdrop-blur-sm p-8 shadow-card transition-transform duration-300 hover:-translate-y-1 sm:p-10 border border-white/20"
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-700 text-white shadow-inner"
              aria-hidden="true"
            >
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-bold leading-tight text-ink-900">
              {feature.title}
            </h3>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-700">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
