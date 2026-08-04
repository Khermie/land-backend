import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Badge from "../common/Badge";
import { useAuth } from "../../context/AuthContext";
import { unsplashUrl, KWAME_AVATAR_ID } from "../../constants/stockImages";
import { cn } from "../../utils/cn";

function PersonIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <circle cx="12" cy="8" r="3.3" strokeWidth="1.4" />
      <path d="M5 20c0-3.7 3.1-6 7-6s7 2.3 7 6" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function MapPinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-current", className)} aria-hidden="true">
      <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
    </svg>
  );
}

function ChatIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M4 5.5h16v10.5H8.5L4 19.5V5.5z" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function GridIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.3" strokeWidth="1.4" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.3" strokeWidth="1.4" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.3" strokeWidth="1.4" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.3" strokeWidth="1.4" />
    </svg>
  );
}

function LogOutIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M9 20H5.5a1.5 1.5 0 01-1.5-1.5v-13A1.5 1.5 0 015.5 4H9" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 16l4-4-4-4M20 12H9" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-forest-600" : "bg-ink-900/15"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

const QUICK_LINKS = [
  {
    icon: MapPinIcon,
    title: "Land Owner Profile",
    description: "View your public listings, stats, and reviews.",
    to: "/land-owner/kwame-owusu",
  },
  {
    icon: ChatIcon,
    title: "Messages",
    description: "Check conversations with buyers and contractors.",
    to: "/messages",
  },
  {
    icon: GridIcon,
    title: "Dashboard",
    description: "Back to your personalized home screen.",
    to: "/dashboard",
  },
];

/**
 * Your Profile — no screenshot was supplied for this page, built to a
 * reasonable standard consistent with the rest of the mockup's "Kwame"
 * persona (constants/landOwners.js). The account info form and
 * notification toggles are real local state (edits stick, nothing
 * fake-disabled), but nothing persists past a refresh and there's no
 * backend to save to.
 *
 * "Log Out" is the one place in the app that calls useAuth().logout()
 * — see context/AuthContext.jsx. It's genuinely functional: after
 * logging out, the navbar reverts to the guest state everywhere,
 * including on pages that don't require login.
 */
export default function ProfileContent() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "Kwame Owusu",
    email: "kwame.owusu@email.com",
    phone: "+233 24 123 4567",
  });
  const [savedMessage, setSavedMessage] = useState("");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    bidAlerts: true,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSavedMessage("");
  }

  function handleSave(e) {
    e.preventDefault();
    setSavedMessage("Changes saved.");
    setTimeout(() => setSavedMessage(""), 2500);
  }

  function toggleNotification(key) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <img
            src={unsplashUrl(KWAME_AVATAR_ID, { w: 160 })}
            alt=""
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl font-bold text-ink-900">{formData.fullName}</h1>
            <p className="text-sm text-ink-500">{formData.email}</p>
            <Badge tone="soft" className="mt-1.5 px-2.5 py-0.5 text-[11px]">
              Land Owner
            </Badge>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.title}
              to={link.to}
              className="rounded-xl border border-ink-900/10 bg-white p-4 hover:border-forest-300 hover:shadow-card"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                <link.icon className="h-[18px] w-[18px]" />
              </span>
              <p className="mt-3 text-sm font-semibold text-ink-900">{link.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-500">{link.description}</p>
            </Link>
          ))}
        </div>

        {/* Account information */}
        <div className="mt-8 rounded-2xl border border-ink-900/10 bg-white p-6">
          <h2 className="flex items-center gap-2 text-base font-bold text-ink-900">
            <PersonIcon className="h-[18px] w-[18px] text-ink-500" />
            Account Information
          </h2>

          <form onSubmit={handleSave} className="mt-5 space-y-4">
            <div>
              <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-ink-700">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-lg border border-ink-900/15 px-3.5 py-2.5 text-sm font-medium text-ink-900 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-ink-900/15 px-3.5 py-2.5 text-sm font-medium text-ink-900 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink-700">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-ink-900/15 px-3.5 py-2.5 text-sm font-medium text-ink-900 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
              />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <Button type="submit" variant="primary" size="md">
                Save Changes
              </Button>
              {savedMessage && (
                <span className="text-sm font-medium text-forest-600">{savedMessage}</span>
              )}
            </div>
          </form>
        </div>

        {/* Notification preferences */}
        <div className="mt-6 rounded-2xl border border-ink-900/10 bg-white p-6">
          <h2 className="text-base font-bold text-ink-900">Notification Preferences</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-ink-900">Email notifications</p>
                <p className="text-xs text-ink-500">Bid updates, new messages, and account activity.</p>
              </div>
              <Toggle
                checked={notifications.email}
                onChange={() => toggleNotification("email")}
                label="Email notifications"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-ink-900">SMS notifications</p>
                <p className="text-xs text-ink-500">Time-sensitive alerts sent to your phone.</p>
              </div>
              <Toggle
                checked={notifications.sms}
                onChange={() => toggleNotification("sms")}
                label="SMS notifications"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-ink-900">Bid alerts</p>
                <p className="text-xs text-ink-500">Get notified when someone outbids you.</p>
              </div>
              <Toggle
                checked={notifications.bidAlerts}
                onChange={() => toggleNotification("bidAlerts")}
                label="Bid alerts"
              />
            </div>
          </div>
        </div>

        {/* Log out */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
        >
          <LogOutIcon className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </div>
  );
}
