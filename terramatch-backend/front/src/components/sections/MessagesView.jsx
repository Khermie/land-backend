import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import MobileTabBar from "../common/MobileTabBar";
import { useMessages } from "../../context/MessagesContext";
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

function BoltIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-current", className)} aria-hidden="true">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}

/**
 * Compact card showing which land listing a conversation is about —
 * title, primary image, price, location, and the listing id (its
 * slug, which is this project's real unique identifier for a
 * listing). Shown at the top of a thread whenever landContext is set,
 * so both the buyer and the owner always know which listing is under
 * discussion, per the Buy Now requirement.
 */
function LandContextCard({ landContext }) {
  return (
    <div className="flex items-center gap-3 border-b border-ink-900/10 bg-forest-50/60 px-4 py-3">
      <img
        src={landContext.image}
        alt={landContext.title}
        className="h-12 w-14 shrink-0 rounded-lg bg-mist-100 object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink-900">{landContext.title}</p>
        <p className="truncate text-xs text-ink-500">
          {landContext.price} · {landContext.location}
        </p>
      </div>
      <span className="shrink-0 text-[10px] text-ink-400">#{landContext.slug}</span>
    </div>
  );
}

/**
 * Messages inbox — responsive two-pane layout. Below the `lg` breakpoint
 * only one pane shows at a time (list, or the open thread with a back
 * button); at `lg` and above both panes show side by side, same as any
 * desktop messaging UI. Renders without the site's Navbar/Footer (see
 * App.jsx's CHROMELESS_ROUTES) — MobileTabBar is the only navigation.
 *
 * Conversation state now lives in MessagesContext (shared with the Buy
 * Now flow — see BuyNowModal.jsx and context/MessagesContext.jsx)
 * rather than local state, so a conversation created from a listing
 * card shows up here immediately with everything already in sync.
 *
 * Arriving at /messages?contact=<slug> (from a "Message Now" button on
 * a contractor or land owner profile, or from Buy Now) opens that
 * person's thread — reusing an existing one if they already have a
 * conversation, or creating an empty one on the fly if not. An
 * unrecognized slug is ignored rather than crashing. Buy Now also
 * passes a suggested, still-editable message via router state
 * (location.state.prefillDraft) rather than sending it automatically.
 */
export default function MessagesView() {
  const { conversations, totalUnread, ensureConversation, markRead, sendMessage } = useMessages();
  const [selectedId, setSelectedId] = useState(null);
  const [draft, setDraft] = useState("");
  const [justSentNotice, setJustSentNotice] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const contactSlug = searchParams.get("contact");
  const prefillDraft = location.state?.prefillDraft;

  useEffect(() => {
    if (!contactSlug) return;
    const id = ensureConversation(contactSlug);
    if (!id) return;
    markRead(id);
    setSelectedId(id);
    setJustSentNotice(false);
    if (prefillDraft) setDraft(prefillDraft);
    // Only re-run when the URL's contact param itself changes — not on
    // every conversations update (e.g. sending a message shouldn't
    // re-trigger this).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactSlug]);

  const selected = conversations.find((c) => c.id === selectedId) || null;

  function handleSelect(id) {
    setSelectedId(id);
    setDraft("");
    setJustSentNotice(false);
    markRead(id);
  }

  function handleSend(e) {
    e.preventDefault();
    if (!selectedId) return;
    // Buy Now's "notify the land owner immediately" happens right
    // here — the moment the buyer actually sends the (editable)
    // message, not when the modal was opened. This mockup has one
    // signed-in identity playing both buyer and owner (see
    // MessagesContext.jsx), so there's no separate owner session to
    // push a notification to; this inline confirmation is the honest
    // stand-in for that real-time notification within that constraint.
    const isFirstMessageOnBuyNowThread = selected?.isBuyNowRequest && selected.messages.length === 0;
    sendMessage(selectedId, draft);
    setDraft("");
    if (isFirstMessageOnBuyNowThread) setJustSentNotice(true);
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
                          {c.isBuyNowRequest && c.messages.length === 0
                            ? `Buy Now request · ${c.landContext?.title ?? ""}`
                            : c.messages[c.messages.length - 1]?.text || "No messages yet"}
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
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink-900">{selected.name}</p>
                    <p className="truncate text-xs text-ink-500">{selected.subtitle}</p>
                  </div>
                  {selected.isBuyNowRequest && (
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-forest-600 px-2.5 py-1 text-[10px] font-bold text-white">
                      <BoltIcon className="h-3 w-3" />
                      Buy Now
                    </span>
                  )}
                </div>

                {selected.landContext && <LandContextCard landContext={selected.landContext} />}

                <div className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
                  {selected.messages.length === 0 && (
                    <p className="pt-6 text-center text-xs text-ink-400">
                      {selected.isBuyNowRequest
                        ? "Review the message below and send it to reach out about this listing."
                        : `Say hello to start the conversation with ${selected.name}.`}
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

                {justSentNotice && (
                  <div className="flex items-center gap-2 border-t border-forest-100 bg-forest-50/80 px-4 py-2.5 text-xs font-medium text-forest-700">
                    <BoltIcon className="h-3.5 w-3.5" />
                    Buy Now request sent — the land owner has been notified.
                  </div>
                )}

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
