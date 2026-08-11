import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import Button from "../common/Button";
import StarRating from "../common/StarRating";
import { unsplashUrl, CONTRACTOR_PHOTO_IDS } from "../../constants/stockImages";

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

          {/* Real high-quality terrain render for GIS visualization */}
          <div className="relative aspect-[4/3] overflow-hidden bg-forest-50">
            <img 
              src={unsplashUrl(CONTRACTOR_PHOTO_IDS.terrainRender, { w: 1000 })} 
              alt="GIS Terrain Analysis" 
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/20 to-transparent" />
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
