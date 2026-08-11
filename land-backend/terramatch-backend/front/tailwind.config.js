/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette sampled from the source screenshots
        forest: {
          50: "#eef8f2",
          100: "#d9f0e3",
          200: "#b3e0c8",
          300: "#7ec6a6",
          400: "#4fa17e",
          500: "#357f5f",
          600: "#275b44", // primary CTA green ("Explore Interactive Map")
          700: "#204a38",
          800: "#1b422f", // footer mid green
          900: "#17352a", // navbar / footer darkest green
          950: "#0e211a",
        },
        navy: {
          600: "#28345f",
          700: "#1f2a52",
          800: "#1b2447", // "Find Verified Contractors" button
          900: "#141c38",
        },
        ink: {
          900: "#14181a",
          700: "#3a4142",
          500: "#6b7373",
        },
        mist: {
          50: "#fafafa",
          100: "#f2f2f2",
          200: "#e6e6e6",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 8px 24px -8px rgba(20, 24, 26, 0.15)",
        floating: "0 12px 32px -8px rgba(20, 24, 26, 0.25)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
        floatY: "floatY 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
