import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import LandOwnerProfile from "../components/sections/LandOwnerProfile";
import { LAND_OWNERS } from "../constants/landOwners";

export default function LandOwner() {
  const { slug } = useParams();
  const owner = slug ? LAND_OWNERS[slug] : undefined;

  if (!owner) {
    return (
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="rounded-full bg-forest-100 px-4 py-1.5 text-sm font-semibold text-forest-700">
          Not found
        </span>
        <h1 className="mt-5 text-3xl font-bold text-ink-900 sm:text-4xl">
          Profile Not Found
        </h1>
        <p className="mt-3 max-w-md text-ink-700">
          We couldn't find a land owner profile at this address. It may
          have been removed, or the link might be incorrect.
        </p>
        <Button as={Link} to="/explore-land" variant="primary" className="mt-8">
          Back to Explore Land
        </Button>
      </section>
    );
  }

  return <LandOwnerProfile owner={owner} />;
}
