// Contractor profile data, keyed by slug — same pattern as
// constants/landOwners.js. So far only "kwame-builders" has a full
// profile (the highest-rated, most-reviewed contractor in
// constants/contractors.js, so it makes sense as the flagship
// example). See ContractorProfile.jsx for what renders when a slug
// isn't found here.
import { unsplashUrl, CONTRACTOR_PHOTO_IDS, LAND_PHOTO_IDS } from "./stockImages";

export const CONTRACTOR_PROFILES = {
  "kwame-builders": {
    name: "Kwame Builders Ltd.",
    shortName: "Kwame Builders",
    verified: true,
    location: "Accra, Ghana",
    category: "Building & Construction",
    bio: "We deliver residential and commercial construction projects on time and on budget, with a focus on quality craftsmanship and transparent client communication.",
    totalProjects: 32,
    stats: [
      { icon: "document", label: "Member Since", value: "Mar 2021" },
      { icon: "listings", label: "Total Projects", value: "32" },
      { icon: "sales", label: "Completed Projects", value: "29" },
      { icon: "phone", label: "Response Rate", value: "96%" },
      { icon: "clock", label: "Avg. Response Time", value: "45 min" },
    ],
    verificationChecklist: [
      "National ID Verified",
      "Contact Information Verified",
      "Business Registration Verified",
      "Trade License Verified",
    ],
    // Inferred — extra depth for "View Verification Details", matching
    // the pattern already used on the Land Owner Profile page.
    verificationDetails: [
      { label: "License Type", value: "D1K1 Building Contractor" },
      { label: "Verified On", value: "Mar 22, 2021" },
      { label: "Documents Reviewed", value: "5" },
      { label: "Verifying Body", value: "TerraMatch Trust & Safety" },
    ],
    about:
      "Kwame Builders Ltd. has completed 32 residential and commercial projects across Greater Accra since 2021. Our in-house team of masons, electricians, and site supervisors means fewer subcontractor handoffs and more consistent quality from foundation to finish.",
    serviceAreas: ["Greater Accra Region", "Central Region"],
    specializations: ["Residential Construction", "Commercial Construction"],
    phone: "+233 24 555 0182",
    email: "projects@kwamebuilders.gh",
    performance: [
      { label: "Response Rate", value: "96%" },
      { label: "Avg. Response Time", value: "45 min" },
      { label: "Completed Projects", value: "29" },
      { label: "Total Projects", value: "32" },
      { label: "Member Since", value: "Mar 2021" },
    ],
    // Inferred — extra depth for "View Performance Details".
    performanceDetails: [
      { label: "Repeat Clients", value: "11" },
      { label: "Avg. Project Duration", value: "14 weeks" },
      { label: "On-Time Completion Rate", value: "91%" },
    ],
    rating: 4.9,
    reviewCount: 128,
    ratingBreakdown: [
      { stars: 5, count: 104 },
      { stars: 4, count: 18 },
      { stars: 3, count: 4 },
      { stars: 2, count: 1 },
      { stars: 1, count: 1 },
    ],
    reviews: [
      {
        name: "Nana Adjei",
        rating: 5,
        dateLabel: "Jun 14, 2025",
        comment: "Kwame's crew finished our office fit-out two weeks ahead of schedule without cutting corners.",
      },
      {
        name: "Efua Mensah",
        rating: 5,
        dateLabel: "Jun 2, 2025",
        comment: "Clear communication throughout — we always knew exactly what stage the build was at.",
      },
      {
        name: "Yaw Boateng",
        rating: 4,
        dateLabel: "May 20, 2025",
        comment: "Solid work overall. One minor delay waiting on materials, but they kept us informed.",
      },
      // Inferred — extra rows so "View All Reviews" has real content.
      {
        name: "Abena Frimpong",
        rating: 5,
        dateLabel: "May 5, 2025",
        comment: "Second project we've hired them for. Consistent quality both times.",
      },
      {
        name: "Kojo Antwi",
        rating: 5,
        dateLabel: "Apr 22, 2025",
        comment: "Professional site management and fair pricing. Would recommend without hesitation.",
      },
    ],
    badges: [
      { icon: "trophy", title: "Top Rated Contractor", description: "Awarded for consistently excellent work." },
      { icon: "shield", title: "Verified Business", description: "Registration and trade license verified." },
      { icon: "bolt", title: "Fast Responder", description: "Usually replies within an hour." },
      // Inferred — extra badges so "View All Badges" has real content.
      { icon: "star", title: "5-Star Average", description: "Maintains a top-tier rating across all reviews." },
      { icon: "handshake", title: "Repeat Client Favorite", description: "11 clients have hired them more than once." },
    ],
    // Reusing the same sourced construction photos as the card grid
    // (constants/stockImages.js) rather than sourcing more — see the
    // README's "Placeholder assets" note on the limited photo set.
    portfolio: [
      {
        title: "East Legon Office Fit-Out",
        description: "Full interior build-out for a 3-story commercial office.",
        image: unsplashUrl(CONTRACTOR_PHOTO_IDS.modernInterior),
      },
      {
        title: "Adenta Residential Build",
        description: "4-bedroom family home, foundation to finish, 16-week build.",
        image: unsplashUrl(CONTRACTOR_PHOTO_IDS.constructionWorkersGroup),
      },
      {
        title: "Tema Warehouse Extension",
        description: "Structural extension and electrical upgrade for an existing warehouse.",
        image: unsplashUrl(CONTRACTOR_PHOTO_IDS.tropicalConstructionSite),
      },
    ],
    // Reflects the entry points wired to this page: Find Contractor's
    // grid and the Home page's Top Rated Contractors section.
    breadcrumb: [{ label: "Find Contractor", to: "/find-contractor" }],
  },

  "buildright-gh": {
    name: "BuildRight GH",
    shortName: "BuildRight GH",
    verified: true,
    location: "Kumasi, Ghana",
    category: "Renovation",
    bio: "We specialize in home renovations that don't derail your life — kitchen remodels, bathroom upgrades, and extensions completed on a clear timeline with weekly progress updates.",
    totalProjects: 28,
    stats: [
      { icon: "document", label: "Member Since", value: "Jun 2021" },
      { icon: "listings", label: "Total Projects", value: "28" },
      { icon: "sales", label: "Completed Projects", value: "26" },
      { icon: "phone", label: "Response Rate", value: "94%" },
      { icon: "clock", label: "Avg. Response Time", value: "1.1 hrs" },
    ],
    verificationChecklist: [
      "National ID Verified",
      "Contact Information Verified",
      "Business Registration Verified",
      "Trade License Verified",
    ],
    verificationDetails: [
      { label: "License Type", value: "D2K2 Renovation Contractor" },
      { label: "Verified On", value: "Jun 30, 2021" },
      { label: "Documents Reviewed", value: "5" },
      { label: "Verifying Body", value: "TerraMatch Trust & Safety" },
    ],
    about:
      "BuildRight GH has renovated 28 homes across Ashanti and Bono Region since 2021. We focus exclusively on renovation work — kitchens, bathrooms, and extensions — so our crews specialize in working around occupied homes instead of ground-up builds.",
    serviceAreas: ["Ashanti Region", "Bono Region"],
    specializations: ["Home Renovation", "Kitchen & Bath Remodeling"],
    phone: "+233 24 555 0219",
    email: "projects@buildrightgh.com",
    performance: [
      { label: "Response Rate", value: "94%" },
      { label: "Avg. Response Time", value: "1.1 hrs" },
      { label: "Completed Projects", value: "26" },
      { label: "Total Projects", value: "28" },
      { label: "Member Since", value: "Jun 2021" },
    ],
    performanceDetails: [
      { label: "Repeat Clients", value: "9" },
      { label: "Avg. Project Duration", value: "6 weeks" },
      { label: "On-Time Completion Rate", value: "89%" },
    ],
    rating: 4.8,
    reviewCount: 106,
    ratingBreakdown: [
      { stars: 5, count: 82 },
      { stars: 4, count: 17 },
      { stars: 3, count: 5 },
      { stars: 2, count: 1 },
      { stars: 1, count: 1 },
    ],
    reviews: [
      {
        name: "Akosua Prempeh",
        rating: 5,
        dateLabel: "Jun 10, 2025",
        comment: "Our kitchen renovation was done in five weeks exactly as quoted. No surprise costs.",
      },
      {
        name: "Kwesi Owusu",
        rating: 5,
        dateLabel: "May 28, 2025",
        comment: "They worked around our schedule and kept the site clean throughout — genuinely low-stress.",
      },
      {
        name: "Adjoa Mensah",
        rating: 4,
        dateLabel: "May 14, 2025",
        comment: "Good craftsmanship on the bathroom remodel. Took an extra week for tile delivery, not their fault.",
      },
      {
        name: "Bright Asante",
        rating: 5,
        dateLabel: "Apr 30, 2025",
        comment: "Second time hiring them. Consistent quality, fair pricing, clear communication.",
      },
      {
        name: "Linda Boateng",
        rating: 5,
        dateLabel: "Apr 18, 2025",
        comment: "The extension blends seamlessly with the original house. Very happy with the result.",
      },
    ],
    badges: [
      { icon: "trophy", title: "Top Rated Contractor", description: "Awarded for consistently excellent work." },
      { icon: "shield", title: "Verified Business", description: "Registration and trade license verified." },
      { icon: "bolt", title: "Fast Responder", description: "Usually replies within an hour." },
      { icon: "star", title: "5-Star Average", description: "Maintains a top-tier rating across all reviews." },
      { icon: "handshake", title: "Repeat Client Favorite", description: "9 clients have hired them more than once." },
    ],
    portfolio: [
      {
        title: "Ahodwo Kitchen Remodel",
        description: "Full kitchen renovation with custom cabinetry, 5-week turnaround.",
        image: unsplashUrl(CONTRACTOR_PHOTO_IDS.modernInterior),
      },
      {
        title: "Nhyiaeso Bathroom Upgrade",
        description: "Two-bathroom remodel with new plumbing and fixtures.",
        image: unsplashUrl(CONTRACTOR_PHOTO_IDS.tropicalConstructionSite),
      },
      {
        title: "Asokwa Home Extension",
        description: "Single-story extension adding a family room and extra bedroom.",
        image: unsplashUrl(CONTRACTOR_PHOTO_IDS.constructionWorkersGroup),
      },
    ],
    breadcrumb: [{ label: "Find Contractor", to: "/find-contractor" }],
  },

  "solid-structures": {
    name: "Solid Structures",
    shortName: "Solid Structures",
    verified: true,
    location: "Takoradi, Ghana",
    category: "Building & Construction",
    bio: "We build commercial and industrial facilities — warehouses, office complexes, and factory expansions — engineered to spec and delivered with full structural documentation.",
    totalProjects: 21,
    stats: [
      { icon: "document", label: "Member Since", value: "Sep 2020" },
      { icon: "listings", label: "Total Projects", value: "21" },
      { icon: "sales", label: "Completed Projects", value: "19" },
      { icon: "phone", label: "Response Rate", value: "91%" },
      { icon: "clock", label: "Avg. Response Time", value: "2.3 hrs" },
    ],
    verificationChecklist: [
      "National ID Verified",
      "Contact Information Verified",
      "Business Registration Verified",
      "Trade License Verified",
    ],
    verificationDetails: [
      { label: "License Type", value: "D1K1 Building Contractor" },
      { label: "Verified On", value: "Sep 14, 2020" },
      { label: "Documents Reviewed", value: "6" },
      { label: "Verifying Body", value: "TerraMatch Trust & Safety" },
    ],
    about:
      "Solid Structures has delivered 21 commercial and industrial projects across the Western and Central Regions since 2020. Our in-house structural engineering team means every build comes with full documentation — a requirement we've seen matter most for warehouse and factory clients passing their own compliance reviews.",
    serviceAreas: ["Western Region", "Central Region"],
    specializations: ["Commercial Construction", "Industrial Facilities"],
    phone: "+233 24 555 0344",
    email: "info@solidstructures.gh",
    performance: [
      { label: "Response Rate", value: "91%" },
      { label: "Avg. Response Time", value: "2.3 hrs" },
      { label: "Completed Projects", value: "19" },
      { label: "Total Projects", value: "21" },
      { label: "Member Since", value: "Sep 2020" },
    ],
    performanceDetails: [
      { label: "Repeat Clients", value: "7" },
      { label: "Avg. Project Duration", value: "22 weeks" },
      { label: "On-Time Completion Rate", value: "86%" },
    ],
    rating: 4.7,
    reviewCount: 78,
    ratingBreakdown: [
      { stars: 5, count: 56 },
      { stars: 4, count: 15 },
      { stars: 3, count: 5 },
      { stars: 2, count: 1 },
      { stars: 1, count: 1 },
    ],
    reviews: [
      {
        name: "Samuel Arthur",
        rating: 5,
        dateLabel: "Jun 8, 2025",
        comment: "Delivered our warehouse with full structural sign-off, no back-and-forth with inspectors afterward.",
      },
      {
        name: "Grace Ansah",
        rating: 4,
        dateLabel: "May 22, 2025",
        comment: "Solid work on our office complex. Timeline slipped by about two weeks due to steel delivery delays.",
      },
      {
        name: "Emmanuel Koomson",
        rating: 5,
        dateLabel: "May 3, 2025",
        comment: "Professional from quote to handover. Exactly the documentation we needed for our factory expansion.",
      },
      {
        name: "Patricia Dadzie",
        rating: 5,
        dateLabel: "Apr 20, 2025",
        comment: "Third project with them. They understand industrial builds better than most firms we've used.",
      },
      {
        name: "Kojo Mensah",
        rating: 4,
        dateLabel: "Apr 2, 2025",
        comment: "Good structural work, communication could be a bit faster during the middle phase of the build.",
      },
    ],
    badges: [
      { icon: "trophy", title: "Top Rated Contractor", description: "Awarded for consistently excellent work." },
      { icon: "shield", title: "Verified Business", description: "Registration and trade license verified." },
      { icon: "bolt", title: "Fast Responder", description: "Usually replies within a few hours." },
      { icon: "star", title: "5-Star Average", description: "Maintains a strong rating across all reviews." },
      { icon: "handshake", title: "Repeat Client Favorite", description: "7 clients have hired them more than once." },
    ],
    portfolio: [
      {
        title: "Takoradi Warehouse Build",
        description: "12,000 sq ft warehouse with full structural engineering sign-off.",
        image: unsplashUrl(CONTRACTOR_PHOTO_IDS.tropicalConstructionSite),
      },
      {
        title: "Sekondi Office Complex",
        description: "3-story commercial office building, foundation to finish.",
        image: unsplashUrl(CONTRACTOR_PHOTO_IDS.constructionWorkersGroup),
      },
      {
        title: "Effia Factory Expansion",
        description: "Structural extension adding a second production line.",
        image: unsplashUrl(CONTRACTOR_PHOTO_IDS.modernInterior),
      },
    ],
    breadcrumb: [{ label: "Find Contractor", to: "/find-contractor" }],
  },

  "prime-construction": {
    name: "Prime Construction",
    shortName: "Prime Construction",
    verified: true,
    location: "Tamale, Ghana",
    category: "Landscaping",
    bio: "We build residential homes and shape the land around them — from foundation work to garden design and outdoor living spaces, all under one crew.",
    totalProjects: 18,
    stats: [
      { icon: "document", label: "Member Since", value: "Feb 2022" },
      { icon: "listings", label: "Total Projects", value: "18" },
      { icon: "sales", label: "Completed Projects", value: "16" },
      { icon: "phone", label: "Response Rate", value: "88%" },
      { icon: "clock", label: "Avg. Response Time", value: "3.1 hrs" },
    ],
    verificationChecklist: [
      "National ID Verified",
      "Contact Information Verified",
      "Business Registration Verified",
      "Trade License Verified",
    ],
    verificationDetails: [
      { label: "License Type", value: "D3K3 Residential Contractor" },
      { label: "Verified On", value: "Feb 19, 2022" },
      { label: "Documents Reviewed", value: "4" },
      { label: "Verifying Body", value: "TerraMatch Trust & Safety" },
    ],
    about:
      "Prime Construction has completed 18 residential builds and landscaping projects across the Northern and Upper East Regions since 2022. We pair house construction with garden and outdoor design, so clients get one team responsible for the whole property instead of coordinating separate contractors.",
    serviceAreas: ["Northern Region", "Upper East Region"],
    specializations: ["Residential Construction", "Landscaping"],
    phone: "+233 24 555 0467",
    email: "hello@primeconstruction.gh",
    performance: [
      { label: "Response Rate", value: "88%" },
      { label: "Avg. Response Time", value: "3.1 hrs" },
      { label: "Completed Projects", value: "16" },
      { label: "Total Projects", value: "18" },
      { label: "Member Since", value: "Feb 2022" },
    ],
    performanceDetails: [
      { label: "Repeat Clients", value: "4" },
      { label: "Avg. Project Duration", value: "12 weeks" },
      { label: "On-Time Completion Rate", value: "83%" },
    ],
    rating: 4.6,
    reviewCount: 64,
    ratingBreakdown: [
      { stars: 5, count: 42 },
      { stars: 4, count: 14 },
      { stars: 3, count: 5 },
      { stars: 2, count: 2 },
      { stars: 1, count: 1 },
    ],
    reviews: [
      {
        name: "Fuseini Abdulai",
        rating: 5,
        dateLabel: "Jun 5, 2025",
        comment: "Our new home came with a finished garden layout too — saved us from hiring a second contractor.",
      },
      {
        name: "Zainab Alhassan",
        rating: 4,
        dateLabel: "May 19, 2025",
        comment: "Good build quality. Response times during the quiet season were a bit slower than I'd have liked.",
      },
      {
        name: "Iddrisu Mahama",
        rating: 5,
        dateLabel: "Apr 27, 2025",
        comment: "The outdoor living space they designed exceeded what we pictured. Great attention to detail.",
      },
      {
        name: "Rahinatu Yakubu",
        rating: 4,
        dateLabel: "Apr 9, 2025",
        comment: "Solid residential build overall, small punch-list items took a couple extra visits to close out.",
      },
      {
        name: "Sulemana Braimah",
        rating: 5,
        dateLabel: "Mar 22, 2025",
        comment: "Second project with them — the landscaping work especially has been consistently excellent.",
      },
    ],
    badges: [
      { icon: "trophy", title: "Top Rated Contractor", description: "Awarded for strong client satisfaction." },
      { icon: "shield", title: "Verified Business", description: "Registration and trade license verified." },
      { icon: "bolt", title: "Fast Responder", description: "Usually replies within a few hours." },
      { icon: "star", title: "5-Star Average", description: "Maintains a solid rating across all reviews." },
      { icon: "handshake", title: "Repeat Client Favorite", description: "4 clients have hired them more than once." },
    ],
    portfolio: [
      {
        title: "Tamale Family Home",
        description: "4-bedroom residential build with integrated garden design.",
        image: unsplashUrl(LAND_PHOTO_IDS.greenCoveredLand),
      },
      {
        title: "Bolgatanga Outdoor Living Space",
        description: "Patio, garden beds, and shade structure for an existing home.",
        image: unsplashUrl(LAND_PHOTO_IDS.greenPlainField),
      },
      {
        title: "Yendi Residential Build",
        description: "Ground-up 3-bedroom home with front and rear landscaping.",
        image: unsplashUrl(CONTRACTOR_PHOTO_IDS.constructionWorkersGroup),
      },
    ],
    breadcrumb: [{ label: "Find Contractor", to: "/find-contractor" }],
  },
};
