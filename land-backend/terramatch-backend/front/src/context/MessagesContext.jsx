import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { messageApi } from "../services/messageApi";
import { useAuth } from "./AuthContext";

const MessagesContext = createContext(null);

/**
 * REWRITTEN to talk to the real backend (see land-backend's
 * MessagingController/MessagingService — built from scratch for this
 * integration; no messaging backend existed before). Replaces the
 * earlier sessionStorage-backed mock entirely.
 *
 * IMPORTANT — read before extending this further: every land listing
 * shown across this app today (FEATURED_LANDS, LAND_DETAILS —
 * "East Legon Hills" etc.) is static demo content with no backend
 * counterpart. The backend can only start a real conversation about a
 * real LandListing row (POST /api/lands, or GET /api/lands to browse
 * ones that exist) — it has no way to represent "a conversation about
 * a hardcoded demo listing that isn't in the database." So:
 *
 *   - `startBuyNowRequest(land, ...)` now requires `land.id` to be a
 *     REAL backend LandListing id (returned by landApi.create/list).
 *     Demo listings don't have this field and calling Buy Now on one
 *     will surface a clear "not available for this listing" error
 *     rather than silently faking a conversation or crashing.
 *   - `ensureConversation(slug)` — the old "message a contractor/land
 *     owner by slug" entry point used by profile page "Message Now"
 *     buttons — has no backend equivalent (there is no "start a
 *     conversation with a person" endpoint, only "start a conversation
 *     about a listing"). It's kept as a no-op returning null (see
 *     below) so MessagesView.jsx doesn't crash when it's called from
 *     those demo profile pages, but it will not create anything.
 *     Fixing this for real means either giving contractor/land-owner
 *     profiles a real backing listing to anchor the conversation to,
 *     or adding a person-to-person messaging endpoint on the backend —
 *     see FRONTEND_INTEGRATION_NOTES.md "Known gaps".
 *
 * The "TerraMatch Support" conversation is kept as permanent local-only
 * pseudo-conversation (id: "terramatch-support") since there's no
 * support-chat backend either, and it was never meant to be a real
 * buyer/owner thread. It always sorts to the top and never appears in
 * the real API-backed list, so it can't collide with a real
 * conversation id (real ids are backend-generated UUIDs).
 */
const SUPPORT_CONVERSATION_ID = "terramatch-support";

const SUPPORT_CONVERSATION = {
  id: SUPPORT_CONVERSATION_ID,
  name: "TerraMatch Support",
  subtitle: "Official Support",
  isSupport: true,
  avatarInitials: "TS",
  lastMessageTime: "",
  unreadCount: 0,
  landContext: null,
  isBuyNowRequest: false,
  messages: [
    {
      id: "support-welcome",
      sender: "them",
      text: "Hi! Welcome to TerraMatch. Let us know if you need help setting up your first listing or verifying your Ghana Card.",
      time: "",
    },
  ],
};

function initialsFrom(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function formatTime(isoString) {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    return isToday
      ? date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
      : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

/**
 * Translates the backend's ConversationSummaryResponse into the exact
 * shape MessagesView.jsx already renders (id, name, subtitle,
 * isSupport, avatarInitials, lastMessageTime, unreadCount, landContext,
 * isBuyNowRequest, messages) — so that component needed zero changes
 * despite the data source underneath it changing completely.
 */
function summaryToConversation(summary) {
  return {
    id: summary.id,
    name: summary.otherPartyName,
    subtitle: summary.landTitle ? `Re: ${summary.landTitle}` : "",
    isSupport: false,
    avatarInitials: initialsFrom(summary.otherPartyName),
    lastMessageTime: formatTime(summary.lastMessageAt),
    unreadCount: summary.unreadCount,
    landContext: summary.landId
      ? { slug: summary.landId, title: summary.landTitle, image: null, price: "", location: "" }
      : null,
    // The backend has no concept of "Buy Now" as a distinct thread
    // type — every conversation is inherently about a listing (it
    // requires a landId to start). The frontend's "Buy Now" badge is
    // therefore shown for any conversation with land context at all,
    // rather than a separate flag, since that's the closest honest
    // equivalent now that real data is involved.
    isBuyNowRequest: Boolean(summary.landId),
    // Full messages aren't in the summary response — populated when
    // this conversation is actually opened (see openConversation
    // below). Left empty here rather than fetched eagerly for every
    // item in the list, to avoid N+1 requests just to render the inbox.
    messages: [],
  };
}

function detailToMessages(detail, myUserId) {
  return detail.messages.map((m) => ({
    id: m.id,
    sender: m.senderId === myUserId ? "me" : "them",
    text: m.body,
    time: formatTime(m.createdAt),
  }));
}

export function MessagesProvider({ children }) {
  const { isAuthed, user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedDetailIds, setLoadedDetailIds] = useState(() => new Set());

  const refreshList = useCallback(async () => {
    if (!isAuthed) return;
    setIsLoading(true);
    try {
      const summaries = await messageApi.list();
      setConversations((prev) => {
        // Preserve any already-loaded full message history (see
        // openConversation) for conversations still present in the
        // refreshed list, so re-polling the list doesn't wipe out an
        // open thread's messages back down to the empty [] from
        // summaryToConversation.
        const prevById = new Map(prev.map((c) => [c.id, c]));
        return summaries.map((s) => {
          const fresh = summaryToConversation(s);
          const existing = prevById.get(s.id);
          return existing && loadedDetailIds.has(s.id) ? { ...fresh, messages: existing.messages } : fresh;
        });
      });
    } catch {
      // Leave whatever's currently loaded rather than clearing the
      // inbox on a transient network error.
    } finally {
      setIsLoading(false);
    }
  }, [isAuthed, loadedDetailIds]);

  useEffect(() => {
    if (isAuthed) refreshList();
    else setConversations([]);
    // Only when auth state itself changes, not on every refreshList
    // identity change (which itself depends on loadedDetailIds).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthed]);

  const allConversations = useMemo(() => [SUPPORT_CONVERSATION, ...conversations], [conversations]);

  const totalUnread = useMemo(
    () => conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0),
    [conversations]
  );

  const getConversation = useCallback(
    (id) => allConversations.find((c) => c.id === id) ?? null,
    [allConversations]
  );

  /**
   * Opens a real conversation: fetches its full message history (this
   * also marks the other party's messages as read server-side — see
   * MessagingService#getConversation on the backend) and merges it in.
   * No-op for the support pseudo-conversation, which already has its
   * one message inline.
   */
  const openConversation = useCallback(
    async (id) => {
      if (id === SUPPORT_CONVERSATION_ID) return id;
      try {
        const detail = await messageApi.get(id);
        const messages = detailToMessages(detail, user?.id);
        setConversations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, messages, unreadCount: 0 } : c))
        );
        setLoadedDetailIds((prev) => new Set(prev).add(id));
        return id;
      } catch {
        return null;
      }
    },
    [user?.id]
  );

  /**
   * Old slug-based "message this person" entry point — see file header
   * for why this can't be a real API call right now. Kept as a
   * same-signature no-op (returns the id straight through if it's
   * already a known real conversation id, otherwise null) so
   * MessagesView.jsx's existing ?contact=<slug> handling doesn't throw;
   * it just won't find/create anything for a slug it doesn't recognize.
   */
  const ensureConversation = useCallback(
    (idOrSlug) => {
      if (idOrSlug === SUPPORT_CONVERSATION_ID) return SUPPORT_CONVERSATION_ID;
      const existing = conversations.find((c) => c.id === idOrSlug);
      return existing ? existing.id : null;
    },
    [conversations]
  );

  const markRead = useCallback(
    (id) => {
      if (id === SUPPORT_CONVERSATION_ID) return;
      openConversation(id);
    },
    [openConversation]
  );

  const sendMessage = useCallback(
    async (id, text) => {
      const trimmed = text.trim();
      if (!trimmed || id === SUPPORT_CONVERSATION_ID) return;

      try {
        const sent = await messageApi.send(id, trimmed);
        setConversations((prev) =>
          prev.map((c) =>
            c.id === id
              ? {
                  ...c,
                  messages: [...c.messages, { id: sent.id, sender: "me", text: sent.body, time: formatTime(sent.createdAt) }],
                  lastMessageTime: formatTime(sent.createdAt),
                }
              : c
          )
        );
      } catch {
        // Swallowed here deliberately narrow — MessagesView.jsx doesn't
        // currently have a place to surface a send error inline. See
        // FRONTEND_INTEGRATION_NOTES.md "Known gaps" for adding one.
      }
    },
    []
  );

  /**
   * The Buy Now entry point. `land` MUST carry a real backend listing
   * id in `land.id` (as returned by landApi.create/list) — NOT a slug
   * from the static demo data. Throws a descriptive error rather than
   * failing silently if it doesn't, since BuyNowModal.jsx needs to
   * show the person something meaningful rather than a thread that
   * quietly never got created. See file header for the full reasoning.
   */
  const startBuyNowRequest = useCallback(async (land, initialMessage) => {
    if (!land?.id) {
      throw new Error(
        "This listing isn't connected to a real account yet, so Buy Now can't start a conversation for it."
      );
    }
    const detail = await messageApi.startOrGet({ landId: land.id, initialMessage });
    await refreshList();
    return { conversationId: detail.id };
  }, [refreshList]);

  const value = useMemo(
    () => ({
      conversations: allConversations,
      totalUnread,
      isLoading,
      getConversation,
      ensureConversation,
      openConversation,
      markRead,
      sendMessage,
      startBuyNowRequest,
    }),
    [
      allConversations,
      totalUnread,
      isLoading,
      getConversation,
      ensureConversation,
      openConversation,
      markRead,
      sendMessage,
      startBuyNowRequest,
    ]
  );

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
}

export function useMessages() {
  const ctx = useContext(MessagesContext);
  if (!ctx) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return ctx;
}
