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
 * Buy Now starts a message conversation with the land owner instead of
 * completing an instant purchase, per the current spec. This modal is
 * the "review & send" step: it shows which listing this is about and a
 * suggested message the buyer can edit, then sends it directly to
 * start (or reopen) a real conversation via the backend's messaging
 * API (see context/MessagesContext.jsx / services/messageApi.js) — the
 * backend's POST /api/conversations creates the thread and posts the
 * first message in one atomic call, so there's no separate empty-thread-
 * then-send-later step the way the earlier mock version had.
 *
 * IMPORTANT: `land` must carry a real backend listing id in `land.id`
 * (as returned from POST/GET /api/lands — see landApi.js) for this to
 * work. The site's static demo listings (FEATURED_LANDS /
 * LAND_DETAILS) don't have one, since they don't exist in the backend
 * database — see MessagesContext.jsx's file header for the full
 * reasoning. Buy Now on one of those shows a clear message explaining
 * why, rather than failing silently.
 */
export default function BuyNowModal({ open, onClose, land }) {
  const navigate = useNavigate();
  const { isAuthed } = useAuth();
  const { startBuyNowRequest } = useMessages();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  // Recompute the suggested message whenever the modal opens for a
  // (possibly different) listing, rather than once on mount, so
  // reopening it for a different land doesn't show stale text.
  useEffect(() => {
    if (open) {
      setMessage(`Hello, I'm interested in buying your land listing titled "${land.name}". Is it still available?`);
      setError("");
    }
  }, [open, land.name]);

  function handleClose() {
    if (isSending) return;
    onClose?.();
  }

  async function handleStartConversation() {
    if (!isAuthed || !message.trim() || isSending) return;
    setError("");
    setIsSending(true);
    try {
      const { conversationId } = await startBuyNowRequest(land, message.trim());
      onClose?.();
      navigate(`/messages?contact=${conversationId}`);
    } catch (err) {
      setError(err.message || "Couldn't send that message. Please try again.");
    } finally {
      setIsSending(false);
    }
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
          disabled={isSending}
          className="mt-1.5 w-full resize-none rounded-lg border border-ink-900/15 bg-white px-3.5 py-2.5 text-sm text-ink-900 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20 disabled:opacity-60"
        />
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-500">
          <BoltIcon className="text-forest-600" />
          Feel free to edit this before sending — the owner is notified as soon as you do.
        </p>

        {!isAuthed && (
          <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
            You'll need to be signed in to message the owner.
          </p>
        )}

        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">{error}</p>
        )}

        <div className="mt-5 flex gap-2">
          <Button type="button" variant="outline-dark" size="md" className="flex-1" onClick={handleClose} disabled={isSending}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            className="flex-1"
            disabled={!isAuthed || !message.trim() || isSending}
            onClick={handleStartConversation}
          >
            {isSending ? "Sending…" : "Send to Owner"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
