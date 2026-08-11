import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { FEATURED_LANDS } from "../constants/lands";
import { LAND_DETAILS } from "../constants/landDetails";

const AuctionContext = createContext(null);
const STORAGE_KEY = "terramatch_auction_state";

/**
 * Per-listing auction/sale state, keyed by land slug. This is the
 * closest thing this project has to a database table for auctions —
 * everywhere in the app that needs to know "is this sold?" or "what's
 * the current bid?" reads from here instead of keeping its own copy,
 * so Buy Now, bidding, and every card/detail surface stay in sync.
 *
 * Persisted to sessionStorage using the same approach as AuthContext,
 * so a purchase or bid survives navigation/refresh within the tab.
 *
 * Concurrency note: this app has no server, so two *different browser
 * tabs/users* genuinely racing each other isn't something a
 * client-only store can arbitrate — there's no shared backend to
 * serialize requests through. What this store does guarantee is
 * atomicity *within this session*: every mutation (buyNow, placeBid)
 * reads the current status and writes the new status in the same
 * functional setState update, so two rapid actions in this tab (e.g.
 * double-clicking Buy Now, or a bid submitted the instant after a
 * purchase completes) can't both succeed — whichever update function
 * runs first wins and flips status to "sold" or records the bid;
 * every update after that sees status !== "live" and is rejected.
 */
function readStoredState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function persistState(state) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore — worst case, state doesn't persist across a refresh
  }
}

/** Seed a slug's initial auction record from its listing/detail data. */
function seedFor(slug) {
  const land = FEATURED_LANDS.find((l) => l.slug === slug);
  const detail = LAND_DETAILS[slug];

  const initialBid = detail?.bidHistory?.[0];
  const durationMs = detail?.auctionDurationMs ?? 3 * 24 * 60 * 60 * 1000;

  return {
    status: "live", // "live" | "sold" | "expired"
    soldVia: null, // "buyNow" | "bid" | null
    soldTo: null,
    soldAt: null,
    soldAmount: null,
    // Fixed at seed time (not recomputed on every read) so every
    // surface — the countdown on the detail page, a listing card, the
    // expiry check itself — agrees on exactly when this auction ends,
    // the same way a real auction's end time would be a stored value
    // rather than "now plus however long is left."
    auctionEndsAt: Date.now() + durationMs,
    currentBid: initialBid
      ? { bidder: initialBid.bidder, amount: initialBid.amount, verified: Boolean(initialBid.verified) }
      : null,
    minNextBid: detail?.minimumNextBid ?? null,
    bidIncrement: detail?.bidIncrement ?? 5000,
    bidHistory: detail?.bidHistory ?? [],
    bidCount: land?.bids ?? 0,
  };
}

export function AuctionProvider({ children }) {
  const [records, setRecords] = useState(readStoredState);

  const getRecord = useCallback(
    (slug) => records[slug] ?? seedFor(slug),
    [records]
  );

  const isSold = useCallback(
    (slug) => (records[slug] ?? seedFor(slug)).status === "sold",
    [records]
  );

  // Time-based, so it's true the instant an auction's end time passes
  // even before markExpired() has run for this slug yet (e.g. the
  // very first render after the countdown reaches zero).
  const isExpired = useCallback((slug) => {
    const record = records[slug] ?? seedFor(slug);
    return record.status === "expired" || (record.status === "live" && Date.now() >= record.auctionEndsAt);
  }, [records]);

  /**
   * Called once by AuctionCountdown when its local timer reaches zero,
   * so the record's status is durably "expired" rather than only
   * being "live past its end time" for as long as this browser tab
   * happens to be looking at it. A no-op if the auction already sold
   * or was already marked expired — same read-then-write-in-one-
   * update pattern as placeBid/buyNow, so a sale that lands in the
   * same instant the timer expires isn't clobbered.
   */
  const markExpired = useCallback((slug) => {
    setRecords((prev) => {
      const current = prev[slug] ?? seedFor(slug);
      if (current.status !== "live") return prev;

      const next = { ...prev, [slug]: { ...current, status: "expired" } };
      persistState(next);
      return next;
    });
  }, []);

  /**
   * Attempts to place a bid. Returns { ok: true } on success or
   * { ok: false, reason } if rejected (e.g. item already sold, the
   * auction has ended, or the bid no longer meets the minimum because
   * another bid landed first).
   */
  const placeBid = useCallback((slug, amount, bidderName = "You") => {
    let result = { ok: false, reason: "unknown" };

    setRecords((prev) => {
      const current = prev[slug] ?? seedFor(slug);

      if (current.status === "sold") {
        result = { ok: false, reason: "sold" };
        return prev;
      }
      if (current.status === "expired" || Date.now() >= current.auctionEndsAt) {
        result = { ok: false, reason: "expired" };
        if (current.status === "expired") return prev;
        const next = { ...prev, [slug]: { ...current, status: "expired" } };
        persistState(next);
        return next;
      }
      if (!amount || amount < current.minNextBid) {
        result = { ok: false, reason: "too-low" };
        return prev;
      }

      const newBid = {
        bidder: bidderName,
        amount,
        dateLabel: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
      };

      const updated = {
        ...current,
        currentBid: { bidder: bidderName, amount, verified: false },
        minNextBid: amount + current.bidIncrement,
        bidHistory: [newBid, ...current.bidHistory],
        bidCount: current.bidCount + 1,
      };

      result = { ok: true };
      const next = { ...prev, [slug]: updated };
      persistState(next);
      return next;
    });

    return result;
  }, []);

  /**
   * Attempts a Buy Now purchase. Returns { ok: true } on success or
   * { ok: false, reason } if rejected (already sold, the auction has
   * ended, or no Buy Now price configured for this listing).
   */
  const buyNow = useCallback((slug, buyNowPrice, buyerName = "You") => {
    let result = { ok: false, reason: "unknown" };

    setRecords((prev) => {
      const current = prev[slug] ?? seedFor(slug);

      if (current.status === "sold") {
        result = { ok: false, reason: "sold" };
        return prev;
      }
      if (current.status === "expired" || Date.now() >= current.auctionEndsAt) {
        result = { ok: false, reason: "expired" };
        if (current.status === "expired") return prev;
        const next = { ...prev, [slug]: { ...current, status: "expired" } };
        persistState(next);
        return next;
      }
      if (!buyNowPrice) {
        result = { ok: false, reason: "not-available" };
        return prev;
      }

      const updated = {
        ...current,
        status: "sold",
        soldVia: "buyNow",
        soldTo: buyerName,
        soldAt: new Date().toISOString(),
        soldAmount: buyNowPrice,
      };

      result = { ok: true };
      const next = { ...prev, [slug]: updated };
      persistState(next);
      return next;
    });

    return result;
  }, []);

  const value = useMemo(
    () => ({ getRecord, isSold, isExpired, markExpired, placeBid, buyNow }),
    [getRecord, isSold, isExpired, markExpired, placeBid, buyNow]
  );

  return <AuctionContext.Provider value={value}>{children}</AuctionContext.Provider>;
}

export function useAuction() {
  const ctx = useContext(AuctionContext);
  if (!ctx) {
    throw new Error("useAuction must be used within an AuctionProvider");
  }
  return ctx;
}
