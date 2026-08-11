// Signup flow roles and descriptions shown in the role-selection screen.
// `requiresGhanaCard` drives the extra verification step inserted into
// the signup flow for Land Owners and Contractors (see
// AuthContext.GHANA_CARD_REQUIRED_ROLES, which mirrors this list — kept
// in sync manually since one is config/copy and the other is auth logic).
export const SIGNUP_ROLES = [
  {
    id: "land-owner",
    icon: "📍",
    title: "Land Owner",
    description: "Find properties, track price and connect with serious buyers.",
    requiresGhanaCard: true,
  },
  {
    id: "contractor",
    icon: "🏗️",
    title: "Contractor",
    description: "Find projects, source land and grow your construction business.",
    requiresGhanaCard: true,
  },
  {
    id: "general-user",
    icon: "👥",
    title: "General User",
    description: "Explore land, compare vendors and hire trusted contractors.",
    requiresGhanaCard: false,
  },
];

// Step labels for the signup flow indicator. Land Owners/Contractors
// get a 3rd "Ghana Card" step after Details (they're already signed in
// by that point — see GhanaCardVerify.jsx); General Users see just the
// 2 steps, since account creation itself is the last thing that
// happens for them. There used to be a 4th "Verify" (fake OTP) step
// after this for every role — removed once SignupForm started calling
// the real POST /api/auth/register, which signs the person in
// immediately with no separate verification step to display.
export function getSignupSteps(includeGhanaCard) {
  const steps = [
    { number: 1, label: "Role" },
    { number: 2, label: "Details" },
  ];
  if (includeGhanaCard) {
    steps.push({ number: 3, label: "Ghana Card" });
  }
  return steps;
}

// Ghana's 16 administrative regions — used for the region dropdown on
// the Ghana Card verification step (the card's issuing/registration
// region), matching the Ghana-regions list already used elsewhere in
// the project (ListLandForm.jsx).
export const GHANA_CARD_REGIONS = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Western North",
  "Central",
  "Eastern",
  "Volta",
  "Oti",
  "Northern",
  "Savannah",
  "North East",
  "Upper East",
  "Upper West",
  "Bono",
  "Bono East",
  "Ahafo",
];
