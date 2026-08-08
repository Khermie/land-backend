import { unsplashUrl, LAND_PHOTO_IDS, CONTRACTOR_PHOTO_IDS } from "./stockImages";

// Category filter pills on the Explore Land page.
export const LAND_CATEGORIES = [
  "All Land",
  "Residential",
  "Commercial",
  "Industrial",
  "Agricultural",
];

export const LAND_TYPE_OPTIONS = LAND_CATEGORIES.filter((c) => c !== "All Land");

// Featured land listings — read directly from the source screenshot.
// `image`: real, properly-licensed photos (see constants/stockImages.js)
// — only 4 distinct land photos were sourced, so 2 of the 6 entries
// below intentionally repeat one rather than going unillustrated.
// `ownerSlug`: every listing here belongs to Kwame Owusu (see
// constants/landOwners.js — LAND_OWNERS["kwame-owusu"].listingSlugs
// already lists all of these) — added directly on each entry so any
// card or flow that only has the bare FEATURED_LANDS object (not the
// fuller LAND_DETAILS record) can still resolve who to contact, e.g.
// the Buy Now flow starting a conversation with the right owner
// straight from a listing card (see MessagesContext.jsx).
export const FEATURED_LANDS = [
  {
    slug: "east-legon-hills",
    name: "East Legon Hills",
    location: "Accra, Greater Accra",
    price: "GH₵120 / sq ft",
    priceValue: 120,
    region: "Accra",
    category: "Residential",
    bids: 12,
    ownerSlug: "kwame-owusu",
    image: unsplashUrl(LAND_PHOTO_IDS.greenCoveredLand),
    // Buy Now lets a buyer skip the auction and purchase immediately
    // at this fixed price. Only set on listings where the owner has
    // opted in — the auction badge, bidding, and Buy Now button are
    // driven entirely by whether this field is present (see
    // AuctionContext.buyNow / LandDetailContent / listing cards).
    buyNowPrice: 185000,
  },
  {
    slug: "oyarifa-extension",
    name: "Oyarifa Extension",
    location: "Accra, Greater Accra",
    price: "GH₵110 / sq ft",
    priceValue: 110,
    region: "Accra",
    category: "Agricultural",
    bids: 8,
    ownerSlug: "kwame-owusu",
    image: unsplashUrl(LAND_PHOTO_IDS.greenPlainField),
    buyNowPrice: 165000,
  },
  {
    slug: "adenta-hills",
    name: "Adenta Hills",
    location: "Accra, Greater Accra",
    price: "GH₵130 / sq ft",
    priceValue: 130,
    region: "Accra",
    category: "Residential",
    bids: 15,
    ownerSlug: "kwame-owusu",
    image: unsplashUrl(LAND_PHOTO_IDS.largeAreaOfLand),
    // No buyNowPrice — this owner has chosen auction-only, same as
    // Tema Community 25 and Kasoa Junction below. Demonstrates both
    // states coexisting: Buy Now only appears where it's configured.
  },
  {
    slug: "tema-community-25",
    name: "Tema Community 25",
    location: "Tema, Greater Accra",
    price: "GH₵115 / sq ft",
    priceValue: 115,
    region: "Tema",
    category: "Commercial",
    bids: 10,
    ownerSlug: "kwame-owusu",
    image: unsplashUrl(LAND_PHOTO_IDS.farmlandWithMountains),
  },
  {
    slug: "amasaman-estate",
    name: "Amasaman Estate",
    location: "Amasaman, Greater Accra",
    price: "GH₵105 / sq ft",
    priceValue: 105,
    region: "Amasaman",
    category: "Industrial",
    bids: 6,
    ownerSlug: "kwame-owusu",
    image: unsplashUrl(LAND_PHOTO_IDS.greenCoveredLand),
    buyNowPrice: 142000,
  },
  // Matches the 4th listing shown in the Home page's bidding preview
  // (LandBiddingPreview.jsx) — added so its "Place Bid" button has a
  // real destination instead of a generic one. Category is inferred,
  // same as the other lands above.
  {
    slug: "kasoa-junction",
    name: "Kasoa Junction",
    location: "Kasoa, Central Region",
    price: "GH₵100 / sq ft",
    priceValue: 100,
    region: "Kasoa",
    category: "Residential",
    bids: 9,
    ownerSlug: "kwame-owusu",
    image: unsplashUrl(LAND_PHOTO_IDS.greenPlainField),
  },
];

// Multi-image gallery for the Land Detail page, keyed by slug. Built
// only from photo IDs already verified elsewhere in this project
// (each land's own card photo first, then two more verified land/
// terrain photos for variety) — see the note in stockImages.js on why
// no new, unverified IDs were introduced. Falls back to a single-photo
// gallery (just the card image) for any slug not listed here.
export const LAND_GALLERIES = {
  "east-legon-hills": [
    unsplashUrl(LAND_PHOTO_IDS.greenCoveredLand, { w: 1200 }),
    unsplashUrl(LAND_PHOTO_IDS.largeAreaOfLand, { w: 1200 }),
    unsplashUrl(CONTRACTOR_PHOTO_IDS.terrainRender, { w: 1200 }),
    unsplashUrl(CONTRACTOR_PHOTO_IDS.mapAerial, { w: 1200 }),
  ],
  "oyarifa-extension": [
    unsplashUrl(LAND_PHOTO_IDS.greenPlainField, { w: 1200 }),
    unsplashUrl(LAND_PHOTO_IDS.farmlandWithMountains, { w: 1200 }),
    unsplashUrl(CONTRACTOR_PHOTO_IDS.terrainRender, { w: 1200 }),
  ],
  "adenta-hills": [
    unsplashUrl(LAND_PHOTO_IDS.largeAreaOfLand, { w: 1200 }),
    unsplashUrl(LAND_PHOTO_IDS.greenCoveredLand, { w: 1200 }),
    unsplashUrl(CONTRACTOR_PHOTO_IDS.mapAerial, { w: 1200 }),
  ],
  "tema-community-25": [
    unsplashUrl(LAND_PHOTO_IDS.farmlandWithMountains, { w: 1200 }),
    unsplashUrl(LAND_PHOTO_IDS.greenPlainField, { w: 1200 }),
    unsplashUrl(CONTRACTOR_PHOTO_IDS.terrainRender, { w: 1200 }),
  ],
  "amasaman-estate": [
    unsplashUrl(LAND_PHOTO_IDS.greenCoveredLand, { w: 1200 }),
    unsplashUrl(LAND_PHOTO_IDS.farmlandWithMountains, { w: 1200 }),
    unsplashUrl(CONTRACTOR_PHOTO_IDS.mapAerial, { w: 1200 }),
  ],
  "kasoa-junction": [
    unsplashUrl(LAND_PHOTO_IDS.greenPlainField, { w: 1200 }),
    unsplashUrl(LAND_PHOTO_IDS.largeAreaOfLand, { w: 1200 }),
    unsplashUrl(CONTRACTOR_PHOTO_IDS.terrainRender, { w: 1200 }),
  ],
};

export function getLandGallery(land) {
  return LAND_GALLERIES[land.slug] ?? [land.image];
}

// Derived option lists for the search/filter dropdowns.
export const LAND_REGIONS = [
  "All Regions",
  ...new Set(FEATURED_LANDS.map((l) => l.region)),
];

export const LAND_PRICE_RANGES = [
  { label: "Any Price", test: () => true },
  { label: "Under GH₵110/sq ft", test: (v) => v < 110 },
  { label: "GH₵110 – GH₵120/sq ft", test: (v) => v >= 110 && v <= 120 },
  { label: "Above GH₵120/sq ft", test: (v) => v > 120 },
];

export const LAND_PRICE_RANGE_OPTIONS = LAND_PRICE_RANGES.map((r) => r.label);

export function priceMatchesRange(priceValue, rangeLabel) {
  const range = LAND_PRICE_RANGES.find((r) => r.label === rangeLabel);
  return range ? range.test(priceValue) : true;
}

// Price-tag pin markers and place labels on the stylized map mock.
// Positions are percentages of the map container (top/left) so the
// layout stays responsive without a real mapping library.
export const MAP_PRICE_PINS = [
  { price: "GH₵140/sq ft", top: "27%", left: "16%" },
  { price: "GH₵140/sq ft", top: "31%", left: "45%" },
  { price: "GH₵130/sq ft", top: "51%", left: "10%" },
  { price: "GH₵130/sq ft", top: "58%", left: "35%" },
  { price: "GH₵120/sq ft", top: "68%", left: "8%" },
  { price: "GH₵100/sq ft", top: "86%", left: "29%" },
];

export const MAP_PLACE_LABELS = [
  { label: "Dodowa", top: "34%", left: "31%", emphasis: true },
  { label: "Aburi", top: "42%", left: "13%" },
  { label: "Prampram", top: "50%", left: "51%" },
  { label: "Oyarifa", top: "62%", left: "10%" },
  { label: "Tema", top: "70%", left: "50%" },
  { label: "Amasaman", top: "72%", left: "26%" },
  { label: "Accra", top: "86%", left: "13%" },
  { label: "Kasoa", top: "93%", left: "5%" },
];

export const MAP_ROUTE_SHIELDS = [
  { label: "N4", top: "22%", left: "22%" },
  { label: "R40", top: "26%", left: "47%" },
  { label: "R75", top: "50%", left: "56%" },
  { label: "R80", top: "56%", left: "38%" },
  { label: "N6", top: "62%", left: "54%" },
  { label: "R40", top: "40%", left: "9%" },
  { label: "R40", top: "65%", left: "22%" },
  { label: "N1", top: "84%", left: "9%" },
  { label: "N0", top: "80%", left: "32%" },
  { label: "R103", top: "94%", left: "9%" },
];

export const LAND_TRUST_FEATURES = [
  {
    icon: "🛡️",
    title: "Verified Lands",
    description: "All lands are verified for authenticity.",
  },
  {
    icon: "⚖️",
    title: "Transparent Process",
    description: "Clear pricing and bidding process.",
  },
  {
    icon: "🔒",
    title: "Secure Transactions",
    description: "Safe and secure payment system.",
  },
  {
    icon: "🤝",
    title: "Best Deals",
    description: "Compare and get the best offers.",
  },
];
