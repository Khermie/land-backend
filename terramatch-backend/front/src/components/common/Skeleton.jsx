import { cn } from "../../utils/cn";

/**
 * Generic skeleton block. Used to hold the exact shape of an element
 * (image, avatar, line of text) while its real content loads.
 */
export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-ink-900/10",
        className
      )}
      aria-hidden="true"
    />
  );
}

/** Skeleton shaped like a photo/image block, e.g. contractor avatar or land photo. */
export function ImageSkeleton({ className }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-mist-100",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-mist-100 via-mist-200 to-mist-100" />
    </div>
  );
}
