import SectionHeading from "../common/SectionHeading";

const STEPS = [
  { icon: "✅", label: "Sign Up" },
  { icon: "📍", label: "Explore Land" },
  { icon: "📊", label: "Analyze Environment" },
  { icon: "🔨", label: "Start Bidding or Project" },
  { icon: "🤖", label: "Get AI Recommendations" },
  { icon: "⚖️", label: "Compare Bids" },
  { icon: "👥", label: "Select Best Contractor" },
];

export default function HowItWorks() {
  return (
    <section className="bg-mist-50 py-16 sm:py-20">
      <SectionHeading>How TerraMatch Works</SectionHeading>

      <div className="container-page mt-12 overflow-x-auto">
        <ol className="flex min-w-[720px] items-start justify-between gap-2 sm:min-w-0">
          {STEPS.map((step, i) => (
            <li key={step.label} className="flex flex-1 items-start">
              <div className="flex flex-col items-center text-center">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-100 text-xl"
                  aria-hidden="true"
                >
                  {step.icon}
                </span>
                <span className="mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-forest-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="mt-2 max-w-[92px] text-sm font-semibold leading-tight text-ink-900">
                  {step.label}
                </span>
              </div>

              {i < STEPS.length - 1 && (
                <div
                  className="mt-7 h-px flex-1 border-t-2 border-dashed border-forest-300"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
