import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../common/Button";
import { SIGNUP_ROLES, getSignupSteps } from "../../constants/signupConfig";
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

function EyeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12 5C7 5 2.7 8.6 1 13.5c1.7 4.9 6 8.5 11 8.5s9.3-3.6 11-8.5C21.3 8.6 17 5 12 5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="13.5" r="2.5" fill="currentColor" />
    </svg>
  );
}

function EyeOffIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path
        d="M3 3l18 18M9.88 9.88a3 3 0 104.24 4.24M12 5c5 0 9.3 3.6 11 8.5-.5 1.3-1.3 2.6-2.2 3.7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Account creation form (step 2 of signup). Takes a `role` query param
 * to pre-populate the intended role (for display/context only).
 *
 * Submitting this form calls the REAL backend (POST /api/auth/register
 * via AuthContext#register) and signs the person in immediately — the
 * backend has no separate email/SMS OTP step, so there's nothing for a
 * "verify your email" screen to actually verify. Land Owner/Contractor
 * accounts continue to Ghana Card verification next (already
 * authenticated at that point); General User accounts go straight to
 * their dashboard. See AuthContext.jsx's role-mapping notes for how
 * `roleId` here becomes the backend's CLIENT/CONTRACTOR/ADMIN enum.
 */
export default function SignupForm() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [searchParams] = useSearchParams();
  const roleId = searchParams.get("role") || "general-user";
  const role = SIGNUP_ROLES.find((r) => r.id === roleId);
  const steps = getSignupSteps(role?.requiresGhanaCard);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  function validateForm() {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        frontendRole: roleId,
        phone: formData.phoneNumber,
      });
      // Land Owners/Contractors continue into Ghana Card verification
      // (now as an already-signed-in user); General Users go straight
      // to their dashboard — see SIGNUP_ROLES[].requiresGhanaCard in
      // signupConfig.js.
      if (role?.requiresGhanaCard) {
        navigate(`/get-started/ghana-card?role=${roleId}`, { state: { fromSignup: true } });
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      // The backend's real message (e.g. "Email already in use") — see
      // services/api.js's ApiError and GlobalExceptionHandler on the
      // backend.
      setFormError(err.message || "Couldn't create your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container-page flex min-h-screen flex-col items-center justify-center py-8">
        <div className="w-full max-w-md">
          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate("/get-started")}
            className="mb-6 flex items-center gap-1 text-sm font-medium text-forest-600 hover:text-forest-700"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Back
          </button>

          {/* Step indicator */}
          <div className="mb-8 flex items-center justify-between gap-2">
            {steps.map((step) => {
              const isActive = step.number === 2;
              const isPassed = step.number < 2;
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
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-ink-900">Create your account</h1>
            <p className="mt-1 text-sm text-ink-500">
              Fill in your details to get started {role && `as a ${role.title}`}.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Full name */}
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className={cn(
                  "w-full rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-ink-900 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-500/20",
                  errors.fullName ? "border-red-300 focus:border-red-500" : "border-ink-900/15 focus:border-forest-500"
                )}
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={cn(
                  "w-full rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-ink-900 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-500/20",
                  errors.email ? "border-red-300 focus:border-red-500" : "border-ink-900/15 focus:border-forest-500"
                )}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Phone number */}
            <div>
              <label htmlFor="phoneNumber" className="sr-only">
                Phone number
              </label>
              <input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={cn(
                  "w-full rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-ink-900 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-500/20",
                  errors.phoneNumber ? "border-red-300 focus:border-red-500" : "border-ink-900/15 focus:border-forest-500"
                )}
              />
              {errors.phoneNumber && <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className={cn(
                    "w-full rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-ink-900 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-500/20 pr-10",
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
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={cn(
                    "w-full rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-ink-900 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-forest-500/20 pr-10",
                    errors.confirmPassword ? "border-red-300 focus:border-red-500" : "border-ink-900/15 focus:border-forest-500"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-700"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
            </div>

            {formError && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{formError}</p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="mt-6 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating your account..." : "Continue"}
            </Button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-ink-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-forest-600 hover:text-forest-700">
              Login
            </Link>
          </p>

          {/* Security notice */}
          <div className="mt-6 rounded-lg border border-green-100 bg-green-50 p-3">
            <p className="text-xs text-green-700">
              ✓ Your information is secure with us. We never share your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
