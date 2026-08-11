import { unsplashUrl, LAND_PHOTO_IDS, CONTRACTOR_PHOTO_IDS } from "./stockImages";

// Blog content — no screenshot was supplied for this page, so these
// are original posts written to fit TerraMatch's actual context (land
// verification, bidding, contractor vetting) rather than generic
// filler text. Images reuse the same limited stock photo set as the
// rest of the site (see constants/stockImages.js).
export const BLOG_POSTS = [
  {
    slug: "verifying-land-title-ghana",
    title: "5 Documents to Check Before Bidding on Land in Ghana",
    category: "Buying Guide",
    dateLabel: "Jan 12, 2026",
    readTime: "6 min read",
    author: "TerraMatch Team",
    image: unsplashUrl(LAND_PHOTO_IDS.greenCoveredLand),
    excerpt:
      "Land title disputes are one of the most common — and costly — mistakes buyers make. Here's exactly what to verify before you place a bid.",
    body: [
      "Before placing a bid on any listing, confirm the seller can produce a Land Title Certificate or, at minimum, a registered Indenture. A verified title is the single strongest protection you have against future disputes.",
      "Ask for the Site Plan and cross-check it against the Survey Plan filed with the Lands Commission — discrepancies in boundaries are a common source of conflict after purchase.",
      "Request the Land Use Permit to confirm the plot is zoned for what you intend to build. A residential plot with commercial zoning restrictions can derail a project months into construction.",
      "Every listing on TerraMatch that includes a documents section has already had these reviewed by our Trust & Safety team — look for the verification checkmarks before you bid.",
    ],
  },
  {
    slug: "hiring-contractor-checklist",
    title: "How to Vet a Contractor Before You Sign",
    category: "Contractor Tips",
    dateLabel: "Jan 3, 2026",
    readTime: "5 min read",
    author: "TerraMatch Team",
    image: unsplashUrl(CONTRACTOR_PHOTO_IDS.constructionWorkersGroup),
    excerpt:
      "A low quote isn't the same as a good deal. Here's what actually predicts whether a contractor will finish your project on time and on budget.",
    body: [
      "Response rate and response time are two of the most underrated signals on a contractor's profile. A contractor who replies within the hour during the bidding stage is far more likely to keep you informed once work begins.",
      "Read the reviews, not just the rating. A 4.8-star average with one review mentioning consistent delays tells you more than the number alone.",
      "Ask to see a completed project similar in scope to yours — not just any portfolio photo. Renovation experience doesn't always translate to new-build experience.",
      "Confirm their trade license and business registration are current. TerraMatch verifies these during onboarding, but it's worth asking directly for anything project-specific, like structural engineering sign-off.",
    ],
  },
  {
    slug: "how-land-auctions-work",
    title: "How Bidding Works on TerraMatch",
    category: "Platform Guide",
    dateLabel: "Dec 18, 2025",
    readTime: "4 min read",
    author: "TerraMatch Team",
    image: unsplashUrl(LAND_PHOTO_IDS.largeAreaOfLand),
    excerpt:
      "Transparent bidding means everyone sees the same numbers. Here's how the auction timer, minimum bids, and bid history actually work.",
    body: [
      "Every land listing has a minimum next bid — this rises automatically each time a new bid is placed, based on the listing's bid increment. You'll always see the current minimum before you commit.",
      "The bid history is public to anyone viewing the listing, including bidder names and timestamps. This is deliberate: transparency discourages the kind of under-the-table dealing that erodes trust in land transactions.",
      "The countdown timer is final — once it reaches zero, the highest bid at that moment wins. There are no last-minute private negotiations that bypass the public bid.",
    ],
  },
  {
    slug: "residential-vs-commercial-land",
    title: "Residential vs. Commercial Land: What Changes in the Numbers",
    category: "Buying Guide",
    dateLabel: "Dec 5, 2025",
    readTime: "7 min read",
    author: "TerraMatch Team",
    image: unsplashUrl(LAND_PHOTO_IDS.farmlandWithMountains),
    excerpt:
      "Price per square foot isn't the only thing that differs between residential and commercial plots — permitting timelines and resale liquidity do too.",
    body: [
      "Commercial land typically carries a price premium, but that premium often reflects genuinely faster permitting for business use compared to converting a residential plot after purchase.",
      "Resale liquidity differs too: residential plots in established neighborhoods tend to attract a broader pool of buyers, while commercial plots can sit longer without the right buyer, even at a fair price.",
      "If you're unsure which category fits your goals, the Land Use Permit on any TerraMatch listing will tell you exactly what's currently zoned — a useful starting point before you factor in rezoning costs.",
    ],
  },
];
