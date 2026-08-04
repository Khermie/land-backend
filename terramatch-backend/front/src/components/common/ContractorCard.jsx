import { Link } from "react-router-dom";
import Button from "./Button";
import StarRating from "./StarRating";
import { LocationIcon, CheckIcon } from "./Icons";

export default function ContractorCard({ contractor, reviewsLabel = "" }) {
  const { slug, name, rating, reviews, projects, specialties, location, image } =
    contractor;

  return (
    <div className="group overflow-hidden rounded-2xl border border-ink-900/5 bg-white shadow-sm transition-all duration-300 hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-mist-100">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-navy-900/80 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm backdrop-blur-md border border-white/10">
          <CheckIcon className="h-3 w-3 text-forest-400" />
          <span>Verified</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-ink-900 transition-colors group-hover:text-forest-600">{name}</h3>
        
        <div className="mt-2 flex items-center gap-1.5">
          <StarRating value={rating} />
          <span className="text-sm font-semibold text-ink-900">{rating}</span>
          <span className="text-sm text-ink-500">
            ({reviews}
            {reviewsLabel ? ` ${reviewsLabel}` : ""})
          </span>
        </div>

        <p className="mt-3 text-sm font-medium text-ink-700">
          {projects} Projects Completed
        </p>
        <p className="mt-1 text-sm text-ink-500 line-clamp-1">{specialties}</p>
        
        <div className="mt-3 flex items-center gap-1 text-sm text-ink-500">
          <LocationIcon className="h-3.5 w-3.5 text-ink-400" />
          <span>{location}</span>
        </div>

        <Button
          as={Link}
          to={`/find-contractor/${slug}`}
          variant="primary"
          size="sm"
          className="mt-4 w-full group-hover:bg-forest-700 transition-colors"
        >
          View Profile
        </Button>
      </div>
    </div>
  );
}
