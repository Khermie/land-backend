import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import BlogPost from "../components/sections/BlogPost";
import { BLOG_POSTS } from "../constants/blogPosts";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="rounded-full bg-forest-100 px-4 py-1.5 text-sm font-semibold text-forest-700">
          Not found
        </span>
        <h1 className="mt-5 text-3xl font-bold text-ink-900 sm:text-4xl">
          Post Not Found
        </h1>
        <p className="mt-3 max-w-md text-ink-700">
          We couldn't find an article at this address. It may have been
          removed, or the link might be incorrect.
        </p>
        <Button as={Link} to="/blog" variant="primary" className="mt-8">
          Back to Blog
        </Button>
      </section>
    );
  }

  return <BlogPost post={post} />;
}
