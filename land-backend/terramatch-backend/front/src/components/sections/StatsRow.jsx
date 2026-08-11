const STATS = [
  { value: "1,500+", label: "Verified Contractors" },
  { value: "2,300+", label: "Land Listings" },
  { value: "4.8/5", label: "Average User Ratings" },
  { value: "98%", label: "Project Success Rate" },
];

export default function StatsRow() {
  return (
    <section className="container-page pb-16">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:divide-x sm:divide-ink-900/10">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center px-4">
            <p className="text-2xl font-extrabold text-ink-900 tracking-tight">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium text-ink-600 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
