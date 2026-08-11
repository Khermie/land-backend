import { api } from "./api";

/**
 * Matches land-backend's MessagingController exactly — a from-scratch
 * addition on the backend for this integration; no messaging endpoints
 * existed before (see backend CHANGELOG_INTEGRATION.md).
 *
 *   POST /api/conversations              {landId, initialMessage} -> ConversationDetailResponse
 *   GET  /api/conversations                                        -> ConversationSummaryResponse[]
 *   GET  /api/conversations/{id}                                   -> ConversationDetailResponse
 *   POST /api/conversations/{id}/messages {body}                   -> MessageResponse
 *   GET  /api/conversations/unread-count                           -> {unreadCount}
 *
 * `startOrGet` is what the frontend's "Buy Now" button calls. The
 * backend deduplicates on (land, buyer) — calling this again for a
 * listing you already messaged about reopens the same thread rather
 * than creating a second one, so the frontend doesn't need its own
 * dedup logic before calling this.
 *
 * Opening a conversation via `get(id)` marks the other party's
 * messages as read server-side — no separate "mark as read" call
 * exists or is needed.
 */
export const messageApi = {
  startOrGet: ({ landId, initialMessage }) => api.post("/api/conversations", { landId, initialMessage }),

  list: () => api.get("/api/conversations"),

  get: (conversationId) => api.get(`/api/conversations/${encodeURIComponent(conversationId)}`),

  send: (conversationId, body) =>
    api.post(`/api/conversations/${encodeURIComponent(conversationId)}/messages`, { body }),

  unreadCount: () => api.get("/api/conversations/unread-count"),
};
