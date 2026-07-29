const STATS = [
  { icon: "👷", value: "1,500+", label: "Verified Contractors" },
  { icon: "🏘️", value: "2,300+", label: "Land Listings" },
  { icon: "⭐", value: "4.8/5", label: "Average User Ratings" },
  { icon: "✅", value: "98%", label: "Average User Ratings" },
];

export default function StatsRow() {
  return (
    <section className="container-page pb-16">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:divide-x sm:divide-ink-900/10">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <span className="text-2xl" aria-hidden="true">
              {stat.icon}
            </span>
            <p className="mt-2 text-xl font-extrabold text-ink-900">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-ink-700">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
