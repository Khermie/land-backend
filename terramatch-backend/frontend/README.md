# TerraMatch — Landing Page

React (Vite) + Tailwind implementation of the TerraMatch landing page, built
to match the supplied screenshots section-by-section.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  assets/
    images/       ← drop real photos here (see placeholder list below)
    icons/
  components/
    common/        Button, Badge, Logo, SectionHeading, Skeleton, StarRating
    layout/        Navbar, Footer
    sections/      Hero, StatsBar, ProblemSolution, Features, HowItWorks,
                    TopContractors, ExploreLand, AIRecommendation, StatsRow
  pages/           Home, FindContractor, ExploreLand + generic
                   PlaceholderPage for undesigned routes
  routes/          AppRoutes (React Router config)
  constants/       navigation.js (single source of truth for nav/footer links)
  utils/           cn.js (classnames helper)
  hooks/           (empty — ready for future stateful logic)
  context/         (empty — ready for future global state, e.g. auth)
  services/        (empty — ready for future API calls)
```

## What's interactive right now

Filtering runs entirely client-side against the sample data in
`src/constants/`:

- **Find Contractor** — the search box, Category/Location/Rating
  dropdowns, and the Categories sidebar all filter the same
  contractor list live (they share one piece of state, so the hero
  dropdown and the sidebar always agree). "View All" clears the
  filters.
- **Explore Land** — the search box, Region/Land type/Price range
  dropdowns, and the category pills filter the Featured Lands list
  the same way. The pill row and the "Land type" dropdown are the
  same selection shown twice. "View All Lands" clears the filters.
  The map's +/− buttons zoom the mock map.
- Favorite hearts on land cards toggle per-card.

Not wired to anything real yet: the "Search" buttons don't call an
API (there isn't one), and Log In / Get Started / Post a
Project / List Your Land just navigate — there's no auth or
form submission behind them.

Each land's `category` (Residential/Commercial/Industrial/
Agricultural) in `constants/lands.js` was inferred by me, not shown
in the source screenshot — reassign any that don't match reality.

## Placeholder assets — replace before shipping

None of the screenshots included exportable image files, so photographic
content renders as neutral skeleton blocks or CSS gradients that hold the
correct shape/aspect ratio. Search the codebase for `PLACEHOLDER ASSET` to
find every spot, or use this list:

| Where | File to add | Used in |
|---|---|---|
| Hero terrain render | `src/assets/images/terrain-render.png` | `Hero.jsx` |
| Land aerial photo (problem/solution mock) | `src/assets/images/land-aerial.jpg` | `ProblemSolution.jsx` |
| Map + pushpin photo | `src/assets/images/map-pin-photo.jpg` | `ExploreLand.jsx` |
| 4 land listing photos | `src/assets/images/land/<slug>.jpg` | `ExploreLand.jsx` |
| 4 contractor headshots | `src/assets/images/contractors/<slug>.jpg` | `ContractorCard.jsx` (shared by Home + Find Contractor) |
| Footer construction-site photo | `src/assets/images/footer-construction.jpg` | `Footer.jsx` |
| Find Contractor hero photo (two contractors on site) | `src/assets/images/find-contractor-hero.jpg` | `ContractorHero.jsx` |
| "Need a Custom Project" house photo | `src/assets/images/custom-project-house.jpg` | `CustomProjectBanner.jsx` |
| User avatar (signed-in navbar state) | swap in `Navbar.jsx` next to the bell icon | `Navbar.jsx` |
| 5 featured land photos | `src/assets/images/land/<slug>.jpg` | `FeaturedLandCard.jsx` |
| "List Your Land" farmland photo | `src/assets/images/list-land-banner.jpg` | `ListLandBanner.jsx` |
| Real interactive map (Mapbox/Google Maps) | replace the stylized mock | `LandMapExplorer.jsx` |
| "Best Match for You" land thumbnail | `src/assets/images/how-it-works/best-match-thumbnail.jpg` | `HowItWorksSteps.jsx` |
| Negotiation preview avatars (2) | `src/assets/images/how-it-works/negotiate-avatar-1.jpg`, `-2.jpg` | `HowItWorksSteps.jsx` |
| "Close & Build" finished-home render | `src/assets/images/how-it-works/close-and-build-house.jpg` | `HowItWorksSteps.jsx` |
| Land detail gallery (main + 6 thumbnails) | `src/assets/images/land/east-legon-hills/{1..6}.jpg` | `LandDetailContent.jsx` |
| Land owner headshot (Kwame Owusu) | `src/assets/images/land-owners/kwame-owusu.jpg` | `LandOwnerProfile.jsx` |
| Review avatars (3, on owner profile) | `src/assets/images/land-owners/reviews/{1..3}.jpg` | `LandOwnerProfile.jsx` |

The logo is a **real asset**, not a placeholder — it was extracted from
your screenshot and lives at `src/assets/images/logo-mark.png`, used by
`Logo.jsx`. Swap that file directly if a cleaner export becomes available.

Once a file is added, swap the corresponding `ImageSkeleton` / background
placeholder for a real `<img>` tag or `background-image` — each spot has a
comment marking exactly what to do.

## Land detail pages (`/explore-land/:slug`)

Each land in `FEATURED_LANDS` (`constants/lands.js`) can have a matching
entry in `LAND_DETAILS` (`constants/landDetails.js`), keyed by slug, with
the full auction page's copy — specs, amenities, documents, bid history,
etc. So far only `east-legon-hills` has one, since that's the only detail
screenshot supplied. Visiting any other listing's `/explore-land/<slug>`
shows a friendly "full listing coming soon" state instead
(`pages/LandDetail.jsx`) rather than fabricated bid/document data.

To build out another land's detail page: add its entry to
`LAND_DETAILS` and it'll render through the same `LandDetailContent.jsx`
automatically — no new page code needed.

**What's real vs. decorative on this page:**
- Bidding, the "View All" bid history toggle, image gallery selection,
  Save, tab switching, and Share (Web Share API, or copies the link) are
  all genuine local state — they work, but nothing persists to a backend.
- The countdown is computed relative to page load (not the screenshot's
  fixed May 2025 date, which has already passed) so it counts down for
  real. See the comment on `useCountdown` in `LandDetailContent.jsx`.
- "View on Map" opens Google Maps using the listing's coordinates — a
  real link, no API key needed.
- "Contact Land Owner" now links to the real `/land-owner/:slug` page
  below (`detail.ownerSlug` in `constants/landDetails.js`) — it used to
  be a placeholder `mailto:` before that page existed.
- The 3 extra older bid rows (Yaw Boateng, Efua Mensah, Kwabena Owusu)
  and the Terms & Conditions copy weren't in the source screenshot and
  were added by me so "View All" and that tab have real content — see
  the inline comments in `constants/landDetails.js`.

## Land owner profile pages (`/land-owner/:slug`)

Owner data lives in `LAND_OWNERS` (`constants/landOwners.js`), keyed by
slug. So far only `kwame-owusu` exists, reached from the East Legon
Hills listing's "Contact Land Owner" button — its breadcrumb
("Explore Land > East Legon Hills > Kwame O.") reflects that one wired
entry point rather than being dynamically computed. An unknown slug
shows a "Profile Not Found" state (`pages/LandOwner.jsx`).

The "Listings" row reuses the existing `FEATURED_LANDS` data (all 5
sample lands — the screenshot's "24" total is just a display number, not
a real count) through a new card style, `LandListingTile.jsx`. This is
deliberately a different component from `FeaturedLandCard.jsx`: that one
is a horizontal row card used in the Explore Land map sidebar, while
this page's screenshot shows a vertical, top-image card — same
underlying data, two different treatments depending on which screen
they came from.

`NeedHelpCard.jsx` and `PlatformTrustBar.jsx` (both in
`components/common/`) were extracted out of `LandDetailContent.jsx`
during this page's build since both screenshots share them exactly —
check there first before adding a third copy elsewhere.

**What's real vs. decorative:** the Save heart on each listing tile and
the horizontal-scroll arrows are real. Phone/Email/"Message Now" are
real `tel:` / `mailto:` links. "View Verification Details", "View
Performance Details", "View All Badges", and "View All Reviews" are
inert — no dedicated pages exist for them yet, so rather than link
somewhere misleading they're just styled buttons. "View All Listings"
does link to the real `/explore-land` page.

## Pages not yet designed

`Features`, `Login`, `Get Started`, `About`, `Blog`,
`Contact`, `Privacy Policy`, `Help Center`, and `Your Profile` are wired
into the router but currently render a shared `PlaceholderPage`. Send
screenshots for any of these and they'll be built to match, reusing the
existing component library.

`Find Contractor`, `Explore Land` (plus its `/:slug` detail page and the
`/land-owner/:slug` profile page it links to), `Pricing`, and
`How It Works` are now fully built (`src/pages/FindContractor.jsx`,
`src/pages/ExploreLand.jsx`, `src/pages/LandDetail.jsx`,
`src/pages/LandOwner.jsx`, `src/pages/Pricing.jsx`,
`src/pages/HowItWorks.jsx`).

Note: `Home.jsx` still includes its own condensed `HowItWorks.jsx`
section (a 7-step horizontal timeline) — that's a different, shorter
preview block from the source homepage design, left as-is. The dedicated
`/how-it-works` page above uses the new, more detailed
`HowItWorksSteps.jsx` section instead.

Note: the Home page's own land-bidding preview (`LandBiddingPreview.jsx`)
uses a separate, smaller placeholder listings array and its "Place Bid"
buttons still link to `/explore-land` generically rather than a specific
detail page — only `FeaturedLandCard.jsx` (used on the Explore Land page
itself) was wired to the new `/explore-land/:slug` route.


## Pricing page notes

- `src/constants/pricing.js` holds all four plans' copy, features, and
  monthly prices — edit there, not in the component.
- The Monthly/Yearly toggle is real state (`PricingPlans.jsx`): switching
  to Yearly recomputes each paid plan's price at the `YEARLY_DISCOUNT`
  (currently 20%, matching "Save 20%" in the toggle) and re-renders live.
  Free stays GHS 0 and Enterprise stays "Custom" either way.
- The "Save more with yearly billing!" note + arrow is decorative and
  hidden below the `lg` breakpoint to avoid crowding the toggle on
  narrow screens.
