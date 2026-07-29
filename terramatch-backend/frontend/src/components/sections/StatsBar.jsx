const STATS = [
  { value: "0", label: "Fraudulent Transactions" },
  { value: "100%", label: "Verified Contractors" },
  { value: "GIS", label: "Powered Risk Data" },
  { value: "Real", label: "Real-Time Bidding Infrastructure" },
];

export default function StatsBar() {
  return (
    <section className="container-page pb-16">
      <div className="grid divide-y divide-forest-600/20 rounded-2xl border border-forest-600/30 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        {STATS.map((stat) => (
          <div key={stat.label} className="px-6 py-6 text-center">
            <p className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium text-ink-700">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
