import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import StarRating from "../components/common/StarRating";
import ContractorProfile from "../components/sections/ContractorProfile";
import { CONTRACTORS } from "../constants/contractors";
import { CONTRACTOR_PROFILES } from "../constants/contractorProfiles";

/**
 * Full profile data exists for 4 of the 7 CONTRACTORS entries (see
 * constants/contractorProfiles.js). Any other slug renders the photo,
 * rating, and stats already on file for them plus a working "Message
 * Now" button — real usable content, just without a fabricated
 * portfolio/review history. Same pattern as pages/LandDetail.jsx.
 */
export default function ContractorProfilePage() {
  const { slug } = useParams();
  const contractor = CONTRACTORS.find((c) => c.slug === slug);
  const profile = slug ? CONTRACTOR_PROFILES[slug] : undefined;

  if (!contractor) {
    return (
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="rounded-full bg-forest-100 px-4 py-1.5 text-sm font-semibold text-forest-700">
          Not found
        </span>
        <h1 className="mt-5 text-3xl font-bold text-ink-900 sm:text-4xl">
          Contractor Not Found
        </h1>
        <p className="mt-3 max-w-md text-ink-700">
          We couldn't find a contractor profile at this address. It may
          have been removed, or the link might be incorrect.
        </p>
        <Button as={Link} to="/find-contractor" variant="primary" className="mt-8">
          Back to Find Contractor
        </Button>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-card">
          <img
            src={contractor.image}
            alt={contractor.name}
            className="aspect-[16/9] w-full bg-mist-100 object-cover"
          />
          <div className="p-6 text-center">
            <span className="inline-block rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-700">
              Full profile coming soon
            </span>
            <h1 className="mt-4 text-2xl font-bold text-ink-900">{contractor.name}</h1>
            <p className="mt-1 text-sm text-ink-500">{contractor.location}</p>

            <div className="mt-3 flex items-center justify-center gap-1.5">
              <StarRating value={contractor.rating} />
              <span className="text-sm font-semibold text-ink-900">{contractor.rating}</span>
              <span className="text-sm text-ink-500">({contractor.reviews} reviews)</span>
            </div>

            <div className="mt-4 flex items-center justify-center gap-6 border-y border-ink-900/10 py-4">
              <div>
                <p className="text-lg font-bold text-ink-900">{contractor.projects}</p>
                <p className="text-xs text-ink-500">Projects</p>
              </div>
              <div>
                <p className="text-lg font-bold text-ink-900">{contractor.category}</p>
                <p className="text-xs text-ink-500">Category</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-ink-700">
              Specialties: {contractor.specialties}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                as={Link}
                to={`/messages?contact=${slug}`}
                variant="primary"
                className="flex-1"
              >
                Message Now
              </Button>
              <Button as={Link} to="/find-contractor" variant="outline-dark" className="flex-1">
                Back to Find Contractor
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <ContractorProfile contractor={profile} slug={slug} />;
}
