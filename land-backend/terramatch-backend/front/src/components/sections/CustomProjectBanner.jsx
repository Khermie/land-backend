import { Link } from "react-router-dom";
import Button from "../common/Button";
import { ImageSkeleton } from "../common/Skeleton";

export default function CustomProjectBanner() {
  return (
    <section className="container-page py-10 sm:py-14">
      <div className="relative overflow-hidden rounded-2xl bg-forest-900">
        <div className="relative z-10 max-w-md p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Need a Custom Project?
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-white/85">
            Post your project and let contractors come to you with the best
            offers.
          </p>
          <Button
            as={Link}
            to="/post-a-project"
            variant="primary"
            size="md"
            className="mt-6"
          >
            Post a Project
          </Button>
        </div>

        {/*
          PLACEHOLDER ASSET: photo of a modern house per the source
          design. Replace with /src/assets/images/custom-project-house.jpg
        */}
        <ImageSkeleton className="absolute inset-y-0 right-0 hidden w-1/2 rounded-none sm:block" />
      </div>
    </section>
  );
}
