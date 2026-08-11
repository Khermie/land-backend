import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "../common/StarRating";
import { askAssistant, recommendContractors } from "../../services/aiRecommendationService";
import { cn } from "../../utils/cn";

function SparkleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-current", className)} aria-hidden="true">
      <path d="M12 2.5l1.8 5.2 5.2 1.8-5.2 1.8L12 17.5l-1.8-5.2-5.2-1.8 5.2-1.8L12 2.5z" />
      <path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" />
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

/**
 * Chat space between the person posting a project and TerraMatch's AI
 * contractor-recommendation assistant. The assistant itself lives
 * outside this codebase (see services/aiRecommendationService.js —
 * that module is the integration seam; this component only renders
 * the conversation and displays whatever it returns). Visual language
 * intentionally reuses two things already in the app rather than
 * inventing a third: the dark "AI Recommendation" panel treatment
 * from AIRecommendation.jsx (home page), and the chat bubble/composer
 * mechanics from MessagesView.jsx.
 *
 * `brief` is the live form data from PostProjectForm — the panel
 * refreshes its shortlist whenever category/location/budget change,
 * even before the person sends a chat message, so recommendations
 * never feel stale relative to what they've typed.
 */
export default function AIAssistantPanel({ brief }) {
  const [messages, setMessages] = useState([
    {
      id: "intro",
      sender: "ai",
      text: "Tell me a bit more about what you need and I'll match you with contractors who fit — or just start typing your questions below.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [matches, setMatches] = useState(() => recommendContractors(brief, { limit: 3 }));
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef(null);
  const lastBriefKey = useRef(`${brief.category}|${brief.location}|${brief.budgetRange}`);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  // Keep the shortlist current as the form changes, without spamming
  // the chat log with a new message on every keystroke.
  useEffect(() => {
    const key = `${brief.category}|${brief.location}|${brief.budgetRange}`;
    if (key === lastBriefKey.current) return;
    lastBriefKey.current = key;
    setMatches(recommendContractors(brief, { limit: 3 }));
  }, [brief.category, brief.location, brief.budgetRange, brief]);

  async function handleSend(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || isThinking) return;

    const userMsg = { id: `u-${Date.now()}`, sender: "me", text };
    setMessages((prev) => [...prev, userMsg]);
    setDraft("");
    setIsThinking(true);

    const { reply, matches: nextMatches } = await askAssistant({
      brief,
      history: messages,
      userMessage: text,
    });

    setMatches(nextMatches);
    setMessages((prev) => [...prev, { id: `ai-${Date.now()}`, sender: "ai", text: reply }]);
    setIsThinking(false);
  }

  return (
    <section className="relative overflow-hidden rounded-2xl bg-forest-950">
      {/* Same ambient circuit texture as the home page's AI Recommendation panel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, rgba(126,198,166,0.6) 0, transparent 2px), radial-gradient(circle at 70% 60%, rgba(126,198,166,0.5) 0, transparent 2px), radial-gradient(circle at 40% 80%, rgba(126,198,166,0.4) 0, transparent 2px)",
          backgroundSize: "140px 140px",
        }}
        aria-hidden="true"
      />

      <div className="relative p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-600 text-white">
            <SparkleIcon className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-base font-bold text-white">AI Contractor Assistant</h2>
            <p className="text-xs text-forest-100/70">Matches update as you fill in the form.</p>
          </div>
        </div>

        {/* Shortlist */}
        <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
          {matches.map(({ contractor, reasons }) => (
            <Link
              key={contractor.slug}
              to={`/find-contractor/${contractor.slug}`}
              className="rounded-xl border border-forest-500/40 bg-forest-900/60 p-3.5 transition-colors hover:border-forest-400/60 hover:bg-forest-900/80"
            >
              <p className="truncate text-sm font-bold text-white">{contractor.name}</p>
              <div className="mt-1 flex items-center gap-1.5">
                <StarRating value={contractor.rating} />
                <span className="text-xs text-white/80">{contractor.rating}</span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-[11px] text-forest-100/75">{reasons[0]}</p>
            </Link>
          ))}
        </div>

        {/* Chat thread */}
        <div
          ref={scrollRef}
          className="mt-4 max-h-72 space-y-3 overflow-y-auto rounded-xl border border-forest-500/30 bg-forest-900/40 p-4"
        >
          {messages.map((m) => (
            <div key={m.id} className={cn("flex flex-col", m.sender === "me" ? "items-end" : "items-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                  m.sender === "me"
                    ? "rounded-br-sm bg-forest-600 text-white"
                    : "rounded-bl-sm border border-forest-500/30 bg-forest-950/60 text-forest-50"
                )}
              >
                {m.text}
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex items-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-forest-500/30 bg-forest-950/60 px-3.5 py-2.5">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-forest-300 [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-forest-300 [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-forest-300" />
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="mt-3 flex items-center gap-2">
          <label htmlFor="ai-assistant-draft" className="sr-only">
            Ask the AI assistant
          </label>
          <input
            id="ai-assistant-draft"
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask about contractors, timelines, or budgets…"
            className="flex-1 rounded-full border border-forest-500/40 bg-forest-950/50 px-4 py-2.5 text-sm text-white placeholder:text-forest-200/50 focus:border-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-400/20"
          />
          <button
            type="submit"
            disabled={!draft.trim() || isThinking}
            aria-label="Send to AI assistant"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-600 text-white disabled:opacity-40"
          >
            <SendIcon className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
