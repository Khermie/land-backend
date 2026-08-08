import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Button from "./Button";
import { useAuth } from "../../context/AuthContext";
import { useMessages } from "../../context/MessagesContext";
import { formatGHS } from "../../constants/landDetails";
import { cn } from "../../utils/cn";

function BoltIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4 fill-current", className)} aria-hidden="true">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}

/**
 * Buy Now no longer completes an instant purchase — it starts a
 * message conversation with the land owner instead, per the current
 * spec. This modal is now a short "review & send" step rather than a
 * payment flow: it shows which listing this is about and a suggested
 * message the buyer can edit, then hands off to the existing Messages
 * system (see context/MessagesContext.jsx and MessagesView.jsx) to
 * actually do the sending, so it reuses that real, working chat UI
 * instead of building a second one here.
 *
 * The conversation is created (or reused, if this buyer already has
 * one with this owner) the moment this modal opens — matching "As
 * soon as a buyer initiates a Buy Now request, notify the land owner
 * immediately" — but the message itself isn't sent until the buyer
 * confirms it on the Messages screen, matching "the buyer can edit
 * the message before sending it."
 */
export default function BuyNowModal({ open, onClose, land }) {
  const navigate = useNavigate();
  const { isAuthed } = useAuth();
  const { startBuyNowRequest } = useMessages();
  const [message, setMessage] = useState("");

  // Recompute the suggested message whenever the modal opens for a
  // (possibly different) listing, rather than once on mount, so
  // reopening it for a different land doesn't show stale text.
  useEffect(() => {
    if (open) {
      setMessage(`Hello, I'm interested in buying your land listing titled "${land.name}". Is it still available?`);
    }
  }, [open, land.name]);

  function handleClose() {
    onClose?.();
  }

  function handleStartConversation() {
    if (!isAuthed) return;

    // Creates/reuses the conversation and notifies the owner right
    // away (unread count, top-of-inbox) even before the buyer's
    // edited message is sent — see startBuyNowRequest in
    // MessagesContext.jsx.
    const { conversationId } = startBuyNowRequest(land, land.ownerSlug);
    if (!conversationId) return;

    handleClose();
    navigate(`/messages?contact=${conversationId}`, { state: { prefillDraft: message } });
  }

  return (
    <Modal open={open} onClose={handleClose} title="Message the Land Owner">
      <div>
        <p className="text-sm text-ink-700">
          Buy Now connects you directly with the owner of{" "}
          <span className="font-semibold text-ink-900">{land.name}</span> to arrange the purchase.
        </p>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-ink-900/10 bg-mist-50 p-3">
          <img
            src={land.image}
            alt={land.name}
            className="h-14 w-16 shrink-0 rounded-lg bg-mist-100 object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink-900">{land.name}</p>
            <p className="truncate text-xs text-ink-500">{land.location}</p>
            <p className="mt-0.5 text-sm font-bold text-forest-700">
              {land.buyNowPrice ? formatGHS(land.buyNowPrice) : land.price}
            </p>
          </div>
        </div>

        <label htmlFor="buy-now-message" className="mt-4 block text-sm font-semibold text-ink-900">
          Your message
        </label>
        <textarea
          id="buy-now-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full resize-none rounded-lg border border-ink-900/15 bg-white px-3.5 py-2.5 text-sm text-ink-900 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
        />
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-500">
          <BoltIcon className="text-forest-600" />
          You can edit this message before it's sent — nothing is sent until you confirm on the
          Messages screen.
        </p>

        {!isAuthed && (
          <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
            You'll need to be signed in to message the owner.
          </p>
        )}

        <div className="mt-5 flex gap-2">
          <Button type="button" variant="outline-dark" size="md" className="flex-1" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            className="flex-1"
            disabled={!isAuthed || !message.trim()}
            onClick={handleStartConversation}
          >
            Continue to Chat
          </Button>
        </div>
      </div>
    </Modal>
  );
}
