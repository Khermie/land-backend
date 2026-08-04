import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../common/Button";
import { SIGNUP_STEPS } from "../../constants/signupConfig";
import { useAuth } from "../../context/AuthContext";
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

function PhoneIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" strokeWidth="1.5" />
      <path d="M9 20h6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Email/phone verification screen (step 3 of signup). Receives formData
 * and roleId via navigation state from the form screen.
 *
 * Shows a phone mockup with verification UI. The "6 digit code" display
 * is just for the screenshot aesthetic — there's no actual OTP logic,
 * just a "Verify & Continue" button that completes the flow.
 */
export default function SignupVerify() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const roleId = searchParams.get("role") || "general-user";
  const { login } = useAuth();

  const formData = location.state?.formData || {};
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);

  // Extract email/phone for display (mask for privacy)
  const maskedEmail = formData.email
    ? formData.email.replace(/(.{2})(.*)(@.*)/, "$1***$3")
    : "+233 24 123 ****";

  function handleVerify() {
    setIsVerifying(true);
    // Simulate OTP verification
    setTimeout(() => {
      setVerificationComplete(true);
      setIsVerifying(false);
      // Verification complete = signed in — take them straight to their
      // personalized Dashboard rather than back through a login screen.
      setTimeout(() => {
        login();
        navigate("/dashboard");
      }, 1500);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container-page flex min-h-screen flex-col items-center justify-center py-8">
        <div className="w-full max-w-md">
          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate(`/get-started/form?role=${roleId}`)}
            className="mb-6 flex items-center gap-1 text-sm font-medium text-forest-600 hover:text-forest-700"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Back
          </button>

          {/* Step indicator */}
          <div className="mb-8 flex items-center justify-between gap-2">
            {SIGNUP_STEPS.map((step) => {
              const isActive = step.number === 3;
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

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-ink-900">Verify your account</h1>
            <p className="mt-2 text-sm text-ink-500">
              We need to verify your phone number to secure your account.
            </p>
          </div>

          {/* Phone mockup */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-48 rounded-3xl border-8 border-ink-900 bg-white shadow-2xl">
              {/* Notch */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-32 rounded-b-2xl bg-ink-900" />

              {/* Screen content */}
              <div className="pt-8 pb-6 px-6 text-center">
                {verificationComplete ? (
                  <>
                    {/* Success state */}
                    <div className="flex justify-center mb-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 ring-4 ring-green-100/50">
                        <CheckCircleIcon className="h-10 w-10 text-green-600" />
                      </div>
                    </div>
                    <p className="text-sm font-bold text-ink-900">Account verified!</p>
                    <p className="mt-1 text-xs text-ink-500">You're all set to get started.</p>
                  </>
                ) : (
                  <>
                    {/* Verification input state */}
                    <div className="mb-4">
                      <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                        <PhoneIcon className="h-8 w-8" />
                      </div>
                    </div>
                    <p className="text-xs text-ink-500">Enter the 6 digit code sent to</p>
                    <p className="mt-1 text-sm font-semibold text-ink-900">{maskedEmail}</p>
                    <p className="mt-3 text-xs text-ink-500">
                      <a href="#" className="text-forest-600 hover:text-forest-700 font-medium">
                        Change
                      </a>
                    </p>

                    {/* Code input (decorative — just shows the field) */}
                    <div className="mt-5 flex justify-center gap-1">
                      {[...Array(6)].map((_, i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength="1"
                          placeholder="·"
                          disabled
                          className="h-9 w-7 rounded border border-ink-900/20 bg-mist-50 text-center text-lg font-bold text-ink-900 placeholder:text-ink-400"
                        />
                      ))}
                    </div>

                    <p className="mt-3 text-xs text-ink-500">
                      Didn't receive code?{" "}
                      <a href="#" className="text-forest-600 hover:text-forest-700 font-medium">
                        Resend (00:40)
                      </a>
                    </p>
                  </>
                )}
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-24 rounded-full bg-ink-900" />
            </div>
          </div>

          {/* Action buttons */}
          {!verificationComplete ? (
            <Button
              type="button"
              variant="primary"
              size="md"
              className="w-full mb-4"
              onClick={handleVerify}
              disabled={isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify & Continue"}
            </Button>
          ) : (
            <div className="text-center">
              <p className="text-sm text-ink-600">Redirecting to your dashboard...</p>
            </div>
          )}

          {/* Security notice */}
          <div className="mt-6 rounded-lg border border-green-100 bg-green-50 p-3">
            <p className="text-xs text-green-700">
              ✓ We use verification to keep your account safe and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
