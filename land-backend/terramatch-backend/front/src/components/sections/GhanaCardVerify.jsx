import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../common/Button";
import ImageUploadGrid from "../common/ImageUploadGrid";
import { SIGNUP_ROLES, GHANA_CARD_REGIONS, getSignupSteps } from "../../constants/signupConfig";
import { useAuth, toFrontendRole } from "../../context/AuthContext";
import { cn } from "../../utils/cn";

function ChevronLeftIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12.5 4.5l-6 5.5 6 5.5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" strokeWidth="1.5" />
      <path d="M8.5 12l2 2 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IdCardIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="2.2" strokeWidth="1.5" />
      <circle cx="8" cy="12" r="2.2" strokeWidth="1.4" />
      <path d="M5.3 16.3c.5-1.5 1.6-2.3 2.7-2.3s2.2.8 2.7 2.3" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 9.5h4M14 12.5h4M14 15.5h2.5" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12 3l7 3v5.5c0 4.6-3 8.4-7 9.5-4-1.1-7-4.9-7-9.5V6l7-3z" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AlertIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12 3.5L2.5 20h19L12 3.5z" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 9.5v4.5M12 17h.01" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

const GHANA_CARD_REGEX = /^GHA-\d{9}-\d$/;

function formatGhanaCardNumber(raw) {
  // Auto-format as the person types: GHA-XXXXXXXXX-X
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  let digits = cleaned;
  if (digits.startsWith("GHA")) digits = digits.slice(3);
  digits = digits.replace(/[^0-9]/g, "").slice(0, 10);

  const main = digits.slice(0, 9);
  const check = digits.slice(9, 10);

  let formatted = "GHA";
  if (main) formatted += `-${main}`;
  if (check) formatted += `-${check}`;
  return formatted;
}

/**
 * Ghana Card verification step. By the time anyone reaches this screen
 * they're ALWAYS already signed in — either because SignupForm just
 * registered them (real account, real JWT — see AuthContext#register)
 * and routed straight here for Land Owner/Contractor roles, or because
 * App.jsx's GHANA_CARD_GATED_ROUTES guard sent an already-signed-in,
 * not-yet-verified user here before letting them reach a gated route
 * like /list-your-land. `location.state.fromSignup` distinguishes the
 * two only for display purposes (showing the step indicator / signup-
 * flow copy vs. not) — the actual submit behavior is identical either
 * way, since it's always "call the real backend for the current user."
 *
 * Calls the real backend: POST /api/auth/verify-ghana-card via
 * AuthContext#verifyGhanaCard (see services/authApi.js). Sends only
 * the card number — that's all the endpoint accepts (see
 * AuthDTOs.GhanaCardRequest on the backend). The name-on-card, region,
 * and photo fields below are collected for the same reasons a real
 * verification form would ask for them, but only the card number
 * actually reaches the backend right now; there's no document/photo
 * upload endpoint anywhere in this codebase. This is genuine "we
 * recorded a card number" verification, not a check against Ghana's
 * National Identification Authority — see the backend's
 * CHANGELOG_INTEGRATION.md "Known limitations" and
 * FRONTEND_INTEGRATION_NOTES.md for the full picture.
 */
export default function GhanaCardVerify() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user, verifyGhanaCard } = useAuth();

  const roleId = user ? toFrontendRole(user.role) : searchParams.get("role") || "general-user";
  const role = SIGNUP_ROLES.find((r) => r.id === roleId);
  const fromSignup = Boolean(location.state?.fromSignup);
  const returnTo = location.state?.from || "/dashboard";

  const steps = getSignupSteps(true);

  const [cardData, setCardData] = useState({
    cardNumber: "",
    fullNameOnCard: user?.name || "",
    region: "",
  });
  const [cardPhoto, setCardPhoto] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const skipsGhanaCard = !role?.requiresGhanaCard;

  useEffect(() => {
    if (!skipsGhanaCard) return;
    // Someone reached this URL directly with a role that doesn't need
    // it (or no role at all) — skip straight to wherever they'd
    // otherwise end up rather than showing an irrelevant screen. Done
    // in an effect (not during render) since navigating is a side
    // effect — triggering it while rendering causes React to warn
    // about updating another component during render.
    navigate(returnTo, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipsGhanaCard]);

  function handleChange(e) {
    const { name, value } = e.target;
    const nextValue = name === "cardNumber" ? formatGhanaCardNumber(value) : value;
    setCardData((prev) => ({ ...prev, [name]: nextValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const newErrors = {};
    if (!cardData.fullNameOnCard.trim()) newErrors.fullNameOnCard = "Name on the card is required";
    if (!cardData.cardNumber.trim()) newErrors.cardNumber = "Ghana Card number is required";
    else if (!GHANA_CARD_REGEX.test(cardData.cardNumber))
      newErrors.cardNumber = "Enter a valid Ghana Card number (GHA-000000000-0)";
    if (!cardData.region) newErrors.region = "Select the region on your card";
    if (cardPhoto.length === 0) newErrors.cardPhoto = "Upload a photo of your Ghana Card";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await verifyGhanaCard(cardData.cardNumber);
      setIsVerified(true);
      setTimeout(() => {
        navigate(returnTo, { replace: true });
      }, 1200);
    } catch (err) {
      setSubmitError(err.message || "Couldn't verify your Ghana Card. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (skipsGhanaCard) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container-page flex min-h-screen flex-col items-center justify-center py-8">
        <div className="w-full max-w-md">
          {/* Back button */}
          <button
            type="button"
            onClick={() =>
              fromSignup ? navigate(`/get-started/form?role=${roleId}`) : navigate(returnTo)
            }
            className="mb-6 flex items-center gap-1 text-sm font-medium text-forest-600 hover:text-forest-700"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Back
          </button>

          {/* Step indicator — only shown right after registering, as
              part of the signup flow. Reached later via the route guard
              (already signed in, not part of a numbered flow), it's
              omitted. */}
          {fromSignup && (
            <div className="mb-8 flex items-center justify-between gap-2">
              {steps.map((step) => {
                const isActive = step.label === "Ghana Card";
                const isPassed = step.number < 3;
                return (
                  <div key={step.number} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full font-semibold text-sm transition-colors",
                        isPassed
                          ? "bg-forest-600 text-white"
                          : isActive
                            ? "bg-forest-100 text-forest-700 ring-2 ring-forest-600/30"
                            : "bg-ink-900/10 text-ink-500"
                      )}
                    >
                      {isPassed ? <CheckCircleIcon className="h-5 w-5" /> : step.number}
                    </div>
                    <p className="text-xs text-ink-500">{step.label}</p>
                  </div>
                );
              })}
            </div>
          )}

          {isVerified ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 ring-4 ring-green-100/50">
                <CheckCircleIcon className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="mt-5 text-xl font-bold text-ink-900">Ghana Card verified</h1>
              <p className="mt-1.5 text-sm text-ink-500">
                {fromSignup
                  ? `Taking you to your ${role.title.toLowerCase()} dashboard…`
                  : "Taking you back to what you were doing…"}
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-2 flex items-center gap-2.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                  <IdCardIcon className="h-5 w-5" />
                </span>
                <h1 className="text-2xl font-bold text-ink-900">Verify your Ghana Card</h1>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-ink-500">
                As a {role.title.toLowerCase()}, we need to confirm your identity before you can{" "}
                {roleId === "land-owner"
                  ? "list land or receive offers from buyers"
                  : "bid on projects or take on client work"}
                . This keeps every listing and every deal on TerraMatch backed by a real, verified person.
                {!fromSignup && " You're almost there — this only takes a minute."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full name on card */}
                <div>
                  <label htmlFor="fullNameOnCard" className="mb-1.5 block text-sm font-medium text-ink-700">
                    Full name (as shown on your Ghana Card)
                  </label>
                  <input
                    id="fullNameOnCard"
                    type="text"
                    name="fullNameOnCard"
                    placeholder="e.g. Kwame Owusu"
                    value={cardData.fullNameOnCard}
                    onChange={handleChange}
                    className={cn(
                      "w-full rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-ink-900 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-500/20",
                      errors.fullNameOnCard ? "border-red-300 focus:border-red-500" : "border-ink-900/15 focus:border-forest-500"
                    )}
                  />
                  {errors.fullNameOnCard && <p className="mt-1 text-xs text-red-600">{errors.fullNameOnCard}</p>}
                </div>

                {/* Card number */}
                <div>
                  <label htmlFor="cardNumber" className="mb-1.5 block text-sm font-medium text-ink-700">
                    Ghana Card number (PIN)
                  </label>
                  <input
                    id="cardNumber"
                    type="text"
                    name="cardNumber"
                    inputMode="text"
                    placeholder="GHA-000000000-0"
                    value={cardData.cardNumber}
                    onChange={handleChange}
                    maxLength={16}
                    className={cn(
                      "w-full rounded-lg border bg-white px-4 py-2.5 text-sm font-medium tracking-wide text-ink-900 placeholder:text-ink-400 placeholder:tracking-normal transition-colors focus:outline-none focus:ring-2 focus:ring-forest-500/20",
                      errors.cardNumber ? "border-red-300 focus:border-red-500" : "border-ink-900/15 focus:border-forest-500"
                    )}
                  />
                  {errors.cardNumber ? (
                    <p className="mt-1 text-xs text-red-600">{errors.cardNumber}</p>
                  ) : (
                    <p className="mt-1 text-xs text-ink-500">Found on the front of your card, starting with GHA-.</p>
                  )}
                </div>

                {/* Region */}
                <div>
                  <label htmlFor="region" className="mb-1.5 block text-sm font-medium text-ink-700">
                    Region on card
                  </label>
                  <select
                    id="region"
                    name="region"
                    value={cardData.region}
                    onChange={handleChange}
                    className={cn(
                      "w-full rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-ink-900 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-500/20",
                      errors.region ? "border-red-300 focus:border-red-500" : "border-ink-900/15 focus:border-forest-500",
                      !cardData.region && "text-ink-400"
                    )}
                  >
                    <option value="" disabled>
                      Select region
                    </option>
                    {GHANA_CARD_REGIONS.map((r) => (
                      <option key={r} value={r} className="text-ink-900">
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.region && <p className="mt-1 text-xs text-red-600">{errors.region}</p>}
                </div>

                {/* Card photo upload */}
                <div>
                  <ImageUploadGrid
                    value={cardPhoto}
                    onChange={setCardPhoto}
                    maxImages={1}
                    label="Photo of your Ghana Card"
                  />
                  {errors.cardPhoto && <p className="mt-1 text-xs text-red-600">{errors.cardPhoto}</p>}
                  <p className="mt-1 text-xs text-ink-500">
                    Make sure all four corners and the printed text are clearly visible.
                  </p>
                </div>

                {submitError && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{submitError}</p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="mt-2 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Verifying your Ghana Card…" : "Verify & Continue"}
                </Button>
              </form>

              {/* Why we ask */}
              <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-green-100 bg-green-50 p-3">
                <ShieldIcon className="h-4 w-4 shrink-0 translate-y-0.5 text-green-600" />
                <p className="text-xs leading-relaxed text-green-700">
                  Your Ghana Card details are encrypted and only used to verify your identity. They're never
                  shown on your public profile — other users only see your verified badge.
                </p>
              </div>

              <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-amber-100 bg-amber-50 p-3">
                <AlertIcon className="h-4 w-4 shrink-0 translate-y-0.5 text-amber-600" />
                <p className="text-xs leading-relaxed text-amber-700">
                  Land Owner and Contractor accounts require Ghana Card verification so buyers and clients can
                  trust who they're dealing with. You won't be asked for this again once verified.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
