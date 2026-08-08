import { createContext, useCallback, useContext, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "terramatch_authed";

function readStoredAuth() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    // sessionStorage can throw in some privacy modes — fail closed
    return false;
  }
}

/**
 * Lightweight "signed in" state, persisted to sessionStorage so it
 * survives navigation and refreshes within the same browser tab (but
 * resets for a new tab/session — reasonable for a mockup with no real
 * backend). This is what was missing before: App.jsx used to decide
 * the navbar's authed/guest state purely from a hardcoded list of
 * routes, so leaving that list of pages after logging in made the
 * navbar flip back to guest (Login/Get Started) — it looked like being
 * signed out, because nothing was actually tracking "signed in" as a
 * real, page-independent fact.
 *
 * login()/logout() are called from LoginForm.jsx, SignupVerify.jsx,
 * and the new Your Profile page.
 */
export function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(readStoredAuth);

  const login = useCallback(() => {
    setIsAuthed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore — worst case, state doesn't persist across a refresh
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthed(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

/**
 * Every "Get Started" / "Post a Project" / "List Your Land" CTA across
 * the marketing site (CustomProjectBanner, ListLandBanner, pricing
 * cards, Navbar, footer, About/Features pages) is meant for a visitor
 * who hasn't signed up yet — they all point to /get-started. But nothing
 * checked whether the visitor was already signed in, so a logged-in
 * user clicking one of these (e.g. "Post a Project" from a bidding
 * page) got sent into the signup wizard again, which looks identical
 * to being logged out.
 *
 * This hook is the single place that decides where a "Get Started"-
 * style CTA should actually go: the signup flow for a guest, or
 * straight to their Dashboard if they're already signed in. Every CTA
 * button uses `to={target}` from this hook instead of a hardcoded
 * "/get-started" string, so the fix only has to live in one place.
 */
export function useGetStartedTarget() {
  const { isAuthed } = useAuth();
  return isAuthed ? "/dashboard" : "/get-started";
}
