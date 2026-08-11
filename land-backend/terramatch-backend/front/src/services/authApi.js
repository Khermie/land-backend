import { api } from "./api";

/**
 * Matches the real backend contract exactly (see
 * land-backend/terramatch-backend — AuthController, AuthDTOs):
 *   POST /api/auth/register  {name, email, password, role, phone?} -> {token, message, user}
 *   POST /api/auth/login     {email, password}                     -> {token, message, user}
 *   GET  /api/auth/me        (JWT)                                 -> user
 *   POST /api/auth/verify-ghana-card (JWT) {ghanaCardNumber}        -> user
 *
 * `role` must be exactly "CLIENT", "CONTRACTOR", or "ADMIN" — the
 * backend enum. The frontend's own concept of "Land Owner" maps to
 * CLIENT; see ROLE_TO_BACKEND in AuthContext.jsx for that mapping,
 * kept in one place so it's never duplicated across call sites.
 *
 * `user` in each response is the backend's UserResponse shape:
 * {id, name, email, role, phone, ghanaCardVerified}.
 */
export const authApi = {
  register: ({ name, email, password, role, phone }) =>
    api.post("/api/auth/register", { name, email, password, role, phone }, { skipAuth: true }),

  login: ({ email, password }) => api.post("/api/auth/login", { email, password }, { skipAuth: true }),

  me: () => api.get("/api/auth/me"),

  verifyGhanaCard: (ghanaCardNumber) => api.post("/api/auth/verify-ghana-card", { ghanaCardNumber }),
};
