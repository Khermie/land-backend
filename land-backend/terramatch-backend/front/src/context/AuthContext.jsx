import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../services/authApi";
import { authEvents, getStoredToken, setStoredToken } from "../services/api";

const AuthContext = createContext(null);

/**
 * Frontend role IDs (used throughout the UI — signupConfig.js,
 * Dashboard, Navbar, etc.) vs. the backend's Role enum
 * (CLIENT/CONTRACTOR/ADMIN — see land-backend's entity/Role.java).
 * These are deliberately NOT the same vocabulary, so every place that
 * needs to cross the boundary goes through the two maps below instead
 * of hardcoding the translation inline.
 *
 * KNOWN GAP — read before changing this: the backend has no role for
 * "general user" (browse-only visitor). The master integration brief
 * only specified Land Owner -> CLIENT and Contractor -> CONTRACTOR;
 * General User was never given a backend equivalent, and the backend's
 * Role enum is a hard constraint (registration 400s on any value
 * outside CLIENT/CONTRACTOR/ADMIN). Mapping general-user -> CLIENT
 * here is the only option that doesn't break registration, on the
 * reasoning that a browsing/buying "general user" overlaps with CLIENT
 * far more than CONTRACTOR — but it means the backend cannot actually
 * distinguish a General User from a Land Owner. If that distinction
 * ever matters server-side (e.g. gating who can list land), the
 * backend needs a real third role first. See
 * FRONTEND_INTEGRATION_NOTES.md "Known gaps".
 */
const FRONTEND_TO_BACKEND_ROLE = {
  "land-owner": "CLIENT",
  contractor: "CONTRACTOR",
  "general-user": "CLIENT",
};

// Reverse mapping for turning a backend user's role back into a
// frontend role id after login/register/me. Because general-user and
// land-owner both collapse to CLIENT on the way in, this can't
// perfectly invert — a CLIENT is always read back as "land-owner" (see
// note above). A CONTRACTOR always maps back cleanly.
const BACKEND_TO_FRONTEND_ROLE = {
  CLIENT: "land-owner",
  CONTRACTOR: "contractor",
  ADMIN: "admin",
};

export function toBackendRole(frontendRoleId) {
  return FRONTEND_TO_BACKEND_ROLE[frontendRoleId] || "CLIENT";
}

export function toFrontendRole(backendRole) {
  return BACKEND_TO_FRONTEND_ROLE[backendRole] || "general-user";
}

// Roles that must complete Ghana Card verification as part of
// onboarding. General users (and any future role not in this list)
// skip that step entirely — see useRequiresGhanaCard() below, which is
// the single source of truth so this rule only has to live in one
// place. NOTE: because general-user and land-owner are indistinguishable
// to the backend (see above), this check is frontend-only — the
// backend's verify-ghana-card endpoint doesn't itself restrict which
// roles may call it.
export const GHANA_CARD_REQUIRED_ROLES = ["land-owner", "contractor"];

const ROLE_DESTINATIONS = {
  "land-owner": "/dashboard",
  contractor: "/dashboard",
  "general-user": "/dashboard",
  admin: "/dashboard",
};

/**
 * Real JWT-backed auth state — replaces the earlier sessionStorage
 * fake-flag implementation entirely (see backend integration pass).
 * The token lives in localStorage (via services/api.js's
 * getStoredToken/setStoredToken) rather than sessionStorage, so a
 * signed-in session now survives closing and reopening the browser,
 * not just a page refresh within one tab — matching how the backend's
 * JWT itself already has a real, independent expiry
 * (app.jwt.expiration, default 24h) rather than living or dying with
 * the tab.
 *
 * On mount, if a token is already stored, this calls GET /api/auth/me
 * to fetch the current user and confirm the token is still valid —
 * this is what makes a refresh not lose the signed-in state. If that
 * call 401s (expired/invalid token), services/api.js's authEvents
 * fires "unauthorized" and this clears auth state below.
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(getStoredToken);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(getStoredToken()));

  const clearAuth = useCallback(() => {
    setToken(null);
    setUser(null);
    setStoredToken(null);
  }, []);

  // Restore session on first load / hard refresh.
  useEffect(() => {
    let cancelled = false;
    if (!token) {
      setIsLoading(false);
      return undefined;
    }
    setIsLoading(true);
    authApi
      .me()
      .then((freshUser) => {
        if (!cancelled) setUser(freshUser);
      })
      .catch(() => {
        // authEvents "unauthorized" (fired by api.js on a 401) already
        // handles clearing state for an expired/invalid token; any
        // other failure here (e.g. network) just leaves `user` unset
        // and isLoading false rather than forcing a logout, so a
        // transient network blip doesn't sign someone out.
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // Intentionally only on mount / when token identity changes, not on
    // every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // A 401 from ANY API call (not just /me) means the token is no
  // longer valid — react to it globally rather than only where the
  // triggering call happened to be made.
  useEffect(() => {
    function handleUnauthorized() {
      clearAuth();
    }
    authEvents.addEventListener("unauthorized", handleUnauthorized);
    return () => authEvents.removeEventListener("unauthorized", handleUnauthorized);
  }, [clearAuth]);

  /**
   * Calls the real backend. Throws ApiError on failure (invalid
   * credentials, network error, etc.) — callers (LoginForm) catch this
   * themselves to show the real backend message rather than this
   * function swallowing it.
   */
  const login = useCallback(async ({ email, password }) => {
    const response = await authApi.login({ email, password });
    setStoredToken(response.token);
    setToken(response.token);
    setUser(response.user);
    return response.user;
  }, []);

  /**
   * `frontendRole` is one of signupConfig.js's SIGNUP_ROLES ids
   * ("land-owner" | "contractor" | "general-user") — converted to the
   * backend's enum value here via toBackendRole so callers (SignupForm)
   * never have to know about that mapping themselves.
   */
  const register = useCallback(async ({ name, email, password, frontendRole, phone }) => {
    const response = await authApi.register({
      name,
      email,
      password,
      role: toBackendRole(frontendRole),
      phone,
    });
    setStoredToken(response.token);
    setToken(response.token);
    setUser(response.user);
    return response.user;
  }, []);

  const verifyGhanaCard = useCallback(async (ghanaCardNumber) => {
    const updatedUser = await authApi.verifyGhanaCard(ghanaCardNumber);
    setUser(updatedUser);
    return updatedUser;
  }, []);

  const logout = useCallback(() => {
    // No server-side logout/token-revocation endpoint exists (see
    // backend CHANGELOG_INTEGRATION.md "Known limitations") — the JWT
    // itself just expires on its own schedule. "Logging out" here means
    // discarding the token client-side, which is all that's available.
    clearAuth();
  }, [clearAuth]);

  const value = useMemo(() => {
    const frontendRole = user ? toFrontendRole(user.role) : null;
    return {
      isAuthed: Boolean(token && user),
      isLoading,
      token,
      user,
      role: frontendRole,
      backendRole: user?.role ?? null,
      ghanaCardVerified: Boolean(user?.ghanaCardVerified),
      login,
      register,
      logout,
      verifyGhanaCard,
    };
  }, [token, user, isLoading, login, register, logout, verifyGhanaCard]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

/**
 * True if `role` (or the signed-in user's own role, when no argument is
 * given) must complete Ghana Card verification. This is the one place
 * that decision is made — SignupVerify, LoginForm, GhanaCardVerify, and
 * the route guard in App.jsx all defer to it instead of each keeping
 * their own copy of GHANA_CARD_REQUIRED_ROLES.
 */
export function useRequiresGhanaCard(role) {
  const { role: currentRole } = useAuth();
  const targetRole = role ?? currentRole;
  return GHANA_CARD_REQUIRED_ROLES.includes(targetRole);
}

/**
 * Single source of truth for "where does this role end up". Every place
 * that used to hardcode `/dashboard` after login/signup/verification
 * calls this instead, so adding a role-specific dashboard later is a
 * one-line change here rather than a hunt through the auth flow.
 */
export function getRoleDestination(role) {
  return ROLE_DESTINATIONS[role] || "/dashboard";
}

/**
 * Every "Get Started" / "Post a Project" / "List Your Land" CTA across
 * the marketing site (CustomProjectBanner, ListLandBanner, pricing
 * cards, Navbar, footer, About/Features pages) is meant for a visitor
 * who hasn't signed up yet — they all point to /get-started. This hook
 * is the single place that decides where a "Get Started"-style CTA
 * should actually go: the signup flow for a guest, or straight to
 * their role's destination if they're already signed in.
 */
export function useGetStartedTarget() {
  const { isAuthed, role } = useAuth();
  return isAuthed ? getRoleDestination(role) : "/get-started";
}
