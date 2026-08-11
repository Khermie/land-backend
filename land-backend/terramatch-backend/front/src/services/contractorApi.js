import { api } from "./api";

/**
 * Matches land-backend's ContractorController exactly:
 *   GET /api/contractors/recommend?skills=a,b,c (public) -> RecommendationResponse[]
 *   GET /api/contractors/me (JWT, CONTRACTOR only)         -> ContractorProfileResponse
 *   PUT /api/contractors/me (JWT, CONTRACTOR only)         -> ContractorProfileResponse
 *
 * `skills` is optional on the backend (a call with no query string just
 * scores on rating/experience instead of erroring) — recommend() below
 * omits the query param entirely when no skills are passed, rather than
 * sending an empty `?skills=` that would round-trip through
 * Arrays.asList("".split(",")) into a single blank-string "skill" on
 * the backend.
 *
 * RecommendationResponse: {name, skills, avgRating, yearsExperience,
 * matchScore} — no contractor id, since AIRecommendationService builds
 * this from ContractorProfile without one (see that DTO on the
 * backend). This means recommendation results currently can't deep-
 * link to a contractor's own profile/detail page; see
 * FRONTEND_INTEGRATION_NOTES.md "Known gaps".
 *
 * ContractorProfileResponse (from /me): {id, name, skills,
 * yearsExperience, avgRating, isVerified}.
 *
 * Important: GET /recommend only ever returns contractors whose
 * ContractorProfile.isVerified is true, which only becomes true once
 * that contractor completes Ghana Card verification (see
 * authApi.verifyGhanaCard and the backend's ContractorService). A
 * freshly-registered, unverified contractor will not appear in
 * recommendations no matter what's in their profile.
 */
export const contractorApi = {
  recommend: (skills = []) => {
    const query = skills.length > 0 ? `?skills=${encodeURIComponent(skills.join(","))}` : "";
    return api.get(`/api/contractors/recommend${query}`, { skipAuth: true });
  },

  getMyProfile: () => api.get("/api/contractors/me"),

  updateMyProfile: ({ skills, yearsExperience } = {}) =>
    api.put("/api/contractors/me", { skills, yearsExperience }),
};
