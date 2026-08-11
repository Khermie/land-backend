# Backend integration changelog

Itemized record of every backend change made during the frontend↔backend
integration pass, and why. Written for whoever picks this up next
(including future-you).

## Files created

- `entity/Conversation.java`, `entity/Message.java` — messaging, from scratch
- `repository/ConversationRepository.java`, `repository/MessageRepository.java`
- `service/MessagingService.java`
- `controller/MessagingController.java`
- `dto/MessagingDTOs.java`
- `service/ContractorService.java` — self-service contractor profile read/update
- `dto/BiddingDTOs.java` — `BidResponse` safe projection
- `src/main/resources/application-local.properties.example`
- `README.md` (rewritten), `CHANGELOG_INTEGRATION.md` (this file)

## Files modified

- `entity/User.java` — added `phone`, `ghanaCardNumber`, `ghanaCardVerified`; added `@JsonIgnore` on `password`
- `entity/ContractorProfile.java` — `@Builder.Default` on all primitive/collection fields (previously `Lombok @Builder` silently skipped Java field initializers, so a profile built via `.builder().user(user).build()` — exactly what `AuthService` does at registration — got `skills=null`, `isVerified=false` only by coincidence of `boolean`'s own default, not because the field initializer ran)
- `repository/ContractorProfileRepository.java` — added `findByUser`
- `dto/AuthDTOs.java` — added `phone` to `RegisterRequest`; added `GhanaCardRequest`, `UserResponse`; `AuthResponse` now carries `UserResponse user`
- `dto/ContractorDTOs.java` — added `UpdateContractorProfileRequest`, `ContractorProfileResponse`
- `dto/LandDTOs.java` — added `LandListingResponse` safe projection
- `service/AuthService.java` — phone on register; `AuthResponse` now includes user; added `getCurrentUser`, `verifyGhanaCard`
- `service/LandService.java`, `controller/LandController.java` — return `LandListingResponse` instead of raw entity
- `service/BiddingService.java`, `controller/BiddingController.java` — return `BidResponse` instead of raw entity
- `controller/AuthController.java` — added `GET /me`, `POST /verify-ghana-card`
- `controller/ContractorController.java` — `skills` param now optional; added `GET /me`, `PUT /me`
- `config/SecurityConfig.java` — see below
- `src/main/resources/application.properties` — see below
- `.gitignore` — added `application-local.properties`

## `SecurityConfig` changes, in detail

1. **CORS**: replaced `allowedOriginPatterns(List.of("*"))` +
   `allowCredentials(true)` with an exact-origin allow-list read from
   `app.cors.allowed-origins`. The wildcard-pattern-plus-credentials
   combination isn't blocked by Spring, but it means the effective
   behavior is "accept credentialed requests from whatever Origin
   header shows up," which is broader than "just my dev frontend."
2. **Removed the duplicate `CorsFilter` bean.** The original config had
   *two* independently-configured CORS setups — one via
   `http.cors(...)` inside the `SecurityFilterChain`, and a second,
   separately-configured `CorsFilter` `@Bean`. They happened to be
   configured identically, but there was nothing enforcing that they'd
   stay in sync if one were edited later. Consolidated into one
   `CorsConfigurationSource` bean that the filter chain uses directly.
3. **`/api/auth/**` is no longer entirely `permitAll()`.** That was
   correct for `/register` and `/login`, but would have silently made
   the new `/api/auth/me` and `/api/auth/verify-ghana-card` endpoints
   accessible without a JWT too, since they share the `/api/auth`
   prefix. Now only `/register` and `/login` are explicitly public;
   everything else under `/api/auth` falls through to the default
   `anyRequest().authenticated()`.
4. **`GET /api/lands` and `GET /api/contractors/recommend` are now
   public.** Previously `anyRequest().authenticated()` caught them,
   meaning a signed-out visitor couldn't browse land listings or
   contractor recommendations — but the frontend's Explore Land and
   Find Contractor pages are public marketing pages, not
   behind-login dashboards. Only the specific `GET` routes are opened;
   `POST /api/lands`, `POST /api/bids`, and `PUT /api/contractors/me`
   still require a JWT.

## `application.properties` changes, in detail

- **Fixed a duplicate `server.port` key.** The file set it to `8081`,
  then again (with stray leading whitespace, likely a paste artifact)
  to `8082` further down. Spring Boot resolves duplicate keys by taking
  the last one read, so the app was already effectively running on
  `8082` — this was silent and easy to misread as "the port is 8081."
  Now a single explicit `server.port=${SERVER_PORT:8082}`.
- **Removed the hardcoded Postgres password and JWT secret.** Both were
  committed in plaintext. `DB_PASSWORD` and `JWT_SECRET` now have *no*
  default — the app fails to start with a clear "could not resolve
  placeholder" error if they're not supplied, rather than silently
  falling back to the old committed values. See README "Configure
  secrets" for how to supply them locally.
  **The committed Postgres password should be treated as compromised
  and rotated, independent of this code change** — it's still sitting
  in Git history.
- Added `app.cors.allowed-origins`.

## Data-exposure fixes

Three related issues, all stemming from the same root cause (returning
JPA entities directly from `@RestController` methods, which makes
Jackson serialize every field/relationship reachable from them, with
whatever's annotated `@JsonIgnore` — which was nothing — as the only
brake):

1. `User.password` (bcrypt hash) was serialized in any response
   containing a `User`, directly or nested. Fixed with `@JsonIgnore`.
2. `GET /api/lands` and `POST /api/lands` returned the raw `LandListing`
   entity, which nests the full `owner` `User` object — meaning every
   listing leaked its owner's phone number and Ghana Card number to
   anyone who could see it (and this endpoint is now public — see
   above). Fixed by introducing `LandListingResponse`, a DTO that
   exposes owner id/name/`ghanaCardVerified` only.
3. Same issue, same fix, for `LandBid` → `BidResponse`: bid endpoints
   were leaking every bidder's phone/Ghana Card number to anyone else
   who could see the same land's bid list.

## Known limitations / deliberately not addressed

- **No real Ghana Card verification.** `POST /api/auth/verify-ghana-card`
  records a card number and marks the account verified — full stop.
  There's no call to Ghana's National Identification Authority or any
  other external verification service, no document/photo upload
  handling, no manual review queue. If genuine identity verification is
  a hard requirement, that's a distinct integration (likely a
  third-party KYC provider) layered on top of this endpoint, not
  something addressed here.
- **`ContractorProfile.isVerified` (AI-recommendation eligibility) is
  currently just tied to Ghana Card verification** — see
  `ContractorService`'s Javadoc. There's no separate admin-review
  workflow for contractor quality/trust distinct from identity. This
  was a deliberate scoping choice (it's the only verification signal
  the system has right now) but is worth revisiting if "verified
  contractor" should mean something beyond "we have a Ghana Card number
  on file."
- **No role-based endpoint authorization (`@PreAuthorize` etc.)** exists
  anywhere in this codebase, before or after this pass.
  `CustomUserDetailsService` grants zero authorities to every
  authenticated user, so role checks are currently done ad hoc in
  service code (e.g. `ContractorService` checking `Role.CONTRACTOR`)
  rather than declaratively. Nothing added in this pass needed more
  than that, but a real role-authorization layer would need
  `CustomUserDetailsService` changed first.
- **No distinct HTTP status codes.** Every error is 400. Not changed in
  this pass — see `GlobalExceptionHandler`'s existing behavior, which
  every new service/controller here deliberately matches rather than
  introducing a second error convention alongside it.
- **No refresh tokens / token revocation.** JWTs are valid for their
  full lifetime (`JWT_EXPIRATION_MS`, default 24h) with no server-side
  logout or blacklist. Not addressed in this pass.
- **Not runtime-verified.** This environment has no network access and
  no Maven install available, so none of this could actually be
  compiled or run against a live Postgres instance here. Every file was
  hand-reviewed for correctness (imports resolve, method signatures
  match, Lombok-generated accessor names checked against actual usage
  elsewhere in the codebase), but "implemented but not runtime-verified"
  applies to all of it until it's actually built and run.
