import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../../constants/blogPosts";
import { cn } from "../../utils/cn";

function ChevronLeftIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12.5 4.5l-6 5.5 6 5.5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Single blog post view. Shows up to 2 related posts (other posts,
 * excluding the current one) at the bottom so there's somewhere to go
 * next instead of a dead end.
 */
export default function BlogPost({ post }) {
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/blog"
          className="mb-6 flex items-center gap-1 text-sm font-medium text-forest-600 hover:text-forest-700"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back to Blog
        </Link>

        <span className="text-xs font-semibold uppercase tracking-wide text-forest-600">
          {post.category}
        </span>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-ink-500">
          {post.author} · {post.dateLabel} · {post.readTime}
        </p>

        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="mt-6 aspect-[16/9] w-full rounded-2xl bg-mist-100 object-cover"
        />

        <div className="mt-8 space-y-4">
          {post.body.map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed text-ink-700">
              {paragraph}
            </p>
          ))}
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-14 border-t border-ink-900/10 pt-8">
            <h2 className="text-sm font-bold text-ink-900">Related Reading</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="group flex gap-3 rounded-xl border border-ink-900/10 bg-white p-3 hover:border-forest-300"
                >
                  <img
                    src={related.image}
                    alt={related.title}
                    loading="lazy"
                    className="h-16 w-20 shrink-0 rounded-lg bg-mist-100 object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink-900 group-hover:text-forest-700">
                      {related.title}
                    </p>
                    <p className="mt-1 text-xs text-ink-500">{related.dateLabel}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
