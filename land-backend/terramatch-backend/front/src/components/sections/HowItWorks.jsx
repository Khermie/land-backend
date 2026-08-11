import SectionHeading from "../common/SectionHeading";

const STEPS = [
  { label: "Sign Up" },
  { label: "Explore Land" },
  { label: "Analyze Environment" },
  { label: "Start Bidding or Project" },
  { label: "Get AI Recommendations" },
  { label: "Compare Bids" },
  { label: "Select Best Contractor" },
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
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm border border-forest-100 text-xl font-bold text-forest-600"
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
                <span className="mt-4 max-w-[92px] text-sm font-semibold leading-tight text-ink-900">
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
