# TerraMatch AI — Backend

Spring Boot 3 backend for the TerraMatch land bidding / contractor
matching / messaging platform.

> **This README was rewritten as part of a full frontend↔backend
> integration pass.** See [`CHANGELOG_INTEGRATION.md`](./CHANGELOG_INTEGRATION.md)
> for a complete, itemized list of what changed, why, and what's still
> outstanding. This file covers day-to-day setup and the current API
> surface.

## Features

- User registration and login with JWT-based authentication
- `GET /api/auth/me` — fetch the signed-in user's own profile
- Ghana Card identity verification (`CLIENT` / `CONTRACTOR` accounts)
- Land listing and bidding APIs
- Contractor profile management (skills, experience) + AI recommendations
  based on skill match, rating, and experience
- Buyer↔owner messaging, including a "Buy Now" style conversation-start flow
- PostgreSQL persistence with Hibernate auto-schema updates

## Prerequisites

- Java 17 or newer
- Maven 3.8+
- PostgreSQL 12+
- pgAdmin 4 (recommended, for step 1)

## 1. Create the PostgreSQL database

Open pgAdmin and create a database named `terramatch_db`:

1. Open pgAdmin 4.
2. Right-click Servers > PostgreSQL > Databases.
3. Choose Create > Database.
4. Set the name to `terramatch_db`.
5. Click Save.

## 2. Configure secrets (required — the app will not start without these)

**This changed from earlier versions of this project.** Database
credentials and the JWT signing secret used to be hardcoded directly in
`application.properties` and committed to source control. They are now
read from environment variables with no default for the two secrets
(`DB_PASSWORD`, `JWT_SECRET`), so the app fails fast with a clear error
at startup instead of silently falling back to a committed secret.

**If you're continuing from a checkout that had the old hardcoded
password/secret committed: rotate your PostgreSQL password.** It was
sitting in plaintext in Git history and should be treated as
compromised regardless of anything else in this pass.

Pick one of two ways to supply the required values:

**Option A — profile-specific properties file (recommended for local dev)**

```bash
cp src/main/resources/application-local.properties.example \
   src/main/resources/application-local.properties
```

Edit that new file with your real Postgres password and a generated
JWT secret (a one-liner to generate one: `openssl rand -base64 48`).
This file is gitignored — it will never be committed. Then run with the
`local` profile active (see step 4).

**Option B — environment variables**

```bash
export DB_PASSWORD=your-local-postgres-password
export JWT_SECRET=$(openssl rand -base64 48)
# Optional, these have sane defaults:
export DB_URL=jdbc:postgresql://localhost:5432/terramatch_db
export DB_USERNAME=postgres
export CORS_ALLOWED_ORIGINS=http://localhost:5173
```

## 3. Build the project

```bash
mvn clean install
```

## 4. Run the application

With Option A (local profile file):
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

With Option B (exported environment variables):
```bash
mvn spring-boot:run
```

The backend starts on **http://localhost:8082**.

> The original `application.properties` in this project set
> `server.port` twice (8081, then an indented 8082 further down);
> Spring Boot takes the last value for a duplicate key, so the app was
> already effectively running on 8082 — that's now the single,
> explicit value, matching what the frontend's `VITE_API_URL` expects.

## API reference

All request/response bodies are JSON unless noted otherwise. Every
error response (validation failure, not-found, bad credentials,
authorization failure — everything) comes back as **HTTP 400** with
this shape:

```json
{ "timestamp": "...", "status": 400, "error": "Bad Request", "message": "human-readable reason" }
```

There is currently no 401/403/404/409 distinction — the `message` field
is always the thing to show the user. This was true before this
integration pass and hasn't been changed, to avoid a larger behavioral
change than the integration itself called for; see
`CHANGELOG_INTEGRATION.md` for the reasoning.

### Auth — `/api/auth` (register/login are public; everything else needs a JWT)

| Method | Path | Body | Notes |
|---|---|---|---|
| POST | `/register` | `{name, email, password, role, phone?}` | `role` is `CLIENT`, `CONTRACTOR`, or `ADMIN`. Registering as `CONTRACTOR` auto-creates an empty `ContractorProfile`. |
| POST | `/login` | `{email, password}` | |
| GET | `/me` | — | Returns the signed-in user's own profile. **New in this pass.** |
| POST | `/verify-ghana-card` | `{ghanaCardNumber}` | Format `GHA-000000000-0`. Marks the user verified; for `CONTRACTOR` accounts also flips `ContractorProfile.isVerified`. **New in this pass.** |

Register/login response shape:
```json
{
  "token": "...",
  "message": "Registration successful",
  "user": { "id", "name", "email", "role", "phone", "ghanaCardVerified" }
}
```
`user` is **new** — previously only `{token, message}` came back, and
there was no way for the frontend to learn who it had just signed in
as without this.

Authenticated requests: `Authorization: Bearer <token>`.

### Land listings — `/api/lands`

| Method | Path | Auth | Body | Notes |
|---|---|---|---|---|
| POST | `/` | required | `{title, description, locationData, floodRisk, price}` | Owner is derived from the JWT — never trust/accept a client-supplied owner ID. |
| GET | `/` | **public** | — | Was JWT-required before this pass; now public since the frontend's Explore Land page is a public marketing page. |

Both return `LandListingResponse` (id, ownerId, ownerName,
ownerGhanaCardVerified, title, description, locationData, floodRisk,
price, status, createdAt) — **not** the raw entity. Previously this
endpoint returned the full nested `owner` `User` object, which leaked
every owner's phone number and Ghana Card number (and, before
`@JsonIgnore` was added to `User.password`, their password hash) to
anyone browsing listings.

### Bidding — `/api/bids`

| Method | Path | Auth | Params | Notes |
|---|---|---|---|---|
| POST | `/` | required | **query params** `landId`, `amount` | Not a JSON body — `LandDTOs.PlaceBidRequest` exists but was never wired up; this documents the actual contract rather than the unused DTO. Bidder derived from JWT; self-bidding blocked server-side. |
| GET | `/{landId}` | required | — | Sorted by amount, descending. |

Both return `BidResponse` (id, landId, bidderId, bidderName, amount,
status, createdAt) — same reasoning as land listings: the raw entity
was leaking every bidder's phone/Ghana Card number to anyone else who
could see that land's bid list.

### Contractors — `/api/contractors`

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/recommend?skills=a,b,c` | **public** | `skills` is now optional — was required before this pass, so a call with no query string 400'd. Only returns contractors with `isVerified=true` on their profile. |
| GET | `/me` | required (CONTRACTOR) | Read your own contractor profile. **New.** |
| PUT | `/me` | required (CONTRACTOR) | `{skills?, yearsExperience?}` — both optional, update just what you send. **New.** |

**Important known limitation carried over from before this pass:**
`GET /recommend` filters on `ContractorProfile.isVerified`, and the
*only* thing that ever sets that flag is completing Ghana Card
verification (`POST /api/auth/verify-ghana-card`) as a `CONTRACTOR`.
There is no separate admin-review step. See
`CHANGELOG_INTEGRATION.md` "Known limitations" for what a more
deliberate trust/quality workflow would need.

### Messaging — `/api/conversations` (all require a JWT — entirely new in this pass)

There was no messaging backend at all before this pass — no
controller, entity, or repository. This is a from-scratch addition to
support the frontend's "Buy Now → message the owner" flow.

| Method | Path | Body | Notes |
|---|---|---|---|
| POST | `/` | `{landId, initialMessage}` | **This is what "Buy Now" calls.** Starts a new conversation about a listing, or reopens the existing one for this (land, buyer) pair — deduplicated, so clicking Buy Now twice on the same listing never creates two threads. Posts `initialMessage` as the first message in the same request. |
| GET | `/` | — | List your conversations (as buyer or owner), most recently active first, with unread counts. |
| GET | `/{id}` | — | Full message history for one conversation. Viewing it marks the other party's messages as read. |
| POST | `/{id}/messages` | `{body}` | Send a message into an existing conversation. |
| GET | `/unread-count` | — | `{"unreadCount": N}` — total unread across all your conversations, for a nav badge. |

Authorization: every endpoint here checks the caller is either the
buyer or the owner on the conversation in question. There is no way to
read or post into someone else's conversation, including by guessing
IDs — see `MessagingService#requireParticipant`.

## Security notes

- **CORS**: previously `allowedOriginPatterns(List.of("*"))` combined
  with `allowCredentials(true)` — permissive in practice, since Spring
  echoes back whatever `Origin` header shows up rather than checking it
  against an actual allow-list. Now reads an exact-origin list from
  `app.cors.allowed-origins` / `CORS_ALLOWED_ORIGINS`, defaulting to
  `http://localhost:5173`. Add your deployed frontend's origin there
  for staging/production — don't widen it back to a wildcard.
- **Password exposure**: `User.password` (bcrypt hash) previously had
  no `@JsonIgnore`, so any endpoint returning a `User` — directly or
  nested inside `LandListing`/`LandBid` — serialized it. Fixed at the
  entity level, and land/bid responses were additionally moved to
  dedicated DTOs (see above) so owner/bidder phone numbers and Ghana
  Card numbers aren't over-exposed either.
- **No role-based endpoint authorization exists yet.** `CustomUserDetailsService`
  grants an empty authorities list to every authenticated principal, so
  even if `@PreAuthorize("hasRole(...)")` were added somewhere, it
  wouldn't currently have anything to check against. Nothing in this
  pass currently *needs* role-gating beyond what's already
  ownership-checked in code (e.g. `ContractorService` rejecting non-
  `CONTRACTOR` accounts), but this is worth knowing before adding an
  admin-only endpoint.
- Ghana Card verification here means **"we recorded a card number
  against this account and marked it verified."** There is no
  integration with Ghana's National Identification Authority or any
  other real verification service. See `CHANGELOG_INTEGRATION.md`.

## Environment variables reference

| Variable | Required | Default | Used for |
|---|---|---|---|
| `DB_URL` | no | `jdbc:postgresql://localhost:5432/terramatch_db` | Postgres connection string |
| `DB_USERNAME` | no | `postgres` | Postgres user |
| `DB_PASSWORD` | **yes** | — | Postgres password |
| `JWT_SECRET` | **yes** | — | JWT signing key |
| `JWT_EXPIRATION_MS` | no | `86400000` (24h) | Token lifetime |
| `SERVER_PORT` | no | `8082` | HTTP port |
| `CORS_ALLOWED_ORIGINS` | no | `http://localhost:5173` | Comma-separated allowed origins |
