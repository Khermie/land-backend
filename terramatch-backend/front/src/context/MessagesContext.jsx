import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CONVERSATIONS, resolveMessageContact } from "../constants/messages";

const MessagesContext = createContext(null);
const STORAGE_KEY = "terramatch_messages";

/**
 * Shared conversation store. Previously this state lived only inside
 * MessagesView.jsx's local useState, which worked fine as long as the
 * only way to reach a conversation was navigating to /messages
 * yourself. Buy Now breaks that assumption — a listing card or the
 * Land Detail page (nowhere near MessagesView) now needs to create or
 * update a conversation *and* have the Messages screen, the unread
 * badge on MobileTabBar, and everything else agree on it immediately.
 * Promoting it to a context is the same move AuctionContext and
 * ListingsContext already made for the same reason; this follows that
 * exact pattern (sessionStorage-backed, atomic functional updates).
 */
function readStoredConversations() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fall through to the fresh default below
  }
  // Shallow-safe clone so local edits don't mutate the shared
  // CONVERSATIONS module data.
  return CONVERSATIONS.map((c) => ({ ...c, messages: [...c.messages] }));
}

function persist(conversations) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch {
    // ignore — worst case, state doesn't persist across a refresh
  }
}

/**
 * Every message and conversation-level "last activity" carries both a
 * real ISO timestamp (`timestamp` — what "Store timestamps" means)
 * and a short display label derived from it. Seeded conversations
 * (constants/messages.js) only ever had display strings like
 * "Yesterday" — those are left as-is since they're deliberately
 * relative to no fixed date, but anything created or updated from
 * here on gets a real timestamp underneath the label.
 */
function nowTimestamp() {
  return { timestamp: new Date().toISOString(), label: "Just now" };
}

export function MessagesProvider({ children }) {
  const [conversations, setConversations] = useState(readStoredConversations);

  const totalUnread = useMemo(
    () => conversations.reduce((sum, c) => sum + c.unreadCount, 0),
    [conversations]
  );

  const getConversation = useCallback(
    (id) => conversations.find((c) => c.id === id) ?? null,
    [conversations]
  );

  /** Ensures a conversation with `contactSlug` exists, creating an empty one via resolveMessageContact() if not. Returns the (possibly new) conversation id, or null if the slug doesn't resolve to anyone. */
  const ensureConversation = useCallback((contactSlug) => {
    let resultId = null;

    setConversations((prev) => {
      if (prev.some((c) => c.id === contactSlug)) {
        resultId = contactSlug;
        return prev;
      }

      const resolved = resolveMessageContact(contactSlug);
      if (!resolved) return prev;

      resultId = resolved.id;
      const next = [
        {
          id: resolved.id,
          name: resolved.name,
          subtitle: resolved.subtitle,
          isSupport: false,
          avatarInitials: resolved.avatarInitials,
          lastMessageTime: "",
          unreadCount: 0,
          landContext: null,
          isBuyNowRequest: false,
          messages: [],
        },
        ...prev,
      ];
      persist(next);
      return next;
    });

    return resultId;
  }, []);

  const markRead = useCallback((id) => {
    setConversations((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c));
      persist(next);
      return next;
    });
  }, []);

  const sendMessage = useCallback((id, text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const { timestamp, label } = nowTimestamp();

    setConversations((prev) => {
      const next = prev.map((c) =>
        c.id === id
          ? {
              ...c,
              messages: [
                ...c.messages,
                { id: c.messages.length + 1, sender: "me", text: trimmed, time: label, timestamp },
              ],
              lastMessageTime: label,
              lastMessageTimestamp: timestamp,
              // A Buy Now request's status moves from "pending" (drafted,
              // not yet sent — see startBuyNowRequest) to "sent" the
              // moment its first message actually goes out.
              buyNowStatus: c.isBuyNowRequest && c.buyNowStatus === "pending" ? "sent" : c.buyNowStatus,
            }
          : c
      );
      persist(next);
      return next;
    });
  }, []);

  /**
   * The Buy Now entry point. Finds an existing conversation for this
   * buyer/owner/land combination (by owner slug — this mockup has a
   * single buyer identity, so "same owner" is enough to prevent
   * duplicate threads for the same listing) or creates one, attaches
   * structured land context (title, image, price, location, listing
   * id) so both sides can always see which listing the thread is
   * about, marks it as a Buy Now request, and moves it to the top of
   * the inbox. Does NOT send a message — it hands back a suggested
   * message the buyer can review and edit first, per the required
   * flow ("the buyer can edit the message before sending it").
   */
  const startBuyNowRequest = useCallback((land, ownerSlug) => {
    const suggestedMessage = `Hello, I'm interested in buying your land listing titled "${land.name}". Is it still available?`;
    const landContext = {
      slug: land.slug,
      title: land.name,
      image: land.image,
      price: land.buyNowPrice ? `GHS ${land.buyNowPrice.toLocaleString("en-US")}` : land.price,
      location: land.location,
    };
    const buyNowRequestedAt = new Date().toISOString();

    let conversationId = null;

    setConversations((prev) => {
      const existingIndex = prev.findIndex((c) => c.id === ownerSlug);

      if (existingIndex !== -1) {
        conversationId = ownerSlug;
        const existing = prev[existingIndex];
        // Re-flag as a Buy Now request and refresh which listing it's
        // about (a buyer can reuse the same thread with an owner to
        // ask about a different one of their listings), then float it
        // to the top like a freshly active conversation would be.
        const updated = {
          ...existing,
          subtitle: `Land Owner · ${land.name}`,
          landContext,
          isBuyNowRequest: true,
          buyNowRequestedAt,
          // "pending" until the buyer actually sends the message —
          // see handleSend in MessagesView.jsx, which is also where
          // the owner-notification banner fires.
          buyNowStatus: "pending",
        };
        const next = [updated, ...prev.slice(0, existingIndex), ...prev.slice(existingIndex + 1)];
        persist(next);
        return next;
      }

      const resolved = resolveMessageContact(ownerSlug);
      conversationId = resolved?.id ?? ownerSlug;

      const created = {
        id: conversationId,
        name: resolved?.name ?? land.name,
        // Matches the existing "Bidder · East Legon Hills" subtitle
        // convention (see constants/messages.js) so this thread reads
        // the same way any other listing-specific conversation does,
        // rather than falling back to the owner's generic role.
        subtitle: `Land Owner · ${land.name}`,
        isSupport: false,
        avatarInitials: resolved?.avatarInitials ?? "LO",
        lastMessageTime: "",
        unreadCount: 0,
        landContext,
        isBuyNowRequest: true,
        buyNowRequestedAt,
        buyNowStatus: "pending",
        messages: [],
      };
      const next = [created, ...prev];
      persist(next);
      return next;
    });

    return { conversationId, suggestedMessage };
  }, []);

  const value = useMemo(
    () => ({
      conversations,
      totalUnread,
      getConversation,
      ensureConversation,
      markRead,
      sendMessage,
      startBuyNowRequest,
    }),
    [conversations, totalUnread, getConversation, ensureConversation, markRead, sendMessage, startBuyNowRequest]
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
