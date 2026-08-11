import { CONTRACTORS } from "../constants/contractors";

/**
 * Integration boundary for TerraMatch's AI contractor-recommendation
 * assistant. That assistant already exists as its own system outside
 * this codebase — this module is deliberately the one place a real
 * call to it would be wired in (e.g. `await fetch("/api/ai/recommend", …)`
 * or an SDK call), so nothing else in the UI needs to change when
 * that wiring happens. `askAssistant()` is the whole contract: give it
 * the project brief plus the running conversation, get back a reply
 * and a ranked contractor shortlist.
 *
 * Nothing below is a model — there's no LLM call happening client-side.
 * It's a rules-based stand-in (category match, then location, then
 * budget-appropriate rating) over the app's real CONTRACTORS data, so
 * the chat is fully working and its recommendations are grounded in
 * real listings today, not placeholder copy, while staying honest that
 * the actual reasoning engine lives elsewhere.
 */

const BUDGET_RATING_FLOOR = {
  "Under GHS 10,000": 0,
  "GHS 10,000 – 30,000": 4.5,
  "GHS 30,000 – 75,000": 4.6,
  "GHS 75,000 – 150,000": 4.7,
  "GHS 150,000 – 300,000": 4.8,
  "Above GHS 300,000": 4.8,
};

function scoreContractor(contractor, brief) {
  let score = 0;
  const reasons = [];

  if (brief.category && brief.category !== "All Categories" && contractor.category === brief.category) {
    score += 3;
    reasons.push(`Specializes in ${contractor.category}`);
  }

  if (brief.location) {
    const city = brief.location.split(",")[0].trim().toLowerCase();
    if (city && contractor.location.toLowerCase().includes(city)) {
      score += 2;
      reasons.push(`Based near ${contractor.location.split(",")[0]}`);
    }
  }

  const ratingFloor = BUDGET_RATING_FLOOR[brief.budgetRange] ?? 0;
  if (contractor.rating >= ratingFloor) {
    score += 1;
  }
  if (contractor.rating >= 4.8) {
    reasons.push(`Top rated at ${contractor.rating} (${contractor.reviews} reviews)`);
  }

  if (contractor.projects >= 25) {
    score += 1;
    reasons.push(`${contractor.projects} completed projects`);
  }

  return { score, reasons };
}

/**
 * Ranks CONTRACTORS against a project brief. Exported on its own
 * (not just via askAssistant) so the recommendation panel can show an
 * initial shortlist immediately, before the person sends a single chat
 * message.
 */
export function recommendContractors(brief, { limit = 3 } = {}) {
  const ranked = CONTRACTORS.map((contractor) => ({
    contractor,
    ...scoreContractor(contractor, brief),
  }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || b.contractor.rating - a.contractor.rating);

  const top = ranked.slice(0, limit);

  // Fallback: an unusual category/location combo can legitimately match
  // nothing — show the platform's overall top-rated contractors instead
  // of an empty panel.
  if (top.length === 0) {
    return [...CONTRACTORS]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
      .map((contractor) => ({
        contractor,
        reasons: [`Top rated at ${contractor.rating} (${contractor.reviews} reviews)`],
      }));
  }

  return top.map(({ contractor, reasons }) => ({
    contractor,
    reasons: reasons.length ? reasons : ["Good general fit for your project"],
  }));
}

function buildReplyText(brief, matches, userMessage) {
  const names = matches.map((m) => m.contractor.name);
  const intro = userMessage
    ? "Based on that, here's how I'd narrow it down:"
    : `Looking at your ${brief.category || "project"}${brief.location ? ` in ${brief.location}` : ""}, here's who I'd start with:`;

  if (names.length === 1) {
    return `${intro} ${names[0]} looks like the strongest match right now.`;
  }
  return `${intro} ${names.slice(0, -1).join(", ")} and ${names[names.length - 1]} are your closest matches.`;
}

/**
 * Simulates one turn of the assistant conversation: given the project
 * brief, the chat history so far, and the person's newest message,
 * returns a reply plus a refreshed shortlist. Async and delayed on
 * purpose so the calling UI already handles the real network latency
 * a live call to the external assistant would have.
 */
export function askAssistant({ brief, history, userMessage }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const matches = recommendContractors(brief, { limit: 3 });
      resolve({
        reply: buildReplyText(brief, matches, userMessage),
        matches,
      });
    }, 900);
  });
}
