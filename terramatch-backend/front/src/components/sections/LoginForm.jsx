import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Logo from "../common/Logo";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/cn";

function ChevronLeftIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12.5 4.5l-6 5.5 6 5.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.4" strokeWidth="1.4" />
    </svg>
  );
}

function EyeOffIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path
        d="M3.5 3.5l17 17M6.7 6.9C4 8.5 2 12 2 12s3.6 6.5 10 6.5c1.9 0 3.5-.6 4.8-1.4M10 5.7c.7-.1 1.3-.2 2-.2 6.4 0 10 6.5 10 6.5s-.9 1.6-2.4 3.2"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" strokeWidth="1.4" />
      <path d="M4 6.5l8 5.5 8-5.5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" strokeWidth="1.4" />
      <path d="M7.5 10.5V8a4.5 4.5 0 019 0v2.5" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M4.5 10.5l3.5 3.5 7.5-8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TRUST_POINTS = [
  "Verified land titles and contractor licenses",
  "Transparent, public bidding on every listing",
  "Real conversations with real land owners",
];

/**
 * Login screen. Rebuilt with a two-column layout on larger screens —
 * a branded panel plus the form — instead of a bare centered form on
 * a blank white page, which read as flat/unfinished. Below `lg` it
 * collapses to just the form, same as before.
 *
 * Icons here are intentionally simpler than earlier passes: fewer
 * decorative details, lighter stroke weight (1.4-1.6 vs. the 1.6-1.8
 * used elsewhere), and shapes closer to how they'd actually be drawn
 * by hand rather than constructed from perfect geometric primitives.
 *
 * The "Sign up" link and Signup's "Login" link point at each other on
 * purpose. No real backend — "logging in" simulates a brief delay,
 * marks the session as signed in (see context/AuthContext.jsx), and
 * redirects to /dashboard, same destination signup verification ends
 * at.
 */
export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateForm() {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      login();
      navigate("/dashboard");
    }, 500);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Branded panel — desktop only */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-forest-700 via-forest-800 to-forest-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
        {/* Soft decorative shapes, no photo needed */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/5" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-forest-500/20" aria-hidden="true" />
        <div className="pointer-events-none absolute right-16 top-1/3 h-40 w-40 rounded-full bg-white/5" aria-hidden="true" />

        <Link to="/" className="relative z-10 flex items-center gap-2">
          <Logo className="h-7 w-7" />
          <span className="text-lg font-bold text-white">TerraMatch</span>
        </Link>

        <div className="relative z-10">
          <h2 className="max-w-sm text-3xl font-bold leading-tight text-white">
            Land and contractors you can actually trust.
          </h2>
          <ul className="mt-8 space-y-4">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm leading-relaxed text-white/85">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-white/50">
          © {new Date().getFullYear()} TerraMatch. All rights reserved.
        </p>
      </div>

      {/* Form */}
      <div className="flex flex-col items-center justify-center bg-white px-6 py-10 sm:px-10">
        <div className="w-full max-w-sm">
          {/* Back button — mobile/tablet only, panel's logo covers desktop */}
          <Link
            to="/"
            className="mb-8 flex items-center gap-1 text-sm font-medium text-forest-600 hover:text-forest-700 lg:hidden"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Back
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-ink-900">Welcome back</h1>
            <p className="mt-1.5 text-sm text-ink-500">
              Log in to your account to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
                Email address
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400">
                  <MailIcon className="h-[18px] w-[18px]" />
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn(
                    "w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-ink-900 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-500/20",
                    errors.email ? "border-red-300 focus:border-red-500" : "border-ink-900/15 focus:border-forest-500"
                  )}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-700">
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400">
                  <LockIcon className="h-[18px] w-[18px]" />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={cn(
                    "w-full rounded-lg border bg-white py-2.5 pl-10 pr-10 text-sm font-medium text-ink-900 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-500/20",
                    errors.password ? "border-red-300 focus:border-red-500" : "border-ink-900/15 focus:border-forest-500"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-[18px] w-[18px]" />
                  ) : (
                    <EyeIcon className="h-[18px] w-[18px]" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="mt-2 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log In"}
              {!isSubmitting && <ArrowRightIcon className="h-4 w-4" />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-600">
            Don't have an account?{" "}
            <Link to="/get-started" className="font-semibold text-forest-600 hover:text-forest-700">
              Sign up
            </Link>
          </p>

          <div className="mt-6 flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 px-3 py-2.5">
            <CheckIcon className="h-4 w-4 shrink-0 text-green-600" />
            <p className="text-xs text-green-700">
              Your information is secure with us. We never share your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
