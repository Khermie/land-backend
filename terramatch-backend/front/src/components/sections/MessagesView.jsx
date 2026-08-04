import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MobileTabBar from "../common/MobileTabBar";
import { CONVERSATIONS, resolveMessageContact } from "../../constants/messages";
import { cn } from "../../utils/cn";

function ChevronLeftIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12.5 4.5l-6 5.5 6 5.5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SendIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-current", className)} aria-hidden="true">
      <path d="M3 11.5L20.5 3 12 20.5l-2.3-6.7L3 11.5z" />
    </svg>
  );
}

function ChatEmptyIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M4 5h16v11H8l-4 3.5V5z" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

const STORAGE_KEY = "terramatch_messages";

function initConversations() {
  // Restore from sessionStorage if a previous visit this session left
  // sent messages behind — otherwise every navigation away from
  // Messages (e.g. tapping "Land" then coming back) would silently
  // wipe out anything just sent, since this component previously held
  // conversations only in local state that reset on remount.
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // fall through to the fresh default below
  }
  // Shallow-safe clone so local edits (send/read state) don't mutate
  // the shared CONVERSATIONS module data.
  return CONVERSATIONS.map((c) => ({ ...c, messages: [...c.messages] }));
}

/**
 * Messages inbox — responsive two-pane layout. Below the `lg` breakpoint
 * only one pane shows at a time (list, or the open thread with a back
 * button); at `lg` and above both panes show side by side, same as any
 * desktop messaging UI. Renders without the site's Navbar/Footer (see
 * App.jsx's CHROMELESS_ROUTES) — MobileTabBar is the only navigation.
 *
 * Sending a message is real local state (appends to that thread and
 * clears the draft), persisted to sessionStorage so it survives
 * navigating away and back or refreshing the page — it resets for a
 * new browser tab/session, same as the auth state in AuthContext.jsx,
 * since there's no backend to actually save to.
 *
 * Arriving at /messages?contact=<slug> (from a "Message Now" button on
 * a contractor or land owner profile) opens that person's thread —
 * reusing an existing one if they already have a conversation below,
 * or creating an empty one on the fly via resolveMessageContact() if
 * not. An unrecognized slug is ignored rather than crashing.
 */
export default function MessagesView() {
  const [conversations, setConversations] = useState(initConversations);
  const [selectedId, setSelectedId] = useState(null);
  const [draft, setDraft] = useState("");
  const [searchParams] = useSearchParams();
  const contactSlug = searchParams.get("contact");

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch {
      // ignore — worst case, state doesn't persist across navigation
    }
  }, [conversations]);

  useEffect(() => {
    if (!contactSlug) return;

    const alreadyExists = conversations.some((c) => c.id === contactSlug);

    if (alreadyExists) {
      setConversations((prev) =>
        prev.map((c) => (c.id === contactSlug ? { ...c, unreadCount: 0 } : c))
      );
      setSelectedId(contactSlug);
      return;
    }

    const resolved = resolveMessageContact(contactSlug);
    if (!resolved) return;

    setConversations((prev) => [
      {
        id: resolved.id,
        name: resolved.name,
        subtitle: resolved.subtitle,
        isSupport: false,
        avatarInitials: resolved.avatarInitials,
        lastMessageTime: "",
        unreadCount: 0,
        messages: [],
      },
      ...prev,
    ]);
    setSelectedId(contactSlug);
    // Only re-run when the URL's contact param itself changes — not on
    // every conversations update (e.g. sending a message shouldn't
    // re-trigger this).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactSlug]);

  const selected = conversations.find((c) => c.id === selectedId) || null;
  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  function handleSelect(id) {
    setSelectedId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  }

  function handleSend(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !selectedId) return;

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              messages: [
                ...c.messages,
                { id: c.messages.length + 1, sender: "me", text, time: "Just now" },
              ],
              lastMessageTime: "Just now",
            }
          : c
      )
    );
    setDraft("");
  }

  return (
    <div className="flex min-h-screen flex-col bg-mist-50">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-hidden lg:my-4 lg:rounded-2xl lg:border lg:border-ink-900/10 lg:bg-white lg:shadow-card">
        <div className="grid flex-1 overflow-hidden lg:grid-cols-[320px_1fr]">
          {/* Conversation list */}
          <div
            className={cn(
              "flex-col overflow-y-auto border-ink-900/10 bg-white lg:flex lg:border-r",
              selected ? "hidden lg:flex" : "flex"
            )}
          >
            <div className="border-b border-ink-900/10 px-5 py-4">
              <h1 className="flex items-center gap-2 text-lg font-bold text-ink-900">
                Messages
                {totalUnread > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest-600 text-[11px] font-bold text-white">
                    {totalUnread}
                  </span>
                )}
              </h1>
            </div>

            <ul>
              {conversations.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(c.id)}
                    className={cn(
                      "flex w-full items-center gap-3 border-b border-ink-900/5 px-5 py-3.5 text-left hover:bg-mist-50",
                      selectedId === c.id && "bg-forest-50"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                        c.isSupport ? "bg-forest-600 text-white" : "bg-forest-100 text-forest-700"
                      )}
                    >
                      {c.isSupport ? <ShieldIcon className="h-5 w-5" /> : c.avatarInitials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-ink-900">{c.name}</p>
                        <span className="shrink-0 text-[11px] text-ink-400">{c.lastMessageTime}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-xs text-ink-500">
                          {c.messages[c.messages.length - 1]?.text || "No messages yet"}
                        </p>
                        {c.unreadCount > 0 && (
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-forest-600 text-[10px] font-bold text-white">
                            {c.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Thread */}
          <div className={cn("flex-col bg-mist-50 lg:flex", selected ? "flex" : "hidden lg:flex")}>
            {selected ? (
              <>
                <div className="flex items-center gap-3 border-b border-ink-900/10 bg-white px-4 py-3.5">
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-mist-100 lg:hidden"
                    aria-label="Back to conversations"
                  >
                    <ChevronLeftIcon className="h-5 w-5 text-ink-700" />
                  </button>
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                      selected.isSupport ? "bg-forest-600 text-white" : "bg-forest-100 text-forest-700"
                    )}
                  >
                    {selected.isSupport ? <ShieldIcon className="h-4 w-4" /> : selected.avatarInitials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink-900">{selected.name}</p>
                    <p className="truncate text-xs text-ink-500">{selected.subtitle}</p>
                  </div>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
                  {selected.messages.length === 0 && (
                    <p className="pt-6 text-center text-xs text-ink-400">
                      Say hello to start the conversation with {selected.name}.
                    </p>
                  )}
                  {selected.messages.map((m) => (
                    <div
                      key={m.id}
                      className={cn("flex flex-col", m.sender === "me" ? "items-end" : "items-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                          m.sender === "me"
                            ? "rounded-br-sm bg-forest-600 text-white"
                            : "rounded-bl-sm border border-ink-900/10 bg-white text-ink-800"
                        )}
                      >
                        {m.text}
                      </div>
                      <span className="mt-1 text-[11px] text-ink-400">{m.time}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-ink-900/10 bg-white p-3">
                  <label htmlFor="message-draft" className="sr-only">
                    Type a message
                  </label>
                  <input
                    id="message-draft"
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 rounded-full border border-ink-900/15 bg-mist-50 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                  />
                  <button
                    type="submit"
                    disabled={!draft.trim()}
                    aria-label="Send message"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-600 text-white disabled:opacity-40"
                  >
                    <SendIcon className="h-4 w-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
                <ChatEmptyIcon className="h-10 w-10 text-ink-300" />
                <p className="text-sm text-ink-500">Select a conversation to start chatting.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileTabBar active="messages" />
    </div>
  );
}
