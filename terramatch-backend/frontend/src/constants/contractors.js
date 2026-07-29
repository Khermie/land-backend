// Shared across TopContractors (landing page + Find Contractor page).
// Photos are not provided assets — see ImageSkeleton placeholder note
// wherever this is rendered.
export const CONTRACTORS = [
  {
    slug: "kwame-builders",
    name: "Kwame Builders Ltd.",
    rating: 4.9,
    reviews: 128,
    projects: 32,
    specialties: "Residential, Commercial",
    location: "Accra, Ghana",
    category: "Building & Construction",
  },
  {
    slug: "buildright-gh",
    name: "BuildRight GH",
    rating: 4.8,
    reviews: 106,
    projects: 28,
    specialties: "Residential, Renovation",
    location: "Kumasi, Ghana",
    category: "Renovation",
  },
  {
    slug: "solid-structures",
    name: "Solid Structures",
    rating: 4.7,
    reviews: 78,
    projects: 21,
    specialties: "Commercial, Industrial",
    location: "Takoradi, Ghana",
    category: "Building & Construction",
  },
  {
    slug: "prime-construction",
    name: "Prime Construction",
    rating: 4.6,
    reviews: 64,
    projects: 18,
    specialties: "Residential, Landscaping",
    location: "Tamale, Ghana",
    category: "Landscaping",
  },
  // Added so "show more" on the Home/Find Contractor grids has real
  // extra entries to reveal, and so previously-empty filter categories
  // (Electrical, Interior Design, Architecture) have a match.
  {
    slug: "accra-electricals",
    name: "Accra Electricals",
    rating: 4.7,
    reviews: 52,
    projects: 40,
    specialties: "Wiring, Solar Installation",
    location: "Accra, Ghana",
    category: "Electrical Services",
  },
  {
    slug: "bright-interiors",
    name: "Bright Interiors",
    rating: 4.9,
    reviews: 37,
    projects: 15,
    specialties: "Interior Fit-Out, Furnishing",
    location: "Kumasi, Ghana",
    category: "Interior Design",
  },
  {
    slug: "precision-architects",
    name: "Precision Architects",
    rating: 4.8,
    reviews: 45,
    projects: 22,
    specialties: "Architectural Design, Planning Permits",
    location: "Accra, Ghana",
    category: "Architecture & Design",
  },
];

// "Categories" sidebar on the Find Contractor page.
export const CONTRACTOR_CATEGORIES = [
  { label: "All Categories", icon: "▦" },
  { label: "Building & Construction", icon: "🏗️" },
  { label: "Renovation", icon: "🧱" },
  { label: "Architecture & Design", icon: "📐" },
  { label: "Electrical Services", icon: "⚡" },
  { label: "Plumbing", icon: "🔧" },
  { label: "Interior Design", icon: "🖼️" },
  { label: "Landscaping", icon: "🌳" },
  { label: "Others", icon: "☰" },
];

// Derived option lists for the search/filter dropdowns.
export const CONTRACTOR_CATEGORY_OPTIONS = CONTRACTOR_CATEGORIES.map(
  (c) => c.label
);

export const CONTRACTOR_LOCATIONS = [
  "All Locations",
  ...new Set(CONTRACTORS.map((c) => c.location.split(",")[0].trim())),
];

export const CONTRACTOR_RATING_OPTIONS = [
  "Any rating",
  "4.0+",
  "4.5+",
  "4.8+",
];

export function ratingOptionToMin(option) {
  if (option === "Any rating") return 0;
  const parsed = parseFloat(option);
  return Number.isNaN(parsed) ? 0 : parsed;
}

// "Why Choose Verified Contractors?" feature grid.
export const CONTRACTOR_TRUST_FEATURES = [
  {
    icon: "🛡️",
    title: "Verified Professionals",
    description: "All contractors go through a strict verification process.",
  },
  {
    icon: "🏅",
    title: "Quality Assurance",
    description: "Rated by real clients with completed projects.",
  },
  {
    icon: "📋",
    title: "Transparent Pricing",
    description: "Get clear quotes and compare bids easily.",
  },
  {
    icon: "🔒",
    title: "Secure & Safe",
    description: "Your project and payments are protected.",
  },
];
