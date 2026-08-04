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
