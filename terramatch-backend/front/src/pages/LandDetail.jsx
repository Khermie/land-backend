import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import LandDetailContent from "../components/sections/LandDetailContent";
import { FEATURED_LANDS } from "../constants/lands";
import { LAND_DETAILS } from "../constants/landDetails";

/**
 * Full auction detail data currently only exists for "east-legon-hills"
 * (the one land the source screenshot covered). Building the same
 * depth for the other 5 lands (specs, amenities, documents, bid
 * history, terms) is effectively a whole extra page each — deliberately
 * out of scope for now. Instead of a dead end, the fallback below
 * shows the listing's real photo/price/details and a working "Message
 * the Owner" button (all lands in this project's data belong to Kwame
 * Owusu — see constants/landOwners.js — so it deep-links to the same
 * Messages flow used everywhere else).
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
      <section className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-card">
          <img
            src={land.image}
            alt={land.name}
            className="aspect-[16/9] w-full bg-mist-100 object-cover"
          />
          <div className="p-6 text-center">
            <span className="inline-block rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-700">
              Full listing coming soon
            </span>
            <h1 className="mt-4 text-2xl font-bold text-ink-900">{land.name}</h1>
            <p className="mt-1 text-sm text-ink-500">{land.location}</p>

            <div className="mt-4 flex items-center justify-center gap-6 border-y border-ink-900/10 py-4">
              <div>
                <p className="text-lg font-bold text-ink-900">{land.price}</p>
                <p className="text-xs text-ink-500">Asking Price</p>
              </div>
              <div>
                <p className="text-lg font-bold text-ink-900">{land.bids}</p>
                <p className="text-xs text-ink-500">Bids So Far</p>
              </div>
              <div>
                <p className="text-lg font-bold text-ink-900">{land.category}</p>
                <p className="text-xs text-ink-500">Category</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-ink-700">
              Bidding isn't open on this listing yet, but you can reach
              the owner directly to ask about it or express interest.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                as={Link}
                to="/messages?contact=kwame-owusu"
                variant="primary"
                className="flex-1"
              >
                Message the Owner
              </Button>
              <Button as={Link} to="/explore-land" variant="outline-dark" className="flex-1">
                Back to Explore Land
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <LandDetailContent land={land} detail={detail} />;
}
