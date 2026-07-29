// Land owner / seller profile data, keyed by slug. So far only
// "kwame-owusu" exists (the "Contact Land Owner" destination from the
// East Legon Hills listing) — see LandOwnerProfile.jsx for what
// renders when a slug isn't found here.
export const LAND_OWNERS = {
  "kwame-owusu": {
    name: "Kwame Owusu",
    shortName: "Kwame O.",
    verified: true,
    location: "Accra, Greater Accra Region, Ghana",
    role: "Land Owner",
    bio: "I specialize in residential and commercial land sales in prime locations across Greater Accra. My goal is to provide genuine land opportunities with complete transparency.",
    totalListings: 24,
    stats: [
      { icon: "document", label: "Member Since", value: "Jan 2022" },
      { icon: "listings", label: "Total Listings", value: "24" },
      { icon: "sales", label: "Successful Sales", value: "18" },
      { icon: "phone", label: "Response Rate", value: "98%" },
      { icon: "clock", label: "Avg. Response Time", value: "1.2 hrs" },
    ],
    verificationChecklist: [
      "National ID Verified",
      "Contact Information Verified",
      "Business Registration Verified",
      "Address Verified",
    ],
    // Inferred — extra depth for "View Verification Details", which
    // wasn't expanded in the source screenshot.
    verificationDetails: [
      { label: "ID Type", value: "Ghana Card" },
      { label: "Verified On", value: "Jan 18, 2022" },
      { label: "Documents Reviewed", value: "4" },
      { label: "Verifying Body", value: "TerraMatch Trust & Safety" },
    ],
    about:
      "With over 5 years of experience in real estate and land ownership, I ensure that every transaction is fair, transparent, and secure. I work with verified surveyors and legal professionals to guarantee authentic land documents.",
    areasOfOperation: ["Greater Accra Region", "Eastern Region"],
    specialization: ["Residential Lands", "Commercial Lands"],
    phone: "+233 24 123 4567",
    email: "kwame.owusu@email.com",
    // Every FEATURED_LANDS entry is treated as one of Kwame's listings
    // for this demo — the screenshot shows 24 total but only 5 sample
    // lands exist anywhere in this project's data.
    listingSlugs: [
      "east-legon-hills",
      "oyarifa-extension",
      "adenta-hills",
      "tema-community-25",
      "amasaman-estate",
    ],
    performance: [
      { label: "Response Rate", value: "98%" },
      { label: "Avg. Response Time", value: "1.2 hrs" },
      { label: "Successful Sales", value: "18" },
      { label: "Total Listings", value: "24" },
      { label: "Member Since", value: "Jan 2022" },
    ],
    // Inferred — extra depth for "View Performance Details", which
    // wasn't expanded in the source screenshot.
    performanceDetails: [
      { label: "Repeat Clients", value: "6" },
      { label: "Avg. Deal Closure Time", value: "9 days" },
      { label: "Listing-to-Sale Rate", value: "75%" },
    ],
    rating: 4.8,
    reviewCount: 24,
    ratingBreakdown: [
      { stars: 5, count: 18 },
      { stars: 4, count: 5 },
      { stars: 3, count: 1 },
      { stars: 2, count: 0 },
      { stars: 1, count: 0 },
    ],
    reviews: [
      {
        name: "Ama Serwaa",
        rating: 5,
        dateLabel: "May 19, 2025",
        comment: "Great experience! The land documents were genuine and the process was smooth.",
      },
      {
        name: "Kofi Mensah",
        rating: 5,
        dateLabel: "May 18, 2025",
        comment: "Professional and responsive. I highly recommend Kwame for land transactions.",
      },
      {
        name: "Nana Adjei",
        rating: 5,
        dateLabel: "May 16, 2025",
        comment: "Transparent, trustworthy and very helpful throughout the process.",
      },
      // Inferred — extra rows beyond what the screenshot shows, so
      // "View All Reviews" has real content to reveal.
      {
        name: "Yaw Boateng",
        rating: 4,
        dateLabel: "May 12, 2025",
        comment: "Good communication overall, though the paperwork took a bit longer than expected.",
      },
      {
        name: "Efua Mensah",
        rating: 5,
        dateLabel: "May 8, 2025",
        comment: "Everything was exactly as described. Would buy through Kwame again.",
      },
    ],
    badges: [
      { icon: "trophy", title: "Top Rated Seller", description: "Awarded for excellent service." },
      { icon: "shield", title: "Verified Land Owner", description: "Identity and documents verified." },
      { icon: "bolt", title: "Fast Responder", description: "Usually replies within 1 hour." },
      // Inferred — extra badges beyond the screenshot, so "View All
      // Badges" has real content to reveal.
      { icon: "star", title: "5-Star Average", description: "Maintains a top-tier rating across all reviews." },
      { icon: "handshake", title: "Trusted Negotiator", description: "Known for fair, transparent deal-making." },
    ],
    // Reflects the one entry point wired to this page so far (the East
    // Legon Hills listing's "Contact Land Owner" button).
    breadcrumb: [
      { label: "Explore Land", to: "/explore-land" },
      { label: "East Legon Hills", to: "/explore-land/east-legon-hills" },
    ],
  },
};
