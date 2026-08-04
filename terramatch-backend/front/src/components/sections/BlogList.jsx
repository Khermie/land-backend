import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import { BLOG_POSTS } from "../../constants/blogPosts";

/**
 * Blog listing — no screenshot was supplied for this page, built to a
 * reasonable generic standard matching the site's visual language.
 * Posts are original content written for TerraMatch's actual context
 * (see constants/blogPosts.js), not filler text.
 */
export default function BlogList() {
  return (
    <div className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Badge tone="soft" className="mx-auto w-fit">
          TerraMatch Blog
        </Badge>
        <h1 className="mt-5 text-3xl font-extrabold text-ink-900 sm:text-4xl">
          Guides for buying land and hiring contractors in Ghana
        </h1>
        <p className="mt-3 text-sm text-ink-700">
          Practical advice from our team on verification, bidding, and
          getting a project built the right way.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-card transition-shadow hover:shadow-lg"
          >
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="aspect-[16/9] w-full bg-mist-100 object-cover"
            />
            <div className="p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-forest-600">
                {post.category}
              </span>
              <h2 className="mt-2 text-lg font-bold leading-snug text-ink-900 group-hover:text-forest-700">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>
              <p className="mt-4 text-xs text-ink-400">
                {post.dateLabel} · {post.readTime}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
