import Link from "next/link";
import Image from "next/image";
import { Blog } from "../../.velite/generated";

interface RelatedPostsProps {
  blogs: Blog[];
  title?: string;
}

export default function RelatedPosts({ blogs, title = "Ähnliche Artikel" }: RelatedPostsProps) {
  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="related-posts blog-grid-section w-full mx-auto py-12 sm:py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="related-posts-title blog-section-title text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          {title}
        </h2>
        
        <div className="related-posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogs.map((blog) => (
            <article key={blog.slug} className="related-post-card blog-card bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 group border border-gray-100">
              <div className="related-post-image blog-card-image-container relative h-48 overflow-hidden">
                <Image
                  src={blog.image.src}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  {blog.tags.slice(0, 1).map((tag) => (
                    <span
                      key={tag}
                      className="related-post-tag blog-card-tag px-2.5 sm:px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="related-post-content blog-card-content p-4 sm:p-6">
                <h3 className="related-post-title blog-card-title text-lg sm:text-xl font-semibold mb-2 sm:mb-3 line-clamp-2 text-gray-900 group-hover:text-gray-700 transition-colors">
                  {blog.title}
                </h3>
                <p className="related-post-excerpt blog-card-description text-gray-600 text-sm mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
                  {blog.description}
                </p>
                <Link
                  href={`/blogundratgeber/blogs/${blog.slug}`}
                  className="related-post-link blog-card-link inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #C7E70C 0%, #8BC34A 100%)',
                    color: 'white'
                  }}
                >
                  Weiterlesen
                  <svg className="related-post-link-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
