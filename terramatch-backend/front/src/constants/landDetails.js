// Rich per-listing data for the Land Detail page. Only keyed for lands
// whose detail screenshot has actually been supplied — see
// LandDetail.jsx for what renders when a slug from FEATURED_LANDS
// (constants/lands.js) has no entry here yet.
//
// A few small pieces (nearby-place distances, the extra older bid rows
// used to demo "View All", and the Terms & Conditions copy) weren't
// visible/legible in the source screenshot and were reasonably inferred
// by me — flagged inline below. Everything else is transcribed directly.
export const LAND_DETAILS = {
  "east-legon-hills": {
    badge: "Premium Land",
    photoCount: 6,
    heroLocation: "East Legon, Greater Accra",
    breadcrumbRegion: "Greater Accra",
    ownerSlug: "kwame-owusu",
    description:
      "Prime residential land in a fast developing area with excellent road access, electricity nearby and neighborhood growth.",
    specs: [
      { icon: "landUse", label: "Land Use", value: "Residential" },
      { icon: "plotSize", label: "Plot Size", value: "120 ft x 100 ft" },
      { icon: "totalSize", label: "Total Size", value: "1.20 Acres" },
      { icon: "landStatus", label: "Land Status", value: "Titled" },
    ],
    about:
      "This land is located in East Legon Hills, a fast growing and serene neighborhood in Greater Accra. It is ideal for residential development with easy access to major roads, schools, shopping malls and other essential amenities.",
    amenities: [
      { icon: "road", label: "Road Access", value: "Good" },
      { icon: "electricity", label: "Electricity", value: "Nearby" },
      { icon: "water", label: "Water", value: "Available" },
      { icon: "topography", label: "Topography", value: "Flat Land" },
      { icon: "drainage", label: "Drainage", value: "Good" },
    ],
    locationAddress: "East Legon Hills, Accra, Greater Accra Region",
    coordinatesLabel: "5.6510° N, 0.1620° W",
    coordinates: { lat: 5.651, lng: -0.162 },
    mapPlaceLabels: [
      { label: "East Legon", top: "38%", left: "24%", emphasis: true },
      { label: "American House", top: "68%", left: "16%" },
      { label: "Lancaster University", top: "72%", left: "70%" },
      { label: "Melcom Plus", top: "30%", left: "78%" },
    ],
    // Inferred — the screenshot's map shows these place labels but not
    // exact distances, so these are estimated for display purposes only.
    nearbyPlaces: [
      { label: "American House", distance: "0.6 km" },
      { label: "Melcom Plus", distance: "1.1 km" },
      { label: "Lancaster University", distance: "1.4 km" },
    ],
    documents: [
      { name: "Land Title Certificate", meta: "PDF • 1.2 MB" },
      { name: "Site Plan", meta: "PDF • 1.8 MB" },
      { name: "Survey Plan", meta: "PDF • 1.5 MB" },
      { name: "Land Use Permit", meta: "PDF • 1.1 MB" },
    ],
    detailsTable: {
      left: [
        { label: "Property Type", value: "Residential Land" },
        { label: "Tenure", value: "Freehold" },
        { label: "Land Size", value: "1.20 Acres" },
        { label: "Plot Dimensions", value: "120 ft x 100 ft" },
        { label: "Land Status", value: "Titled" },
        { label: "Land Use", value: "Residential" },
        { label: "Access Road", value: "Good Road" },
      ],
      right: [
        { label: "Electricity", value: "Nearby" },
        { label: "Water", value: "Available" },
        { label: "Drainage", value: "Good" },
        { label: "Topography", value: "Flat Land" },
        { label: "Zoning", value: "Residential Zone" },
        { label: "Distance to Main Road", value: "800 meters" },
        { label: "Coordinates", value: "5.6510° N, 0.1620° W" },
      ],
    },
    // Inferred — placeholder copy, not shown expanded in the source
    // screenshot (the tab exists but wasn't the active one there).
    termsAndConditions: [
      "Bids are binding — the highest bidder at auction close is expected to complete payment within 14 days.",
      "A refundable deposit may be required by the land owner before a bid is accepted as the current highest offer.",
      "TerraMatch verifies listing documents but does not act as a party to the sale; buyers should conduct independent due diligence.",
      "All fees, taxes, and transfer costs beyond the winning bid amount are the responsibility of the buyer unless stated otherwise by the seller.",
    ],
    // Countdown target is computed relative to page load in the
    // component (see AUCTION_DURATION_MS in LandDetailContent.jsx)
    // rather than a fixed calendar date, since the screenshot's date
    // (May 22, 2025) has already passed relative to today.
    auctionDurationMs:
      2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 36 * 60 * 1000 + 18 * 1000,
    minimumNextBid: 125000,
    bidIncrement: 5000,
    bidHistory: [
      { bidder: "Kwame O.", verified: true, amount: 120000, dateLabel: "May 19, 2025 • 2:45 PM" },
      { bidder: "Ama Serwaa", amount: 115000, dateLabel: "May 19, 2025 • 11:20 AM" },
      { bidder: "Kofi Mensah", amount: 110000, dateLabel: "May 18, 2025 • 4:05 PM" },
      { bidder: "Nana Adjei", amount: 105000, dateLabel: "May 18, 2025 • 9:15 AM" },
      { bidder: "Akosua P.", amount: 100000, dateLabel: "May 17, 2025 • 7:30 PM" },
      // Inferred — extra older rows beyond what the screenshot shows,
      // included so the "View All" toggle has something real to reveal.
      { bidder: "Yaw Boateng", amount: 98000, dateLabel: "May 17, 2025 • 2:10 PM" },
      { bidder: "Efua Mensah", amount: 95000, dateLabel: "May 16, 2025 • 5:40 PM" },
      { bidder: "Kwabena Owusu", amount: 92000, dateLabel: "May 16, 2025 • 10:05 AM" },
    ],
  },
};

export function formatGHS(amount) {
  return `GHS ${amount.toLocaleString("en-US")}`;
}
