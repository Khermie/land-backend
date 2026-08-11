import { api } from "./api";

/**
 * Matches land-backend's BiddingController exactly:
 *   POST /api/bids?landId=...&amount=... (JWT) -> BidResponse
 *   GET  /api/bids/{landId} (JWT)               -> BidResponse[], sorted by amount desc
 *
 * IMPORTANT: place() sends landId/amount as query-string parameters,
 * NOT a JSON body. The backend controller reads them via @RequestParam
 * even though a PlaceBidRequest DTO exists for this shape — it was
 * never actually wired up to accept a JSON body server-side, so this
 * matches the real, working contract rather than the unused DTO. See
 * BiddingController.java's own note on the backend for the same
 * caveat.
 *
 * BidResponse: {id, landId, bidderId, bidderName, amount, status,
 * createdAt} — not the full bidder object, for the same
 * data-minimization reason as LandListingResponse.
 */
export const bidApi = {
  place: ({ landId, amount }) => {
    const params = new URLSearchParams({ landId, amount: String(amount) });
    return api.post(`/api/bids?${params.toString()}`);
  },

  listForLand: (landId) => api.get(`/api/bids/${encodeURIComponent(landId)}`),
};
