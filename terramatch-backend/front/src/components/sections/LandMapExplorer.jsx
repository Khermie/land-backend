import { useState } from "react";
import Button from "../common/Button";
import FeaturedLandCard from "../common/FeaturedLandCard";
import {
  MAP_PRICE_PINS,
  MAP_PLACE_LABELS,
  MAP_ROUTE_SHIELDS,
} from "../../constants/lands";

const MIN_ZOOM = 0.85;
const MAX_ZOOM = 1.3;
const ZOOM_STEP = 0.1;

function PriceTagPin({ price, top, left }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-full rounded-md bg-forest-900 px-2.5 py-1 text-xs font-bold text-white shadow-card"
      style={{ top, left }}
    >
      {price}
      <span
        className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-forest-900"
        aria-hidden="true"
      />
    </div>
  );
}

export default function LandMapExplorer({ lands, onViewAll, sectionId }) {
  const [zoom, setZoom] = useState(1);

  return (
    <section id={sectionId} className="container-page pb-10">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/*
          Stylized map mock — no live mapping library is wired in.
          Roads, water, and place labels are illustrative and
          reproduce the layout of the source screenshot; swap this
          block for a real map (e.g. Mapbox/Google Maps) when ready.
        */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-ink-900/10 bg-forest-50 sm:aspect-[4/3]">
          <div
            className="absolute inset-0 origin-center transition-transform duration-300"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* Water body */}
            <div
              className="absolute bottom-0 right-0 h-[38%] w-[70%] rounded-tl-[60%] bg-sky-200"
              aria-hidden="true"
            />
            {/* Roads */}
            <div
              className="absolute left-0 top-[38%] h-px w-full -rotate-6 bg-amber-300"
              aria-hidden="true"
            />
            <div
              className="absolute left-0 top-[62%] h-px w-full rotate-3 bg-amber-300"
              aria-hidden="true"
            />
            <div
              className="absolute left-[20%] top-0 h-full w-px rotate-12 bg-amber-300"
              aria-hidden="true"
            />

            {MAP_ROUTE_SHIELDS.map((shield, i) => (
              <span
                key={`${shield.label}-${i}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold text-white"
                style={{ top: shield.top, left: shield.left }}
              >
                {shield.label}
              </span>
            ))}

            {MAP_PLACE_LABELS.map((place) => (
              <span
                key={place.label}
                className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-semibold text-ink-700"
                style={{ top: place.top, left: place.left }}
              >
                {place.label}
              </span>
            ))}

            {MAP_PRICE_PINS.map((pin, i) => (
              <PriceTagPin key={`${pin.price}-${i}`} {...pin} />
            ))}

            {/* Current-location pin near Dodowa */}
            <div
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ top: "34%", left: "31%" }}
            >
              <svg viewBox="0 0 24 24" className="h-8 w-8 fill-forest-600 drop-shadow" aria-hidden="true">
                <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
              </svg>
            </div>
          </div>

          {/* Zoom controls */}
          <div className="absolute bottom-4 right-4 flex flex-col overflow-hidden rounded-lg border border-ink-900/10 bg-white shadow-card">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)))}
              disabled={zoom >= MAX_ZOOM}
              aria-label="Zoom in"
              className="flex h-9 w-9 items-center justify-center text-lg font-bold text-ink-900 hover:bg-mist-100 disabled:opacity-40"
            >
              +
            </button>
            <div className="h-px w-full bg-ink-900/10" />
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)))}
              disabled={zoom <= MIN_ZOOM}
              aria-label="Zoom out"
              className="flex h-9 w-9 items-center justify-center text-lg font-bold text-ink-900 hover:bg-mist-100 disabled:opacity-40"
            >
              −
            </button>
          </div>
        </div>

        {/* Featured Lands list */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-ink-900">
            Featured Lands
          </h2>

          {lands.length === 0 ? (
            <p className="rounded-xl border border-dashed border-ink-900/15 bg-mist-50 px-6 py-10 text-center text-sm text-ink-700">
              No lands match your filters. Try clearing a filter or
              searching a different keyword.
            </p>
          ) : (
            <div className="space-y-4">
              {lands.map((land) => (
                <FeaturedLandCard key={land.slug} land={land} />
              ))}
            </div>
          )}

          <Button
            type="button"
            onClick={onViewAll}
            variant="outline-dark"
            size="md"
            className="mt-4 w-full border-forest-500 text-forest-700 hover:bg-forest-50"
          >
            View All Lands
          </Button>
        </div>
      </div>
    </section>
  );
}
