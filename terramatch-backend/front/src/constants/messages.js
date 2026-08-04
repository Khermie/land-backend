import { CONTRACTORS } from "./contractors";
import { LAND_OWNERS } from "./landOwners";

function initialsFrom(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/**
 * Looks up a contractor or land owner by slug so a fresh conversation
 * can be created for them on the fly (see MessagesView.jsx) when a
 * "Message Now" button is clicked for someone who doesn't already have
 * a thread in CONVERSATIONS below. Checks contractors first, then land
 * owners, since slugs are unique within each list but not guaranteed
 * unique across both.
 */
export function resolveMessageContact(slug) {
  const contractor = CONTRACTORS.find((c) => c.slug === slug);
  if (contractor) {
    return {
      id: contractor.slug,
      name: contractor.name,
      subtitle: contractor.category,
      avatarInitials: initialsFrom(contractor.name),
    };
  }

  const owner = LAND_OWNERS[slug];
  if (owner) {
    return {
      id: slug,
      name: owner.name,
      subtitle: owner.role,
      avatarInitials: initialsFrom(owner.name),
    };
  }

  return null;
}

// Placeholder conversations for the Messages page, shown from Kwame's
// inbox (he's the signed-in user on the Dashboard — see
// constants/landOwners.js for his existing profile data). Names reuse
// people who already appear elsewhere in the project (bidders on his
// East Legon Hills listing, a contractor from constants/contractors.js)
// so the inbox feels connected to the rest of the site rather than
// introducing unrelated placeholder people.
export const CONVERSATIONS = [
  {
    id: "terramatch-support",
    name: "TerraMatch Support",
    subtitle: "Official Support",
    isSupport: true,
    avatarInitials: "TS",
    lastMessageTime: "9:12 AM",
    unreadCount: 1,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hi Kwame, welcome to TerraMatch! Let us know if you need help setting up your first listing.",
        time: "Mon, 9:00 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "Thanks! Quick question — how long does document verification usually take?",
        time: "Mon, 9:05 AM",
      },
      {
        id: 3,
        sender: "them",
        text: "Usually 1-2 business days once your ID and land title documents are uploaded.",
        time: "Mon, 9:12 AM",
      },
    ],
  },
  {
    id: "ama-serwaa",
    name: "Ama Serwaa",
    subtitle: "Bidder · East Legon Hills",
    isSupport: false,
    avatarInitials: "AS",
    lastMessageTime: "Yesterday",
    unreadCount: 2,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hi Kwame, I placed a bid on the East Legon Hills plot. Is the site plan available to view in person?",
        time: "Yesterday, 3:40 PM",
      },
      {
        id: 2,
        sender: "them",
        text: "Also wanted to confirm — is the GH₵115,000 minimum next bid still accurate?",
        time: "Yesterday, 3:41 PM",
      },
    ],
  },
  {
    id: "prime-construction",
    name: "Prime Construction",
    subtitle: "Contractor",
    isSupport: false,
    avatarInitials: "PC",
    lastMessageTime: "Tue",
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Good afternoon — we noticed your Tema Community 25 listing. We'd love to discuss a site grading quote if you're taking bids from contractors too.",
        time: "Tue, 11:20 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "Hi, thanks for reaching out. I'll share details once the land sale closes.",
        time: "Tue, 1:05 PM",
      },
    ],
  },
  {
    id: "kofi-mensah",
    name: "Kofi Mensah",
    subtitle: "Bidder · East Legon Hills",
    isSupport: false,
    avatarInitials: "KM",
    lastMessageTime: "Last week",
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Transparent process, thanks for the quick document turnaround.",
        time: "Last Wed, 5:30 PM",
      },
    ],
  },
];
