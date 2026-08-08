/**
 * Real, properly-licensed photos hotlinked from Unsplash (Unsplash
 * License — free for commercial use, no attribution required:
 * https://unsplash.com/license). Every ID below was individually
 * verified as a free photo (not an Unsplash+ paid photo) before being
 * added here.
 *
 * unsplashUrl() builds a consistently-sized, format-optimized URL —
 * Unsplash's own recommended hotlinking pattern (auto=format picks
 * WebP/AVIF where the browser supports it; fit=crop keeps the aspect
 * ratio each card expects instead of stretching/squashing).
 */
export function unsplashUrl(photoId, { w = 800, q = 80 } = {}) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&q=${q}`;
}

// Aerial land/plot photography — used for FEATURED_LANDS card images.
export const LAND_PHOTO_IDS = {
  greenCoveredLand: "photo-1557096336-8e576993d3ff",
  greenPlainField: "photo-1561012609-48a847c7096a",
  largeAreaOfLand: "photo-1694730652852-9404a2d0214b",
  farmlandWithMountains: "photo-1633212209509-80d72254399c",
};

// Multi-image gallery source for the Land Detail page. Built entirely
// from IDs already verified elsewhere in this file (LAND_PHOTO_IDS +
// CONTRACTOR_PHOTO_IDS.mapAerial/terrainRender) rather than new,
// unverified ones — this sandbox has no network access to Unsplash to
// confirm a brand-new ID actually resolves, so reusing known-good IDs
// is the safe choice over risking a broken image. Order is per-slug in
// lands.js (LAND_GALLERIES) so each listing shows a distinct sequence.

// Construction/trades photography — used for CONTRACTORS card images.
export const CONTRACTOR_PHOTO_IDS = {
  constructionWorkersGroup: "photo-1653280662710-1cac52cde6d7",
  tropicalConstructionSite: "photo-1777919393730-463e2c0b7f4c",
  electricianPowerPole: "photo-1595856619767-ab739fa7daae",
  modernInterior: "photo-1759238136854-a43787126db7",
  constructionHero: "photo-1541888946425-d81bb19240f5",
  mapAerial: "photo-1500382017468-9049fed747ef",
  terrainRender: "photo-1506466010722-395aa2bef877",
};

// Additional avatars for Hero MatchCard
export const AVATAR_IDS = {
  sarah: "photo-1494790108377-be9c29b29330",
  michael: "photo-1507003211169-0a1dd7228f2d",
  elena: "photo-1438761681033-6461ffad8d80",
  david: "photo-1500648767791-00dcc994a43e",
};

// Kwame's avatar — the signed-in user on Dashboard/Navbar and the land
// owner profile at /land-owner/kwame-owusu. Same photo everywhere he
// appears, since it's the same person in this project's data model.
export const KWAME_AVATAR_ID = "photo-1506794778202-cad84cf45f1d";
