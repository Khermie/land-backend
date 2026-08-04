import logoMark from "../../assets/images/logo-mark.png";

/**
 * TerraMatch mark — the real logo asset extracted from the source
 * screenshot (green outline pin, map fragment, and worker icon).
 * Do not redesign or substitute; swap the file at
 * src/assets/images/logo-mark.png if a cleaner export becomes available.
 */
export default function Logo({ className = "h-7 w-7" }) {
  return (
    <img
      src={logoMark}
      alt="TerraMatch"
      className={`${className} object-contain`}
    />
  );
}
