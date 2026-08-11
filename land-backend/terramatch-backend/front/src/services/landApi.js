import { api } from "./api";

/**
 * Matches land-backend's LandController exactly:
 *   POST /api/lands (JWT)  {title, description, locationData, floodRisk, price} -> LandListingResponse
 *   GET  /api/lands (public)                                                     -> LandListingResponse[]
 *
 * LandListingResponse: {id, ownerId, ownerName, ownerGhanaCardVerified,
 * title, description, locationData, floodRisk, price, status, createdAt}
 * — NOT the full owner object. The backend deliberately strips owner
 * contact/verification details down to id/name/ghanaCardVerified only
 * (see LandDTOs.java on the backend for why) — don't expect
 * owner.email or owner.phone to be present anywhere in this response.
 *
 * The backend's LandListing entity has no photo/gallery, region
 * dropdown, or acreage fields — only what's listed above. If the
 * frontend's list-your-land form collects more than title/description/
 * locationData/floodRisk/price (it does — see ListLandForm.jsx), those
 * extra fields currently have nowhere to go; see
 * FRONTEND_INTEGRATION_NOTES.md "Known gaps" for what would need to
 * change on the backend to support them.
 */
export const landApi = {
  create: ({ title, description, locationData, floodRisk, price }) =>
    api.post("/api/lands", { title, description, locationData, floodRisk, price }),

  list: () => api.get("/api/lands"),
};
