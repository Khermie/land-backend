import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, getRoleDestination } from "../../context/AuthContext";

/**
 * RETIRED from the real signup flow. This used to be a fake OTP/email-
 * verification screen — step 3 of signup, reached from SignupForm with
 * formData in navigation state, calling a no-op `login(role)` at the
 * end. Once account creation started calling the real backend (POST
 * /api/auth/register — see AuthContext#register), that no longer made
 * sense: registration already creates the account and signs the person
 * in immediately, and the backend has no separate email/SMS OTP
 * endpoint for this screen to actually call. A fake "verify your code"
 * step after a real registration would be actively misleading rather
 * than harmlessly decorative.
 *
 * SignupForm now routes Land Owner/Contractor accounts straight to
 * Ghana Card verification and General User accounts straight to their
 * dashboard — see SignupForm.jsx's handleSubmit. Nothing in the app
 * links to /get-started/verify anymore, but the route is kept alive
 * (rather than removed, which could 404 an old bookmark or an external
 * link) as a simple redirect: signed-in users go to their dashboard,
 * signed-out users go back to the start of signup.
 */
export default function SignupVerify() {
  const navigate = useNavigate();
  const { isAuthed, role } = useAuth();

  useEffect(() => {
    navigate(isAuthed ? getRoleDestination(role) : "/get-started", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
