import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import Button from "../common/Button";
import StarRating from "../common/StarRating";

function MatchCard({ position, matchLabel, people }) {
  return (
    <div
      className={`absolute w-[190px] rounded-xl bg-white p-3 shadow-floating animate-floatY ${position}`}
    >
      <p className="text-xs font-medium text-ink-700">
        Contractor Match:{" "}
        <span className="font-bold text-forest-600">{matchLabel}</span>
      </p>
      <div className="mt-2 space-y-2">
        {people.map((person) => (
          <div key={person.name} className="flex items-center gap-2">
            <div className="h-7 w-7 shrink-0 rounded-full bg-mist-200" />
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-ink-900">
                {person.name}
              </p>
              <div className="flex items-center gap-1">
                <StarRating value={person.stars} className="scale-90 origin-left" />
                <span className="text-[10px] text-ink-500">{person.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="container-page grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:py-24">
      <div className="animate-fadeUp">
        <Badge>Empowering Smarter Construction</Badge>

        <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl">
          Secure Your Land.
          <br />
          Match Your Contractor.
          <br />
          Powered by AI.
        </h1>

        <p className="mt-6 max-w-lg text-[15px] font-medium leading-relaxed text-ink-700 sm:text-base">
          A unified platform combining GIS spatial analysis, data-driven land
          bidding, and verified AI contractor matching to mitigate
          construction risks and eliminate fraud.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button as={Link} to="/explore-land" variant="primary" size="lg">
            Explore Interactive Map
          </Button>
          <Button as={Link} to="/find-contractor" variant="secondary" size="lg">
            Find Verified Contractors
          </Button>
        </div>
      </div>

      {/* Hero visual: browser-chrome frame around a topographic terrain render */}
      <div className="relative animate-fadeUp [animation-delay:150ms]">
        <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-card">
          <div className="flex items-center gap-3 border-b border-ink-900/5 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex gap-1 text-ink-500">
              <span aria-hidden="true">‹</span>
              <span aria-hidden="true">›</span>
            </div>
            <div className="h-4 flex-1 rounded-full bg-mist-100" />
          </div>

          {/*
            PLACEHOLDER ASSET: source design shows a 3D topographic /
            contour-line terrain render (GIS risk visualization) in
            green tones. Replace with the real render at
            /src/assets/images/terrain-render.png
          */}
          <div className="relative aspect-[4/3] bg-gradient-to-br from-forest-50 via-white to-forest-100">
            <div
              className="absolute inset-0 opacity-90"
              style={{
                backgroundImage:
                  "repeating-radial-gradient(ellipse at 55% 45%, rgba(39,91,68,0.35) 0, rgba(39,91,68,0.35) 2px, transparent 2px, transparent 14px)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute left-1/2 top-1/2 h-40 w-56 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-forest-400/60 blur-2xl"
              aria-hidden="true"
            />
          </div>
        </div>

        <MatchCard
          position="top-6 -right-2 sm:right-2"
          matchLabel="98%"
          people={[
            { name: "Benjamin A", stars: 5, tag: "Skills ↓" },
            { name: "John Brown", stars: 5, tag: "Ratings" },
          ]}
        />
        <MatchCard
          position="bottom-6 -right-2 sm:right-4 [animation-delay:1.5s]"
          matchLabel="98%"
          people={[
            { name: "Manfred Cruz", stars: 4, tag: "Ratings ↓" },
            { name: "Ralp Thompson", stars: 4, tag: "" },
          ]}
        />
      </div>
    </section>
  );
}
