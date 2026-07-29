import { Link } from "react-router-dom";
import Button from "../common/Button";
import { ImageSkeleton } from "../common/Skeleton";

export default function ListLandBanner() {
  return (
    <section className="container-page py-10 sm:py-14">
      <div className="relative overflow-hidden rounded-2xl bg-forest-900">
        <div className="relative z-10 max-w-md p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            List Your Land With Us
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-white/85">
            Reach thousands of potential buyers and get the best value.
          </p>
          <Button
            as={Link}
            to="/get-started"
            variant="primary"
            size="md"
            className="mt-6"
          >
            List Your Land
          </Button>
        </div>

        {/*
          PLACEHOLDER ASSET: aerial farmland photo with a location pin
          and dashed plot outline per the source design. Replace with
          /src/assets/images/list-land-banner.jpg
        */}
        <ImageSkeleton className="absolute inset-y-0 right-0 hidden w-1/2 rounded-none sm:block" />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 items-center justify-center sm:flex"
          aria-hidden="true"
        >
          <div className="relative h-24 w-32 rotate-[8deg] border-2 border-dashed border-white/70">
            <svg viewBox="0 0 24 24" className="absolute -top-7 left-1/2 h-6 w-6 -translate-x-1/2 fill-forest-400" aria-hidden="true">
              <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
