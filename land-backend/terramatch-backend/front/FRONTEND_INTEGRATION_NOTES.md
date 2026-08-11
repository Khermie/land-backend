# Frontend integration notes

Written for whoever picks this up next. Covers what's genuinely
connected to the real backend, what deliberately isn't (and why), and
what a next pass would need to close the remaining gaps.

## What's actually connected to the real backend

- **Registration** (`SignupForm.jsx`) — calls `POST /api/auth/register`
  directly via `AuthContext#register`. Creates a real Postgres row,
  returns a real JWT, signs the person in immediately. No fake OTP step
  anymore (see "Retired" below).
- **Login** (`LoginForm.jsx`) — calls `POST /api/auth/login`. Shows the
  backend's real error message on failure.
- **Session persistence** (`AuthContext.jsx`) — JWT stored in
  `localStorage` (was `sessionStorage` with a fake boolean flag before
  this pass); a page refresh calls `GET /api/auth/me` to restore
  `user`/`role`/`ghanaCardVerified` from the real backend rather than
  trusting stale local state.
- **Ghana Card verification** (`GhanaCardVerify.jsx`) — calls
  `POST /api/auth/verify-ghana-card` with the card number. Only the
  card number is actually sent (see "Known gaps" below for the
  name/region/photo fields the form also collects).
- **Land listing creation** (`ListLandForm.jsx`, publish only, not
  drafts) — calls `POST /api/lands` with a real payload. Creates a real
  row owned by the signed-in user. See "Known gaps" for how the form's
  extra fields (region, amenities, photos, etc.) are packed into
  `locationData` since the backend has no dedicated columns for them.
- **Messaging / Buy Now** (`MessagesContext.jsx`, `BuyNowModal.jsx`) —
  calls the real `/api/conversations` endpoints, but **only for
  listings with a real backend id** (i.e., created via the listing flow
  above, in this running backend). See "Known gaps" for why the site's
  static demo listings can't be messaged about for real.
- **Logout** — clears the local JWT. There's no server-side session/
  token revocation endpoint to call (see backend
  `CHANGELOG_INTEGRATION.md`); this is genuinely all "logout" can mean
  right now.

## Retired

- **`SignupVerify.jsx` (fake OTP step)** — this used to be step 3 of
  signup: a screen with a 6-digit code input that always "succeeded"
  after a timeout, calling a no-op `login(role)`. Once `SignupForm`
  started calling the real `POST /api/auth/register` — which creates
  the account AND signs the person in, in one call — there was nothing
  left for a separate verification step to do; the backend has no
  email/SMS OTP concept at all. Kept as a route (`/get-started/verify`)
  that just redirects, in case anything external links to it, but
  nothing in the app links to it anymore. See `signupConfig.js`'s
  `getSignupSteps()` — the step indicator is now Role → Details →
  (Ghana Card, if required), full stop.

## Known gaps — real backend limitations, not oversights

These are documented here (and cross-referenced from the relevant
files' own comments) rather than silently worked around, per the
"don't invent endpoints, don't silently discard fields" ground rule for
this integration.

### Land listings are much richer on the frontend than the backend

`ListLandForm.jsx` collects: title, category, description, region,
district, address, GPS coordinates, land size, price, Buy Now price,
ownership type, title document reference, amenities (multi-select),
and up to 8 photos.

The backend's `CreateLandRequest` only has: `title`, `description`,
`locationData` (a free-form string), `floodRisk`, `price`.

**Current handling:** everything beyond the four real fields is
JSON-encoded into `locationData` (which the backend already treats as
an opaque string — see `LandListing.java`'s own "JSON string for GIS
data" comment) and genuinely persists in Postgres this way. It comes
back from `GET /api/lands` unchanged inside `locationData`, so nothing
is silently lost — but the backend can't query, filter, or validate on
any of it (e.g. "listings under GH₵50,000 in Ashanti" isn't possible
server-side right now, only after fetching everything and filtering
client-side).

**To close this properly:** the backend's `LandListing` entity and
`CreateLandRequest`/`LandListingResponse` DTOs would need real columns
for at minimum region, land size, and photo URLs (photo *storage*
itself — S3/Cloudinary/local disk — is a separate concern the backend
doesn't have any of yet; there's no file upload endpoint anywhere in
this codebase).

### Drafts can't be saved to the backend

The backend's `CreateLandRequest` has no draft/status concept — a
created `LandListing` is immediately `status="ACTIVE"` and publicly
visible via `GET /api/lands`. "Save Draft" in `ListLandForm.jsx` is
local-only (`ListingsContext`, sessionStorage) for this reason; there's
no way to call the real endpoint without actually publishing.

**To close this:** the backend would need either a `status=DRAFT`
concept on `LandListing` (with `GET /api/lands` filtering to `ACTIVE`
only) or a separate `POST /api/lands/drafts` endpoint.

### The static demo content (most of the site) has no backend equivalent

`FEATURED_LANDS` / `LAND_DETAILS` (constants/lands.js,
constants/landDetails.js) — "East Legon Hills" and similar — are
entirely hardcoded demo data with no backend row behind them. This is
most of what Explore Land, land detail pages, and the bidding/auction
UI actually show.

This matters for two real, connected systems:

- **Bidding** (`AuctionContext.jsx`, `LandDetailContent.jsx`): the
  auction simulation (countdown timers, minimum bid increments, "sold"
  status, Buy-Now-completes-a-sale) is a rich, deliberately-built local
  system keyed by listing *slug*, entirely separate from the real
  backend's much simpler bidding (`LandBid`: just land + bidder +
  amount + status, no auction end time, no increment enforcement, no
  concept of a listing becoming "sold"). **Real `bidApi.place()` was
  NOT wired into `LandDetailContent.jsx`** — every listing reachable
  through that page is static demo data with no backend `id` to bid
  against, so there was no honest way to make the bid button call the
  real endpoint without either fabricating an id or leaving it broken.
  The real `bidApi`/`services/bidApi.js` exists and matches the backend
  exactly (including its query-param quirk) — it's just not called from
  any UI yet.
- **Messaging / Buy Now**: same issue, already handled — see
  `MessagesContext.jsx`'s file header. `BuyNowModal.jsx` shows a clear
  "this listing isn't connected to a real account yet" error rather
  than failing silently when `land.id` is missing.

**To close this properly:** either (a) build a real "browse my
backend-created listings" page (`GET /api/lands` → real detail pages
with real ids, wired to real `bidApi`/`messageApi`) alongside the
existing demo pages, or (b) seed the backend database with real rows
matching the demo content and switch the demo pages over to fetching
from `GET /api/lands` instead of static constants — a larger
restructuring than this integration pass covers.

### No profile-update endpoint

`ProfileContent.jsx`'s "Save Changes" edits local form state only —
there's no `PUT /api/users/me` (or equivalent) anywhere in the backend,
so name/email/phone edits don't persist. The form is honest about this
(see its "Saved for this session" confirmation copy) rather than
implying a real save happened.

### No contractor profile editing UI exists

The backend added real endpoints for this in this pass
(`GET`/`PUT /api/contractors/me` — see `services/contractorApi.js`),
but **no frontend screen calls them**. A contractor currently has no
way to set their `skills`/`yearsExperience` from the UI, which also
means `GET /api/contractors/recommend` has nothing meaningful to score
for a freshly-registered contractor even after Ghana Card verification
flips `ContractorProfile.isVerified` to `true`. Building this screen
was out of scope for this pass (an integration task, not a new-feature
task) but `contractorApi.js` is ready for whenever it is.

### Ghana Card "verification" only sends the card number

`GhanaCardVerify.jsx` collects name-on-card, region, and a photo
upload, but only `cardNumber` is actually sent to the backend — that's
all `POST /api/auth/verify-ghana-card` accepts (see
`AuthDTOs.GhanaCardRequest` on the backend). The other fields are
collected for the same reason a real verification form would ask for
them, but currently go nowhere. This is also genuinely NOT real
identity verification against Ghana's National Identification
Authority or any other service — see the backend's
`CHANGELOG_INTEGRATION.md` "Known limitations" for the full picture.

### The frontend's "General User" role has no backend equivalent

The backend's `Role` enum is `CLIENT | CONTRACTOR | ADMIN` — no fourth
value. `AuthContext.jsx`'s `FRONTEND_TO_BACKEND_ROLE` map sends
General User registrations as `CLIENT`, on the reasoning that a
browsing/buying visitor overlaps with CLIENT far more than CONTRACTOR.
This means **the backend cannot actually distinguish a General User
from a Land Owner** — both are the same `CLIENT` role server-side. If
that distinction ever needs to matter server-side (e.g. only CLIENTs
who identify as land owners should be able to list land), the backend
needs a real third role first.

## Environment / running this locally

See the root `.env.example` — copy to `.env` and point `VITE_API_URL`
at the backend (defaults to `http://localhost:8082`, matching the
backend's own default — see its README). The backend must be running
with `CORS_ALLOWED_ORIGINS` including this frontend's dev origin
(`http://localhost:5173` by default on both sides) or every API call
will fail as a CORS rejection, which surfaces here as `ApiError` with
status `0` ("Couldn't reach the server...") since a CORS failure never
produces a real HTTP response for `fetch` to read.

## Not runtime-verified

Same caveat as the backend: this environment has no way to actually run
`npm install` + `vite dev` against a live backend, so nothing here was
click-tested end-to-end. Every file was hand-reviewed (consumers
cross-checked against changed context/service signatures, `tsc`
syntax-checked after every edit) but "implemented but not
runtime-verified" applies to all of it.
