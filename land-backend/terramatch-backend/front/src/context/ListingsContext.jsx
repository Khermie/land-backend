import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ListingsContext = createContext(null);
const PROJECTS_KEY = "terramatch_posted_projects";
const LAND_KEY = "terramatch_posted_land";

/**
 * Client-side "backend" for content people submit through Post a
 * Project and List Your Land — this project has no real server (see
 * AuctionContext.jsx for the same note), so this plays the role a
 * `POST /api/projects` / `POST /api/land` endpoint + database table
 * would play. Same sessionStorage-backed approach as AuthContext and
 * AuctionContext, so submissions survive navigation/refresh in this
 * tab and actually show up elsewhere in the app (Find Contractor's
 * project feed, Explore Land's listing grid) rather than disappearing
 * into a form that goes nowhere.
 *
 * Drafts and published submissions live in the same list, distinguished
 * by `status: "draft" | "published"` — Dashboard/My Listings style
 * screens can filter on that if built later.
 */
function readStored(key) {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persist(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore — worst case, state doesn't persist across a refresh
  }
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Turns "Boundary Wall & Gate Installation" into "boundary-wall-gate-installation". */
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ListingsProvider({ children }) {
  const [projects, setProjects] = useState(() => readStored(PROJECTS_KEY));
  const [landListings, setLandListings] = useState(() => readStored(LAND_KEY));

  const addProject = useCallback((data, status) => {
    const record = {
      id: makeId("project"),
      slug: `${slugify(data.title || "project")}-${Date.now().toString(36)}`,
      status, // "draft" | "published"
      createdAt: new Date().toISOString(),
      ...data,
    };
    setProjects((prev) => {
      const next = [record, ...prev];
      persist(PROJECTS_KEY, next);
      return next;
    });
    return record;
  }, []);

  const addLandListing = useCallback((data, status) => {
    const record = {
      id: makeId("land"),
      slug: `${slugify(data.title || "land")}-${Date.now().toString(36)}`,
      status, // "draft" | "published"
      createdAt: new Date().toISOString(),
      ...data,
    };
    setLandListings((prev) => {
      const next = [record, ...prev];
      persist(LAND_KEY, next);
      return next;
    });
    return record;
  }, []);

  const publishedProjects = useMemo(
    () => projects.filter((p) => p.status === "published"),
    [projects]
  );
  const publishedLandListings = useMemo(
    () => landListings.filter((l) => l.status === "published"),
    [landListings]
  );

  const value = useMemo(
    () => ({
      projects,
      landListings,
      publishedProjects,
      publishedLandListings,
      addProject,
      addLandListing,
    }),
    [projects, landListings, publishedProjects, publishedLandListings, addProject, addLandListing]
  );

  return <ListingsContext.Provider value={value}>{children}</ListingsContext.Provider>;
}

export function useListings() {
  const ctx = useContext(ListingsContext);
  if (!ctx) {
    throw new Error("useListings must be used within a ListingsProvider");
  }
  return ctx;
}
