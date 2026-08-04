# TerraMatch — Landing Page

React (Vite) + Tailwind implementation of the TerraMatch landing page, built
to match the supplied screenshots section-by-section.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).

**Note:** land and contractor card photos are hotlinked from
`images.unsplash.com` (see "Placeholder assets" below) — an internet
connection is needed to see them. Everything else in the app works
fully offline.

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

None of the screenshots included exportable image files. **Update — most
"picture card" images are no longer placeholders**: land listing photos
and contractor photos now use real, properly-licensed photos hotlinked
from Unsplash (free commercial-use license, no attribution required —
see `constants/stockImages.js` for the source photo IDs and
`unsplashUrl()` helper). Only a handful of distinct photos were sourced
(4 land, 4 construction/trade), so some listings/contractors intentionally
repeat one — see the comments in `constants/lands.js` and
`constants/contractors.js` for exactly which. These are genuinely live
`<img>` tags now, not skeletons, in `FeaturedLandCard.jsx`,
`LandListingTile.jsx`, `ContractorCard.jsx`, and `LandBiddingPreview.jsx`.

Everything else still renders as neutral skeleton blocks or CSS
gradients that hold the correct shape/aspect ratio, since no real asset
exists for them yet. Search the codebase for `PLACEHOLDER ASSET` to find
every remaining spot, or use this list:

| Where | File to add | Used in |
|---|---|---|
| Hero terrain render | `src/assets/images/terrain-render.png` | `Hero.jsx` |
| Land aerial photo (problem/solution mock) | `src/assets/images/land-aerial.jpg` | `ProblemSolution.jsx` |
| Map + pushpin photo | `src/assets/images/map-pin-photo.jpg` | `ExploreLand.jsx`, `LandBiddingPreview.jsx` |
| Footer construction-site photo | `src/assets/images/footer-construction.jpg` | `Footer.jsx` |
| Find Contractor hero photo (two contractors on site) | `src/assets/images/find-contractor-hero.jpg` | `ContractorHero.jsx` |
| "Need a Custom Project" house photo | `src/assets/images/custom-project-house.jpg` | `CustomProjectBanner.jsx` |
| User avatar (signed-in navbar state) | swap in `Navbar.jsx` next to the bell icon | `Navbar.jsx` |
| "List Your Land" farmland photo | `src/assets/images/list-land-banner.jpg` | `ListLandBanner.jsx` |
| Real interactive map (Mapbox/Google Maps) | replace the stylized mock | `LandMapExplorer.jsx` |
| "Best Match for You" land thumbnail | `src/assets/images/how-it-works/best-match-thumbnail.jpg` | `HowItWorksSteps.jsx` |
| Negotiation preview avatars (2) | `src/assets/images/how-it-works/negotiate-avatar-1.jpg`, `-2.jpg` | `HowItWorksSteps.jsx` |
| "Close & Build" finished-home render | `src/assets/images/how-it-works/close-and-build-house.jpg` | `HowItWorksSteps.jsx` |
| Land detail gallery (main + 6 thumbnails) | `src/assets/images/land/east-legon-hills/{1..6}.jpg` | `LandDetailContent.jsx` |
| Review avatars (3, on owner profile) | `src/assets/images/land-owners/reviews/{1..3}.jpg` | `LandOwnerProfile.jsx` |
| Team/office photo | `src/assets/images/about-team.jpg` | `AboutContent.jsx` |
| Contractor logo/headshot (Kwame Builders Ltd.) | `src/assets/images/contractors/kwame-builders.jpg` | `ContractorProfile.jsx` |

**Update:** Kwame Owusu's headshot (used consistently in the Navbar,
Dashboard, Your Profile, and his Land Owner Profile page), the
Dashboard's 3 role-card images, and the land/contractor card photos are
no longer placeholders — see "Diagnostic session" further down for what
changed and why a few images still repeat across cards.

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

## Every page is now built

No page in the router renders the generic `PlaceholderPage` anymore
except the catch-all 404 for genuinely unknown URLs. `Features`,
`Contact`, `Help Center`, and `Your Profile` — the last four that were
still placeholders — were built out in the diagnostic session below.

Full list: `Home`, `Find Contractor` (plus its `/:slug` profile page),
`Explore Land` (plus its `/:slug` detail page and the
`/land-owner/:slug` profile page it links to), `Pricing`,
`How It Works`, the complete `Get Started` signup flow, `Login`,
`About Us`, `Privacy Policy`, `Blog` (plus its `/:slug` post page),
`Dashboard`, `Messages`, `Features`, `Contact`, `Help Center`, and
`Your Profile`.

## Diagnostic session — bugs found and fixed

A batch of reported issues were investigated and fixed together. Here's
what was actually wrong with each, and what's still intentionally
deferred.

**"When you log in, you get logged out completely" — real bug, fixed.**
There was no actual signed-in *state* anywhere in the app — the navbar
was deciding authed vs. guest purely from a hardcoded list of routes
(`AUTHED_ROUTE_PREFIXES` in `App.jsx`). So logging in and then
navigating to Home, About, or anywhere else not on that list flipped
the navbar straight back to the guest Login/Get Started buttons — it
looked exactly like being signed out, because nothing was tracking
"signed in" as a real fact. Fixed with a proper (if lightweight)
`AuthContext` (`src/context/AuthContext.jsx`, persisted to
`sessionStorage`) — `LoginForm.jsx` and `SignupVerify.jsx` now call
`login()`, and `App.jsx` checks that global state everywhere, OR'd with
the original route list so the screenshot-matched pages still look
right on a first visit too. `Your Profile` has the one `logout()` call
in the app.

**Messages losing sent messages — real bug, fixed.** Conversation state
lived only in local component state, so navigating away from Messages
(e.g. tapping "Land" then coming back) silently reset it, including
anything just sent. Now persisted to `sessionStorage`
(`MessagesView.jsx`), same pattern as the auth fix.

**Dashboard's 3 role-card images, the header avatar, and the Navbar
avatar — real gap, fixed.** These were still `ImageSkeleton`
placeholders that never got a real photo in an earlier pass. Now use
the same sourced Unsplash photos as the rest of the site (see
`constants/stockImages.js`), plus one new headshot for "Kwame" used
consistently in the Navbar, Dashboard, and Your Profile.

**Login page "looks ugly" — fair, redesigned.** It was a bare centered
form on a blank white page. Rebuilt with a two-column layout at `lg` and
above: a branded forest-green panel (decorative shapes, no photo
needed) plus the form, collapsing to just the form on smaller screens.

**Icons "look AI-generated" — addressed on the highest-visibility ones,
not site-wide.** Every icon touched in this session (Login, Your
Profile, Contact, Features, Help Center, `MobileTabBar`) uses a lighter,
more consistent stroke weight and simpler shapes — notably
`MobileTabBar`'s old "Land" icon, an odd isometric diamond, replaced
with a plain folded-map icon. A full site-wide icon audit (every icon
across 30+ files) wasn't attempted — the volume is too large for this
pass, and the newer icons already set the direction for any future ones.

**Contractor "View Profile" and 3 named contractors (BuildRight GH,
Solid Structures, Prime Construction) — fixed.** See "Contractor profile
pages" below — all 3 now have full profiles, same depth as Kwame
Builders Ltd.

**Explore Land "start bidding" not working on 5 of 6 lands — partially
addressed, full fix deferred.** Only East Legon Hills has full auction
data (specs, amenities, documents, bid history — see "Land detail
pages" below); the other 5 showed a bare "coming soon" message with no
way to act on it. `LandDetail.jsx`'s fallback now shows the listing's
real photo, price, bid count, and category, plus a working
**"Message the Owner"** button that opens a real conversation. Building
full bidding pages for all 5 remaining lands was **not** attempted —
each one is genuinely as much content as an entire page (the East Legon
Hills data alone is ~150 lines), so this is deferred rather than
half-done. `ContractorProfilePage.jsx`'s fallback got the same
treatment for the 3 contractors still without full profiles (Accra
Electricals, Bright Interiors, Precision Architects).

## Contractor profile pages (`/find-contractor/:slug`)

Same pattern as Land Owner Profile: `CONTRACTOR_PROFILES`
(`constants/contractorProfiles.js`), keyed by slug, holds the full
profile copy — stats, verification, service areas, portfolio, reviews,
badges. Four of the seven `constants/contractors.js` entries have one:
`kwame-builders` (the flagship, no specific screenshot to match),
`buildright-gh`, `solid-structures`, and `prime-construction` (added
during the diagnostic session below after being called out by name).
The remaining 3 (Accra Electricals, Bright Interiors, Precision
Architects) show a lighter but still real fallback — photo, rating,
stats, and a working "Message Now" button — instead of either
fabricated data or a dead end. `ContractorCard.jsx`'s "View Profile"
button used to be a dead self-referencing link back to
`/find-contractor`; it's fixed now.

Portfolio project photos reuse the same limited stock photo set as the
rest of the site rather than sourcing more (see "Placeholder assets").

**Also fixed while building this:** `App.jsx`'s authed-navbar check used
to match routes by exact string, so `/explore-land/:slug` and
`/land-owner/:slug` pages were falling back to the guest navbar (Login /
Get Started) even though they're reached from the authed-styled Explore
Land page — a jarring flip a user would actually notice. It's prefix
matching now (`AUTHED_ROUTE_PREFIXES`), so any sub-route of an authed
page inherits the same navbar state, including the new contractor
profile pages.

## Messaging deep-link (`/messages?contact=<slug>`)

"Message Now" / "Start a Conversation" on both the Contractor Profile
and Land Owner Profile pages now open a *real* conversation in Messages
instead of a `mailto:` link. `resolveMessageContact()`
(`constants/messages.js`) looks the slug up in `CONTRACTORS` first, then
`LAND_OWNERS`; `MessagesView.jsx` either selects that person's existing
thread (marking it read) or creates a fresh empty one on the fly if
they don't have one yet. An unrecognized slug is just ignored rather
than crashing.

One inherent quirk worth knowing: the Dashboard's signed-in user *is*
Kwame Owusu the land owner (see `constants/landOwners.js`), so messaging
his own profile is a bit circular — there's no real multi-user auth
here to prevent that, and fixing it properly would mean building actual
accounts, which is out of scope for a frontend mockup.

## Get Started (signup flow) notes

The three-step signup flow (`/get-started` → `/get-started/form` → 
`/get-started/verify`) is now complete and wired into the Navbar's
"Get Started" button.

- **Step 1** (`SignupWelcome.jsx`): Role selection (Land Owner / Contractor / General User)
- **Step 2** (`SignupForm.jsx`): Account creation form with validation (full name, email, phone, password). Form data is passed via navigation state to step 3.
- **Step 3** (`SignupVerify.jsx`): Email/phone verification with mockup phone UI. After verification, redirects to `/dashboard` — see below.

All form validation is client-side only (required fields, email format, password match). No backend submission — the current flow is a complete UX mockup ready for API integration.

## Login

`/login` (`LoginForm.jsx`) mirrors `SignupForm.jsx`'s exact visual
language — same back link, header style, input/icon styling, and
security notice — but asks for just email + password, with no step
indicator since login isn't part of a multi-step flow. Its "Sign up"
link and Signup's "Login" link point at each other on purpose. Submitting
simulates a brief delay and redirects to `/dashboard`, the same
destination signup verification ends at — either way, the user is now
"signed in".

**Fixed while building this:** `/get-started` and its two sub-routes
were being wrapped in the marketing site's Navbar/Footer despite every
one of their screenshots showing a standalone screen (just a "← Back"
link, no site chrome). `App.jsx`'s exclusion list — previously just
`APP_SHELL_ROUTES` for Dashboard/Messages — is now `CHROMELESS_ROUTES`
and covers the whole auth flow (signup's 3 steps + login) too, so all
of it renders full-screen and consistently. Also swapped a stray
`<a href="/login">` in `SignupForm.jsx` for a proper `<Link>` — it was
causing a full page reload instead of client-side navigation.

## Dashboard & Messages (in-app screens)

`/dashboard` and `/messages` are a different kind of page from the rest
of the site: their source screenshots are mobile *app* screens (a
personalized home screen and an inbox), not landing-page sections. So
rather than force them into the marketing Navbar/Footer, they're in
`App.jsx`'s `CHROMELESS_ROUTES` list (shared with the auth flow above)
— they render their own header and a shared bottom tab bar
(`components/common/MobileTabBar.jsx`: Home / Land / Projects /
Messages / Profile) instead. The tab bar stays visible at every screen
width, not just mobile, since it's the *only* navigation on these two
pages.

**Dashboard** (`pages/Dashboard.jsx` → `DashboardHome.jsx`): three role
cards, each linking somewhere real rather than a dead end:
- Land Owner "Go to Dashboard" → `/land-owner/kwame-owusu` — Kwame
  already exists as a land owner in this project's data
  (`constants/landOwners.js`), so his own profile page doubles as his
  dashboard here (it already shows his listings, stats, etc.)
- Contractor "Go to Dashboard" → `/find-contractor` (closest existing
  page for browsing/bidding on projects — there's no dedicated
  contractor profile/dashboard page yet)
- General User "Explore Now" → `/explore-land`
- The notification bell (badge "3") → `/messages`, since notifications
  in an app like this are usually message/activity-related and there's
  no separate notifications page

**Messages** (`pages/Messages.jsx` → `MessagesView.jsx`): a genuinely
new page — the source photo only showed a "Messages" tab icon with no
messages screen of its own, so this was built to match the site's
existing theme and interaction patterns rather than from a screenshot.
Responsive two-pane inbox (list + thread) that collapses to a single
pane with a back button below the `lg` breakpoint. Sending a message is
real local state — it appends to that conversation and clears the
input — but nothing persists past a refresh. Conversation data
(`constants/messages.js`) reuses people who already exist elsewhere in
the project (bidders on the East Legon Hills listing, a contractor from
`constants/contractors.js`, and a "TerraMatch Support" thread) rather
than introducing unrelated placeholder names. `NeedHelpCard.jsx`'s
"Chat with Support" button now links here instead of the still-generic
`/help-center` placeholder, since there's a real Support conversation
waiting.

Note: `Home.jsx` still includes its own condensed `HowItWorks.jsx`
section (a 7-step horizontal timeline) — that's a different, shorter
preview block from the source homepage design, left as-is. The dedicated
`/how-it-works` page above uses the new, more detailed
`HowItWorksSteps.jsx` section instead.

Note: the Home page's own land-bidding preview (`LandBiddingPreview.jsx`)
uses a separate, smaller placeholder listings array and its "Place Bid"
buttons were fixed in Session 1 to now link to specific listing detail pages,
and `FeaturedLandCard.jsx` (used on the Explore Land page itself) was wired
to the new `/explore-land/:slug` route.


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
