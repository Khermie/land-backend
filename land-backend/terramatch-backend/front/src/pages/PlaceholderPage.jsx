import { Link } from "react-router-dom";
import Button from "../components/common/Button";

/**
 * Generic placeholder for pages referenced by nav/footer links whose
 * designs haven't been supplied yet. Swap for a real page component
 * once its screenshot is provided — see master prompt instructions.
 */
export default function PlaceholderPage({ title }) {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="rounded-full bg-forest-100 px-4 py-1.5 text-sm font-semibold text-forest-700">
        Coming soon
      </span>
      <h1 className="mt-5 text-3xl font-bold text-ink-900 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-md text-ink-700">
        This page hasn't been designed yet. Once its screenshot is provided,
        it will be built to match — same architecture, same component
        library.
      </p>
      <Button as={Link} to="/" variant="primary" className="mt-8">
        Back to Home
      </Button>
    </section>
  );
}
