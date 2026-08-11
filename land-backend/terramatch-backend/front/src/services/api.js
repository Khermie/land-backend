const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL && import.meta.env.DEV) {
  // Fails loudly in dev rather than silently calling a relative path
  // that would 404 against the Vite dev server instead of the backend.
  // eslint-disable-next-line no-console
  console.error(
    "VITE_API_URL is not set. Copy .env.example to .env and set it to your backend's URL (e.g. http://localhost:8082)."
  );
}

const TOKEN_STORAGE_KEY = "terramatch_token";

export function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
    else localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    // ignore — worst case, the session doesn't persist across a refresh
  }
}

/**
 * Fired whenever a request comes back 401 (expired/invalid JWT).
 * AuthContext subscribes to this once, at app startup, to clear auth
 * state and redirect to login — see AuthContext.jsx. Kept as a plain
 * event target (not a direct import of AuthContext) so this file has
 * no dependency on React/context at all; it's usable from anywhere,
 * including outside components.
 */
export const authEvents = new EventTarget();

/**
 * ApiError carries the backend's real error shape through to callers
 * instead of just a generic "request failed" string. The backend
 * (see GlobalExceptionHandler on the Spring side) returns EVERY error —
 * validation failures, not-found, bad credentials, authorization
 * failures — as HTTP 400 with {timestamp, status, error, message}.
 * There is currently no 401/403/404/409 distinction from the backend
 * itself; `status` here is the actual HTTP status code, which will
 * almost always be 400 except for genuine auth failures (invalid/
 * expired token, handled separately below) or network/5xx issues.
 */
export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

/**
 * The one place every API call in this app goes through. Centralizing
 * here means: the JWT is attached automatically when present, errors
 * always come back in the same shape regardless of which endpoint
 * failed, and a 401 always triggers the same "session expired" handling
 * everywhere instead of each call site reimplementing it.
 */
async function request(path, { method = "GET", body, skipAuth = false, signal } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (!skipAuth) {
    const token = getStoredToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (networkError) {
    // fetch() itself throws for DNS/connection failures, CORS
    // rejections, offline, etc. — before any HTTP status exists at all.
    throw new ApiError(
      "Couldn't reach the server. Check your connection and that the backend is running.",
      0,
      null
    );
  }

  // 204 No Content or an empty body — nothing to parse.
  const text = await response.text();
  const data = text ? safeJsonParse(text) : null;

  if (!response.ok) {
    if (response.status === 401) {
      setStoredToken(null);
      authEvents.dispatchEvent(new CustomEvent("unauthorized"));
    }
    const message = data?.message || response.statusText || "Something went wrong. Please try again.";
    throw new ApiError(message, response.status, data);
  }

  return data;
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  delete: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};
