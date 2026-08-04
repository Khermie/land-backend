import { useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { cn } from "../../utils/cn";

function ChevronDownIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M5 7.5l5 5 5-5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M4 5.5h16v10.5H8.5L4 19.5V5.5z" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

const FAQ_CATEGORIES = [
  {
    category: "Buying & Bidding Land",
    questions: [
      {
        q: "How do I know a land listing is legitimate?",
        a: "Every listing shows a Documents section with the land title certificate, site plan, survey plan, and land use permit — all reviewed by our team before the listing goes live. Look for the verification checkmarks on the listing page.",
      },
      {
        q: "What happens when the auction timer runs out?",
        a: "The highest bid at the moment the countdown reaches zero wins. There's no private negotiation after that — the bid history is public for a reason.",
      },
      {
        q: "Can I withdraw a bid once placed?",
        a: "Bids are treated as a commitment to the current price at time of bidding, similar to any public auction. If you're unsure, wait until you're confident before placing a bid.",
      },
    ],
  },
  {
    category: "Hiring a Contractor",
    questions: [
      {
        q: "How are contractors verified?",
        a: "We check national ID, business registration, and trade license before a contractor's profile goes live — the same checklist shown on their Verification Status card.",
      },
      {
        q: "What does the response rate on a profile mean?",
        a: "It's the percentage of inquiries a contractor has replied to, along with their average response time. Both are strong signals of how communicative they'll be once work starts.",
      },
      {
        q: "Can I message a contractor before hiring them?",
        a: "Yes — every contractor profile has a Message Now button that opens a direct conversation, so you can ask questions before committing to anything.",
      },
    ],
  },
  {
    category: "Account & Messages",
    questions: [
      {
        q: "How do I update my contact information?",
        a: "Go to Your Profile from the navbar or Dashboard, where you can edit your name, email, and phone number under Account Information.",
      },
      {
        q: "Where do my conversations with land owners or contractors go?",
        a: "All of them live in Messages, accessible from the Dashboard's bottom tab bar or the navbar once you're signed in.",
      },
      {
        q: "How do I turn off notifications?",
        a: "Your Profile has a Notification Preferences section with separate toggles for email, SMS, and bid alerts.",
      },
    ],
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-ink-900/10 py-4">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-sm font-semibold text-ink-900">{item.q}</span>
        <ChevronDownIcon
          className={cn("h-4 w-4 shrink-0 text-ink-500 transition-transform", isOpen && "rotate-180")}
        />
      </button>
      {isOpen && (
        <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{item.a}</p>
      )}
    </div>
  );
}

/**
 * Help Center — no screenshot was supplied for this page. Built as a
 * real FAQ accordion (genuinely expands/collapses) covering the
 * platform's actual features rather than generic filler questions.
 * "Still need help?" hands off to the real Messages inbox, which
 * already has a TerraMatch Support conversation pre-loaded.
 */
export default function HelpCenterContent() {
  const [openKey, setOpenKey] = useState(null);

  function toggle(key) {
    setOpenKey((current) => (current === key ? null : key));
  }

  return (
    <div className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Badge tone="soft" className="mx-auto w-fit">
          Help Center
        </Badge>
        <h1 className="mt-5 text-3xl font-extrabold text-ink-900 sm:text-4xl">
          How can we help?
        </h1>
        <p className="mt-3 text-sm text-ink-700">
          Answers to common questions about bidding, hiring contractors, and managing your account.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl space-y-10">
        {FAQ_CATEGORIES.map((section) => (
          <div key={section.category}>
            <h2 className="text-sm font-bold uppercase tracking-wide text-forest-600">
              {section.category}
            </h2>
            <div className="mt-2">
              {section.questions.map((item) => {
                const key = `${section.category}-${item.q}`;
                return (
                  <FAQItem
                    key={key}
                    item={item}
                    isOpen={openKey === key}
                    onToggle={() => toggle(key)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-4 rounded-2xl border border-ink-900/10 bg-mist-50 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="text-base font-bold text-ink-900">Still need help?</h2>
          <p className="mt-1 text-sm text-ink-600">
            Our team usually replies within an hour.
          </p>
        </div>
        <Button as={Link} to="/messages" variant="primary" size="md" className="shrink-0">
          <ChatIcon className="h-4 w-4" />
          Chat with Support
        </Button>
      </div>
    </div>
  );
}
