import { Blog } from "../../../.velite/generated";

interface BlogDetailsProps {
  blog: Blog;
  slug: string;
}

export default function BlogDetails({ blog, slug }: BlogDetailsProps) {
  return (
    <div 
      className="px-2 md:px-10 text-white py-3 flex items-center justify-around text-lg sm:text-xl font-medium mx-5 md:mx-10 rounded-lg"
      style={{
        background: 'linear-gradient(135deg, #C7E70C 0%, #8BC34A 100%)'
      }}
    >
      <time className="m-3">
        {new Date(blog.publishedAt).toLocaleDateString('de-DE', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>
      <span className="m-3">•</span>
      <span className="m-3">
        {blog.readingTime || '5'} Min. Lesezeit
      </span>
      <span className="m-3">•</span>
      <span className="m-3">
        Von {blog.author || 'Rechtly Team'}
      </span>
    </div>
  );
}
