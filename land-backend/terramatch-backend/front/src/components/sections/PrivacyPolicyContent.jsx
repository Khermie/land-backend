import { Link } from "react-router-dom";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: [
      "When you create a TerraMatch account, we collect your full name, email address, phone number, and password. Land owners and contractors additionally provide identity documents (such as a Ghana Card) and business registration details as part of our verification process.",
      "We also collect information you provide when using the platform — land listings, bid amounts, messages sent through our Messages feature, and reviews you leave for contractors or land owners.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    body: [
      "We use your information to operate the platform: matching land listings with interested buyers, connecting you with contractors, processing bids, verifying identities, and enabling communication between users through Messages.",
      "We may also use your contact information to send account-related notifications, such as bid updates, verification status, and new messages — you can manage these preferences from Your Profile once that page is available.",
    ],
  },
  {
    title: "3. How We Share Information",
    body: [
      "Your name, verification status, ratings, and public listing details are visible to other users, since that's core to how the platform works. Your phone number and email are only shown to users you choose to contact or who contact you.",
      "We do not sell your personal information to third parties. We may share information with service providers who help us operate the platform (such as identity verification partners) under confidentiality obligations.",
    ],
  },
  {
    title: "4. Data Security",
    body: [
      "We use industry-standard measures to protect your information, including encrypted connections and restricted access to verification documents. No online platform can guarantee absolute security, but we work to keep your data safe at every step.",
    ],
  },
  {
    title: "5. Your Rights",
    body: [
      "You can request a copy of the personal information we hold about you, ask us to correct inaccurate information, or request that your account and associated data be deleted, subject to any legal retention requirements (such as records of completed transactions).",
    ],
  },
  {
    title: "6. Cookies",
    body: [
      "We use cookies to keep you signed in and to understand how the platform is used, so we can improve it over time. You can control cookies through your browser settings, though some features may not work correctly without them.",
    ],
  },
  {
    title: "7. Changes to This Policy",
    body: [
      "We may update this policy as the platform evolves. Material changes will be communicated through the platform or by email before they take effect.",
    ],
  },
];

/**
 * Privacy Policy — no screenshot was supplied for this page. Built as
 * a genuine, project-specific policy (references real features like
 * Messages, bidding, and Ghana Card verification) rather than generic
 * boilerplate, though it's still a placeholder in the legal sense —
 * swap in your actual reviewed policy before shipping to real users.
 */
export default function PrivacyPolicyContent() {
  return (
    <div className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-ink-500">Last updated: January 15, 2026</p>

        <p className="mt-6 text-sm leading-relaxed text-ink-700">
          This Privacy Policy explains how TerraMatch collects, uses, and
          protects your information when you use our platform to buy,
          sell, or bid on land, or to find and hire contractors. By using
          TerraMatch, you agree to the practices described below.
        </p>

        <div className="mt-10 space-y-8">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-ink-900">{section.title}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="mt-2.5 text-sm leading-relaxed text-ink-700">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-ink-900/10 bg-mist-50 p-5">
          <p className="text-sm font-semibold text-ink-900">Questions about this policy?</p>
          <p className="mt-1 text-sm text-ink-700">
            Reach out through{" "}
            <Link to="/messages" className="font-semibold text-forest-600 hover:text-forest-700">
              Messages
            </Link>{" "}
            or visit our{" "}
            <Link to="/help-center" className="font-semibold text-forest-600 hover:text-forest-700">
              Help Center
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
