import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { unsplashUrl, CONTRACTOR_PHOTO_IDS } from "../../constants/stockImages";
import { FEATURED_LANDS } from "../../constants/lands";
import { cn } from "../../utils/cn";

// PLACEHOLDER DATA read directly from the source screenshot. Slugs added
// to match the corresponding FEATURED_LANDS entries (constants/lands.js)
// so "Place Bid" can link to each listing's real detail page, and so
// each card's photo (looked up below) matches whatever photo that same
// land shows elsewhere on the site.
const LISTINGS = [
  { slug: "oyarifa-extension", name: "Oyarifa Extension", location: "Accra, Greater Accra", price: "GH₵110 / sq ft", bids: 8 },
  { slug: "adenta-hills", name: "Adenta Hills", location: "Accra, Greater Accra", price: "GH₵130 / sq ft", bids: 15 },
  { slug: "amasaman-estate", name: "Amasaman Estate", location: "Amasaman, Greater Accra", price: "GH₵105 / sq ft", bids: 6 },
  { slug: "kasoa-junction", name: "Kasoa Junction", location: "Central Region", price: "GH₵100 / sq ft", bids: 9 },
];

export default function LandBiddingPreview() {
  const [view, setView] = useState("map"); // "map" | "list"

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-page">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
            Explore Land and Start Bidding
          </h2>
          <div className="flex rounded-lg bg-mist-100 p-1">
            <button
              type="button"
              onClick={() => setView("map")}
              aria-pressed={view === "map"}
              className={cn(
                "rounded-md px-4 py-1.5 text-sm font-semibold transition-colors",
                view === "map"
                  ? "bg-forest-100 text-forest-700"
                  : "text-ink-700 hover:text-ink-900"
              )}
            >
              Map View
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              className={cn(
                "rounded-md px-4 py-1.5 text-sm font-semibold transition-colors",
                view === "list"
                  ? "bg-forest-100 text-forest-700"
                  : "text-ink-700 hover:text-ink-900"
              )}
            >
              List View
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* Real aerial map photo for land bidding preview */}
          <div
            className={cn(
              "aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-[420px]",
              view === "list" && "hidden lg:block"
            )}
          >
            <img 
              src={unsplashUrl(CONTRACTOR_PHOTO_IDS.mapAerial, { w: 1200 })} 
              alt="Interactive Land Map" 
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {LISTINGS.map((land) => (
              <div
                key={land.slug}
                className="overflow-hidden rounded-xl border border-ink-900/5 bg-white shadow-card"
              >
                {/* Same photo this land shows on its detail page / FeaturedLandCard */}
                <img
                  src={FEATURED_LANDS.find((f) => f.slug === land.slug)?.image}
                  alt={land.name}
                  loading="lazy"
                  className="aspect-[16/9] w-full bg-mist-100 object-cover"
                />
                <div className="p-3.5">
                  <h3 className="font-semibold text-ink-900">{land.name}</h3>
                  <p className="text-sm text-ink-500">{land.location}</p>
                  <p className="mt-1.5 text-sm font-bold text-ink-900">
                    {land.price}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-ink-500">
                      {land.bids} Bids
                    </span>
                    <Button
                      as={Link}
                      to={`/explore-land/${land.slug}`}
                      variant="outline-dark"
                      size="sm"
                      className="px-3 py-1.5 text-xs"
                    >
                      Place Bid
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
