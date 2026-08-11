import { Link } from "react-router-dom";
import Button from "../common/Button";
import { SIGNUP_ROLES } from "../../constants/signupConfig";
import { cn } from "../../utils/cn";

function ChevronRightIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M7.5 4.5l6 5.5-6 5.5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Welcome screen for the signup flow. Shows three role options; clicking
 * one proceeds to the account-creation form with that role pre-selected.
 *
 * PLACEHOLDER ASSET: scenic land/cityscape photo (shown bottom-left) at
 * /src/assets/images/signup-welcome-landscape.jpg
 */
export default function SignupWelcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mist-50 via-white to-mist-50">
      <div className="container-page flex min-h-screen flex-col items-center justify-center py-8">
        <div className="w-full max-w-md">
          {/* Logo + tagline */}
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg viewBox="0 0 24 24" className="h-7 w-7 fill-forest-600" aria-hidden="true">
                <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2z" />
              </svg>
              <span className="text-2xl font-bold text-forest-600">TerraMatch</span>
            </div>
            <p className="text-sm text-ink-700">Welcome to TerraMatch</p>
            <p className="mt-1 text-xs text-ink-500 max-w-xs mx-auto">
              Join us to start a real estate and construction ecosystem you so we can personalize your experience.
            </p>
          </div>

          {/* Role selection cards */}
          <div className="space-y-4 mb-8">
            {SIGNUP_ROLES.map((role) => (
              <Link
                key={role.id}
                to={`/get-started/form?role=${role.id}`}
                className="group flex items-center gap-4 rounded-2xl border border-ink-900/10 bg-white p-4 transition-all hover:border-forest-300 hover:bg-forest-50 hover:shadow-card"
              >
                <span className="text-4xl">{role.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-ink-900">{role.title}</h3>
                  <p className="mt-0.5 text-xs text-ink-500">{role.description}</p>
                </div>
                <ChevronRightIcon className="h-5 w-5 text-forest-600 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-ink-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-forest-600 hover:text-forest-700">
              Login
            </Link>
          </p>

          {/* Background illustration (placeholder) */}
          <div className="fixed bottom-0 left-0 right-0 -z-10 h-64 bg-gradient-to-t from-mist-100/50 to-transparent" aria-hidden="true" />
          <div
            className="fixed bottom-0 left-0 -z-10 h-64 w-80 rounded-tr-3xl bg-cover bg-center"
            style={{
              backgroundImage: "url(/src/assets/images/signup-welcome-landscape.jpg)",
              opacity: 0.15,
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
