// Primary nav — matches the top bar in the source design, with
// "Features" swapped for "Home" per request (Features still only
// exists as a placeholder page; there was no persistent Home link).
export const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Explore Land", href: "/explore-land" },
  { label: "Find Contractor", href: "/find-contractor" },
  { label: "Pricing", href: "/pricing" },
];

// Footer columns — matches "Product" / "Company" columns in the source design
export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Explore Land", href: "/explore-land" },
      { label: "Find Contractor", href: "/find-contractor" },
      { label: "How it Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Help Center", href: "/help-center" },
    ],
  },
];
