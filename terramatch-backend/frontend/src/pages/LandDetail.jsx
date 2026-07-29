import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import LandDetailContent from "../components/sections/LandDetailContent";
import { FEATURED_LANDS } from "../constants/lands";
import { LAND_DETAILS } from "../constants/landDetails";

/**
 * Full auction detail data currently only exists for "east-legon-hills"
 * (the one land the source screenshot covered). Any other slug from
 * FEATURED_LANDS renders a friendly "coming soon" state instead of
 * fabricated bid histories/documents — see the two early returns below.
 */
export default function LandDetail() {
  const { slug } = useParams();
  const land = FEATURED_LANDS.find((l) => l.slug === slug);
  const detail = slug ? LAND_DETAILS[slug] : undefined;

  if (!land) {
    return (
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="rounded-full bg-forest-100 px-4 py-1.5 text-sm font-semibold text-forest-700">
          Not found
        </span>
        <h1 className="mt-5 text-3xl font-bold text-ink-900 sm:text-4xl">
          Land Not Found
        </h1>
        <p className="mt-3 max-w-md text-ink-700">
          We couldn't find a listing at this address. It may have been
          removed, or the link might be incorrect.
        </p>
        <Button as={Link} to="/explore-land" variant="primary" className="mt-8">
          Back to Explore Land
        </Button>
      </section>
    );
  }

  if (!detail) {
    return (
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="rounded-full bg-forest-100 px-4 py-1.5 text-sm font-semibold text-forest-700">
          Coming soon
        </span>
        <h1 className="mt-5 text-3xl font-bold text-ink-900 sm:text-4xl">
          {land.name}
        </h1>
        <p className="mt-1.5 text-ink-500">{land.location}</p>
        <p className="mt-3 max-w-md text-ink-700">
          The full listing page for this land hasn't been designed yet.
          Once its screenshot is provided, it will be built to match —
          same architecture as East Legon Hills.
        </p>
        <Button as={Link} to="/explore-land" variant="primary" className="mt-8">
          Back to Explore Land
        </Button>
      </section>
    );
  }

  return <LandDetailContent land={land} detail={detail} />;
}
