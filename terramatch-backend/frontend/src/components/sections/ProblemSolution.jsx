const PROBLEMS = [
  { emoji: "🏗️", text: "Buying land without knowing the risks." },
  { emoji: "👷", text: "Finding reliable contractors is difficult" },
  { emoji: "🤝", text: "No transparency in pricing and bidding" },
];

const SOLUTIONS = [
  { emoji: "🗺️", text: "Insights for safer land decisions." },
  { emoji: "🛠️", text: "Verified contractors with proven track records" },
  { emoji: "🤝", text: "No transparency in pricing and bidding" },
];

const METRICS = [
  { label: "Terrain", value: "Suitable" },
  { label: "Flood Risk", value: "Low" },
  { label: "Drainage", value: "Good" },
  { label: "Soil Quality", value: "High" },
];

function IconRow({ icon, tone, text }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] text-white ${tone}`}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="text-[15px] leading-snug text-ink-900">{text}</span>
    </li>
  );
}

export default function ProblemSolution() {
  return (
    <section className="bg-forest-100/70 py-16">
      <div className="container-page rounded-2xl bg-forest-100/70 p-6 sm:p-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.9fr_1.4fr] lg:gap-8">
          <div>
            <h3 className="mb-4 text-lg font-bold text-ink-900">
              The Problem
            </h3>
            <ul className="space-y-4">
              {PROBLEMS.map((item) => (
                <IconRow
                  key={item.text}
                  icon="✕"
                  tone="bg-red-500"
                  text={item.text}
                />
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-ink-900">
              Our Solution
            </h3>
            <ul className="space-y-4">
              {SOLUTIONS.map((item) => (
                <IconRow
                  key={item.text}
                  icon="✓"
                  tone="bg-forest-600"
                  text={item.text}
                />
              ))}
            </ul>
          </div>

          {/* Land analysis mock: browser chrome + aerial photo + metrics panel */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1 overflow-hidden rounded-xl bg-white shadow-card">
              <div className="flex items-center gap-1.5 border-b border-ink-900/5 px-3 py-2.5">
                <span className="h-2 w-2 rounded-full bg-white ring-1 ring-ink-900/15" />
                <span className="h-2 w-2 rounded-full bg-forest-600" />
                <span className="h-2 w-2 rounded-full bg-white ring-1 ring-ink-900/15" />
                <span className="ml-auto h-2 w-2 rounded-full bg-white ring-1 ring-ink-900/15" />
              </div>
              {/*
                PLACEHOLDER ASSET: aerial/drone photo of farmland with a
                location pin overlay, per the source design. Replace with
                /src/assets/images/land-aerial.jpg
              */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-forest-300 via-forest-400 to-forest-600">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white drop-shadow" aria-hidden="true">
                    <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-center border-t border-ink-900/5 py-2">
                <span className="h-1 w-10 rounded-full bg-mist-200" />
              </div>
            </div>

            <div className="w-full shrink-0 rounded-xl bg-white p-4 shadow-card sm:w-36">
              <dl className="space-y-3">
                {METRICS.map((m) => (
                  <div key={m.label}>
                    <dt className="text-xs text-ink-500">{m.label}</dt>
                    <dd className="flex items-center gap-1 text-sm font-semibold text-forest-600">
                      {m.value}
                      <span aria-hidden="true">›</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
